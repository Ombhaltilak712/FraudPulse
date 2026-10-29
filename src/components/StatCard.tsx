import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: string | React.ReactNode;
  subtitle?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'cyan' | 'rose' | 'amber' | 'emerald' | 'indigo' | 'default';
}

export default function StatCard({
  title,
  value,
  icon,
  subtitle,
  trend,
  variant = 'default',
}: StatCardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'rose':
        return {
          glow: 'from-rose-500/10 via-transparent to-transparent',
          border: 'hover:border-rose-500/40',
          iconBg: 'bg-rose-500/10 text-rose-400 border border-rose-500/20',
          accent: 'text-rose-400',
        };
      case 'amber':
        return {
          glow: 'from-amber-500/10 via-transparent to-transparent',
          border: 'hover:border-amber-500/40',
          iconBg: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
          accent: 'text-amber-400',
        };
      case 'emerald':
        return {
          glow: 'from-emerald-500/10 via-transparent to-transparent',
          border: 'hover:border-emerald-500/40',
          iconBg: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
          accent: 'text-emerald-400',
        };
      case 'indigo':
        return {
          glow: 'from-indigo-500/10 via-transparent to-transparent',
          border: 'hover:border-indigo-500/40',
          iconBg: 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20',
          accent: 'text-indigo-400',
        };
      case 'cyan':
      default:
        return {
          glow: 'from-cyan-500/10 via-transparent to-transparent',
          border: 'hover:border-cyan-500/40',
          iconBg: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20',
          accent: 'text-cyan-400',
        };
    }
  };

  const v = getVariantStyles();

  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-slate-900/75 border border-slate-800/90 p-5 backdrop-blur-md transition-all duration-300 hover:shadow-xl hover:shadow-black/60 ${v.border}`}
    >
      {/* Top subtle gradient highlight */}
      <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${v.glow}`} />

      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            {title}
          </p>
          <p className="text-2xl font-black text-white mt-1.5 tracking-tight font-mono">
            {value}
          </p>

          {subtitle && (
            <p className="text-xs text-slate-500 mt-1">{subtitle}</p>
          )}

          {trend && (
            <div className="flex items-center gap-1.5 mt-2.5">
              <span
                className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold ${
                  trend.isPositive
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                }`}
              >
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
              <span className="text-[11px] text-slate-500">vs benchmark</span>
            </div>
          )}
        </div>

        {icon && (
          <div className={`flex items-center justify-center w-11 h-11 rounded-xl ${v.iconBg} text-xl shadow-inner`}>
            {typeof icon === 'string' ? <span>{icon}</span> : icon}
          </div>
        )}
      </div>
    </div>
  );
}
