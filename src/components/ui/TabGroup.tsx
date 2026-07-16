interface Tab {
  id: string;
  label: string;
  count?: number;
}

interface TabGroupProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
}

export default function TabGroup({ tabs, activeTab, onChange }: TabGroupProps) {
  return (
    <div className="flex items-center gap-1 bg-slate-100/80 border border-slate-200 p-1 rounded-lg">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`
              relative flex items-center gap-2 px-3 py-1.5 rounded-md text-[12px] font-medium transition-all duration-200 outline-none
              ${
                isActive
                  ? 'bg-white text-blue-700 shadow-sm border border-slate-200/50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }
            `}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={`
                  px-1.5 py-0.5 rounded-full text-[10px] font-mono leading-none
                  ${
                    isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-slate-200 text-slate-500'
                  }
                `}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
