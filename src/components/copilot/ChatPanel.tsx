import { useState, useRef, useEffect } from 'react';
import { Send, FileText, CheckCircle2 } from 'lucide-react';
import { mockConversation, mockDocuments } from '@/data/copilotData';
import type { Citation, Document } from '@/data/copilotData';
import ConfidenceMeter from '@/components/ui/ConfidenceMeter';

interface ChatPanelProps {
  onCitationClick: (doc: Document) => void;
}

export default function ChatPanel({ onCitationClick }: ChatPanelProps) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [mockConversation]);

  const handleCitationClick = (citation: Citation) => {
    const doc = mockDocuments.find((d) => d.id === citation.documentId);
    if (doc) onCitationClick(doc);
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {mockConversation.map((msg, idx) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.role === 'user' ? 'items-end' : 'items-start'
            } animate-slide-up`}
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            {/* Message Bubble */}
            <div
              className={`
                max-w-[85%] md:max-w-[75%] rounded-2xl p-4
                ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white rounded-br-sm shadow-sm'
                    : 'bg-slate-100 text-slate-800 rounded-bl-sm border border-slate-200 shadow-sm'
                }
              `}
            >
              <p className="text-[14px] leading-relaxed">{msg.content}</p>

              {/* Citations block for AI responses */}
              {msg.role === 'ai' && msg.citations && msg.citations.length > 0 && (
                <div className="mt-4 pt-3 border-t border-slate-200/50 space-y-2">
                  <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Sources Used
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {msg.citations.map((cit, i) => (
                      <button
                        key={i}
                        onClick={() => handleCitationClick(cit)}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-colors group"
                      >
                        <FileText size={12} className="text-slate-400 group-hover:text-blue-500" />
                        <span className="text-[11px] font-medium text-slate-700 group-hover:text-blue-700">
                          {cit.sourceTitle}
                        </span>
                        <span className="text-[10px] text-slate-400 ml-1">
                          [{i + 1}]
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* AI Action/Thinking Status */}
            {msg.role === 'ai' && idx === mockConversation.length - 1 && (
              <div className="mt-2 flex items-center gap-2 px-1 text-slate-500">
                <CheckCircle2 size={12} className="text-emerald-500" />
                <span className="text-[10px] font-medium">
                  Verified against 4 proprietary documents
                </span>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-slate-200 bg-slate-50/50">
        <div className="max-w-4xl mx-auto relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about procedures, maintenance history, or safety protocols..."
            className="w-full bg-white border border-slate-300 rounded-xl pl-4 pr-12 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none overflow-hidden shadow-sm transition-shadow"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                // Handle send
                setInput('');
              }
            }}
          />
          <button
            className={`absolute right-2.5 bottom-2.5 p-2 rounded-lg transition-colors ${
              input.trim().length > 0
                ? 'bg-blue-600 text-white shadow-sm hover:bg-blue-700'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Send size={16} />
          </button>
        </div>
        <p className="text-center text-[10px] text-slate-400 mt-2">
          IntelliPlant Copilot can make mistakes. Verify critical industrial values.
        </p>
      </div>
    </div>
  );
}
