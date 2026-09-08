import React from 'react';

export default function Profile({ profile }) {
  return (
    <div style={{minHeight:'100vh', background:'#050A18', padding:'16px', paddingBottom:'90px'}}>
      <div style={{background:'#101D35', border:'1px solid #1E335B', padding:'24px', borderRadius:'20px', color:'white'}}>
        
        <h3 style={{fontSize:'14px', fontWeight:'bold', textTransform:'uppercase', letterSpacing:'1px', borderBottom:'1px solid #1E335B', paddingBottom:'12px', marginBottom:'16px'}}>
          Account Analytics
        </h3>
        
        <div style={{display:'flex', flexDirection:'column', gap:'16px'}}>
          <div>
            <span style={{display:'block', fontSize:'10px', color:'#8A9BB5', textTransform:'uppercase', letterSpacing:'1px', marginBottom:'4px'}}>Identity User</span>
            <span style={{fontSize:'14px', fontWeight:500}}>{profile?.fullName || 'User'}</span>
          </div>
          
          <div>
            <span style={{display:'block', fontSize:'10px', color:'#8A9BB5', textTransform:'uppercase', letterSpacing:'1px', marginBottom:'4px'}}>Unique Referral Token</span>
            <span style={{fontSize:'13px', fontFamily:'monospace', color:'#3B82F6', background:'#0C1A32', padding:'6px 10px', borderRadius:'8px', display:'inline-block', border:'1px solid #1E335B'}}>
              {profile?.referralCode || 'N/A'}
            </span>
          </div>
          
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', marginTop:'8px', background:'#0C1A32', padding:'16px', borderRadius:'14px', border:'1px solid #1E335B'}}>
            <div>
              <div style={{fontSize:'10px', color:'#8A9BB5', marginBottom:'4px'}}>WALLET (XD)</div>
              <div style={{fontSize:'18px', fontWeight:'bold', color:'white'}}>{profile?.xdBalance || '0.000'}</div>
            </div>
            <div>
              <div style={{fontSize:'10px', color:'#8A9BB5', marginBottom:'4px'}}>FIAT (KSH)</div>
              <div style={{fontSize:'18px', fontWeight:'bold', color:'white'}}>{profile?.kshBalance || '0.00'}</div>
            </div>
          </div>

          <button style={{marginTop:'12px', width:'100%', background:'#2A5CFF', color:'white', border:'none', padding:'12px', borderRadius:'12px', fontWeight:'bold', fontSize:'13px', cursor:'pointer'}}>
            Copy Referral Link
          </button>
          <button style={{width:'100%', background:'#0C1A32', color:'#8A9BB5', border:'1px solid #1E335B', padding:'12px', borderRadius:'12px', fontSize:'13px', cursor:'pointer'}}>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}