import { useState } from 'react';
import DataTable, { type Column } from '@/components/ui/DataTable';
import SearchInput from '@/components/ui/SearchInput';
import TabGroup from '@/components/ui/TabGroup';
import { mockEvidencePackages } from '@/data/complianceData';
import type { EvidencePackage } from '@/data/complianceData';
import { Package, Download, FileArchive } from 'lucide-react';

const columns: Column<EvidencePackage>[] = [
  {
    key: 'packageId',
    header: 'Package ID',
    render: (row) => (
      <span className="font-mono font-medium text-slate-900">{row.packageId}</span>
    ),
  },
  {
    key: 'standard',
    header: 'Standard',
    render: (row) => (
      <span className="text-blue-600 font-medium">{row.standard}</span>
    ),
  },
  {
    key: 'auditType',
    header: 'Audit Type',
  },
  {
    key: 'status',
    header: 'Status',
  },
  {
    key: 'completionPercent',
    header: 'Completion',
    render: (row) => (
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1.5 rounded-full bg-slate-200 overflow-hidden min-w-[60px]">
          <div
            className={`h-full rounded-full ${
              row.completionPercent === 100
                ? 'bg-emerald-500'
                : 'bg-blue-500'
            }`}
            style={{ width: `${row.completionPercent}%` }}
          />
        </div>
        <span className="text-[10px] font-mono font-medium text-slate-600 w-8">
          {row.completionPercent}%
        </span>
      </div>
    ),
  },
  {
    key: 'documentsCount',
    header: 'Docs',
    render: (row) => (
      <span className="text-slate-700 font-mono font-medium">{row.documentsCount}</span>
    ),
  },
  {
    key: 'dueDate',
    header: 'Due Date',
    render: (row) => (
      <span className="text-slate-600 font-medium">
        {new Date(row.dueDate).toLocaleDateString()}
      </span>
    ),
  },
  {
    key: 'assignedTo',
    header: 'Assigned To',
  },
];

export default function EvidenceTracker() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const filteredData = mockEvidencePackages.filter((pkg) => {
    const matchesSearch =
      pkg.packageId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.standard.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.assignedTo.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;

    if (activeTab === 'active') return pkg.status === 'Draft' || pkg.status === 'In Review';
    if (activeTab === 'approved') return pkg.status === 'Approved' || pkg.status === 'Exported';
    return true;
  });

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center">
            <Package size={16} className="text-indigo-600" />
          </div>
          <div>
            <h3 className="text-[14px] font-semibold text-slate-900">Evidence Packages</h3>
            <p className="text-[11px] text-slate-500">Audit documentation and records</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <SearchInput
            placeholder="Search Package, Standard..."
            value={searchQuery}
            onChange={setSearchQuery}
            className="w-64"
          />
          <TabGroup
            tabs={[
              { id: 'all', label: 'All', count: mockEvidencePackages.length },
              { id: 'active', label: 'Active', count: mockEvidencePackages.filter(p => p.status === 'Draft' || p.status === 'In Review').length },
              { id: 'approved', label: 'Approved', count: mockEvidencePackages.filter(p => p.status === 'Approved' || p.status === 'Exported').length },
            ]}
            activeTab={activeTab}
            onChange={setActiveTab}
          />
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <button className="p-2 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 rounded-lg text-slate-600 transition-colors flex items-center gap-2 shadow-sm" title="Export Selected as ZIP">
              <FileArchive size={14} />
              <span className="text-[11px] font-medium">ZIP</span>
            </button>
            <button className="p-2 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 rounded-lg text-slate-600 transition-colors flex items-center gap-2 shadow-sm" title="Export Report as PDF">
              <Download size={14} />
              <span className="text-[11px] font-medium">PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={filteredData}
        keyExtractor={(row) => row.id}
        maxHeight="100%"
      />
    </div>
  );
}
