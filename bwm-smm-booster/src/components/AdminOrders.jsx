import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    // Simple fetch without join - hii ndio ilikuwa inaua Vercel
    const { data, error } = await supabase.from('smm_orders').select('*').order('created_at', { ascending: false });
    if(error) console.log(error);
    setOrders(data || []);
    setLoading(false);
  };

  useEffect(()=>{ fetchOrders(); }, []);

  const updateStatus = async (id, status) => {
    await supabase.from('smm_orders').update({ status }).eq('id', id);
    fetchOrders();
  };

  if(loading) return <div style={{color:'#8A9BB5', padding:'20px'}}>Loading orders...</div>;

  return (
    <div style={{background:'#101D35', borderRadius:'20px', padding:'20px', border:'1px solid #1E335B', color:'white'}}>
      <h2 style={{fontSize:'16px', fontWeight:'bold', marginBottom:'16px'}}>📋 Admin - SMM Orders ({orders.length})</h2>
      {orders.length === 0 && <div style={{color:'#8A9BB5', fontSize:'13px'}}>There's no orders for now.</div>}
      {orders.map(o => (
        <div key={o.id} style={{background:'#0C1A32', border:'1px solid #1E335B', borderRadius:'12px', padding:'12px', marginBottom:'10px'}}>
          <div style={{display:'flex', justifyContent:'space-between', marginBottom:'6px'}}>
            <span style={{fontSize:'12px', fontWeight:'bold'}}>{o.platform} - {o.service_type} x{o.quantity}</span>
            <span style={{fontSize:'10px', padding:'3px 8px', borderRadius:'10px', background: o.status==='completed' ? 'rgba(34,197,94,0.2)' : 'rgba(42,92,255,0.2)', color: o.status==='completed' ? '#4ade80' : '#60a5fa'}}>{o.status}</span>
          </div>
          <div style={{fontSize:'11px', color:'#8A9BB5', wordBreak:'break-all', marginBottom:'6px'}}>{o.target_link}</div>
          <div style={{fontSize:'11px', color:'#8A9BB5', marginBottom:'8px'}}>User: {o.user_id.slice(0,8)}... • Cost: {o.cost_xd} XD • {new Date(o.created_at).toLocaleString()}</div>
          <div style={{display:'flex', gap:'6px'}}>
            <button onClick={()=>updateStatus(o.id, 'processing')} style={{fontSize:'10px', padding:'5px 10px', borderRadius:'8px', border:'1px solid #2A5CFF', background:'transparent', color:'#2A5CFF', cursor:'pointer'}}>Processing</button>
            <button onClick={()=>updateStatus(o.id, 'completed')} style={{fontSize:'10px', padding:'5px 10px', borderRadius:'8px', background:'#22c55e', color:'white', border:'none', cursor:'pointer'}}>Mark Done ✅</button>
          </div>
        </div>
      ))}
    </div>
  );
}