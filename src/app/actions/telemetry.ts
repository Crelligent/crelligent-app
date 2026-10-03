'use server';

import { createClient } from '@supabase/supabase-js';
const createAdminClient = () => createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.SUPABASE_SECRET_KEY || '');

export async function getIndustryStats() {
  try {
    const supabase = createAdminClient();
    
    const { data, error } = await supabase
      .from('aehi_scores')
      .select('industry, total_score, l1_score, l2_score, l3_score, l4_score, l5_score');
      
    if (error) throw error;
    
    if (!data || data.length === 0) {
      return { success: true, stats: [] };
    }
    
    // Group by industry and calculate averages
    const stats: Record<string, any> = {};
    
    data.forEach((row) => {
      const ind = row.industry || 'Unknown';
      if (!stats[ind]) {
        stats[ind] = { count: 0, total_sum: 0, l1_sum: 0, l2_sum: 0, l3_sum: 0, l4_sum: 0, l5_sum: 0 };
      }
      stats[ind].count += 1;
      stats[ind].total_sum += row.total_score || 0;
      stats[ind].l1_sum += row.l1_score || 0;
      stats[ind].l2_sum += row.l2_score || 0;
      stats[ind].l3_sum += row.l3_score || 0;
      stats[ind].l4_sum += row.l4_score || 0;
      stats[ind].l5_sum += row.l5_score || 0;
    });
    
    const result = Object.entries(stats).map(([industry, agg]: [string, any]) => {
      const avgScore = (agg.total_sum / agg.count).toFixed(1);
      
      const layers = [
        { name: 'L1', avg: agg.l1_sum / agg.count, context: 'Business Design' },
        { name: 'L2', avg: agg.l2_sum / agg.count, context: 'Operating Model' },
        { name: 'L3', avg: agg.l3_sum / agg.count, context: 'Technology' },
        { name: 'L4', avg: agg.l4_sum / agg.count, context: 'Intelligence' },
        { name: 'L5', avg: agg.l5_sum / agg.count, context: 'Governance' }
      ];
      layers.sort((a, b) => b.avg - a.avg); // Sort descending to get strongest layers or ascending for weakest

      return {
        sector: industry,
        metrics: [
          { label: "Data Points", value: agg.count.toString(), context: "Companies analyzed" },
          { label: "Avg. Total Score", value: `${avgScore}/100`, context: "Post-installation L1-L5 health metric" },
          { label: "Strongest Layer", value: layers[0].name, context: layers[0].context }
        ]
      };
    });
    
    // Sort by number of data points or average score
    result.sort((a, b) => parseInt(b.metrics[0].value) - parseInt(a.metrics[0].value));
    
    return { success: true, stats: result };
  } catch (error: any) {
    console.error('Failed to fetch industry stats:', error);
    return { success: false, stats: [] };
  }
}
