import { Routes, Route, Navigate } from 'react-router';
import AppShell from '@/components/layout/AppShell';
import CopilotPage from '@/pages/CopilotPage';
import MaintenancePage from '@/pages/MaintenancePage';
import CompliancePage from '@/pages/CompliancePage';

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Navigate to="/copilot" replace />} />
        <Route path="/copilot" element={<CopilotPage />} />
        <Route path="/maintenance" element={<MaintenancePage />} />
        <Route path="/compliance" element={<CompliancePage />} />
        <Route path="*" element={<Navigate to="/copilot" replace />} />
      </Routes>
    </AppShell>
  );
}
