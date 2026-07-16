import {
  Clock,
  Wrench,
  Activity,
  ClipboardList,
  AlertTriangle,
} from 'lucide-react';
import MetricCard from '@/components/ui/MetricCard';
import { mockKPIs } from '@/data/maintenanceData';

const iconMap: Record<string, React.ReactNode> = {
  Clock: <Clock size={16} />,
  Wrench: <Wrench size={16} />,
  Activity: <Activity size={16} />,
  ClipboardList: <ClipboardList size={16} />,
  AlertTriangle: <AlertTriangle size={16} />,
};

export default function KPIRow() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
      {mockKPIs.map((kpi) => (
        <MetricCard
          key={kpi.id}
          label={kpi.label}
          value={kpi.value}
          unit={kpi.unit}
          trend={kpi.trend}
          trendValue={kpi.trendValue}
          trendIsPositive={kpi.trendIsPositive}
          icon={iconMap[kpi.icon]}
          sparkline={kpi.sparkline}
        />
      ))}
    </div>
  );
}
