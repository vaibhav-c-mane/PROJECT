import {
  AlertTriangle,
  Info,
  AlertCircle,
  MoreVertical,
  CheckCircle2,
} from 'lucide-react';
import { mockGapAlerts } from '@/data/complianceData';

export default function GapAlertFeed() {
  return (
    <div className="glass-panel rounded-xl flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 flex-shrink-0">
        <div>
          <h3 className="text-[14px] font-semibold text-slate-900">
            Compliance Gap Alerts
          </h3>
          <p className="text-[11px] text-slate-500">
            Real-time procedural and equipment discrepancies
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 rounded bg-red-100 text-red-700 text-[10px] font-bold border border-red-200">
            {mockGapAlerts.filter((a) => a.severity === 'critical').length} Critical
          </span>
          <span className="px-2 py-1 rounded bg-amber-100 text-amber-700 text-[10px] font-bold border border-amber-200">
            {mockGapAlerts.filter((a) => a.severity === 'warning').length} Warning
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white">
        {mockGapAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`
              relative p-4 rounded-lg border transition-all duration-200 hover-lift
              ${
                alert.severity === 'critical'
                  ? 'bg-red-50/50 border-red-200 hover:border-red-300'
                  : alert.severity === 'warning'
                  ? 'bg-amber-50/50 border-amber-200 hover:border-amber-300'
                  : 'bg-blue-50/50 border-blue-200 hover:border-blue-300'
              }
            `}
          >
            {alert.isNew && (
              <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-blue-500 translate-x-1 -translate-y-1 ring-2 ring-white shadow-sm" />
            )}

            <div className="flex items-start gap-3">
              <div
                className={`mt-0.5 flex-shrink-0 ${
                  alert.severity === 'critical'
                    ? 'text-red-500'
                    : alert.severity === 'warning'
                    ? 'text-amber-500'
                    : 'text-blue-500'
                }`}
              >
                {alert.severity === 'critical' ? (
                  <AlertCircle size={18} />
                ) : alert.severity === 'warning' ? (
                  <AlertTriangle size={18} />
                ) : (
                  <Info size={18} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-[13px] font-semibold text-slate-900 leading-snug pr-4">
                    {alert.title}
                  </h4>
                  <button className="text-slate-400 hover:text-slate-600 transition-colors flex-shrink-0">
                    <MoreVertical size={14} />
                  </button>
                </div>

                <p className="text-[11px] text-slate-600 mt-1.5 leading-relaxed">
                  {alert.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[10px] text-slate-600 font-medium shadow-sm">
                    {alert.standard} • {alert.clauseRef}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[10px] text-slate-600 font-medium shadow-sm">
                    {alert.affectedArea}
                  </span>
                  {alert.equipment && (
                    <span className="px-2 py-0.5 rounded bg-blue-50 border border-blue-200 text-[10px] font-mono font-medium text-blue-700 shadow-sm">
                      {alert.equipment}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-200/50">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-slate-500 font-mono font-medium">
                      {new Date(alert.timestamp).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                      })}
                    </span>
                    {alert.assignedTo && (
                      <span className="text-[10px] text-slate-500 font-medium flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                        {alert.assignedTo}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-1 px-2.5 py-1 rounded bg-white hover:bg-slate-50 border border-slate-200 text-[10px] font-medium text-slate-600 transition-colors shadow-sm">
                      <CheckCircle2 size={12} className="text-slate-400" />
                      Acknowledge
                    </button>
                    <button className="px-2.5 py-1 rounded bg-blue-50 hover:bg-blue-100 border border-blue-100 text-blue-700 text-[10px] font-medium transition-colors shadow-sm">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
