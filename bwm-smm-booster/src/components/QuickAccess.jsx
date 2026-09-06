import React from 'react';
import { Megaphone, User, Home, Layers } from 'lucide-react';

export default function QuickAccess({ onNavigate }) {
  const actions = [
    { label: 'Dashboard', icon: Home, target: 'home' },
    { label: 'Boost SMM', icon: Megaphone, target: 'boosting' },
    { label: 'Profile Account', icon: User, target: 'profile' },
  ];

  return (
    <div className="bg-cardBg/40 rounded-dashboard p-6 border border-slate-900 text-white">
      <h3 className="text-textMuted text-xs font-bold tracking-wider uppercase mb-4">Quick Access</h3>
      <div className="grid grid-cols-3 gap-3">
        {actions.map((item, index) => {
          const Icon = item.icon;
          return (
            <button key={index} onClick={() => onNavigate(item.target)} className="flex flex-col items-center justify-center gap-2 bg-cardBg border border-slate-800/80 hover:border-accentBlue/50 p-4 rounded-xl transition">
              <div className="bg-blue-950/60 p-2.5 rounded-xl text-accentBlue">
                <Icon size={18} />
              </div>
              <span className="text-[11px] font-medium tracking-wide text-center">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}