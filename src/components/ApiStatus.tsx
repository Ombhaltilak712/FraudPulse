import { useEffect, useState } from 'react';
import { healthCheck } from '../api/client';

export default function ApiStatus() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [modelLoaded, setModelLoaded] = useState(false);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const health = await healthCheck();
        setIsConnected(true);
        setModelLoaded(health.model_loaded);
      } catch {
        setIsConnected(false);
        setModelLoaded(false);
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, 10000); // Check every 10 seconds
    return () => clearInterval(interval);
  }, []);

  if (isConnected === null) {
    return (
      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/60 border border-slate-800 text-xs text-slate-400">
        <span className="w-2 h-2 rounded-full bg-slate-500 animate-pulse" />
        <span>Connecting...</span>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center gap-2.5 px-3 py-1 rounded-full text-xs font-medium border transition-all ${
        isConnected
          ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.15)]'
          : 'bg-rose-950/40 text-rose-300 border-rose-500/30 shadow-[0_0_12px_rgba(244,63,94,0.15)]'
      }`}
    >
      <span className="relative flex h-2 w-2">
        <span
          className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
            isConnected ? 'bg-emerald-400' : 'bg-rose-400'
          }`}
        />
        <span
          className={`relative inline-flex rounded-full h-2 w-2 ${
            isConnected ? 'bg-emerald-500' : 'bg-rose-500'
          }`}
        />
      </span>

      <span className="tracking-wide">
        {isConnected ? 'LIVE ENGINE' : 'OFFLINE MODE'}
      </span>

      {isConnected && modelLoaded && (
        <>
          <span className="text-emerald-500/40">•</span>
          <span className="text-[11px] text-emerald-400/90 font-mono tracking-tight">
            XGBoost v2.0
          </span>
        </>
      )}
    </div>
  );
}
