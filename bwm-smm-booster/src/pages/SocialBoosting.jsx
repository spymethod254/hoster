import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const PLATFORMS = [
  { id: 'Instagram', rate: 0.002, icon: '📸' },
  { id: 'TikTok', rate: 0.0015, icon: '🎵' },
  { id: 'YouTube', rate: 0.003, icon: '▶️' },
  { id: 'Facebook', rate: 0.001, icon: '👍' },
];
const SERVICES = ['Followers', 'Likes', 'Views', 'Comments'];

export default function SocialBoosting({ userId, xdBalance, onOrderSuccess }) {
  const [platform, setPlatform] = useState('Instagram');
  const [service, setService] = useState('Followers');
  const [link, setLink] = useState('');
  const [qty, setQty] = useState(100);
  const [loading, setLoading] = useState(false);

  const currentRate = PLATFORMS.find(p => p.id === platform)?.rate || 0.002;
  const cost = qty * currentRate;

  const handleOrder = async () => {
    if (!link) return alert('Weka link bana!');
    if (cost > xdBalance) return alert(`Balance haitoshi! Unahitaji ${cost.toFixed(3)} XD, uko na ${xdBalance} XD`);
    
    setLoading(true);
    try {
      // 1. Insert order
      const { error: orderError } = await supabase.from('smm_orders').insert({
        user_id: userId,
        platform,
        service_type: service,
        target_link: link,
        quantity: qty,
        cost_xd: cost,
        status: 'processing'
      });
      if (orderError) throw orderError;

      // 2. Deduct XD
      const { error: balError } = await supabase.from('profiles').update({
        xd_balance: xdBalance - cost
      }).eq('id', userId);
      if (balError) throw balError;

      alert(`✅ Order placed! ${qty} ${service} on ${platform}`);
      setLink('');
      if (onOrderSuccess) onOrderSuccess();
    } catch (e) {
      alert('Error: ' + e.message);
    }
    setLoading(false);
  };

  return (
    <div style={{background:'#101D35', borderRadius:'20px', padding:'20px', border:'1px solid #1E335B', color:'white'}}>
      <h2 style={{fontSize:'16px', fontWeight:'bold', marginBottom:'16px'}}>🚀 Boost SMM</h2>

      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px', marginBottom:'16px'}}>
        {PLATFORMS.map(p => (
          <button key={p.id} onClick={()=>setPlatform(p.id)} style={{padding:'12px', borderRadius:'12px', border: platform===p.id ? '1px solid #2A5CFF' : '1px solid #1E335B', background: platform===p.id ? 'rgba(42,92,255,0.2)' : '#0C1A32', color:'white', cursor:'pointer', textAlign:'left'}}>
            <div style={{fontSize:'18px'}}>{p.icon}</div>
            <div style={{fontSize:'12px', fontWeight:'600'}}>{p.id}</div>
            <div style={{fontSize:'10px', color:'#8A9BB5'}}>{p.rate} XD/unit</div>
          </button>
        ))}
      </div>

      <div style={{display:'flex', gap:'8px', marginBottom:'16px'}}>
        {SERVICES.map(s => (
          <button key={s} onClick={()=>setService(s)} style={{padding:'6px 12px', borderRadius:'20px', fontSize:'11px', border: service===s ? '1px solid #2A5CFF' : '1px solid #1E335B', background: service===s ? '#2A5CFF' : '#0C1A32', color:'white', cursor:'pointer'}}>{s}</button>
        ))}
      </div>

      <input value={link} onChange={e=>setLink(e.target.value)} placeholder="Paste your post/profile link" style={{width:'100%', padding:'12px', borderRadius:'12px', background:'#0C1A32', border:'1px solid #1E335B', color:'white', fontSize:'13px', marginBottom:'12px', outline:'none'}} />

      <div style={{marginBottom:'16px'}}>
        <div style={{display:'flex', justifyContent:'space-between', fontSize:'12px', color:'#8A9BB5', marginBottom:'6px'}}><span>Quantity: {qty}</span><span style={{color:'#2A5CFF', fontWeight:'bold'}}>{cost.toFixed(3)} XD</span></div>
        <input type="range" min="50" max="10000" step="50" value={qty} onChange={e=>setQty(Number(e.target.value))} style={{width:'100%', accentColor:'#2A5CFF'}} />
      </div>

      <button onClick={handleOrder} disabled={loading} style={{width:'100%', padding:'14px', borderRadius:'12px', background: loading ? '#1A2744' : '#2A5CFF', color:'white', fontWeight:'bold', fontSize:'13px', border:'none', cursor:'pointer'}}>
        {loading ? 'Processing...' : `Order ${qty} ${service} - ${cost.toFixed(3)} XD`}
      </button>
      <div style={{fontSize:'10px', color:'#8A9BB5', marginTop:'8px', textAlign:'center'}}>Balance: {xdBalance?.toFixed(3)} XD • Instant delivery</div>
    </div>
  );
}