import React from 'react';
import AdminOrders from '../components/AdminOrders';

export default function Homepage({ profile, onNavigate }) {
  const xd = profile?.xd_balance ?? profile?.xdBalance ?? '0.000';
  const ksh = profile?.ksh_balance ?? profile?.kshBalance ?? '0.00';

  return (
    <div style={{display:'flex', flexDirection:'column', gap:'20px', background:'#050A18', minHeight:'100vh', padding:'16px', paddingBottom:'90px'}}>

      {/* BALANCE CARD */}
      <div style={{background:'#101D35', border:'1px solid #1E335B', borderRadius:'20px', padding:'20px'}}>
        <div style={{display:'flex', alignItems:'center', gap:'8px', color:'#8A9BB5', fontSize:'11px', fontWeight:'bold', letterSpacing:'1px'}}>
          <span style={{fontSize:'14px'}}>💼</span> TOTAL BALANCE
        </div>
        <div style={{display:'flex', gap:'8px', marginTop:'12px'}}>
          <span style={{background:'#1A2744', color:'#8A9BB5', padding:'5px 10px', borderRadius:'8px', fontSize:'11px'}}>📱 App</span>
          <span style={{background:'#1A2744', color:'#8A9BB5', padding:'5px 10px', borderRadius:'8px', fontSize:'11px'}}>↻ Sell XD</span>
          <span style={{background:'#1A2744', color:'white', padding:'5px 10px', borderRadius:'8px', fontSize:'11px'}}>⊕ Top Up</span>
        </div>
        <div style={{marginTop:'16px'}}>
          <div style={{color:'white', fontSize:'22px', fontWeight:'bold'}}>{xd} XD</div>
          <div style={{color:'#8A9BB5', fontSize:'15px', marginTop:'2px'}}>{ksh} KSH</div>
          <div style={{color:'#22c55e', fontSize:'13px', marginTop:'6px'}}>↗ +4.2%</div>
        </div>
      </div>

      {/* MULTIPLIERS */}
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px'}}>
        <div style={{background:'#101D35', border:'1px solid #1E335B', padding:'16px', borderRadius:'16px', textAlign:'center'}}>
          <div style={{fontSize:'10px', color:'#8A9BB5', fontWeight:'bold', textTransform:'uppercase', marginBottom:'6px'}}>Buy Multipliers</div>
          <div style={{color:'#3B82F6', fontSize:'13px', fontWeight:'600'}}>1,000xd = +250xds</div>
        </div>
        <div style={{background:'#101D35', border:'1px solid #1E335B', padding:'16px', borderRadius:'16px', textAlign:'center'}}>
          <div style={{fontSize:'10px', color:'#8A9BB5', fontWeight:'bold', textTransform:'uppercase', marginBottom:'6px'}}>Refer & Reward</div>
          <div style={{color:'#22c55e', fontSize:'12px', fontWeight:'600'}}>Earn 5 XD per top up</div>
        </div>
      </div>

      {/* QUICK ACCESS */}
      <div>
        <h3 style={{color:'white', fontSize:'16px', fontWeight:'bold', marginBottom:'12px'}}>Quick Access</h3>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'10px'}}>
          <button onClick={()=>onNavigate('dashboard')} style={{background:'#101D35', border:'1px solid #1E335B', borderRadius:'14px', padding:'16px 8px', color:'white', display:'flex', flexDirection:'column', alignItems:'center', gap:'6px', cursor:'pointer'}}>
            <span style={{fontSize:'20px'}}>⌂</span>
            <span style={{fontSize:'11px', color:'#8A9BB5'}}>Dashboard</span>
          </button>
          <button onClick={()=>onNavigate('boost')} style={{background:'#101D35', border:'1px solid #1E335B', borderRadius:'14px', padding:'16px 8px', color:'white', display:'flex', flexDirection:'column', alignItems:'center', gap:'6px', cursor:'pointer'}}>
            <span style={{fontSize:'20px'}}>📢</span>
            <span style={{fontSize:'11px', color:'#8A9BB5'}}>Boost SMM</span>
          </button>
          <button onClick={()=>onNavigate('profile')} style={{background:'#101D35', border:'1px solid #1E335B', borderRadius:'14px', padding:'16px 8px', color:'white', display:'flex', flexDirection:'column', alignItems:'center', gap:'6px', cursor:'pointer'}}>
            <span style={{fontSize:'20px'}}>👤</span>
            <span style={{fontSize:'11px', color:'#8A9BB5'}}>Profile</span>
          </button>
        </div>
      </div>

      {/* 2. ADMIN ORDERS - WEKA HAPA CHINI KABISA */}
      {profile?.is_admin && (
        <div style={{marginTop:'10px'}}>
          <AdminOrders />
        </div>
      )}

    </div>
  );
}