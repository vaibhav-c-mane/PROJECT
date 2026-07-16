import { Activity, Clock, ShieldAlert, Zap, TrendingDown } from 'lucide-react';
import StatusBadge from '@/components/ui/StatusBadge';
import { mockRecommendations } from '@/data/maintenanceData';
import ConfidenceMeter from '@/components/ui/ConfidenceMeter';

export default function PredictiveCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {mockRecommendations.map((rec, idx) => (
        <div
          key={rec.id}
          className="glass-panel hover-lift rounded-xl p-5 animate-slide-up relative overflow-hidden group flex flex-col bg-white"
          style={{ animationDelay: `${idx * 100}ms` }}
        >
          {/* Urgency indicator bar */}
          <div
            className={`absolute top-0 left-0 w-full h-1 ${
              rec.priority === 'Critical'
                ? 'bg-red-500'
                : rec.priority === 'High'
                ? 'bg-orange-500'
                : 'bg-blue-500'
            }`}
          />

          {/* Header */}
          <div className="flex items-start justify-between mb-4 mt-1">
            <div className="min-w-0 pr-4">
              <h4 className="text-[14px] font-semibold text-slate-900 truncate">
                {rec.equipment}
              </h4>
              <p className="text-[11px] font-mono text-slate-500 mt-1 bg-slate-100 px-1.5 py-0.5 rounded inline-block">
                {rec.assetId}
              </p>
            </div>
            <StatusBadge status={rec.priority} label={rec.priority} />
          </div>

          {/* AI Recommendation */}
          <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-3 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap size={14} className="text-indigo-600" />
              <span className="text-[11px] font-semibold text-indigo-700 uppercase tracking-wider">
                AI Recommendation
              </span>
            </div>
            <p className="text-[12px] text-slate-700 leading-relaxed font-medium">
              {rec.recommendedAction}
            </p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-y-4 gap-x-2 mb-5">
            <div>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider flex items-center gap-1.5 font-semibold">
                <Clock size={12} /> Predicted Window
              </span>
              <p className="text-[12px] font-medium text-slate-900 mt-1">
                {new Date(rec.failureWindow.start).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(rec.failureWindow.end).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </p>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider flex items-center gap-1.5 font-semibold">
                <ShieldAlert size={12} /> Confidence
              </span>
              <div className="mt-1.5">
                <ConfidenceMeter value={rec.confidenceScore} size="sm" showLabel={true} />
              </div>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider flex items-center gap-1.5 font-semibold">
                <TrendingDown size={12} /> Est. Savings
              </span>
              <p className="text-[12px] font-bold text-emerald-600 mt-1 bg-emerald-50 px-1.5 py-0.5 rounded inline-block">
                {rec.estimatedCostSaving}
              </p>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider flex items-center gap-1.5 font-semibold">
                <Activity size={12} /> Maint. Type
              </span>
              <p className="text-[12px] font-medium text-slate-700 mt-1">
                {rec.maintenanceType}
              </p>
            </div>
          </div>

          {/* Footer Action */}
          <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[10px] text-slate-500 italic max-w-[60%] truncate" title={rec.riskIfDeferred}>
              Risk: {rec.riskIfDeferred}
            </span>
            <button className="px-4 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 hover:border-slate-400 text-[11px] font-medium text-slate-700 transition-colors shadow-sm">
              Schedule Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
