interface StatusBadgeProps {
  status: string;
  label?: string;
  size?: 'sm' | 'md';
}

const statusConfig: Record<string, { bg: string; text: string; dot: string; border: string }> = {
  // Severities
  critical: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500', border: 'border-red-200' },
  high: { bg: 'bg-orange-50', text: 'text-orange-700', dot: 'bg-orange-500', border: 'border-orange-200' },
  medium: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500', border: 'border-amber-200' },
  low: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500', border: 'border-blue-200' },
  warning: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500', border: 'border-amber-200' },

  // States
  open: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500', border: 'border-blue-200' },
  'in progress': { bg: 'bg-purple-50', text: 'text-purple-700', dot: 'bg-purple-500', border: 'border-purple-200' },
  completed: { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500', border: 'border-emerald-200' },
  draft: { bg: 'bg-slate-100', text: 'text-slate-700', dot: 'bg-slate-500', border: 'border-slate-300' },
  'in review': { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500', border: 'border-amber-200' },
  approved: { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500', border: 'border-emerald-200' },
  exported: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500', border: 'border-blue-200' },
};

export default function StatusBadge({
  status,
  label,
  size = 'sm',
}: StatusBadgeProps) {
  const config =
    statusConfig[status.toLowerCase()] ||
    statusConfig['info'] ||
    statusConfig['draft'];

  const isSmall = size === 'sm';

  return (
    <div
      className={`
        inline-flex items-center gap-1.5 rounded-full border
        ${config.bg} ${config.text} ${config.border}
        ${isSmall ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-[11px]'}
        font-medium whitespace-nowrap
      `}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      <span className="uppercase tracking-wide">
        {label || status}
      </span>
    </div>
  );
}
