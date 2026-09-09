import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const fetchOrders = async () => {
    let query = supabase.from('smm_orders').select('*').order('created_at', { ascending: false });
    if(filter!== 'all') query = query.eq('status', filter);
    const { data } = await query;
    setOrders(data || []);
    setLoading(false);
  };

  useEffect(()=>{ fetchOrders(); }, [filter]);

  const updateStatus = async (id, status) => {
    await supabase.from('smm_orders').update({ status }).eq('id', id);
    fetchOrders();
  };

  if(loading) return <div style={{color:'#8A9BB5', padding:'20px'}}>Loading orders...</div>;

  return (
    <div style={{background:'#101D35', borderRadius:'20px', padding:'16px', border:'1px solid #1E335B', color:'white'}}>
      <h2 style={{fontSize:'15px', fontWeight:'bold', marginBottom:'12px'}}>📋 Admin - SMM Orders ({orders.length})</h2>

      <div style={{display:'flex', gap:'6px', marginBottom:'12px'}}>
        {['all','pending','processing','completed'].map(f => (
          <button key={f} onClick={()=>{setLoading(true); setFilter(f);}}
            style={{fontSize:'11px', padding:'5px 10px', borderRadius:'20px', border:'1px solid #1E335B', background: filter===f? '#2A5CFF' : 'transparent', color: filter===f? 'white' : '#8A9BB5', textTransform:'capitalize'}}>
            {f}
          </button>
        ))}
      </div>

      {orders.length === 0 && <div style={{color:'#8A9BB5', fontSize:'13px', textAlign:'center', padding:'20px'}}>Hakuna orders bado bana</div>}

      {orders.map(o => (
        <div key={o.id} style={{background:'#0C1A32', border:'1px solid #1E335B', borderRadius:'12px', padding:'12px', marginBottom:'10px'}}>
          <div style={{display:'flex', justifyContent:'space-between', marginBottom:'6px'}}>
            <span style={{fontSize:'12px', fontWeight:'bold'}}>{o.platform} - {o.service_type} x{o.quantity}</span>
            <span style={{fontSize:'10px', padding:'3px 8px', borderRadius:'10px', background: o.status==='completed'? 'rgba(34,197,94,0.2)' : o.status==='processing'? 'rgba(42,92,255,0.2)' : 'rgba(234,179,8,0.2)', color: o.status==='completed'? '#4ade80' : o.status==='processing'? '#60a5fa' : '#facc15'}}>{o.status}</span>
          </div>
          <div style={{fontSize:'11px', color:'#8A9BB5', wordBreak:'break-all', marginBottom:'6px'}}>{o.target_link}</div>
          <div style={{fontSize:'11px', color:'#8A9BB5', marginBottom:'8px'}}>Cost: {o.cost_xd} XD • {new Date(o.created_at).toLocaleString()}<br/>UserID: {o.user_id.slice(0,12)}...</div>
          <div style={{display:'flex', gap:'6px'}}>
            <button onClick={()=>updateStatus(o.id, 'processing')} style={{fontSize:'10px', padding:'6px 12px', borderRadius:'8px', border:'1px solid #2A5CFF', background:'transparent', color:'#2A5CFF'}}>Processing</button>
            <button onClick={()=>updateStatus(o.id, 'completed')} style={{fontSize:'10px', padding:'6px 12px', borderRadius:'8px', background:'#22c55e', color:'white', border:'none'}}>Mark Done ✅</button>
            <button onClick={()=>updateStatus(o.id, 'pending')} style={{fontSize:'10px', padding:'6px 12px', borderRadius:'8px', background:'transparent', border:'1px solid #444', color:'#888'}}>Pending</button>
          </div>
        </div>
      ))}
    </div>
  );
}