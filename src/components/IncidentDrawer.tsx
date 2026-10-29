import { Incident } from '../types';
import { useStore } from '../store/useStore';

interface IncidentDrawerProps {
  incident: Incident | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function IncidentDrawer({ incident, isOpen, onClose }: IncidentDrawerProps) {
  const { approveIncident, blockIncident } = useStore();

  if (!isOpen || !incident) return null;

  const handleApprove = () => {
    approveIncident(incident.id);
    onClose();
  };

  const handleBlock = () => {
    blockIncident(incident.id);
    onClose();
  };

  const getRiskBadge = (level: string) => {
    switch (level) {
      case 'High':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30 shadow-[0_0_15px_rgba(244,63,94,0.15)]';
      case 'Medium':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.15)]';
      default:
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.15)]';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Frosted Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-lg bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col justify-between overflow-y-auto">
          {/* Header */}
          <div className="p-6 border-b border-slate-800 bg-slate-950/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 rounded-full bg-rose-500 animate-pulse" />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  INCIDENT RESPONSE DETAIL
                </span>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                ✕
              </button>
            </div>
            <h2 className="text-xl font-mono font-bold text-white mt-3">
              {incident.id}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Detected at {new Date(incident.timestamp).toLocaleString()}
            </p>
          </div>

          {/* Body Content */}
          <div className="p-6 space-y-6 flex-1">
            {/* Risk Gauge Card */}
            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Calculated Risk Score
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide border ${getRiskBadge(incident.riskLevel)}`}>
                  {incident.riskLevel} Risk
                </span>
              </div>

              <div className="flex items-end justify-between mb-2">
                <span className="text-3xl font-mono font-black text-white">
                  {(incident.riskScore * 100).toFixed(1)}%
                </span>
                <span className="text-xs font-mono text-slate-500">
                  Threshold: 85.0%
                </span>
              </div>

              <div className="w-full bg-slate-800 rounded-full h-3 p-0.5 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    incident.riskScore > 0.7
                      ? 'bg-gradient-to-r from-amber-500 to-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.5)]'
                      : incident.riskScore > 0.4
                      ? 'bg-gradient-to-r from-cyan-500 to-amber-500'
                      : 'bg-emerald-500'
                  }`}
                  style={{ width: `${Math.min(incident.riskScore * 100, 100)}%` }}
                />
              </div>
            </div>

            {/* Transaction Parameters */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Transaction Amount
                </p>
                <p className="text-xl font-mono font-bold text-white mt-1">
                  ${incident.transactionAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Source IP Address
                </p>
                <p className="text-sm font-mono font-bold text-cyan-400 mt-2">
                  {incident.sourceIp}
                </p>
              </div>
            </div>

            {/* Explainable AI Diagnosis */}
            {incident.aiSummary && (
              <div className="p-5 rounded-xl bg-gradient-to-br from-slate-950/90 to-blue-950/30 border border-blue-500/20 shadow-lg">
                <div className="flex items-center gap-2 mb-2 text-cyan-400">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                  <span className="text-xs font-bold uppercase tracking-widest text-cyan-300">
                    Explainable AI Diagnostic
                  </span>
                </div>
                <p className="text-sm text-slate-200 leading-relaxed font-sans">
                  {incident.aiSummary}
                </p>
              </div>
            )}

            {/* Risk Explanation */}
            {incident.riskExplanation && (
              <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800 text-xs text-slate-400 leading-relaxed">
                <span className="font-semibold text-slate-300 block mb-1">Pattern Analysis:</span>
                {incident.riskExplanation}
              </div>
            )}

            {/* Suggested Remediation Directive */}
            {incident.suggestedAction && (
              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 text-rose-300">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-rose-400 text-sm">🛡️</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-200">
                    Security Directive
                  </span>
                </div>
                <p className="text-xs text-rose-200/90 leading-relaxed">
                  {incident.suggestedAction}
                </p>
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div className="p-6 border-t border-slate-800 bg-slate-950/60 flex items-center gap-3">
            <button
              onClick={handleApprove}
              className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all shadow-lg shadow-emerald-950/40 hover:shadow-emerald-500/20 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Mark False Positive</span>
            </button>

            <button
              onClick={handleBlock}
              className="flex-1 py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-sm transition-all shadow-lg shadow-rose-950/40 hover:shadow-rose-500/20 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
              </svg>
              <span>Confirm & Block</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
