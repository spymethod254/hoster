import React from 'react';
import BalanceCard from '../components/BalanceCard';
import QuickAccess from '../components/QuickAccess';

export default function Homepage({ profile, onNavigate }) {
  return (
    <div className="flex flex-col gap-6">
      <BalanceCard xdBalance={profile.xdBalance} kshBalance={profile.kshBalance} />
      
      {/* Visual Multipliers Match Screenshot Layout */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-cardBg border border-slate-800/60 p-4 rounded-xl text-center">
          <div className="text-xs text-textMuted font-bold uppercase mb-1">Buy Multipliers</div>
          <div className="text-neonBlue text-sm font-semibold">1,000xd = +250xds</div>
        </div>
        <div className="bg-cardBg border border-slate-800/60 p-4 rounded-xl text-center">
          <div className="text-xs text-textMuted font-bold uppercase mb-1">Refer & Reward</div>
          <div className="text-green-400 text-xs font-semibold">Earn 5 XD per top up</div>
        </div>
      </div>

      <QuickAccess onNavigate={onNavigate} />
    </div>
  );
}