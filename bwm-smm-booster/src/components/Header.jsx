import React from 'react';
import { Menu, LogOut, User } from 'lucide-react';
import { supabase } from '../supabaseClient';

export default function Header({ userName, onNavigate }) {
  const handleLogout = () => supabase.auth.signOut();

  return (
    <header style={{display:'flex', alignItems:'center', justifyContent:'space-between', background:'#101D35', border:'1px solid rgba(42,92,255,0.2)', padding:'16px', borderRadius:'20px', margin:'16px 16px 0 16px', color:'white'}}>
      <div style={{display:'flex', alignItems:'center', gap:'16px'}}>
        <button onClick={() => onNavigate('home')} style={{display:'flex', alignItems:'center', gap:'8px', background:'transparent', border:'none', color:'white', cursor:'pointer'}}>
          <Menu size={20} />
          <span style={{fontWeight:'bold', letterSpacing:'1px', textTransform:'uppercase', fontSize:'12px'}}>{userName || 'BWM USER'}</span>
        </button>
      </div>
      <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
        <button onClick={() => onNavigate('profile')} style={{padding:'8px', background:'#0C1A32', border:'1px solid #1E335B', borderRadius:'12px', color:'#8A9BB5', cursor:'pointer', display:'flex', alignItems:'center'}}>
          <User size={18} />
        </button>
        <button onClick={handleLogout} style={{padding:'8px', background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.2)', borderRadius:'12px', color:'#f87171', cursor:'pointer', display:'flex', alignItems:'center'}}>
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
}
