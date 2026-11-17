import React, { useState } from 'react';
import {
  Sparkles,
  X,
  Send,
  ShieldCheck,
  Cpu,
  Layers,
  Database,
  CheckCircle2,
  AlertCircle,
  Ship,
  TrendingUp,
  Warehouse,
  ShoppingCart,
  ChevronRight,
  ExternalLink,
  Lock,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const SAMPLE_GROUNDED_RESPONSES = {
  shipments: {
    title: 'Active Shipments & Transit Logistics',
    sources: ['GET /api/v1/trade/shipments', 'GET /api/v1/trade/containers'],
    node: 'Trade Specialist Node (Node 2A)',
    summary: 'There are currently 2 active sea-freight consignments tracked across MSC and Maersk Line.',
    items: [
      { id: 'SH-901', label: 'SLX-SH-2026-09-001', detail: 'MSC Mediterranean · Hai Phong to Jebel Ali, UAE · 8 Containers · IN_TRANSIT (ETD: Sep 10, ETA: Sep 25)' },
      { id: 'SH-902', label: 'SLX-SH-2026-09-002', detail: 'Maersk Line · Kochi to Hamburg, Germany · 4 Containers · PENDING_CUSTOMS (ETD: Sep 14, ETA: Oct 05)' },
    ],
    verifiedMetrics: '12 Total Containers · 100% BL Seal Verified'
  },
  aging: {
    title: 'Buyer Receivables & Overdue Risk Audit',
    sources: ['GET /api/v1/finance/aging'],
    node: 'Finance Specialist Node (Node 2D)',
    summary: 'Total trade receivables stand at $14,840,000 USD. The 90+ days critical overdue bucket requires immediate follow-up.',
    items: [
      { id: 'REC-01', label: 'Gulf Agri-Commodities LLC', detail: '$2,450,000 Total ($850,000 90+ days overdue · Credit Hold Suggested)' },
      { id: 'REC-02', label: 'Hamburg Foodstuffs Import GmbH', detail: '$1,920,000 Total ($420,000 60 days overdue · Commercial notice dispatched)' },
      { id: 'REC-03', label: 'Singapore Asian Grains Pte', detail: '$3,100,000 Total (Current within 30 days · In Good Standing)' }
    ],
    verifiedMetrics: 'Grand Total: $14.84M USD · Credit Hold Alert Triggered'
  },
  inventory: {
    title: 'Cryogenic Warehouse Stock & Reorder Points',
    sources: ['GET /api/v1/inventory/stock'],
    node: 'Inventory Specialist Node (Node 2C)',
    summary: '4 central bio-hubs reporting healthy cryogenic storage; 1 lot requires moisture re-assay.',
    items: [
      { id: 'LOT-550', label: 'Black Pepper 550 G/L ASTA', detail: 'Hai Phong Terminal · 240.5 MT in stock (Safety buffer: 120 MT) · Optimal' },
      { id: 'LOT-CARD', label: 'Green Cardamom 8mm+ Fancy', detail: 'Kochi Terminal · 18.2 MT in stock (Safety buffer: 25 MT · Below Reorder Point)' },
      { id: 'LOT-DDGS', label: 'Rice DDGS 45% Protein', detail: 'Long An Processing Hub · 480 MT in stock · Inspection Cleared' }
    ],
    verifiedMetrics: 'Overall Stock Valuation: $8.45M USD · Zero Cold-Chain Breaches'
  }
};

export default function AiCopilotDrawer({ isOpen, onClose }) {
  const { user } = useAuth();
  const [selectedTopic, setSelectedTopic] = useState('shipments');
  const [inputMessage, setInputMessage] = useState('');
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' | 'architecture'
  const [messages, setMessages] = useState([
    {
      sender: 'copilot',
      text: `Hello ${user?.name || 'Executive Admin'}. I am your SOILEX AI Copilot placeholder. I am designed on a multi-node architecture to query live ERP APIs with zero hallucination. Select a suggested topic below or type a query to test grounded synthesis.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      groundedData: SAMPLE_GROUNDED_RESPONSES.shipments
    }
  ]);

  if (!isOpen) return null;

  const currentTopicData = SAMPLE_GROUNDED_RESPONSES[selectedTopic] || SAMPLE_GROUNDED_RESPONSES.shipments;

  const handleSelectSample = (topicKey) => {
    setSelectedTopic(topicKey);
    const data = SAMPLE_GROUNDED_RESPONSES[topicKey];
    setMessages(prev => [
      ...prev,
      {
        sender: 'user',
        text: topicKey === 'shipments' 
          ? 'Summarize active export shipments and container logistics' 
          : topicKey === 'aging' 
          ? 'Audit overdue receivables and identify buyer credit hold risks' 
          : 'Check warehouse stock levels and reorder safety buffers',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      },
      {
        sender: 'copilot',
        text: data.summary,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        groundedData: data
      }
    ]);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userText = inputMessage;
    setInputMessage('');

    // Simulate multi-node supervisor routing and grounded synthesis
    setMessages(prev => [
      ...prev,
      {
        sender: 'user',
        text: userText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      },
      {
        sender: 'copilot',
        text: `[Supervisor Node]: Routed intent to Domain Specialist. In Phase 2, this will trigger live loopback calls to FastAPI endpoints with anti-hallucination verification against the DuckDB store.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        groundedData: {
          title: `Query Analysis: "${userText}"`,
          sources: ['POST /api/v1/copilot/intent-check', 'GET /api/v1/trade/summary'],
          node: 'Supervisor & Guardrail Engine',
          summary: `Your request will be validated against role: ${user?.role || 'ADMIN'}. Grounding ensures zero hallucinated metrics.`,
          items: [
            { id: 'STEP-1', label: 'RBAC Authorization Check', detail: `Authorized for role: ${user?.role || 'ADMIN'} (${user?.department || 'Executive'})` },
            { id: 'STEP-2', label: 'Deterministic Tool Execution', detail: 'Direct Pydantic schema validation over OpenAPI routes' },
            { id: 'STEP-3', label: 'Zero-Hallucination Guardrail', detail: 'Strict citation of database record IDs and entity timestamps' }
          ],
          verifiedMetrics: 'Multi-Node Graph Placeholder Active'
        }
      }
    ]);
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end bg-slate-900/40 backdrop-blur-xs transition-opacity animate-fade-in">
      {/* Slide-over panel */}
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col border-l border-slate-200">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 bg-gradient-to-r from-[#0F172A] to-[#1E3A8A] text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600/40 border border-blue-400/30 flex items-center justify-center text-amber-400 shadow-inner">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="font-bold text-sm tracking-wide text-white uppercase">SOILEX AI Copilot</h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  STAGING PREVIEW
                </span>
              </div>
              <p className="text-[11px] text-blue-200 font-medium mt-0.5">
                Multi-Node Architecture · Zero-Hallucination Guardrail
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              title="Close Copilot"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sub-Nav Switcher: Chat vs Architecture */}
        <div className="flex items-center border-b border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'chat'
                ? 'bg-white text-[#1E40AF] shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Chat & Tests</span>
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'architecture'
                ? 'bg-white text-[#1E40AF] shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Multi-Node Blueprint</span>
          </button>
        </div>

        {/* Content Area */}
        {activeTab === 'chat' ? (
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Context Badge */}
            <div className="px-4 py-2 bg-blue-50/70 border-b border-blue-100 flex items-center justify-between text-[11px]">
              <div className="flex items-center space-x-2 text-blue-900 font-semibold">
                <Lock className="w-3.5 h-3.5 text-blue-700" />
                <span>RBAC Context:</span>
                <span className="font-bold text-[#1E40AF] uppercase">{user?.role || 'ADMIN'}</span>
                <span className="text-slate-400">·</span>
                <span className="text-slate-600">{user?.department || 'Executive Desk'}</span>
              </div>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-md border border-emerald-200">
                Grounding Active
              </span>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[90%] rounded-xl px-4 py-3 text-xs leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-[#1E40AF] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-800 border border-slate-200 shadow-xs'
                    }`}
                  >
                    <p className="font-medium whitespace-pre-line">{m.text}</p>

                    {/* Grounded Artifact Card */}
                    {m.groundedData && (
                      <div className="mt-3 pt-3 border-t border-slate-200 bg-white p-3 rounded-lg text-slate-900 shadow-2xs space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-[#1E40AF] uppercase tracking-wide flex items-center gap-1">
                            <Database className="w-3 h-3 text-[#1E40AF]" />
                            {m.groundedData.node}
                          </span>
                          <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                            <CheckCircle2 className="w-2.5 h-2.5" />
                            Grounded
                          </span>
                        </div>

                        <h4 className="text-xs font-bold text-slate-900">{m.groundedData.title}</h4>

                        {/* Items list */}
                        <div className="space-y-1.5 pt-1">
                          {m.groundedData.items.map((item) => (
                            <div key={item.id} className="text-[11px] bg-slate-50 p-2 rounded border border-slate-200/80">
                              <span className="font-bold text-[#1E40AF]">{item.label}</span>: {item.detail}
                            </div>
                          ))}
                        </div>

                        {/* Sources & Citations */}
                        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-1 text-[10px] text-slate-500 font-mono">
                          <span>API Sources: {m.groundedData.sources.join(', ')}</span>
                          <span className="font-semibold text-slate-700">{m.groundedData.verifiedMetrics}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 px-1">
                    {m.timestamp}
                  </span>
                </div>
              ))}
            </div>

            {/* Quick Action Chips */}
            <div className="px-4 py-2 border-t border-slate-200 bg-slate-50/60">
              <p className="text-[10px] font-bold uppercase text-slate-500 tracking-wider mb-1.5">
                Test Grounded Query Presets:
              </p>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => handleSelectSample('shipments')}
                  className="text-[11px] bg-white hover:bg-blue-50 hover:text-[#1E40AF] border border-slate-200 rounded-lg px-2.5 py-1 text-slate-700 font-medium transition-colors flex items-center gap-1 shadow-2xs"
                >
                  <Ship className="w-3 h-3 text-blue-600" />
                  Active Shipments & BLs
                </button>
                <button
                  onClick={() => handleSelectSample('aging')}
                  className="text-[11px] bg-white hover:bg-amber-50 hover:text-amber-800 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-700 font-medium transition-colors flex items-center gap-1 shadow-2xs"
                >
                  <TrendingUp className="w-3 h-3 text-amber-600" />
                  Overdue Receivables & Aging
                </button>
                <button
                  onClick={() => handleSelectSample('inventory')}
                  className="text-[11px] bg-white hover:bg-emerald-50 hover:text-emerald-800 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-700 font-medium transition-colors flex items-center gap-1 shadow-2xs"
                >
                  <Warehouse className="w-3 h-3 text-emerald-600" />
                  Stock & Safety Buffers
                </button>
              </div>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-3 border-t border-slate-200 bg-white flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask about shipments, receivables, stock, or POs..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1E40AF] focus:ring-1 focus:ring-[#1E40AF]"
              />
              <button
                type="submit"
                className="p-2 bg-[#1E40AF] hover:bg-blue-800 text-white rounded-xl shadow-xs transition-colors shrink-0"
                title="Send query"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          /* Multi-Node Architecture Blueprint View */
          <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <div className="flex items-center space-x-2 text-[#1E40AF] font-bold text-sm">
                <Cpu className="w-4 h-4" />
                <h3>Zero-Hallucination Multi-Node Design</h3>
              </div>
              <p className="text-slate-600 mt-1 leading-relaxed">
                Rather than using a single monolithic prompt, user inquiries flow through a deterministic graph of specialized nodes. Every statement must cite a validated ERP database record ID.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider">
                Graph Node Hierarchy:
              </h4>

              <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-2xs">
                <div className="flex items-center justify-between font-bold text-slate-800">
                  <span className="flex items-center gap-1.5 text-blue-700">
                    <ShieldCheck className="w-4 h-4" />
                    Node 1: Supervisor & RBAC Router
                  </span>
                  <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded font-mono">Pydantic Gated</span>
                </div>
                <p className="text-slate-500 text-[11px] mt-1">
                  Validates JWT permissions. Prevents unauthorized roles (e.g. general staff) from querying sensitive executive margins or payroll.
                </p>
              </div>

              <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-2xs">
                <div className="flex items-center justify-between font-bold text-slate-800">
                  <span className="flex items-center gap-1.5 text-amber-700">
                    <Layers className="w-4 h-4" />
                    Node 2: Domain Specialist Nodes
                  </span>
                  <span className="text-[10px] bg-amber-50 text-amber-800 px-2 py-0.5 rounded font-mono">6 Domain Agents</span>
                </div>
                <p className="text-slate-500 text-[11px] mt-1">
                  Specialists for <strong>Trade</strong>, <strong>Procurement</strong>, <strong>Warehouse</strong>, <strong>Finance</strong>, <strong>HR</strong>, and <strong>Quality</strong> with dedicated vocabulary and OpenAPI tool definitions.
                </p>
              </div>

              <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-2xs">
                <div className="flex items-center justify-between font-bold text-slate-800">
                  <span className="flex items-center gap-1.5 text-emerald-700">
                    <Database className="w-4 h-4" />
                    Node 3: Deterministic Tool Calling
                  </span>
                  <span className="text-[10px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded font-mono">FastAPI Loopback</span>
                </div>
                <p className="text-slate-500 text-[11px] mt-1">
                  Calls direct `/api/v1/*` endpoints. Returns pure JSON state directly from the DuckDB database.
                </p>
              </div>

              <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-2xs">
                <div className="flex items-center justify-between font-bold text-slate-800">
                  <span className="flex items-center gap-1.5 text-rose-700">
                    <CheckCircle2 className="w-4 h-4" />
                    Node 4: Anti-Hallucination Guardrail
                  </span>
                  <span className="text-[10px] bg-rose-50 text-rose-800 px-2 py-0.5 rounded font-mono">Zero Speculation</span>
                </div>
                <p className="text-slate-500 text-[11px] mt-1">
                  Compares LLM text against the raw API payload. If a number or date is not directly in the returned database rows, it is stripped or marked unverified.
                </p>
              </div>

              <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-2xs">
                <div className="flex items-center justify-between font-bold text-slate-800">
                  <span className="flex items-center gap-1.5 text-purple-700">
                    <ExternalLink className="w-4 h-4" />
                    Node 5: Human-in-the-Loop (HITL) Action
                  </span>
                  <span className="text-[10px] bg-purple-50 text-purple-800 px-2 py-0.5 rounded font-mono">Two-Phase Commit</span>
                </div>
                <p className="text-slate-500 text-[11px] mt-1">
                  Any write mutation (e.g., creating POs, updating shipment status) requires the Admin to click "Confirm Action" before mutating database state.
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <h5 className="font-bold text-slate-800 mb-1">Architecture Roadmap Document Saved:</h5>
              <p className="text-[11px] text-slate-600">
                A full architectural specification artifact has been preserved in your workspace with complete sequence diagrams, RBAC permissions matrix, and FastAPI integration steps.
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="p-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-[11px] text-slate-500">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            ERP Engine v1.0 Connected
          </span>
          <span className="font-mono text-[10px]">DuckDB + FastAPI Grounding</span>
        </div>
      </div>
    </div>
  );
}
