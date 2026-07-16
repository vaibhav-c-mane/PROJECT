import { type ReactNode } from 'react';
import { Bell, Search, Maximize2 } from 'lucide-react';
import Sidebar from './Sidebar';

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex h-dvh w-full overflow-hidden bg-slate-50 text-slate-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Top Bar */}
        <header className="h-14 flex items-center justify-between px-6 border-b border-slate-200 bg-white flex-shrink-0">
          {/* Left: Breadcrumb / Module Title */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-sm">
              <span className="text-slate-500">IntelliPlant</span>
              <span className="text-slate-400">/</span>
              <span className="text-slate-900 font-medium">Dashboard</span>
            </div>
          </div>

          {/* Center: Search */}
          <div className="hidden md:flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 w-80 hover:border-slate-300 focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-400 transition-all group">
            <Search size={15} className="text-slate-400 group-focus-within:text-blue-500" />
            <input
              type="text"
              placeholder="Search documents, assets, work orders..."
              className="bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none w-full"
            />
            <kbd className="hidden lg:inline-flex text-[10px] font-mono text-slate-400 bg-white border border-slate-200 px-1.5 py-0.5 rounded shadow-sm">
              ⌘K
            </kbd>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            {/* Live Status */}
            <div className="hidden sm:flex items-center gap-2 mr-3 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-[11px] font-semibold text-emerald-700">
                Systems Nominal
              </span>
            </div>

            <button className="relative p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors">
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 border-2 border-white" />
            </button>

            <button className="p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors">
              <Maximize2 size={16} />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-slate-50/50">
          {children}
        </main>
      </div>
    </div>
  );
}
