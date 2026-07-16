import ComplianceScoreboard from '@/components/compliance/ComplianceScoreboard';
import GapAlertFeed from '@/components/compliance/GapAlertFeed';
import EvidenceTracker from '@/components/compliance/EvidenceTracker';
import { ShieldCheck } from 'lucide-react';

export default function CompliancePage() {
  return (
    <div className="p-6 space-y-6 flex flex-col h-full overflow-hidden">
      {/* Page Header */}
      <div className="flex-shrink-0">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-1 flex items-center gap-2">
          <ShieldCheck size={28} className="text-emerald-600" />
          Compliance Intelligence Center
        </h1>
        <p className="text-sm text-slate-500 ml-9">
          Real-time audit mapping, regulatory gap alerts, and evidence management
        </p>
      </div>

      {/* Scoreboard */}
      <section className="flex-shrink-0">
        <ComplianceScoreboard />
      </section>

      {/* Split lower section */}
      <section className="flex-1 min-h-0 grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left: Evidence Tracker (Takes up more space) */}
        <div className="xl:col-span-2 flex flex-col min-h-0 glass-panel rounded-xl p-5">
          <EvidenceTracker />
        </div>

        {/* Right: Gap Alert Feed */}
        <div className="flex flex-col min-h-0">
          <GapAlertFeed />
        </div>
      </section>
    </div>
  );
}
