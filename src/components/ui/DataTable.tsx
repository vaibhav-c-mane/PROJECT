import { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import StatusBadge from './StatusBadge';

export interface Column<T> {
  key: Extract<keyof T, string>;
  header: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (row: T) => string | number;
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
  maxHeight?: string;
  statusField?: string;
}

export default function DataTable<T extends any>({
  columns,
  data,
  keyExtractor,
  onRowClick,
  emptyMessage = 'No data available',
  maxHeight = '500px',
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const handleSort = (key: string) => {
    if (sortKey === key) {
      if (sortDir === 'asc') setSortDir('desc');
      else {
        setSortKey(null);
        setSortDir('asc');
      }
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const sortedData = useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const aVal = (a as any)[sortKey];
      const bVal = (b as any)[sortKey];
      if (aVal == null || bVal == null) return 0;
      const cmp = String(aVal).localeCompare(String(bVal), undefined, { numeric: true });
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [data, sortKey, sortDir]);

  return (
    <div
      className="glass-panel rounded-xl overflow-auto w-full"
      style={{ maxHeight }}
    >
      <table className="w-full text-left border-collapse min-w-max">
        <thead className="sticky top-0 z-10 bg-slate-50/95 backdrop-blur shadow-[0_1px_0_0_#e2e8f0]">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={`
                  p-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider
                  ${col.sortable ? 'cursor-pointer hover:bg-slate-100 transition-colors' : ''}
                `}
                onClick={() => col.sortable && handleSort(col.key)}
              >
                <div className="flex items-center gap-1">
                  {col.header}
                  {col.sortable && (
                    <span className="text-slate-400">
                      {sortKey === col.key ? (
                        sortDir === 'asc' ? (
                          <ChevronUp size={12} />
                        ) : (
                          <ChevronDown size={12} />
                        )
                      ) : (
                        <ChevronsUpDown size={12} className="opacity-50" />
                      )}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {sortedData.length > 0 ? (
            sortedData.map((row) => (
              <tr
                key={keyExtractor(row)}
                onClick={() => onRowClick?.(row)}
                className={`
                  group transition-colors
                  ${onRowClick ? 'cursor-pointer hover:bg-slate-50' : 'hover:bg-slate-50/50'}
                `}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="p-3 text-[13px] text-slate-700 whitespace-nowrap"
                  >
                    {col.render
                      ? col.render(row)
                      : col.key === 'status' ||
                        col.key === 'priority'
                      ? (() => {
                          const val = (row as any)[col.key];
                          return typeof val === 'string' ? (
                            <StatusBadge status={val} label={val} />
                          ) : (
                            String(val ?? '')
                          );
                        })()
                      : String((row as any)[col.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="p-8 text-center text-[13px] text-slate-500 italic bg-slate-50/50"
              >
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
