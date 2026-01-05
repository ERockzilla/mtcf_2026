"use client";
import React, { useCallback } from 'react';
import ReactFlow, {
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    Connection,
    Edge,
} from 'reactflow';
import 'reactflow/dist/style.css';

// More complex Governance Pipeline with Database & Datacenter symbols
const initialNodes: any[] = [
    // Source Layer
    { id: 'repo', position: { x: 50, y: 50 }, data: { label: '📁 Code Repository' }, style: { border: '2px solid #94a3b8', borderRadius: '8px', padding: 12, background: '#0f172a', color: '#f8fafc', width: 160, textAlign: 'center', fontSize: '12px' } },
    { id: 'data-lake', position: { x: 250, y: 50 }, data: { label: '🗄️ Data Lake' }, style: { border: '2px solid #3b82f6', borderRadius: '8px', padding: 12, background: '#0f172a', color: '#3b82f6', width: 140, textAlign: 'center', fontSize: '12px' } },
    { id: 'api', position: { x: 430, y: 50 }, data: { label: '🌐 External API' }, style: { border: '2px solid #8b5cf6', borderRadius: '8px', padding: 12, background: '#0f172a', color: '#8b5cf6', width: 140, textAlign: 'center', fontSize: '12px' } },

    // Processing Layer
    { id: 'ingest', position: { x: 150, y: 150 }, data: { label: '⚡ Ingest Pipeline' }, style: { border: '2px solid #06b6d4', borderRadius: '12px', padding: 14, background: 'linear-gradient(135deg, #0f172a 0%, #164e63 100%)', color: '#06b6d4', width: 180, textAlign: 'center', fontSize: '13px', fontWeight: 'bold' } },
    { id: 'transform', position: { x: 380, y: 150 }, data: { label: '🔄 Transform' }, style: { border: '2px solid #22c55e', borderRadius: '12px', padding: 14, background: '#0f172a', color: '#22c55e', width: 140, textAlign: 'center', fontSize: '13px' } },

    // AI Oracle (Central - will glow red on alert)
    { id: 'oracle', position: { x: 220, y: 260 }, data: { label: '🧠 AI Compliance Oracle' }, style: { border: '3px solid #ec4899', borderRadius: '16px', padding: 16, background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)', color: '#ec4899', width: 200, textAlign: 'center', fontSize: '14px', fontWeight: 'bold', boxShadow: '0 0 15px rgba(236,72,153,0.3)' } },

    // Analysis Nodes (replacing HIPAA/510k with generic terms)
    { id: 'audit-log', position: { x: 50, y: 280 }, data: { label: '📋 Audit Log' }, style: { border: '1px dashed #64748b', borderRadius: '6px', fontSize: '10px', padding: 8, background: '#020617', color: '#94a3b8', width: 100, textAlign: 'center' } },
    { id: 'policy-engine', position: { x: 480, y: 280 }, data: { label: '⚙️ Policy Engine' }, style: { border: '1px dashed #64748b', borderRadius: '6px', fontSize: '10px', padding: 8, background: '#020617', color: '#94a3b8', width: 110, textAlign: 'center' } },

    // Output Layer
    { id: 'database', position: { x: 100, y: 380 }, data: { label: '🗃️ Secure Database' }, style: { border: '2px solid #f59e0b', borderRadius: '8px', padding: 12, background: '#0f172a', color: '#f59e0b', width: 150, textAlign: 'center', fontSize: '12px' } },
    { id: 'datacenter', position: { x: 300, y: 380 }, data: { label: '🏢 Datacenter Deploy' }, style: { border: '2px solid #10b981', borderRadius: '8px', padding: 12, background: '#0f172a', color: '#10b981', width: 160, textAlign: 'center', fontSize: '12px', fontWeight: 'bold' } },
    { id: 'cdn', position: { x: 490, y: 380 }, data: { label: '☁️ CDN Edge' }, style: { border: '2px solid #06b6d4', borderRadius: '8px', padding: 12, background: '#0f172a', color: '#06b6d4', width: 120, textAlign: 'center', fontSize: '12px' } },
];

const initialEdges = [
    // Source to Ingest
    { id: 'e-repo-ingest', source: 'repo', target: 'ingest', animated: true, style: { stroke: '#94a3b8', strokeWidth: 2 } },
    { id: 'e-datalake-ingest', source: 'data-lake', target: 'ingest', animated: true, style: { stroke: '#3b82f6', strokeWidth: 2 } },
    { id: 'e-api-transform', source: 'api', target: 'transform', animated: true, style: { stroke: '#8b5cf6', strokeWidth: 2 } },

    // Ingest to Oracle
    { id: 'e-ingest-oracle', source: 'ingest', target: 'oracle', animated: true, style: { stroke: '#06b6d4', strokeWidth: 3 } },
    { id: 'e-transform-oracle', source: 'transform', target: 'oracle', animated: true, style: { stroke: '#22c55e', strokeWidth: 2 } },

    // Oracle to Analysis (dashed)
    { id: 'e-oracle-audit', source: 'oracle', target: 'audit-log', animated: false, style: { stroke: '#64748b', strokeDasharray: '5,5' } },
    { id: 'e-oracle-policy', source: 'oracle', target: 'policy-engine', animated: false, style: { stroke: '#64748b', strokeDasharray: '5,5' } },

    // Oracle to Output
    { id: 'e-oracle-db', source: 'oracle', target: 'database', animated: true, style: { stroke: '#f59e0b', strokeWidth: 2 } },
    { id: 'e-oracle-dc', source: 'oracle', target: 'datacenter', animated: true, style: { stroke: '#10b981', strokeWidth: 3 } },
    { id: 'e-oracle-cdn', source: 'oracle', target: 'cdn', animated: true, style: { stroke: '#06b6d4', strokeWidth: 2 } },
];

export default function GovernanceGraph({ height = '400px', activeAlert = false }: { height?: string, activeAlert?: boolean }) {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);

    // Update Oracle node based on Alert
    React.useEffect(() => {
        setNodes((nds) => nds.map((node) => {
            if (node.id === 'oracle') {
                return {
                    ...node,
                    style: {
                        ...node.style,
                        borderColor: activeAlert ? '#ef4444' : '#ec4899',
                        boxShadow: activeAlert ? '0 0 30px #ef4444, 0 0 60px #ef444480' : '0 0 15px rgba(236,72,153,0.3)',
                        transition: 'all 0.5s ease'
                    }
                };
            }
            return node;
        }));
    }, [activeAlert, setNodes]);

    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback((params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

    return (
        <div style={{ width: '100%', height: height, background: '#020617', borderRadius: '12px', border: '1px solid #1e293b' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
                fitViewOptions={{ padding: 0.2 }}
            >
                <Controls style={{ fill: '#fff' }} />
                <Background color="#1e293b" gap={25} />
            </ReactFlow>
        </div>
    );
}
