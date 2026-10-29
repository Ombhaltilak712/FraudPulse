import { useEffect, useState } from 'react';
import { getDatasetStats, trainWithIEEEDataset, type DatasetStats, type TrainingResponse } from '../api/client';
import StatCard from '../components/StatCard';

export default function DatasetInfo() {
  const [datasetStats, setDatasetStats] = useState<DatasetStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [training, setTraining] = useState(false);
  const [trainingResult, setTrainingResult] = useState<TrainingResponse | null>(null);

  useEffect(() => {
    loadDatasetStats();
  }, []);

  const loadDatasetStats = async () => {
    try {
      setLoading(true);
      const stats = await getDatasetStats();
      setDatasetStats(stats);
    } catch (error) {
      console.error('Failed to load dataset stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTrainModel = async () => {
    if (training) return;
    
    if (!confirm('Train a new model? This will benchmark 4 algorithms and deploy the highest F1 model.')) {
      return;
    }

    try {
      setTraining(true);
      setTrainingResult(null);
      const result = await trainWithIEEEDataset(10000); // Fixed sample size
      setTrainingResult(result);
      
      if (result.status === 'success') {
        // Reload stats after training
        setTimeout(() => loadDatasetStats(), 2000);
      }
    } catch (error: any) {
      setTrainingResult({
        status: 'error',
        message: error.message || 'Training failed',
      });
    } finally {
      setTraining(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-80 space-y-3">
        <div className="w-10 h-10 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-mono text-slate-400 tracking-wider uppercase">Loading IEEE-CIS Dataset Telemetry...</p>
      </div>
    );
  }

  if (!datasetStats) {
    return (
      <div className="p-8 rounded-2xl bg-rose-950/20 border border-rose-500/30 text-center max-w-lg mx-auto mt-12">
        <p className="text-sm font-bold text-rose-300">Failed to load dataset statistics</p>
        <p className="text-xs text-slate-400 mt-1">Please ensure the backend API is running on http://localhost:8000</p>
        <button
          onClick={loadDatasetStats}
          className="mt-4 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white border border-slate-700 transition-all"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900/80 to-purple-950/40 border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
              BENCHMARK DATASET
            </span>
            <span className="text-xs text-slate-400 font-mono">IEEE-CIS Fraud Detection Corpus</span>
          </div>
          <h1 className="text-2xl font-black text-white mt-1 tracking-tight">
            Dataset Telemetry & On-Demand Model Training
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-world financial fraud distribution statistics, high-dimensional feature schema, and automated pipeline retraining
          </p>
        </div>

        <button
          onClick={handleTrainModel}
          disabled={training}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs tracking-wide shadow-lg shadow-cyan-950/40 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {training ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Training In Progress...</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
              <span>Start Model Training</span>
            </>
          )}
        </button>
      </div>

      {/* Dataset Core Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Transactions"
          value={datasetStats.total_transactions.toLocaleString()}
          icon="📊"
          subtitle="Full historical corpus size"
          variant="cyan"
        />

        <StatCard
          title="Confirmed Fraud Cases"
          value={datasetStats.fraud_transactions.toLocaleString()}
          icon="🚨"
          subtitle="Positively verified fraud events"
          variant="rose"
        />

        <StatCard
          title="Dataset Fraud Rate"
          value={(datasetStats.fraud_rate * 100).toFixed(2) + '%'}
          icon="📈"
          subtitle="Severe class imbalance ratio"
          variant="amber"
        />

        <StatCard
          title="Engineered Features"
          value={datasetStats.total_features.toString()}
          icon="🔢"
          subtitle="Transaction + identity vectors"
          variant="emerald"
        />
      </div>

      {/* Dataset Specification & Architecture Details */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-md">
        <h2 className="text-base font-bold text-white tracking-tight mb-4 flex items-center gap-2">
          <span>📋</span>
          <span>Corpus Architecture & Metadata</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Official Identifier</span>
            <p className="text-sm font-bold text-white mt-1">{datasetStats.dataset_name}</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Transaction Table Columns</span>
            <p className="text-sm font-bold text-cyan-400 mt-1 font-mono">{datasetStats.num_features_transaction} features</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Identity Table Columns</span>
            <p className="text-sm font-bold text-cyan-400 mt-1 font-mono">{datasetStats.num_features_identity} features</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Problem Domain</span>
            <p className="text-sm font-bold text-purple-400 mt-1">Imbalanced Binary Classification</p>
          </div>
        </div>
      </div>

      {/* Sample Transactions Table */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-md">
        <h2 className="text-base font-bold text-white tracking-tight mb-4 flex items-center gap-2">
          <span>🔍</span>
          <span>Sample Transactions Preview</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/70 text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                <th className="px-5 py-3">Transaction ID</th>
                <th className="px-5 py-3">Time Delta (DT)</th>
                <th className="px-5 py-3">Amount</th>
                <th className="px-5 py-3">Product Category</th>
                <th className="px-5 py-3 text-right">Ground Truth</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans text-xs">
              {datasetStats.sample_transactions.map((tx) => (
                <tr key={tx.TransactionID} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-5 py-3.5 font-mono text-cyan-400 font-bold">
                    #{tx.TransactionID}
                  </td>
                  <td className="px-5 py-3.5 font-mono text-slate-300">
                    {tx.TransactionDT}
                  </td>
                  <td className="px-5 py-3.5 font-mono font-bold text-white">
                    ${tx.TransactionAmt.toFixed(2)}
                  </td>
                  <td className="px-5 py-3.5 font-mono text-slate-300">
                    Product {tx.ProductCD}
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                      tx.isFraud
                        ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                        : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    }`}>
                      {tx.isFraud ? 'Fraud' : 'Legit'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Model Training & Feedback Result */}
      {trainingResult && (
        <div className={`p-6 rounded-2xl border shadow-xl backdrop-blur-md ${
          trainingResult.status === 'success'
            ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300'
            : 'bg-rose-950/20 border-rose-500/40 text-rose-300'
        }`}>
          <div className="flex items-center gap-2 mb-2 font-bold text-base">
            <span>{trainingResult.status === 'success' ? '✓' : '✗'}</span>
            <span>{trainingResult.status === 'success' ? 'Training & Promotion Successful' : 'Training Failed'}</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed mb-4">
            {trainingResult.message}
          </p>

          {trainingResult.metrics && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-800">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">F1 Score</span>
                <p className="text-lg font-mono font-bold text-emerald-400">
                  {(trainingResult.metrics.f1_score * 100).toFixed(2)}%
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Accuracy</span>
                <p className="text-lg font-mono font-bold text-white">
                  {(trainingResult.metrics.accuracy * 100).toFixed(2)}%
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Precision</span>
                <p className="text-lg font-mono font-bold text-cyan-400">
                  {(trainingResult.metrics.precision * 100).toFixed(2)}%
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Recall</span>
                <p className="text-lg font-mono font-bold text-indigo-400">
                  {(trainingResult.metrics.recall * 100).toFixed(2)}%
                </p>
              </div>
            </div>
          )}

          {trainingResult.model_version && (
            <p className="text-[11px] font-mono text-cyan-400 mt-3">
              Promoted Active Registry Version: {trainingResult.model_version}
            </p>
          )}
        </div>
      )}

      {/* Architecture & Engineering Callout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 text-slate-300">
          <p className="font-bold text-cyan-300 text-sm mb-1.5">⚡ Continuous Model Training Protocol</p>
          <p className="text-slate-400 leading-relaxed">
            The automated pipeline fits 4 models (XGBoost, Random Forest, Logistic Regression, Isolation Forest).
            The candidate achieving the highest F1 score is automatically saved to <code className="font-mono text-cyan-400">fraud_model.joblib</code> and promoted with zero downtime.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 text-slate-300">
          <p className="font-bold text-purple-300 text-sm mb-1.5">📊 IEEE-CIS Production Standard</p>
          <p className="text-slate-400 leading-relaxed">
            Derived from Vesta Corporation’s real-world e-commerce transactions across 400+ categorical and numeric fields,
            serving as FraudPulse's industrial baseline for fraud rate calibration and drift testing.
          </p>
        </div>
      </div>
    </div>
  );
}
