export default function Architecture() {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900/80 to-blue-950/40 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            SYSTEM BLUEPRINT
          </span>
          <span className="text-xs text-slate-400 font-mono">5-Tier Distributed Topology</span>
        </div>
        <h1 className="text-2xl font-black text-white mt-1 tracking-tight">
          FraudPulse Platform Architecture
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          End-to-end real-time ingestion, feature engineering, multi-algorithm ML inference, and closed-loop MLOps retraining
        </p>
      </div>

      {/* Main Multi-Tier Architecture Pipeline */}
      <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-md relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-8 relative z-10">

          {/* Layer 1: Ingestion & Feature Engineering */}
          <div>
            <div className="text-center mb-4">
              <span className="inline-block px-3.5 py-1 bg-purple-500/10 border border-purple-500/30 text-purple-300 rounded-full text-xs font-mono font-bold uppercase tracking-widest shadow-sm">
                Layer 1: Streaming Ingestion & Feature Extraction
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-950/70 border border-purple-500/20 shadow-md">
                <span className="text-xl">💳</span>
                <h3 className="text-sm font-bold text-white mt-1.5">Payment Gateway</h3>
                <p className="text-xs text-slate-400 mt-1">Live high-frequency transaction stream</p>
                <div className="mt-2 text-[10px] font-mono text-purple-400">log1p(amount) scaling</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-950/70 border border-purple-500/20 shadow-md">
                <span className="text-xl">🌐</span>
                <h3 className="text-sm font-bold text-white mt-1.5">IP Octet Intelligence</h3>
                <p className="text-xs text-slate-400 mt-1">IPv4 subnet decomposition</p>
                <div className="mt-2 text-[10px] font-mono text-purple-400">[ip1, ip2, ip3] ratios</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-950/70 border border-purple-500/20 shadow-md">
                <span className="text-xl">⏰</span>
                <h3 className="text-sm font-bold text-white mt-1.5">Temporal Dynamics</h3>
                <p className="text-xs text-slate-400 mt-1">Cyclic time-of-day features</p>
                <div className="mt-2 text-[10px] font-mono text-purple-400">hour & day-of-week normalized</div>
              </div>
            </div>
          </div>

          {/* Flow Connector */}
          <div className="flex justify-center text-cyan-400 text-xl font-bold animate-pulse">
            ↓
          </div>

          {/* Layer 2: Machine Learning Inference Engine */}
          <div>
            <div className="text-center mb-4">
              <span className="inline-block px-3.5 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 rounded-full text-xs font-mono font-bold uppercase tracking-widest shadow-sm">
                Layer 2: Multi-Model Machine Learning Engine
              </span>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/60 via-slate-950/80 to-cyan-950/60 border border-cyan-500/30 shadow-xl">
              <div className="text-center mb-4">
                <span className="text-2xl">🤖</span>
                <h3 className="text-lg font-bold text-white mt-1">FraudPulse Ensemble Risk Core</h3>
                <p className="text-xs text-cyan-200/80 mt-0.5">Automated F1-ranked algorithm selection</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/40">
                  <span className="text-xs font-bold text-cyan-300 block">XGBoost (Champion)</span>
                  <span className="text-[10px] font-mono text-slate-400">Gradient Boosting (F1=0.68)</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-xs font-bold text-slate-300 block">Random Forest</span>
                  <span className="text-[10px] font-mono text-slate-400">Bagging Ensemble</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-xs font-bold text-slate-300 block">Logistic Regression</span>
                  <span className="text-[10px] font-mono text-slate-400">Linear Statistical Model</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-xs font-bold text-slate-300 block">Isolation Forest</span>
                  <span className="text-[10px] font-mono text-slate-400">Unsupervised Anomaly</span>
                </div>
              </div>

              <div className="mt-4 text-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold">
                  ⚡ Sub-50ms Inference Latency via Lifespan Memory Mapping
                </span>
              </div>
            </div>
          </div>

          {/* Flow Connector */}
          <div className="flex justify-center text-cyan-400 text-xl font-bold animate-pulse">
            ↓
          </div>

          {/* Layer 3: Risk Classification */}
          <div>
            <div className="text-center mb-4">
              <span className="inline-block px-3.5 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded-full text-xs font-mono font-bold uppercase tracking-widest shadow-sm">
                Layer 3: Risk Assessment & Policy Classification
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-center">
                <span className="text-xl">✅</span>
                <h4 className="text-sm font-bold text-emerald-300 mt-1">Low Risk</h4>
                <p className="text-[11px] font-mono text-slate-400 mt-0.5">Score: &lt; 30.0%</p>
                <p className="text-[11px] text-emerald-400 mt-1 font-semibold">Immediate Auto-Approval</p>
              </div>

              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 text-center">
                <span className="text-xl">⚠️</span>
                <h4 className="text-sm font-bold text-amber-300 mt-1">Medium Risk</h4>
                <p className="text-[11px] font-mono text-slate-400 mt-0.5">Score: 30.0% - 70.0%</p>
                <p className="text-[11px] text-amber-400 mt-1 font-semibold">Flagged to Review Queue</p>
              </div>

              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 text-center">
                <span className="text-xl">🚨</span>
                <h4 className="text-sm font-bold text-rose-300 mt-1">High Risk</h4>
                <p className="text-[11px] font-mono text-slate-400 mt-0.5">Score: &gt; 85.0%</p>
                <p className="text-[11px] text-rose-400 mt-1 font-semibold">Immediate Block Directive</p>
              </div>
            </div>
          </div>

          {/* Flow Connector */}
          <div className="flex justify-center text-cyan-400 text-xl font-bold animate-pulse">
            ↓
          </div>

          {/* Layer 4: SOC Incident Response */}
          <div>
            <div className="text-center mb-4">
              <span className="inline-block px-3.5 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-300 rounded-full text-xs font-mono font-bold uppercase tracking-widest shadow-sm">
                Layer 4: Incident Response & Human-in-the-Loop Triage
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-950/70 border border-amber-500/20">
                <span className="text-xl">🔍</span>
                <h4 className="text-sm font-bold text-white mt-1">SOC Investigation Drawer</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Explainable AI (XAI) reasoning synthesizes plain-English risk factors for fast 1-click decisions.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-950/70 border border-amber-500/20">
                <span className="text-xl">🛡️</span>
                <h4 className="text-sm font-bold text-white mt-1">Containment & Feedback</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Analyst designations (Confirmed Fraud vs False Positive) record ground-truth labels in memory.
                </p>
              </div>
            </div>
          </div>

          {/* Flow Connector */}
          <div className="flex justify-center text-cyan-400 text-xl font-bold animate-pulse">
            ↓
          </div>

          {/* Layer 5: MLOps Continuous Retraining Loop */}
          <div>
            <div className="text-center mb-4">
              <span className="inline-block px-3.5 py-1 bg-rose-500/10 border border-rose-500/30 text-rose-300 rounded-full text-xs font-mono font-bold uppercase tracking-widest shadow-sm">
                Layer 5: Continuous MLOps Learning Loop
              </span>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/40 via-slate-950 to-blue-950/40 border border-rose-500/30 text-center">
              <span className="text-2xl">🔄</span>
              <h3 className="text-base font-bold text-white mt-1">Automated Model Registry & Drift Defense</h3>
              <p className="text-xs text-slate-400 mt-0.5 max-w-lg mx-auto">
                Statistical drift monitoring tracks feature distribution decay. When feedback reaches threshold, automated subprocess training evaluates new candidates and promotes with zero downtime.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 text-xs font-mono">
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-cyan-400 font-bold block">Drift Detector</span>
                  <span className="text-slate-500 text-[10px]">Rolling 1000-event KS test</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-emerald-400 font-bold block">Validation Gate</span>
                  <span className="text-slate-500 text-[10px]">F1 &ge; 0.60 threshold</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-purple-400 font-bold block">Model Registry</span>
                  <span className="text-slate-500 text-[10px]">Semantic versioning index</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Enterprise Guarantees & Production Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-md">
          <h2 className="text-base font-bold text-white tracking-tight mb-4 flex items-center gap-2">
            <span className="text-cyan-400">🛡️</span>
            <span>Enterprise Resilience & Autonomous Governance</span>
          </h2>
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-slate-400">Autonomous Threat Quarantine:</span>
              <span className="font-semibold text-emerald-400">Real-time vector & IP subnet containment</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-slate-400">Explainable AI (XAI) Attribution:</span>
              <span className="font-semibold text-cyan-300">Plain-language risk breakdown per event</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-slate-400">Drift Surveillance:</span>
              <span className="font-semibold text-purple-300">Continuous KS statistical distribution checks</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-slate-400">Model Hot-Swapping:</span>
              <span className="font-semibold text-white">Atomic zero-downtime production promotions</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Fault Tolerance:</span>
              <span className="font-semibold text-amber-300">Seamless client-side fallback mode</span>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-md">
          <h2 className="text-base font-bold text-white tracking-tight mb-4 flex items-center gap-2">
            <span className="text-emerald-400">⚡</span>
            <span>Production Performance & SLA Benchmarks</span>
          </h2>
          <div className="space-y-3 text-xs font-mono">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <span className="text-slate-400">Inference Scoring Latency:</span>
              <span className="font-bold text-emerald-400">&lt; 45ms (Sub-50ms SLA)</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <span className="text-slate-400">Champion Model Accuracy:</span>
              <span className="font-bold text-cyan-400">90.9% (XGBoost)</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <span className="text-slate-400">Champion F1 Score:</span>
              <span className="font-bold text-cyan-400">0.6829</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <span className="text-slate-400">False Positive Rate:</span>
              <span className="font-bold text-amber-400">3.8% (Target &lt; 5.0%)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Throughput Velocity:</span>
              <span className="font-bold text-purple-400">800 - 1,200 Events/Sec</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
