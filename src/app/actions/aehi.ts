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

export async function getAehiStats() {
  try {
    const supabase = createAdminClient();
    
    // We fetch all scores to calculate averages per country
    const { data, error } = await supabase
      .from('aehi_scores')
      .select('country, total_score, l1_score, l2_score, l3_score, l4_score, l5_score');
      
    if (error) throw error;
    
    if (!data || data.length === 0) {
      return { success: true, stats: {} };
    }
    
    // Group by country and calculate averages
    const stats: Record<string, any> = {};
    
    data.forEach((row) => {
      const c = row.country;
      if (!stats[c]) {
        stats[c] = { count: 0, total_sum: 0, l1_sum: 0, l2_sum: 0, l3_sum: 0, l4_sum: 0, l5_sum: 0 };
      }
      stats[c].count += 1;
      stats[c].total_sum += row.total_score;
      stats[c].l1_sum += row.l1_score;
      stats[c].l2_sum += row.l2_score;
      stats[c].l3_sum += row.l3_score;
      stats[c].l4_sum += row.l4_score;
      stats[c].l5_sum += row.l5_score;
    });
    
    const result: Record<string, any> = {};
    
    for (const [country, agg] of Object.entries(stats)) {
      // Find the weakest layer (the constraint)
      const layers = [
        { name: 'Business Design (L1)', avg: agg.l1_sum / agg.count },
        { name: 'Operating Model (L2)', avg: agg.l2_sum / agg.count },
        { name: 'Technology (L3)', avg: agg.l3_sum / agg.count },
        { name: 'Intelligence (L4)', avg: agg.l4_sum / agg.count },
        { name: 'Governance (L5)', avg: agg.l5_sum / agg.count }
      ];
      
      // Sort ascending so the lowest score is first
      layers.sort((a, b) => a.avg - b.avg);
      
      result[country] = {
        score: (agg.total_sum / agg.count).toFixed(1),
        sample: agg.count.toLocaleString(),
        constraint: layers[0].name
      };
    }
    
    return { success: true, stats: result };
  } catch (error: any) {
    console.error('Failed to fetch AEHI stats:', error);
    return { success: false, stats: {} };
  }
}
