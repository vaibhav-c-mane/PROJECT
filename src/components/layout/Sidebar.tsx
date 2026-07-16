import { useState } from 'react';
import { NavLink, useLocation } from 'react-router';
import {
  BrainCircuit,
  Wrench,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Settings,
  HelpCircle,
  Activity,
} from 'lucide-react';

interface NavItem {
  to: string;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    to: '/copilot',
    label: 'Knowledge Copilot',
    sublabel: 'AI Assistant',
    icon: <BrainCircuit size={20} />,
  },
  {
    to: '/maintenance',
    label: 'Maintenance & RCA',
    sublabel: 'Analytics & Planning',
    icon: <Wrench size={20} />,
  },
  {
    to: '/compliance',
    label: 'Compliance Center',
    sublabel: 'Audits & Safety',
    icon: <ShieldCheck size={20} />,
  },
];

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const location = useLocation();

  return (
    <aside
      className={`
        flex flex-col h-full bg-white border-r border-slate-200
        transition-all duration-300 ease-in-out flex-shrink-0 relative
        ${isExpanded ? 'w-[260px]' : 'w-[72px]'}
      `}
    >
      {/* Logo Area */}
      <div className="flex items-center gap-3 px-4 h-14 border-b border-slate-200 flex-shrink-0 bg-white">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0 shadow-sm shadow-blue-500/20">
          <Activity size={18} className="text-white" />
        </div>
        {isExpanded && (
          <div className="animate-fade-in overflow-hidden">
            <h1 className="text-sm font-bold text-slate-900 tracking-tight leading-none">
              IntelliPlant
            </h1>
            <p className="text-[10px] text-slate-500 font-medium tracking-widest uppercase mt-0.5">
              Enterprise AI
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 space-y-1.5 overflow-y-auto">
        <p
          className={`
            text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3
            ${isExpanded ? 'px-3' : 'text-center'}
          `}
        >
          {isExpanded ? 'Dashboards' : '•••'}
        </p>

        {navItems.map((item) => {
          const isActive =
            location.pathname === item.to ||
            location.pathname.startsWith(item.to + '/');
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`
                group relative flex items-center gap-3 rounded-lg transition-all duration-200
                ${isExpanded ? 'px-3 py-2.5' : 'px-0 py-2.5 justify-center'}
                ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }
              `}
            >
              {isActive && <span className="nav-active-indicator" />}
              <span
                className={`flex-shrink-0 transition-colors ${
                  isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'
                }`}
              >
                {item.icon}
              </span>
              {isExpanded && (
                <div className="animate-fade-in min-w-0">
                  <p className={`text-[13px] font-semibold truncate leading-tight ${isActive ? 'text-blue-800' : 'text-slate-700'}`}>
                    {item.label}
                  </p>
                  <p
                    className={`text-[11px] truncate mt-0.5 ${
                      isActive ? 'text-blue-600/70' : 'text-slate-500'
                    }`}
                  >
                    {item.sublabel}
                  </p>
                </div>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-slate-200 p-3 space-y-1 flex-shrink-0 bg-slate-50/50">
        <button
          className={`
            flex items-center gap-3 w-full rounded-lg text-slate-600 hover:text-slate-900
            hover:bg-slate-100 transition-all duration-200
            ${isExpanded ? 'px-3 py-2' : 'justify-center py-2'}
          `}
        >
          <Settings size={18} />
          {isExpanded && <span className="text-[13px] font-medium">Settings</span>}
        </button>
        <button
          className={`
            flex items-center gap-3 w-full rounded-lg text-slate-600 hover:text-slate-900
            hover:bg-slate-100 transition-all duration-200
            ${isExpanded ? 'px-3 py-2' : 'justify-center py-2'}
          `}
        >
          <HelpCircle size={18} />
          {isExpanded && <span className="text-[13px] font-medium">Help & Support</span>}
        </button>

        {/* User */}
        <div
          className={`
            flex items-center gap-3 rounded-lg bg-white border border-slate-200 shadow-sm mt-3
            ${isExpanded ? 'px-3 py-2.5' : 'justify-center py-2.5'}
          `}
        >
          <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0 text-[11px] font-bold text-white shadow-sm">
            RP
          </div>
          {isExpanded && (
            <div className="animate-fade-in min-w-0">
              <p className="text-[13px] font-bold text-slate-900 truncate leading-none">
                Rajesh Patel
              </p>
              <p className="text-[11px] text-slate-500 truncate mt-1">
                Reliability Engineer
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -right-3.5 top-16 w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all duration-200 z-10 shadow-sm"
        aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
      >
        {isExpanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>
    </aside>
  );
}
