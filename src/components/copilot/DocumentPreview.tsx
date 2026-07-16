import {
  X,
  FileText,
  Download,
  ExternalLink,
  ShieldCheck,
  Tag,
} from 'lucide-react';
import ConfidenceMeter from '@/components/ui/ConfidenceMeter';
import { mockDocuments } from '@/data/copilotData';

interface DocumentPreviewProps {
  document: typeof mockDocuments[0];
  onClose: () => void;
}

export default function DocumentPreview({ document, onClose }: DocumentPreviewProps) {
  return (
    <div className="flex flex-col h-full bg-white border-l border-slate-200 shadow-xl lg:shadow-none relative">
      {/* Header */}
      <div className="flex items-start justify-between p-4 border-b border-slate-200 bg-slate-50 flex-shrink-0">
        <div className="flex items-start gap-3 min-w-0 pr-4">
          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0 border border-blue-200 text-blue-600">
            <FileText size={20} />
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-slate-900 truncate leading-tight">
              {document.title}
            </h3>
            <p className="text-[11px] text-slate-500 mt-1 uppercase tracking-wider">
              {document.type} • ID: {document.id}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-md hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {/* Meta Info */}
      <div className="p-4 border-b border-slate-200 bg-white grid grid-cols-2 gap-4 flex-shrink-0">
        <div>
          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
            Last Updated
          </span>
          <p className="text-[12px] font-medium text-slate-700 mt-1">
            {new Date(document.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </p>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
            Author / Source
          </span>
          <p className="text-[12px] font-medium text-slate-700 mt-1 truncate">
            {document.author}
          </p>
        </div>
      </div>

      {/* Department/Tags (Using department as a tag) */}
      {document.department && (
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-wrap gap-2">
          <span
            className="inline-flex items-center gap-1 px-2 py-1 rounded bg-white border border-slate-200 text-[10px] text-slate-600 font-medium"
          >
            <Tag size={10} className="text-slate-400" />
            {document.department}
          </span>
        </div>
      )}

      {/* Content Preview */}
      <div className="flex-1 overflow-y-auto p-4 bg-slate-100">
        <div className="mb-4 flex items-center justify-between">
          <h4 className="text-[12px] font-semibold text-slate-700 uppercase tracking-wider">
            Extracted Context
          </h4>
          <span className="text-[11px] font-mono text-slate-500">
            Page {document.pages ? `3 of ${document.pages}` : '3'}
          </span>
        </div>

        {/* Highlighted extraction block */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-5 relative">
          <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 rounded-l-lg" />
          
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck size={14} className="text-blue-500" />
            <span className="text-[11px] font-semibold text-blue-700">
              High Confidence Match
            </span>
          </div>

          <p className="text-[13px] leading-relaxed text-slate-700 font-serif">
            ...The <mark className="bg-blue-100 text-blue-900 px-1 rounded font-sans font-medium">clearance for the turbine blades</mark> must be measured at the cold state before alignment. Values exceeding <mark className="bg-amber-100 text-amber-900 px-1 rounded font-sans font-medium border border-amber-200">0.015 inches</mark> require immediate recalibration of the rotor assembly...
          </p>
          
          <div className="mt-4 pt-3 border-t border-slate-100">
            <ConfidenceMeter value={0.94} size="sm" />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-slate-200 bg-white flex gap-3 flex-shrink-0">
        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[13px] font-medium transition-colors shadow-sm">
          <ExternalLink size={16} />
          Open Full Document
        </button>
        <button className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
          <Download size={18} />
        </button>
      </div>
    </div>
  );
}
