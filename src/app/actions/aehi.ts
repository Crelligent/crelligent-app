'use server';

import { createAdminClient } from '@/lib/supabase/server/core';

export async function submitAehiScore(data: {
  email: string;
  company_name: string;
  country: string;
  industry: string;
  total_score: number;
  l1_score: number;
  l2_score: number;
  l3_score: number;
  l4_score: number;
  l5_score: number;
}) {
  try {
    const supabase = createAdminClient();
    
    // Validate inputs
    if (!data.email || !data.company_name || !data.country || !data.industry) {
      throw new Error("Missing required fields");
    }

    // Insert into Supabase
    const { error } = await supabase
      .from('aehi_scores')
      .insert([
        {
          email: data.email,
          company_name: data.company_name,
          country: data.country,
          industry: data.industry,
          total_score: data.total_score,
          l1_score: data.l1_score,
          l2_score: data.l2_score,
          l3_score: data.l3_score,
          l4_score: data.l4_score,
          l5_score: data.l5_score,
          source: 'website_diagnostic',
          created_at: new Date().toISOString(),
        }
      ]);

    if (error) {
      console.error('Supabase insert error:', error);
      throw new Error(error.message);
    }

    return { success: true };
  } catch (error: any) {
    console.error('Failed to submit AEHI score:', error);
    return { success: false, error: error.message };
  }
}
