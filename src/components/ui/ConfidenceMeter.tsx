interface ConfidenceMeterProps {
  value: number; // 0 to 1
  size?: 'sm' | 'md';
  showLabel?: boolean;
}

export default function ConfidenceMeter({
  value,
  size = 'md',
  showLabel = true,
}: ConfidenceMeterProps) {
  let colorClass = 'confidence-low';
  let label = 'Low Confidence';
  let textColor = 'text-red-600';

  if (value >= 0.8) {
    colorClass = 'confidence-high';
    label = 'High Confidence';
    textColor = 'text-emerald-600';
  } else if (value >= 0.5) {
    colorClass = 'confidence-medium';
    label = 'Medium Confidence';
    textColor = 'text-amber-600';
  }

  const percentage = Math.round(value * 100);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {showLabel && (
        <div className="flex items-center justify-between">
          <span className={`text-[10px] font-semibold uppercase tracking-wide ${textColor}`}>
            {label}
          </span>
          <span className="text-[10px] font-mono font-bold text-slate-700">
            {percentage}%
          </span>
        </div>
      )}
      <div
        className={`confidence-bar ${
          size === 'sm' ? 'h-1' : 'h-1.5'
        }`}
      >
        <div
          className={`confidence-fill ${colorClass}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
