import { useState } from 'react';
import DataTable, { type Column } from '@/components/ui/DataTable';
import SearchInput from '@/components/ui/SearchInput';
import TabGroup from '@/components/ui/TabGroup';
import { mockWorkOrders } from '@/data/maintenanceData';
import type { WorkOrder } from '@/data/maintenanceData';
import { FileText, Download } from 'lucide-react';

const columns: Column<WorkOrder>[] = [
  {
    key: 'woNumber',
    header: 'WO Number',
    render: (row) => (
      <span className="font-mono font-medium text-blue-600">{row.woNumber}</span>
    ),
  },
  {
    key: 'equipment',
    header: 'Equipment',
    render: (row) => (
      <div>
        <div className="font-medium text-slate-900">{row.equipment}</div>
        <div className="text-[10px] text-slate-500 font-mono mt-0.5">{row.assetId}</div>
      </div>
    ),
  },
  {
    key: 'type',
    header: 'Type',
  },
  {
    key: 'status',
    header: 'Status',
  },
  {
    key: 'priority',
    header: 'Priority',
  },
  {
    key: 'createdDate',
    header: 'Created',
    render: (row) => (
      <span className="text-slate-500 font-medium">
        {new Date(row.createdDate).toLocaleDateString()}
      </span>
    ),
  },
  {
    key: 'technician',
    header: 'Assignee',
    render: (row) => (
      <span className="text-slate-700 font-medium">{row.technician}</span>
    )
  },
];

export default function WorkOrderHistory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const filteredData = mockWorkOrders.filter((wo) => {
    const matchesSearch =
      wo.woNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wo.equipment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wo.assetId.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;

    if (activeTab === 'open') return wo.status === 'Open' || wo.status === 'In Progress';
    if (activeTab === 'completed') return wo.status === 'Completed';
    return true;
  });

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center border border-blue-200">
            <FileText size={16} className="text-blue-600" />
          </div>
          <div>
            <h3 className="text-[14px] font-semibold text-slate-900">Work Order History</h3>
            <p className="text-[11px] text-slate-500">Historical maintenance records</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <SearchInput
            placeholder="Search WO#, Asset..."
            value={searchQuery}
            onChange={setSearchQuery}
            className="w-64"
          />
          <TabGroup
            tabs={[
              { id: 'all', label: 'All', count: mockWorkOrders.length },
              { id: 'open', label: 'Open', count: mockWorkOrders.filter(w => w.status === 'Open' || w.status === 'In Progress').length },
              { id: 'completed', label: 'Completed', count: mockWorkOrders.filter(w => w.status === 'Completed').length },
            ]}
            activeTab={activeTab}
            onChange={setActiveTab}
          />
          <button className="p-2 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 rounded-lg text-slate-600 transition-colors shadow-sm">
            <Download size={16} />
          </button>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={filteredData}
        keyExtractor={(row) => row.id}
        maxHeight="400px"
      />
    </div>
  );
}
