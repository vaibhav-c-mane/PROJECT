import {
  Building2,
  Flame,
  ShieldAlert,
  Leaf,
  BadgeCheck,
  Calendar,
} from 'lucide-react';
import { mockComplianceStandards } from '@/data/complianceData';
import StatusBadge from '@/components/ui/StatusBadge';

const iconMap: Record<string, React.ReactNode> = {
  Building2: <Building2 size={20} className="text-slate-600" />,
  Flame: <Flame size={20} className="text-slate-600" />,
  ShieldAlert: <ShieldAlert size={20} className="text-slate-600" />,
  Leaf: <Leaf size={20} className="text-slate-600" />,
  BadgeCheck: <BadgeCheck size={20} className="text-slate-600" />,
};

export default function ComplianceScoreboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {mockComplianceStandards.map((std, idx) => (
        <div
          key={std.id}
          className="glass-panel hover-lift rounded-xl p-5 animate-slide-up flex flex-col"
          style={{ animationDelay: `${idx * 100}ms` }}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center shadow-sm flex-shrink-0">
              {iconMap[std.icon]}
            </div>
            <StatusBadge status={std.status} label={std.status} />
          </div>

          <div className="mb-4">
            <h3 className="text-[14px] font-semibold text-slate-900 leading-snug">
              {std.shortName}
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5 truncate" title={std.name}>
              {std.name}
            </p>
          </div>

          {/* Overall Score */}
          <div className="flex items-center justify-between mb-5">
            <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
              Overall Score
            </span>
            <div className="flex items-center gap-2">
              <span
                className={`text-xl font-bold font-mono tracking-tight ${
                  std.overallScore >= 90
                    ? 'text-emerald-600'
                    : std.overallScore >= 80
                    ? 'text-amber-600'
                    : 'text-red-600'
                }`}
              >
                {std.overallScore}%
              </span>
            </div>
          </div>

          {/* Sub-categories */}
          <div className="space-y-3 mb-5 flex-1">
            {std.categories.slice(0, 3).map((cat, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] text-slate-700 font-medium truncate pr-2">
                    {cat.name}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    {cat.score}/{cat.maxScore}
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      cat.status === 'pass'
                        ? 'bg-emerald-500'
                        : cat.status === 'warning'
                        ? 'bg-amber-500'
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${(cat.score / cat.maxScore) * 100}%` }}
                  />
                </div>
              </div>
            ))}
            {std.categories.length > 3 && (
              <p className="text-[10px] text-slate-500 italic mt-2">
                + {std.categories.length - 3} more categories
              </p>
            )}
          </div>

          {/* Footer */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-slate-500">
              <Calendar size={12} />
              <span className="text-[10px] font-medium">Due: {new Date(std.nextDueDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
            </div>
            <button className="text-[10px] font-medium text-blue-600 hover:text-blue-700 transition-colors">
              View Audit
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
