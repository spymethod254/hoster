import React from 'react';
import { Megaphone, User, Home } from 'lucide-react';

export default function QuickAccess({ onNavigate }) {
  const actions = [
    { label: 'Dashboard', icon: Home, target: 'home' },
    { label: 'Boost SMM', icon: Megaphone, target: 'boosting' },
    { label: 'Profile Account', icon: User, target: 'profile' },
  ];

  return (
    <div style={{background:'rgba(16,29,53,0.4)', borderRadius:'20px', padding:'24px', border:'1px solid #1E335B', color:'white'}}>
      <h3 style={{color:'#8A9BB5', fontSize:'11px', fontWeight:'bold', letterSpacing:'1px', textTransform:'uppercase', marginBottom:'16px'}}>Quick Access</h3>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'12px'}}>
        {actions.map((item, index) => {
          const Icon = item.icon;
          return (
            <button key={index} onClick={() => onNavigate(item.target)} style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'8px', background:'#101D35', border:'1px solid #1E335B', padding:'16px 8px', borderRadius:'14px', cursor:'pointer'}}>
              <div style={{background:'rgba(42,92,255,0.15)', padding:'10px', borderRadius:'12px', color:'#2A5CFF'}}>
                <Icon size={18} />
              </div>
              <span style={{fontSize:'11px', fontWeight:500, textAlign:'center', color:'white'}}>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
