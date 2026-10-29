import { Link, useLocation } from 'react-router-dom';

interface NavItem {
  path: string;
  label: string;
  category: 'OPERATIONS' | 'INTELLIGENCE' | 'PLATFORM';
  icon: JSX.Element;
  badge?: string;
}

const navItems: NavItem[] = [
  {
    path: '/dashboard',
    label: 'Dashboard',
    category: 'OPERATIONS',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="7" height="9" x="3" y="3" rx="1" />
        <rect width="7" height="5" x="14" y="3" rx="1" />
        <rect width="7" height="9" x="14" y="12" rx="1" />
        <rect width="7" height="5" x="3" y="16" rx="1" />
      </svg>
    ),
  },
  {
    path: '/incidents',
    label: 'Incidents Queue',
    category: 'OPERATIONS',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    badge: 'LIVE',
  },
  {
    path: '/model-monitoring',
    label: 'Model Telemetry',
    category: 'INTELLIGENCE',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    path: '/dataset',
    label: 'IEEE-CIS Dataset',
    category: 'INTELLIGENCE',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5V19A9 3 0 0 0 21 19V5" />
        <path d="M3 12A9 3 0 0 0 21 12" />
      </svg>
    ),
  },
  {
    path: '/feedback',
    label: 'Feedback & Loop',
    category: 'PLATFORM',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
  },
  {
    path: '/architecture',
    label: 'Architecture Map',
    category: 'PLATFORM',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-slate-950/95 border-r border-slate-800/80 flex flex-col justify-between select-none z-30">
      <div>
        {/* Brand Header */}
        <div className="px-6 py-5 border-b border-slate-800/80 flex items-center gap-3">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-md shadow-cyan-500/20 text-white font-black text-lg">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <path d="m9 12 2 2 4-4"/>
            </svg>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 ring-2 ring-slate-950 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-bold text-lg text-white tracking-tight">Fraud</span>
              <span className="font-extrabold text-lg text-cyan-400 tracking-tight">Pulse</span>
            </div>
            <p className="text-[10px] uppercase font-semibold text-slate-400 tracking-widest -mt-0.5">
              Fraud Intelligence
            </p>
          </div>
        </div>

        {/* Navigation Groups */}
        <nav className="p-4 space-y-6">
          <div>
            <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
              Operations
            </p>
            <ul className="space-y-1">
              {navItems.filter(i => i.category === 'OPERATIONS').map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/10 text-cyan-300 border-l-2 border-cyan-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={isActive ? 'text-cyan-400' : 'text-slate-500'}>
                          {item.icon}
                        </span>
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
              Intelligence & MLOps
            </p>
            <ul className="space-y-1">
              {navItems.filter(i => i.category === 'INTELLIGENCE').map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/10 text-cyan-300 border-l-2 border-cyan-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={isActive ? 'text-cyan-400' : 'text-slate-500'}>
                          {item.icon}
                        </span>
                        <span>{item.label}</span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
              Platform & Architecture
            </p>
            <ul className="space-y-1">
              {navItems.filter(i => i.category === 'PLATFORM').map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/10 text-cyan-300 border-l-2 border-cyan-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={isActive ? 'text-cyan-400' : 'text-slate-500'}>
                          {item.icon}
                        </span>
                        <span>{item.label}</span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </div>

      {/* Cyber Security Status Footer */}
      <div className="p-4 m-3 rounded-xl bg-slate-900/80 border border-slate-800/80">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
            SYSTEM STATUS
          </span>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
        </div>
        <p className="text-[11px] text-slate-400">
          Inference Engine: <span className="text-emerald-400 font-mono font-semibold">Sub-50ms</span>
        </p>
        <p className="text-[11px] text-slate-400">
          Protection Level: <span className="text-cyan-400 font-semibold">Active Shield</span>
        </p>
      </div>
    </aside>
  );
}
