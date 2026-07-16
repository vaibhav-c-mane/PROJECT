import { Network } from 'lucide-react';
import { mockRCANodes } from '@/data/maintenanceData';

export default function RCAGraph() {
  // SVG drawing configuration
  const width = 800;
  const height = 450;

  // Generate edges based on children
  const edges = mockRCANodes.flatMap((node) => {
    if (!node.children) return [];
    return node.children.map((childId) => {
      const child = mockRCANodes.find((n) => n.id === childId);
      if (!child) return null;
      return {
        id: `${node.id}-${child.id}`,
        source: node,
        target: child,
      };
    }).filter(Boolean);
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return '#ef4444'; // red-500
      case 'high': return '#f59e0b'; // amber-500
      case 'medium': return '#3b82f6'; // blue-500
      default: return '#94a3b8'; // slate-400
    }
  };

  const getSeverityBgColor = (severity: string) => {
    switch (severity) {
      case 'critical': return '#fef2f2'; // red-50
      case 'high': return '#fffbeb'; // amber-50
      case 'medium': return '#eff6ff'; // blue-50
      default: return '#f8fafc'; // slate-50
    }
  };

  return (
    <div className="glass-panel rounded-xl p-5 overflow-hidden flex flex-col h-full">
      <div className="flex items-center gap-3 mb-5 flex-shrink-0">
        <div className="w-8 h-8 rounded-lg bg-indigo-100 border border-indigo-200 flex items-center justify-center">
          <Network size={16} className="text-indigo-600" />
        </div>
        <div>
          <h3 className="text-[14px] font-semibold text-slate-900">
            Failure Pathway Graph
          </h3>
          <p className="text-[11px] text-slate-500">
            Causal chain visualization
          </p>
        </div>
      </div>

      <div className="flex-1 relative overflow-auto rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-center">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full min-w-[600px] min-h-[300px]"
          style={{ cursor: 'grab' }}
        >
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="35"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="#cbd5e1" />
            </marker>
          </defs>

          {/* Edges */}
          {edges.map((edge) => {
            if (!edge) return null;
            return (
              <line
                key={edge.id}
                x1={edge.source.x}
                y1={edge.source.y}
                x2={edge.target.x}
                y2={edge.target.y}
                stroke="#cbd5e1"
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
              />
            );
          })}

          {/* Nodes */}
          {mockRCANodes.map((node) => {
            const borderColor = getSeverityColor(node.severity);
            const bgColor = getSeverityBgColor(node.severity);
            const isRootCause = node.type === 'root_cause';
            return (
              <g
                key={node.id}
                transform={`translate(${node.x},${node.y})`}
                className="rca-node cursor-pointer"
              >
                {/* Node Background */}
                <rect
                  x="-75"
                  y="-25"
                  width="150"
                  height="50"
                  rx="6"
                  fill={bgColor}
                  stroke={borderColor}
                  strokeWidth={isRootCause ? "3" : "1"}
                  className="shadow-sm"
                  style={{ filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.05))' }}
                />
                
                {/* Status Indicator */}
                <circle cx="-60" cy="0" r="4" fill={borderColor} />
                
                {/* Node Label */}
                <text
                  x="-45"
                  y="-2"
                  fill="#0f172a"
                  fontSize="11"
                  fontWeight="600"
                  fontFamily="Inter, sans-serif"
                >
                  {node.label.length > 20 ? node.label.substring(0, 20) + '...' : node.label}
                </text>
                
                {/* Node Type */}
                <text
                  x="-45"
                  y="12"
                  fill="#64748b"
                  fontSize="9"
                  fontFamily="Inter, sans-serif"
                  className="uppercase tracking-wide"
                >
                  {node.type.replace('_', ' ')}
                </text>

                {isRootCause && (
                  <rect
                    x="55"
                    y="-35"
                    width="24"
                    height="14"
                    rx="2"
                    fill="#ef4444"
                  />
                )}
                {isRootCause && (
                  <text
                    x="58"
                    y="-25"
                    fill="white"
                    fontSize="8"
                    fontWeight="bold"
                  >
                    RC
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
