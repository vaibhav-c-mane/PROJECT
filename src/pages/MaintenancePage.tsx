import KPIRow from '@/components/maintenance/KPIRow';
import RCATimeline from '@/components/maintenance/RCATimeline';
import RCAGraph from '@/components/maintenance/RCAGraph';
import PredictiveCards from '@/components/maintenance/PredictiveCards';
import WorkOrderHistory from '@/components/maintenance/WorkOrderHistory';

export default function MaintenancePage() {
  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-1">
          Maintenance Intelligence
        </h1>
        <p className="text-sm text-slate-500">
          Predictive analytics, root cause analysis, and work order management
        </p>
      </div>

      {/* KPIs */}
      <section>
        <KPIRow />
      </section>

      {/* RCA Section: Split timeline and graph */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-[500px]">
          <RCATimeline />
        </div>
        <div className="h-[500px]">
          <RCAGraph />
        </div>
      </section>

      {/* Predictive Recommendations */}
      <section>
        <div className="mb-4">
          <h2 className="text-[16px] font-semibold text-slate-900">
            AI Predictive Recommendations
          </h2>
          <p className="text-[12px] text-slate-500">
            Actionable maintenance tasks generated from real-time telemetry and historical data
          </p>
        </div>
        <PredictiveCards />
      </section>

      {/* Work Order History */}
      <section className="pt-4">
        <WorkOrderHistory />
      </section>
    </div>
  );
}
