import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mfaCode, setMfaCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password && mfaCode) {
      login(email, password, mfaCode);
      navigate('/dashboard');
    }
  };

  const handleQuickDemo = () => {
    setEmail('analyst@fraudpulse.ai');
    setPassword('CyberShield2026!');
    setMfaCode('849201');
  };

  return (
    <div className="min-h-screen bg-slate-950 cyber-grid flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background radial glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/10 via-blue-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full relative z-10">
        {/* Brand Card */}
        <div className="rounded-2xl bg-slate-900/80 border border-slate-800/90 shadow-2xl shadow-black/80 backdrop-blur-xl p-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/25 mb-4 ring-1 ring-white/20">
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <path d="m9 12 2 2 4-4"/>
              </svg>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <span className="text-3xl font-black text-white tracking-tight">Fraud</span>
              <span className="text-3xl font-black text-cyan-400 tracking-tight">Pulse</span>
            </div>
            <p className="text-xs font-medium text-slate-400 mt-1 uppercase tracking-widest">
              Autonomous Fraud Intelligence Platform
            </p>
          </div>

          {/* Security Notice */}
          <div className="rounded-xl bg-cyan-950/30 border border-cyan-500/20 p-3.5 mb-6 flex items-start gap-3">
            <div className="text-cyan-400 mt-0.5">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
                Authorized Personnel Only
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                Access restricted to authenticated SOC Analysts & Fraud Risk Teams.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Security Identity / Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950/70 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-mono"
                placeholder="analyst@fraudpulse.ai"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950/70 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-mono"
                placeholder="••••••••••••"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="mfa" className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                  MFA Security Code
                </label>
                <span className="text-[10px] text-cyan-400 font-mono">6-Digit TOTP</span>
              </div>
              <input
                id="mfa"
                type="text"
                value={mfaCode}
                onChange={(e) => setMfaCode(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950/70 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-mono tracking-widest text-center"
                placeholder="000000"
                maxLength={6}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <span>Authenticate & Enter Console</span>
            </button>
          </form>

          {/* Quick Demo Fill */}
          <div className="mt-6 pt-5 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-500">Demo Environment:</span>
            <button
              type="button"
              onClick={handleQuickDemo}
              className="text-cyan-400 hover:text-cyan-300 font-medium underline underline-offset-4 transition-colors"
            >
              Fill Demo Credentials
            </button>
          </div>
        </div>

        {/* Security watermark footer */}
        <p className="text-[11px] text-center text-slate-500 mt-6 tracking-wide">
          FraudPulse Autonomous Intelligence • Sub-50ms Defense Layer
        </p>
      </div>
    </div>
  );
}
