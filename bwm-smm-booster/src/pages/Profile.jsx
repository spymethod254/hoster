import React from 'react';

export default function Profile({ profile }) {
  return (
    <div className="bg-cardBg border border-slate-800 p-6 rounded-dashboard text-white">
      <h3 className="text-base font-bold uppercase tracking-wider border-b border-slate-800 pb-3 mb-4">Account Analytics</h3>
      <div className="flex flex-col gap-4">
        <div>
          <span className="block text-xs text-textMuted uppercase">Identity User</span>
          <span className="text-sm font-medium">{profile.fullName}</span>
        </div>
        <div>
          <span className="block text-xs text-textMuted uppercase">Unique Referral Token</span>
          <span className="text-sm font-mono text-neonBlue">{profile.referralCode || 'N/A'}</span>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-2 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
          <div>
            <div className="text-xs text-textMuted">WALLET (XD)</div>
            <div className="text-lg font-bold text-white">{profile.xdBalance}</div>
          </div>
          <div>
            <div className="text-xs text-textMuted">FIAT (KSH)</div>
            <div className="text-lg font-bold text-white">{profile.kshBalance}</div>
          </div>
        </div>
      </div>
    </div>
  );
}