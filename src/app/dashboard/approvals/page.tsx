import { createClient } from '@/lib/server'
import { redirect } from 'next/navigation'
import { CheckCircle, XCircle, Clock } from 'lucide-react'

export const metadata = {
  title: 'L5 Governance | Agent Approvals',
}

export default async function ApprovalsDashboard() {
  const supabase = await createClient()

  // In a real app, you would check auth here, e.g.:
  // const { data: { user } } = await supabase.auth.getUser()
  // if (!user) redirect('/login')

  // Fetch all pending approvals for the L5 dashboard
  const { data: approvals, error } = await supabase
    .from('agent_executions')
    .select(`
      id,
      status,
      inputs,
      started_at,
      l2_workflow_steps ( step_name, step_order, cost_crd ),
      l2_workflows ( name, trigger_event )
    `)
    .eq('status', 'awaiting_approval')
    .order('started_at', { ascending: false })

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10 border-b border-gray-800 pb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#3b82f6] to-[#ec4899] bg-clip-text text-transparent">
            L5 Governance: Pending Approvals
          </h1>
          <p className="text-gray-400 mt-2">
            Review and authorize agentic actions queued by the L2 Scheduler.
          </p>
        </header>

        {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-200 p-4 rounded-lg mb-8">
            Failed to load approvals: {error.message}
          </div>
        )}

        {approvals && approvals.length === 0 && (
          <div className="text-center py-20 border border-dashed border-gray-800 rounded-xl">
            <CheckCircle className="mx-auto h-12 w-12 text-gray-600 mb-4" />
            <h3 className="text-xl font-medium text-gray-300">No pending approvals</h3>
            <p className="text-gray-500">All agent workflows are currently cleared.</p>
          </div>
        )}

        <div className="space-y-6">
          {approvals?.map((approval: any) => (
            <div key={approval.id} className="bg-[#111] border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-amber-500/10 text-amber-500 text-xs font-semibold rounded-full uppercase tracking-wider flex items-center gap-2">
                      <Clock className="w-3 h-3" /> Awaiting Approval
                    </span>
                    <span className="text-sm text-gray-500">
                      Step {approval.l2_workflow_steps?.step_order}
                    </span>
                  </div>
                  <h3 className="text-xl font-medium text-gray-200">
                    {approval.l2_workflow_steps?.step_name}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">
                    Workflow: <span className="text-gray-300">{approval.l2_workflows?.name}</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">Estimated Cost</p>
                  <p className="text-lg font-semibold text-[#ec4899]">
                    {approval.l2_workflow_steps?.cost_crd} CRD
                  </p>
                </div>
              </div>

              <div className="bg-[#0a0a0a] rounded-lg p-4 mb-6 border border-gray-800/50">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Proposed Action / Inputs</h4>
                <pre className="text-sm text-gray-300 overflow-x-auto">
                  {JSON.stringify(approval.inputs, null, 2)}
                </pre>
              </div>

              <div className="flex gap-4 border-t border-gray-800 pt-6">
                <form action="/api/l2/complete-step" method="POST" className="flex-1">
                  <input type="hidden" name="execution_id" value={approval.id} />
                  <input type="hidden" name="status" value="completed" />
                  <input type="hidden" name="outputs" value='{"approved": true}' />
                  <button type="submit" className="w-full py-3 bg-[#3b82f6] hover:bg-blue-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                    <CheckCircle className="w-5 h-5" /> Authorize & Continue
                  </button>
                </form>
                <form action="/api/l2/complete-step" method="POST" className="flex-1">
                  <input type="hidden" name="execution_id" value={approval.id} />
                  <input type="hidden" name="status" value="rejected" />
                  <input type="hidden" name="outputs" value='{"approved": false}' />
                  <button type="submit" className="w-full py-3 bg-transparent border border-gray-600 hover:border-red-500 hover:text-red-500 text-gray-300 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                    <XCircle className="w-5 h-5" /> Reject
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
