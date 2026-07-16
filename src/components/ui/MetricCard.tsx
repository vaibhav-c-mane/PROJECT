import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  trend?: string;
  trendValue?: string;
  trendIsPositive?: boolean | null;
  icon?: React.ReactNode;
  sparkline?: number[];
}

export default function MetricCard({
  label,
  value,
  unit,
  trend,
  trendValue,
  trendIsPositive,
  icon,
  sparkline,
}: MetricCardProps) {
  return (
    <div className="glass-panel hover-lift rounded-xl p-4 flex flex-col justify-between">
      <div className="flex items-start justify-between mb-3">
        <span className="text-[12px] font-semibold text-slate-600 tracking-tight">
          {label}
        </span>
        {icon && (
          <div className="text-slate-400">
            {icon}
          </div>
        )}
      </div>

      <div className="flex items-end justify-between">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold font-mono tracking-tighter text-slate-900">
              {value}
            </span>
            {unit && (
              <span className="text-[12px] font-semibold text-slate-500">
                {unit}
              </span>
            )}
          </div>

          {(trend || trendValue) && (
            <div className="flex items-center gap-1.5 mt-1">
              {trendIsPositive === true && (
                <TrendingUp size={12} className="text-emerald-600" />
              )}
              {trendIsPositive === false && (
                <TrendingDown size={12} className="text-red-600" />
              )}
              {trendIsPositive === null && (
                <Minus size={12} className="text-slate-400" />
              )}
              <span
                className={`text-[11px] font-medium ${
                  trendIsPositive === true
                    ? 'text-emerald-700'
                    : trendIsPositive === false
                    ? 'text-red-700'
                    : 'text-slate-500'
                }`}
              >
                {trendValue} {trend}
              </span>
            </div>
          )}
        </div>

        {sparkline && sparkline.length > 0 && (
          <div className="sparkline-container w-16 opacity-70">
            {sparkline.map((val, idx) => {
              const max = Math.max(...sparkline);
              const height = max > 0 ? (val / max) * 100 : 0;
              return (
                <div
                  key={idx}
                  className="sparkline-bar"
                  style={{ height: `${height}%` }}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
