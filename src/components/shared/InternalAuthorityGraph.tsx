import Link from 'next/link';
import { ArrowRight, FileText, LayoutTemplate, Activity, BookOpen } from 'lucide-react';

interface InternalAuthorityGraphProps {
  relatedCapabilities?: { name: string; slug: string }[];
  relatedTemplates?: { name: string; slug: string }[];
  relatedDiagnostics?: { name: string; slug: string }[];
  relatedInsights?: { name: string; slug: string }[];
}

export function InternalAuthorityGraph({ 
  relatedCapabilities = [], 
  relatedTemplates = [], 
  relatedDiagnostics = [], 
  relatedInsights = [] 
}: InternalAuthorityGraphProps) {
  
  const hasContent = relatedCapabilities.length > 0 || relatedTemplates.length > 0 || relatedDiagnostics.length > 0 || relatedInsights.length > 0;
  
  if (!hasContent) return null;

  return (
    <div className="border-t border-white/10 pt-16 mt-16">
      <h3 className="text-2xl font-light text-white mb-8">Explore Related Systems IP</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Capabilities */}
        {relatedCapabilities.length > 0 && (
          <div>
            <h4 className="text-[#22c55e] text-sm font-mono tracking-widest uppercase mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4" /> Capabilities
            </h4>
            <ul className="space-y-3">
              {relatedCapabilities.map(item => (
                <li key={item.slug}>
                  <Link href={`/capabilities/${item.slug}`} className="text-gray-400 hover:text-white transition text-sm flex items-center gap-1 group">
                    {item.name} <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Templates */}
        {relatedTemplates.length > 0 && (
          <div>
            <h4 className="text-blue-400 text-sm font-mono tracking-widest uppercase mb-4 flex items-center gap-2">
              <LayoutTemplate className="w-4 h-4" /> Templates
            </h4>
            <ul className="space-y-3">
              {relatedTemplates.map(item => (
                <li key={item.slug}>
                  <Link href={`/templates/${item.slug}`} className="text-gray-400 hover:text-white transition text-sm flex items-center gap-1 group">
                    {item.name} <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Diagnostics */}
        {relatedDiagnostics.length > 0 && (
          <div>
            <h4 className="text-red-400 text-sm font-mono tracking-widest uppercase mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4" /> Diagnostics
            </h4>
            <ul className="space-y-3">
              {relatedDiagnostics.map(item => (
                <li key={item.slug}>
                  <Link href={`/tools/${item.slug}`} className="text-gray-400 hover:text-white transition text-sm flex items-center gap-1 group">
                    {item.name} <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Insights */}
        {relatedInsights.length > 0 && (
          <div>
            <h4 className="text-yellow-400 text-sm font-mono tracking-widest uppercase mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> Insights
            </h4>
            <ul className="space-y-3">
              {relatedInsights.map(item => (
                <li key={item.slug}>
                  <Link href={`/insights/${item.slug}`} className="text-gray-400 hover:text-white transition text-sm flex items-center gap-1 group">
                    {item.name} <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>
    </div>
  );
}
