import { useState } from 'react';
import {
  AlertTriangle,
  Search as SearchIcon,
  Zap,
  Eye,
  Wrench as WrenchIcon,
  AlertCircle,
} from 'lucide-react';
import StatusBadge from '@/components/ui/StatusBadge';
import { mockRCAEvents } from '@/data/maintenanceData';
import type { RCAEvent } from '@/data/maintenanceData';

const typeIcons: Record<string, React.ReactNode> = {
  failure: <Zap size={14} className="text-red-500" />,
  alarm: <AlertTriangle size={14} className="text-amber-500" />,
  inspection: <SearchIcon size={14} className="text-blue-500" />,
  maintenance: <WrenchIcon size={14} className="text-emerald-500" />,
  observation: <Eye size={14} className="text-purple-500" />,
};

const typeColors: Record<string, string> = {
  failure: 'border-red-200 bg-red-50',
  alarm: 'border-amber-200 bg-amber-50',
  inspection: 'border-blue-200 bg-blue-50',
  maintenance: 'border-emerald-200 bg-emerald-50',
  observation: 'border-purple-200 bg-purple-50',
};

export default function RCATimeline() {
  const [selectedEvent, setSelectedEvent] = useState<RCAEvent | null>(null);

  // Sort events by timestamp
  const sortedEvents = [...mockRCAEvents].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  return (
    <div className="glass-panel rounded-xl p-5 h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-orange-100 border border-orange-200 flex items-center justify-center">
            <AlertCircle size={16} className="text-orange-600" />
          </div>
          <div>
            <h3 className="text-[14px] font-semibold text-slate-900">
              Root Cause Analysis Timeline
            </h3>
            <p className="text-[11px] text-slate-500">
              Compressor K-301 Trip Event — June 10-12, 2025
            </p>
          </div>
        </div>
        <StatusBadge status="resolved" label="Resolved" size="md" />
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-[19px] top-4 bottom-4 w-px bg-slate-200" />

        <div className="space-y-4">
          {sortedEvents.map((event, idx) => {
            const isSelected = selectedEvent?.id === event.id;
            return (
              <div
                key={event.id}
                className={`
                  relative flex gap-4 pl-2 cursor-pointer transition-all duration-200 animate-slide-up
                `}
                style={{ animationDelay: `${idx * 80}ms` }}
                onClick={() =>
                  setSelectedEvent(isSelected ? null : event)
                }
              >
                {/* Node */}
                <div
                  className={`
                    relative z-10 w-[34px] h-[34px] rounded-full flex items-center justify-center flex-shrink-0
                    border-2 transition-all duration-200
                    ${typeColors[event.type]}
                    ${isSelected ? 'scale-110 shadow-sm' : ''}
                    ${event.isRootCause ? 'ring-2 ring-red-500 ring-offset-2' : ''}
                  `}
                >
                  {typeIcons[event.type]}
                  {event.isRootCause && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 flex items-center justify-center border border-white">
                      <span className="text-[7px] font-bold text-white">RC</span>
                    </span>
                  )}
                </div>

                {/* Content */}
                <div
                  className={`
                    flex-1 p-3 rounded-lg border transition-all duration-200
                    ${
                      isSelected
                        ? 'bg-blue-50 border-blue-200 shadow-sm'
                        : 'bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                    }
                  `}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className={`text-[13px] font-semibold ${isSelected ? 'text-blue-900' : 'text-slate-900'}`}>
                          {event.title}
                        </h4>
                        <StatusBadge
                          status={event.severity}
                          label={event.severity}
                        />
                        {event.isRootCause && (
                          <span className="text-[9px] font-bold text-red-700 bg-red-100 border border-red-200 px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                            Root Cause
                          </span>
                        )}
                      </div>
                      <p className="text-[12px] text-slate-600 mt-1.5 leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                    <div className="flex flex-col items-end flex-shrink-0">
                      <span className="text-[10px] font-mono text-slate-500 font-medium">
                        {new Date(event.timestamp).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                        })}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {new Date(event.timestamp).toLocaleTimeString('en-IN', {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: false,
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isSelected && (
                    <div className="mt-3 pt-3 border-t border-blue-200/50 animate-fade-in">
                      <div className="grid grid-cols-2 gap-3 bg-white p-3 rounded border border-blue-100">
                        <div>
                          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                            Equipment
                          </span>
                          <p className="text-[11px] text-slate-800 font-medium mt-0.5">
                            {event.equipment}
                          </p>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                            Asset ID
                          </span>
                          <p className="text-[11px] text-blue-700 font-mono mt-0.5 bg-blue-50 px-1 py-0.5 rounded inline-block">
                            {event.assetId}
                          </p>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                            Event Type
                          </span>
                          <p className="text-[11px] text-slate-800 font-medium mt-0.5 capitalize">
                            {event.type}
                          </p>
                        </div>
                        {event.linkedEvents && (
                          <div>
                            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                              Linked Events
                            </span>
                            <p className="text-[11px] text-slate-600 font-mono mt-0.5">
                              {event.linkedEvents.length} connected
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
