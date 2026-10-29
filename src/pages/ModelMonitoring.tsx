import { useEffect, useState } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { useStore } from '../store/useStore';
import StatCard from '../components/StatCard';
import { getModelMetrics, type ModelMetricsResponse } from '../api/client';

export default function ModelMonitoring() {
  const { modelMetrics: storeMetrics, metricsHistory, triggerRetraining, isRetraining } = useStore();
  const [apiMetrics, setApiMetrics] = useState<ModelMetricsResponse | null>(null);

  useEffect(() => {
    getModelMetrics()
      .then(setApiMetrics)
      .catch(() => setApiMetrics(null));
    const interval = setInterval(() => {
      getModelMetrics()
        .then(setApiMetrics)
        .catch(() => setApiMetrics(null));
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const modelMetrics = apiMetrics
    ? {
        accuracy: apiMetrics.accuracy,
        precision: apiMetrics.precision,
        recall: apiMetrics.recall,
        f1Score: apiMetrics.f1_score,
        driftScore: apiMetrics.drift_score,
        latency: apiMetrics.latency,
        falsePositiveRate: apiMetrics.false_positive_rate,
        version: apiMetrics.version,
      }
    : storeMetrics;

  // Use real historical data from metrics history, or fallback to smooth progression
  const generateHistoricalData = (baseValue: number, count: number = 20) => {
    return Array.from({ length: count }, (_, i) => ({
      date: new Date(Date.now() - (count - i) * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      value: Math.max(0, Math.min(1, baseValue + (Math.sin(i / 3) * 0.02))),
    }));
  };

  const accuracyData = metricsHistory.length > 0
    ? metricsHistory.map(point => ({ date: new Date(point.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }), value: Math.round(point.accuracy * 1000) / 10 }))
    : generateHistoricalData(modelMetrics.accuracy).map(p => ({ date: p.date, value: Math.round(p.value * 1000) / 10 }));

  const driftData = metricsHistory.length > 0
    ? metricsHistory.map(point => ({ date: new Date(point.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }), value: Math.round(point.driftScore * 1000) / 10 }))
    : generateHistoricalData(modelMetrics.driftScore).map(p => ({ date: p.date, value: Math.round(p.value * 1000) / 10 }));

  return (
    <div className="space-y-6">
      {/* Header & Governance Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900/80 to-indigo-950/40 border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              MLOPS TELEMETRY
            </span>
            <span className="text-xs text-slate-400 font-mono">Continuous Model Registry & Drift Engine</span>
          </div>
          <h1 className="text-2xl font-black text-white mt-1 tracking-tight">
            Model Performance & Health Telemetry
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Tracking production inference accuracy, statistical feature drift, and zero-downtime model promotion
          </p>
        </div>

        {/* Right Badges & Retrain Action */}
        <div className="flex items-center gap-3">
          {apiMetrics?.best_algorithm && (
            <div className="px-3 py-1.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs shadow-[0_0_15px_rgba(16,185,129,0.15)]">
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">
                Active Production Model
              </span>
              <span className="text-sm font-bold text-emerald-300 font-mono">
                {apiMetrics.best_algorithm}
              </span>
            </div>
          )}

          <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Registry Version</span>
            <span className="text-sm font-bold text-cyan-400">{modelMetrics.version}</span>
          </div>

          <button
            onClick={triggerRetraining}
            disabled={isRetraining}
            className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs tracking-wide transition-all shadow-lg shadow-cyan-950/40 hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <svg className={`w-3.5 h-3.5 ${isRetraining ? 'animate-spin' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
              <path d="M3 3v5h5"/>
              <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/>
              <path d="M16 21h5v-5"/>
            </svg>
            <span>{isRetraining ? 'Retraining Pipeline...' : 'Retrain Pipeline'}</span>
          </button>
        </div>
      </div>

      {/* 6 Key Model Telemetry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          title="Overall Model Accuracy"
          value={`${(modelMetrics.accuracy * 100).toFixed(1)}%`}
          icon="🎯"
          subtitle="Evaluated on held-out test splits"
          variant="cyan"
        />

        <StatCard
          title="Precision (Fraud Class)"
          value={`${(modelMetrics.precision * 100).toFixed(1)}%`}
          icon="📈"
          subtitle="Alert fidelity (low false alerts)"
          variant="indigo"
        />

        <StatCard
          title="Recall (Fraud Coverage)"
          value={`${(modelMetrics.recall * 100).toFixed(1)}%`}
          icon="🔍"
          subtitle="Total fraudulent events caught"
          variant="emerald"
        />

        <StatCard
          title="F1 Balanced Score"
          value={modelMetrics.f1Score.toFixed(4)}
          icon="⚖️"
          subtitle="Primary production selection metric"
          variant="cyan"
        />

        <StatCard
          title="Inference Latency"
          value={`${modelMetrics.latency} ms`}
          icon="⚡"
          subtitle="Per-transaction scoring speed"
          variant="amber"
        />

        <StatCard
          title="Statistical Drift Score"
          value={modelMetrics.driftScore.toFixed(3)}
          icon="📊"
          subtitle="Kolmogorov-Smirnov feature shift"
          variant={modelMetrics.driftScore > 0.25 ? 'rose' : 'emerald'}
        />
      </div>

      {/* Multi-Algorithm Benchmarking Matrix */}
      {apiMetrics?.all_algorithms && apiMetrics.all_algorithms.length > 0 && (
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Multi-Model Algorithm Benchmarking Matrix
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Automated evaluation across supervised and unsupervised architectures. Highest F1 score promoted to production.
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
              Auto-Selected: {apiMetrics.best_algorithm}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/70 text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                  <th className="px-5 py-3">Algorithm</th>
                  <th className="px-5 py-3">F1 Score (Rank)</th>
                  <th className="px-5 py-3">Accuracy</th>
                  <th className="px-5 py-3">Precision</th>
                  <th className="px-5 py-3">Recall</th>
                  <th className="px-5 py-3">False Positive Rate</th>
                  <th className="px-5 py-3 text-right">Deployment Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans text-xs">
                {apiMetrics.all_algorithms.map((algo) => {
                  const isBest = algo.algorithm === apiMetrics.best_algorithm;
                  return (
                    <tr key={algo.algorithm} className={`hover:bg-slate-800/40 transition-colors ${isBest ? 'bg-cyan-950/20' : ''}`}>
                      <td className="px-5 py-3.5 font-bold font-mono text-white flex items-center gap-2">
                        {isBest && <span className="text-cyan-400">★</span>}
                        <span>{algo.algorithm}</span>
                      </td>
                      <td className="px-5 py-3.5 font-mono font-bold text-cyan-400">
                        {algo.f1_score.toFixed(4)}
                      </td>
                      <td className="px-5 py-3.5 font-mono text-slate-300">
                        {(algo.accuracy * 100).toFixed(1)}%
                      </td>
                      <td className="px-5 py-3.5 font-mono text-slate-300">
                        {(algo.precision * 100).toFixed(1)}%
                      </td>
                      <td className="px-5 py-3.5 font-mono text-slate-300">
                        {(algo.recall * 100).toFixed(1)}%
                      </td>
                      <td className="px-5 py-3.5 font-mono text-slate-300">
                        {(algo.false_positive_rate * 100).toFixed(2)}%
                      </td>
                      <td className="px-5 py-3.5 text-right font-mono">
                        {isBest ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            Active Production
                          </span>
                        ) : (
                          <span className="text-[11px] text-slate-500">
                            Archived Baseline
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Telemetry Charts: Accuracy & Drift */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Accuracy History */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">
                Model Accuracy Telemetry (%)
              </h3>
              <p className="text-xs text-slate-400">Chronological inference test performance</p>
            </div>
            <span className="text-xs font-mono font-bold text-cyan-400">
              Avg: {(modelMetrics.accuracy * 100).toFixed(1)}%
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={accuracyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="accGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="date" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} domain={[70, 100]} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0c1322',
                    borderColor: '#1e293b',
                    borderRadius: '12px',
                    fontSize: '11px',
                    color: '#f8fafc',
                    fontFamily: 'monospace',
                  }}
                  formatter={(val: number) => [`${val}%`, 'Accuracy']}
                />
                <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2.5} fill="url(#accGradient)" isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Statistical Drift History */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">
                Data Drift Index (0.0 - 1.0)
              </h3>
              <p className="text-xs text-slate-400">Feature divergence vs. training distribution baseline</p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400">
              Threshold: &lt; 0.25
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={driftData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="driftGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="date" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} domain={[0, 100]} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0c1322',
                    borderColor: '#1e293b',
                    borderRadius: '12px',
                    fontSize: '11px',
                    color: '#f8fafc',
                    fontFamily: 'monospace',
                  }}
                  formatter={(val: number) => [`${val}%`, 'Drift Index']}
                />
                <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2.5} fill="url(#driftGradient)" isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
