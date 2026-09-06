import React from 'react';
import { Menu, LogOut, User } from 'lucide-react';
import { supabase } from '../supabaseClient';

export default function Header({ userName, onNavigate }) {
  const handleLogout = () => supabase.auth.signOut();

  return (
    <header className="flex items-center justify-between bg-cardBg border border-neonBlue/20 p-4 rounded-dashboard mx-4 mt-4 text-white">
      <div className="flex items-center gap-4">
        <button onClick={() => onNavigate('home')} className="hover:text-neonBlue flex items-center gap-2">
          <Menu size={20} />
          <span className="font-bold tracking-wide uppercase text-xs md:text-sm">{userName || 'BWM USER'}</span>
        </button>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={() => onNavigate('profile')} className="p-2 hover:bg-slate-800 rounded-xl transition text-textMuted hover:text-white">
          <User size={18} />
        </button>
        <button onClick={handleLogout} className="p-2 hover:bg-red-950/40 rounded-xl transition text-red-400 hover:text-red-300">
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
}