import React from 'react';
import { Smartphone, RefreshCw, PlusCircle, TrendingUp } from 'lucide-react';

export default function BalanceCard({ xdBalance, kshBalance }) {
  return (
    <div style={{background:'#101D35', borderRadius:'20px', padding:'24px', color:'white', border:'1px solid #1E335B', position:'relative', overflow:'hidden'}}>
      <div style={{display:'flex', alignItems:'center', gap:'6px', color:'#8A9BB5', fontSize:'11px', fontWeight:'600', marginBottom:'16px', letterSpacing:'1px'}}>
        <span>💼</span> TOTAL BALANCE
      </div>

      <div style={{display:'flex', gap:'8px', marginBottom:'24px', position:'relative', zIndex:10}}>
        <button style={{display:'flex', alignItems:'center', gap:'6px', background:'#1A2744', color:'#8A9BB5', fontSize:'11px', padding:'6px 12px', borderRadius:'20px', border:'1px solid #1E335B', cursor:'pointer'}}>
          <Smartphone size={13} /> App
        </button>
        <button style={{display:'flex', alignItems:'center', gap:'6px', background:'#1A2744', color:'#8A9BB5', fontSize:'11px', padding:'6px 12px', borderRadius:'20px', border:'1px solid #1E335B', cursor:'pointer'}}>
          <RefreshCw size={13} /> Sell XD
        </button>
        <button style={{display:'flex', alignItems:'center', gap:'6px', background:'#1A2744', color:'white', fontSize:'11px', padding:'6px 12px', borderRadius:'20px', border:'1px solid #1E335B', cursor:'pointer'}}>
          <PlusCircle size={13} /> Top Up
        </button>
      </div>

      <div style={{marginBottom:'16px', position:'relative', zIndex:10}}>
        <div style={{fontSize:'36px', fontWeight:'bold', display:'flex', alignItems:'baseline', gap:'8px'}}>
          {Number(xdBalance).toFixed(3)} <span style={{fontSize:'18px', fontWeight:500, color:'#8A9BB5'}}>XD</span>
        </div>
        <div style={{color:'#8A9BB5', fontSize:'13px', marginTop:'4px'}}>{Number(kshBalance).toFixed(2)} KSH</div>
      </div>

      <div style={{display:'inline-flex', alignItems:'center', gap:'4px', background:'rgba(42,92,255,0.15)', color:'#60a5fa', border:'1px solid rgba(42,92,255,0.3)', fontSize:'11px', fontWeight:'500', padding:'3px 8px', borderRadius:'6px', marginBottom:'8px', position:'relative', zIndex:10}}>
        <TrendingUp size={12} /> +4.2%
      </div>

      <div style={{position:'absolute', bottom:0, left:0, right:0, height:'64px', opacity:0.3, pointerEvents:'none'}}>
        <svg viewBox="0 0 400 100" fill="none" style={{width:'100%', height:'100%'}}>
          <path d="M0,80 Q100,20 200,70 T400,30" stroke="#3B82F6" strokeWidth="3" />
        </svg>
      </div>
    </div>
  );
}