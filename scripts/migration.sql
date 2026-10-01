-- =============================================
-- ESRE OS Agentic Pipeline Hardening Migration
-- =============================================

-- 1. Execution Observability Logs
CREATE TABLE IF NOT EXISTS agent_execution_logs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  execution_id uuid NOT NULL REFERENCES agent_executions(id) ON DELETE CASCADE,
  event text NOT NULL CHECK (event IN ('started', 'retry', 'completed', 'failed', 'timed_out', 'approved', 'rejected', 'rate_limited', 'budget_exceeded')),
  details jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_exec_logs_execution_id ON agent_execution_logs(execution_id);
CREATE INDEX IF NOT EXISTS idx_exec_logs_event ON agent_execution_logs(event);
CREATE INDEX IF NOT EXISTS idx_exec_logs_created_at ON agent_execution_logs(created_at DESC);

-- 2. Organization Rate Limits & Cost Controls
CREATE TABLE IF NOT EXISTS org_rate_limits (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE UNIQUE,
  max_executions_per_hour int DEFAULT 60,
  max_daily_crd_spend numeric DEFAULT 500,
  require_approval_above_crd numeric DEFAULT 50,
  is_enabled boolean DEFAULT true,
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_org_rate_limits_org ON org_rate_limits(organization_id);

-- 3. Add production columns to agent_executions
ALTER TABLE agent_executions 
  ADD COLUMN IF NOT EXISTS retry_count int DEFAULT 0,
  ADD COLUMN IF NOT EXISTS max_retries int DEFAULT 3,
  ADD COLUMN IF NOT EXISTS last_error jsonb,
  ADD COLUMN IF NOT EXISTS latency_ms int,
  ADD COLUMN IF NOT EXISTS tokens_used int,
  ADD COLUMN IF NOT EXISTS timed_out_at timestamptz;

-- 4. Add cost_crd column to agent_executions for per-execution cost tracking
ALTER TABLE agent_executions
  ADD COLUMN IF NOT EXISTS cost_crd numeric DEFAULT 0;

-- 5. Add idempotency_key to prevent duplicate webhook processing
ALTER TABLE agent_executions
  ADD COLUMN IF NOT EXISTS idempotency_key text UNIQUE;

-- 6. Seed default rate limits for existing organizations
INSERT INTO org_rate_limits (organization_id, max_executions_per_hour, max_daily_crd_spend, require_approval_above_crd)
SELECT id, 60, 500, 50
FROM organizations
ON CONFLICT (organization_id) DO NOTHING;

-- 7. Update status check constraint to include new statuses
DO $$
BEGIN
  -- Try to drop old constraint
  ALTER TABLE agent_executions DROP CONSTRAINT IF EXISTS agent_executions_status_check;
  
  -- Add expanded constraint
  ALTER TABLE agent_executions ADD CONSTRAINT agent_executions_status_check 
    CHECK (status IN ('pending', 'running', 'completed', 'failed', 'retrying', 'timed_out', 'awaiting_approval', 'approved', 'rejected'));
EXCEPTION WHEN OTHERS THEN
  NULL;
END $$;

-- 8. RLS policies for new tables
ALTER TABLE agent_execution_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE org_rate_limits ENABLE ROW LEVEL SECURITY;

-- Allow service role full access (admin dashboard uses service role key)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'agent_execution_logs' AND policyname = 'Service role full access on logs'
  ) THEN
    CREATE POLICY "Service role full access on logs" ON agent_execution_logs
      FOR ALL USING (true) WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'org_rate_limits' AND policyname = 'Service role full access on rate limits'
  ) THEN
    CREATE POLICY "Service role full access on rate limits" ON org_rate_limits
      FOR ALL USING (true) WITH CHECK (true);
  END IF;
END $$;
