import { useState } from 'react';
import { useStore } from '../store/useStore';
import StatCard from '../components/StatCard';
import { submitFeedback } from '../api/client';

export default function Feedback() {
  const { incidents, feedbacks, confirmedFraud, falsePositives, addFeedback } = useStore();
  const [selectedIncidentId, setSelectedIncidentId] = useState<string>('');
  const [comment, setComment] = useState('');
  const [feedbackType, setFeedbackType] = useState<'fraud' | 'false-positive' | null>(null);

  const openIncidents = incidents.filter((inc) => inc.status === 'Open');

  const handleSubmitFeedback = () => {
    if (!selectedIncidentId || !feedbackType) return;

    const isFraud = feedbackType === 'fraud';
    addFeedback({
      incidentId: selectedIncidentId,
      isFraud,
      comment,
      timestamp: Date.now(),
    });
    submitFeedback(selectedIncidentId, isFraud, comment).catch(() => {});

    setSelectedIncidentId('');
    setComment('');
    setFeedbackType(null);
  };

  const totalFeedback = confirmedFraud + falsePositives;
  const confirmedFraudPercent = totalFeedback > 0 ? (confirmedFraud / totalFeedback) * 100 : 0;
  const falsePositivePercent = totalFeedback > 0 ? (falsePositives / totalFeedback) * 100 : 0;
  const retrainingTarget = 50;
  const feedbackProgress = Math.min((totalFeedback / retrainingTarget) * 100, 100);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900/80 to-emerald-950/40 border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              HUMAN-IN-THE-LOOP
            </span>
            <span className="text-xs text-slate-400 font-mono">Continuous Active Learning Feedback</span>
          </div>
          <h1 className="text-2xl font-black text-white mt-1 tracking-tight">
            Analyst Validation & Continuous Learning
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Ground-truth triage annotations feed automated model retraining pipelines to combat concept drift
          </p>
        </div>

        <div className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Audited Events</span>
          <span className="text-sm font-bold text-cyan-400">{totalFeedback} Decisions</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Confirmed Fraud Cases"
          value={`${confirmedFraudPercent.toFixed(1)}%`}
          icon="🚨"
          subtitle={`${confirmedFraud} true positives verified`}
          variant="rose"
        />

        <StatCard
          title="False Positives Filtered"
          value={`${falsePositivePercent.toFixed(1)}%`}
          icon="🛡️"
          subtitle={`${falsePositives} benign events cleared`}
          variant="emerald"
        />

        <StatCard
          title="Total Feedback Submissions"
          value={totalFeedback}
          icon="📝"
          subtitle="Triage decisions logged in store"
          variant="cyan"
        />
      </div>

      {/* Retraining Threshold Meter */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight">
              Retraining Milestone Pipeline
            </h3>
            <p className="text-xs text-slate-400">
              {totalFeedback} / {retrainingTarget} validation entries collected before automated retraining trigger
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-cyan-400">
            {feedbackProgress.toFixed(0)}% Complete
          </span>
        </div>

        <div className="w-full bg-slate-950 rounded-full h-3.5 p-0.5 border border-slate-800 overflow-hidden mt-3">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              feedbackProgress >= 100
                ? 'bg-gradient-to-r from-emerald-500 to-cyan-400 shadow-[0_0_15px_rgba(16,185,129,0.5)]'
                : 'bg-gradient-to-r from-cyan-500 to-blue-600'
            }`}
            style={{ width: `${feedbackProgress}%` }}
          />
        </div>

        <div className="flex items-center justify-between mt-2 text-[11px] text-slate-500 font-mono">
          <span>Threshold: 50 Annotations</span>
          <span>
            {feedbackProgress >= 100
              ? '✓ Target Reached: Pipeline eligible for retraining'
              : `${retrainingTarget - totalFeedback} more annotations required`}
          </span>
        </div>
      </div>

      {/* Feedback Form Console */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-md">
        <h3 className="text-base font-bold text-white tracking-tight mb-4 flex items-center gap-2">
          <span>✍️</span>
          <span>Submit Incident Validation Decision</span>
        </h3>

        <div className="space-y-4 max-w-3xl">
          {/* Incident Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Select Open Incident
            </label>
            <select
              value={selectedIncidentId}
              onChange={(e) => setSelectedIncidentId(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 font-mono"
            >
              <option value="">Choose an open incident from queue...</option>
              {openIncidents.map((incident) => (
                <option key={incident.id} value={incident.id}>
                  {incident.id} — ${incident.transactionAmount.toLocaleString()} — {incident.riskLevel} Risk (IP: {incident.sourceIp})
                </option>
              ))}
            </select>
          </div>

          {/* Decision Buttons */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Analyst Verification Verdict
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFeedbackType('fraud')}
                className={`p-4 rounded-xl border text-left transition-all flex items-start gap-3 ${
                  feedbackType === 'fraud'
                    ? 'bg-rose-950/40 border-rose-500/80 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.2)]'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                <span className="text-2xl">🚨</span>
                <div>
                  <p className="text-sm font-bold text-white">Confirmed Fraud</p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Legitimate security threat confirmed. Model must classify this pattern as fraud.
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setFeedbackType('false-positive')}
                className={`p-4 rounded-xl border text-left transition-all flex items-start gap-3 ${
                  feedbackType === 'false-positive'
                    ? 'bg-emerald-950/40 border-emerald-500/80 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                <span className="text-2xl">🛡️</span>
                <div>
                  <p className="text-sm font-bold text-white">False Positive</p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Benign customer action flagged in error. Model must recalibrate threshold.
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Comment / Annotation Textarea */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Analyst Investigation Notes (Optional)
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-sans"
              placeholder="e.g. Cardholder confirmed overseas travel; IP proxy verified as corporate VPN."
            />
          </div>

          <button
            onClick={handleSubmitFeedback}
            disabled={!selectedIncidentId || !feedbackType}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs tracking-wide shadow-lg shadow-cyan-950/40 hover:shadow-cyan-500/25 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <span>Record Validation & Feed MLOps Loop</span>
          </button>
        </div>
      </div>

      {/* Recent Feedback Audit Log */}
      {feedbacks.length > 0 && (
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-md">
          <h3 className="text-base font-bold text-white tracking-tight mb-4 flex items-center gap-2">
            <span>📜</span>
            <span>Recent Validation Audit Trail</span>
          </h3>

          <div className="space-y-2.5">
            {feedbacks.slice(-5).reverse().map((fb, index) => (
              <div
                key={index}
                className="flex items-start justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs"
              >
                <div className="flex items-start gap-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono ${
                    fb.isFraud
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  }`}>
                    {fb.isFraud ? 'CONFIRMED FRAUD' : 'FALSE POSITIVE'}
                  </span>
                  <div>
                    <span className="font-mono font-bold text-slate-300">{fb.incidentId}</span>
                    {fb.comment && (
                      <p className="text-slate-400 mt-0.5 italic">"{fb.comment}"</p>
                    )}
                  </div>
                </div>
                <span className="text-[11px] font-mono text-slate-500 whitespace-nowrap">
                  {new Date(fb.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
