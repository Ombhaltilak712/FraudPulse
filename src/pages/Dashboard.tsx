import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { useStore } from '../store/useStore';
import StatCard from '../components/StatCard';

export default function Dashboard() {
  const {
    totalTransactions,
    openIncidents,
    blockedTransactions,
    eventProcessingRate,
    anomalyData,
    simulateHighRiskEvent,
    triggerRetraining,
    isRetraining,
  } = useStore();

  // Format anomaly data for chart
  const chartData = anomalyData.map((point) => ({
    time: new Date(point.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    anomaly: Math.round(point.value * 10) / 10,
  }));

  const latestAnomaly = chartData.length > 0 ? chartData[chartData.length - 1].anomaly : 12.4;

  return (
    <div className="space-y-6">
      {/* Top Banner & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900/80 to-blue-950/40 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              MISSION CONTROL
            </span>
            <span className="text-xs text-slate-400">Streaming Analytics Engine</span>
          </div>
          <h1 className="text-2xl font-black text-white mt-1 tracking-tight">
            FraudPulse Live Command Center
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time multi-model anomaly detection & active threat interception
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-3 relative z-10">
          <button
            onClick={triggerRetraining}
            disabled={isRetraining}
            className="px-4 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-cyan-300 border border-slate-700/80 text-xs font-bold tracking-wide transition-all shadow-md hover:shadow-cyan-500/10 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <svg className={`w-3.5 h-3.5 ${isRetraining ? 'animate-spin text-cyan-400' : 'text-cyan-400'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
              <path d="M3 3v5h5"/>
              <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/>
              <path d="M16 21h5v-5"/>
            </svg>
            <span>{isRetraining ? 'Retraining Models...' : 'Retrain Engine'}</span>
          </button>

          <button
            onClick={simulateHighRiskEvent}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white text-xs font-bold tracking-wide transition-all shadow-lg shadow-rose-950/40 hover:shadow-rose-500/25 flex items-center gap-2"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            <span>Simulate High Risk Event</span>
          </button>
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Transactions Processed"
          value={totalTransactions.toLocaleString()}
          icon={
            <svg className="w-5 h-5 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <line x1="2" x2="22" y1="10" y2="10" />
            </svg>
          }
          subtitle="Continuous streaming ingestion"
          variant="cyan"
        />

        <StatCard
          title="Open Flagged Incidents"
          value={openIncidents}
          icon={
            <svg className="w-5 h-5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          }
          subtitle="Pending security analyst triage"
          variant="amber"
        />

        <StatCard
          title="Blocked Threat Capital"
          value={blockedTransactions.toLocaleString()}
          icon={
            <svg className="w-5 h-5 text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          }
          subtitle="Active automatic interception"
          variant="rose"
        />

        <StatCard
          title="Event Processing Velocity"
          value={`${eventProcessingRate} /sec`}
          icon={
            <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          }
          subtitle="Sub-50ms inference latency"
          variant="emerald"
        />
      </div>

      {/* Live Anomaly Detection Timeline */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 shadow-xl relative overflow-hidden backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800/80 mb-6 gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <h2 className="text-base font-bold text-white tracking-tight">
                Live Anomaly Telemetry (Rolling Window)
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Real-time normalized risk score evaluated by the production XGBoost model
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-950 border border-slate-800">
              <span className="text-slate-500">Current Anomaly:</span>
              <span className={`font-bold ${latestAnomaly > 70 ? 'text-rose-400' : latestAnomaly > 40 ? 'text-amber-400' : 'text-cyan-400'}`}>
                {latestAnomaly}%
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-500">
              <span className="w-2.5 h-0.5 bg-cyan-400 rounded-full" />
              <span>Risk Threshold: 85%</span>
            </div>
          </div>
        </div>

        {/* Recharts Area / Line */}
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="anomalyGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis
                dataKey="time"
                stroke="#64748b"
                fontSize={11}
                tick={{ fill: '#64748b' }}
                tickLine={false}
              />
              <YAxis
                stroke="#64748b"
                fontSize={11}
                tick={{ fill: '#64748b' }}
                domain={[0, 100]}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0c1322',
                  borderColor: '#1e293b',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px -5px rgba(0,0,0,0.8)',
                  fontSize: '12px',
                  color: '#f8fafc',
                  fontFamily: 'monospace',
                }}
                formatter={(val: number) => [`${val}%`, 'Anomaly Score']}
                labelStyle={{ color: '#94a3b8', fontWeight: 'bold' }}
              />
              <Area
                type="monotone"
                dataKey="anomaly"
                stroke="#06b6d4"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#anomalyGradient)"
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 mt-2 text-[11px] text-slate-500 font-mono">
          <span>Inference Frequency: 2.5s / event</span>
          <span>Algorithms: XGBoost + Random Forest + Isolation Forest</span>
        </div>
      </div>
    </div>
  );
}
