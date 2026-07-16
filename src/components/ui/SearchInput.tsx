import { Search } from 'lucide-react';

interface SearchInputProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function SearchInput({
  placeholder = 'Search...',
  value,
  onChange,
  className = '',
}: SearchInputProps) {
  return (
    <div
      className={`relative flex items-center bg-white border border-slate-300 rounded-lg overflow-hidden focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-400 transition-all ${className}`}
    >
      <div className="pl-3 text-slate-400">
        <Search size={16} />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border-none py-1.5 pl-2 pr-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none"
      />
    </div>
  );
}
