import React from 'react';
import { Smartphone, RefreshCw, PlusCircle, TrendingUp } from 'lucide-react';

export default function BalanceCard({ xdBalance, kshBalance }) {
  return (
    <div className="bg-cardBg rounded-dashboard p-6 text-white border border-slate-800 relative overflow-hidden">
      <div className="flex items-center gap-2 text-textMuted text-xs font-semibold mb-4">
        <span>💼</span> TOTAL BALANCE
      </div>
      
      <div className="flex gap-2 mb-6 z-10 relative">
        <button className="flex items-center gap-1.5 bg-slate-800/60 hover:bg-slate-800 text-xs px-3 py-1.5 rounded-full border border-slate-700">
          <Smartphone size={13} /> App
        </button>
        <button className="flex items-center gap-1.5 bg-slate-800/60 hover:bg-slate-800 text-xs px-3 py-1.5 rounded-full border border-slate-700">
          <RefreshCw size={13} /> Sell XD
        </button>
        <button className="flex items-center gap-1.5 bg-slate-800/60 hover:bg-slate-800 text-xs px-3 py-1.5 rounded-full border border-slate-700">
          <PlusCircle size={13} /> Top Up
        </button>
      </div>

      <div className="mb-4 relative z-10">
        <div className="text-5xl font-bold flex items-baseline gap-2">
          {Number(xdBalance).toFixed(3)} <span className="text-xl font-medium text-slate-400">XD</span>
        </div>
        <div className="text-textMuted text-sm mt-1">{Number(kshBalance).toFixed(2)} KSH</div>
      </div>

      <div className="inline-flex items-center gap-1 bg-blue-950/40 text-blue-400 border border-blue-900/50 text-xs font-medium px-2 py-0.5 rounded-md mb-2 relative z-10">
        <TrendingUp size={12} /> +4.2%
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 opacity-30 pointer-events-none">
        <svg viewBox="0 0 400 100" fill="none" className="w-full h-full stroke-[3px] stroke-blue-500">
          <path d="M0,80 Q100,20 200,70 T400,30" />
        </svg>
      </div>
    </div>
  );
}