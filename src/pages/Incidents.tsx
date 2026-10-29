import { useState } from 'react';
import { useStore } from '../store/useStore';
import IncidentDrawer from '../components/IncidentDrawer';
import { Incident } from '../types';

export default function Incidents() {
  const { incidents } = useStore();
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLevel, setFilterLevel] = useState<string>('ALL');

  const handleRowClick = (incident: Incident) => {
    setSelectedIncident(incident);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedIncident(null);
  };

  const filteredIncidents = incidents.filter((item) => {
    const matchesSearch =
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sourceIp.includes(searchQuery) ||
      item.transactionAmount.toString().includes(searchQuery);
    const matchesLevel = filterLevel === 'ALL' || item.riskLevel === filterLevel;
    return matchesSearch && matchesLevel;
  });

  const getRiskBadge = (level: string) => {
    switch (level) {
      case 'High':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30 shadow-[0_0_10px_rgba(244,63,94,0.15)]';
      case 'Medium':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      default:
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Open':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 animate-pulse';
      case 'Resolved':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'False Positive':
        return 'bg-slate-500/10 text-slate-400 border-slate-500/30';
      default:
        return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
              ALERT QUEUE
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {incidents.length} total events captured
            </span>
          </div>
          <h1 className="text-2xl font-black text-white mt-1 tracking-tight">
            Incident Response & Triage
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Review automated threat alerts, inspect explainable features, and take immediate containment action
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-2">
          {['ALL', 'High', 'Medium'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setFilterLevel(lvl)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filterLevel === lvl
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {lvl === 'ALL' ? 'All Incidents' : `${lvl} Risk`}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter incidents by ID, Source IP, or dollar amount..."
          className="w-full pl-10 pr-4 py-2.5 bg-slate-900/80 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-mono"
        />
      </div>

      {/* Incident Data Table */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden shadow-xl backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/70 text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                <th className="px-6 py-3.5">Incident ID</th>
                <th className="px-6 py-3.5">Source IP</th>
                <th className="px-6 py-3.5">Transaction Amount</th>
                <th className="px-6 py-3.5">Risk Score</th>
                <th className="px-6 py-3.5">Risk Classification</th>
                <th className="px-6 py-3.5">Action Status</th>
                <th className="px-6 py-3.5 text-right">Triage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans text-sm">
              {filteredIncidents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center text-slate-500">
                    <div className="max-w-sm mx-auto flex flex-col items-center">
                      <div className="w-12 h-12 rounded-2xl bg-slate-800/60 flex items-center justify-center text-slate-400 mb-3">
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <p className="text-sm font-bold text-slate-300">No Incidents in Queue</p>
                      <p className="text-xs text-slate-500 mt-1">
                        All transactions within safe normal thresholds or filtered criteria.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredIncidents.map((incident) => (
                  <tr
                    key={incident.id}
                    onClick={() => handleRowClick(incident)}
                    className="hover:bg-slate-800/40 cursor-pointer transition-colors group"
                  >
                    <td className="px-6 py-4 whitespace-nowrap font-mono text-xs font-bold text-cyan-400 group-hover:underline">
                      {incident.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-mono text-xs text-slate-300">
                      {incident.sourceIp}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-mono text-xs font-bold text-white">
                      ${incident.transactionAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-white">
                          {(incident.riskScore * 100).toFixed(1)}%
                        </span>
                        <div className="w-16 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              incident.riskScore > 0.7 ? 'bg-rose-500' : 'bg-amber-500'
                            }`}
                            style={{ width: `${incident.riskScore * 100}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wide border ${getRiskBadge(incident.riskLevel)}`}>
                        {incident.riskLevel}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border ${getStatusBadge(incident.status)}`}>
                        {incident.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRowClick(incident);
                        }}
                        className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 hover:text-white border border-slate-700/80 transition-all"
                      >
                        Inspect →
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Incident Details Drawer */}
      <IncidentDrawer
        incident={selectedIncident}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
      />
    </div>
  );
}
