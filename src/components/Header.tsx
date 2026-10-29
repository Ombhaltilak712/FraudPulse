import { useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '../store/useStore';
import ApiStatus from './ApiStatus';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userRole, logout } = useStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getPageTitle = (path: string) => {
    switch (path) {
      case '/dashboard':
        return { section: 'Operations', title: 'Real-Time Fraud Dashboard' };
      case '/incidents':
        return { section: 'Operations', title: 'Incident Response & Triage' };
      case '/model-monitoring':
        return { section: 'Intelligence', title: 'MLOps Telemetry & Drift Monitor' };
      case '/dataset':
        return { section: 'Intelligence', title: 'IEEE-CIS Fraud Dataset & Benchmark' };
      case '/feedback':
        return { section: 'Platform', title: 'Analyst Validation & Feedback Loop' };
      case '/architecture':
        return { section: 'Platform', title: 'Autonomous System Architecture' };
      default:
        return { section: 'Overview', title: 'Fraud Intelligence Console' };
    }
  };

  const current = getPageTitle(location.pathname);

  return (
    <header className="bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 h-16 flex items-center justify-between px-6 z-20">
      {/* Breadcrumb & Page Info */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <span className="text-slate-400">FraudPulse</span>
          <span>/</span>
          <span className="text-cyan-400 font-mono">{current.section}</span>
          <span>/</span>
        </div>
        <h1 className="text-sm font-semibold text-white tracking-tight">
          {current.title}
        </h1>
      </div>

      {/* Global Actions & Status */}
      <div className="flex items-center gap-4">
        {/* Backend API Status */}
        <ApiStatus />

        {/* User Role Tag */}
        <div className="flex items-center gap-2 px-3 py-1 bg-cyan-950/30 border border-cyan-500/20 rounded-full text-xs text-cyan-300">
          <svg className="w-3.5 h-3.5 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          <span className="font-semibold tracking-wide">{userRole}</span>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-rose-300 hover:bg-rose-950/40 border border-slate-800 hover:border-rose-500/30 rounded-lg transition-all"
          title="Sign out of FraudPulse"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          <span>Sign Out</span>
        </button>
      </div>
    </header>
  );
}
