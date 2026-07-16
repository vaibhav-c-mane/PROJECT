import ChatPanel from '@/components/copilot/ChatPanel';
import DocumentPreview from '@/components/copilot/DocumentPreview';
import { useState } from 'react';
import type { Document } from '@/data/copilotData';

export default function CopilotPage() {
  const [activeDocument, setActiveDocument] = useState<Document | null>(null);

  return (
    <div className="flex h-full overflow-hidden">
      {/* Chat Area - Flexible width */}
      <div
        className={`flex-1 min-w-0 transition-all duration-300 ${
          activeDocument ? 'lg:pr-4' : ''
        }`}
      >
        <ChatPanel onCitationClick={setActiveDocument} />
      </div>

      {/* Document Preview Area - Fixed width when active */}
      {activeDocument && (
        <div className="w-[450px] flex-shrink-0 border-l border-slate-200 bg-slate-50 h-full animate-fade-in hidden lg:block">
          <DocumentPreview
            document={activeDocument}
            onClose={() => setActiveDocument(null)}
          />
        </div>
      )}
    </div>
  );
}
