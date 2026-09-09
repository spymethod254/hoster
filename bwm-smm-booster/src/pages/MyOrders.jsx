import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyOrders = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if(!user) return;

    const { data } = await supabase
     .from('smm_orders')
     .select('*')
     .eq('user_id', user.id)
     .order('created_at', { ascending: false });

    setOrders(data || []);
    setLoading(false);
  };

  useEffect(()=>{ fetchMyOrders(); }, []);

  if(loading) return <div style={{color:'#8A9BB5', padding:'20px', textAlign:'center'}}>Loading orders zako...</div>;

  return (
    <div style={{background:'#101D35', borderRadius:'20px', padding:'16px', border:'1px solid #1E335B', color:'white'}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'14px'}}>
        <h2 style={{fontSize:'15px', fontWeight:'bold'}}>🛒 My Orders ({orders.length})</h2>
        <button onClick={fetchMyOrders} style={{fontSize:'11px', background:'#1E335B', border:'none', color:'white', padding:'5px 10px', borderRadius:'8px'}}>Refresh</button>
      </div>

      {orders.length === 0 && (
        <div style={{textAlign:'center', padding:'30px 10px', color:'#8A9BB5'}}>
          <div style={{fontSize:'30px', marginBottom:'8px'}}>📦</div>
          <div style={{fontSize:'13px'}}>Bado huja-order bana</div>
          <div style={{fontSize:'11px', marginTop:'4px'}}>Orders zako zitaonekana hapa</div>
        </div>
      )}

      {orders.map(o => (
        <div key={o.id} style={{background:'#0C1A32', border:'1px solid #1E335B', borderRadius:'12px', padding:'12px', marginBottom:'10px'}}>
          <div style={{display:'flex', justifyContent:'space-between', marginBottom:'8px'}}>
            <span style={{fontSize:'12px', fontWeight:'bold', background:'#1E335B', padding:'3px 8px', borderRadius:'8px'}}>
              {o.platform} • {o.service_type}
            </span>
            <span style={{
              fontSize:'10px', padding:'4px 10px', borderRadius:'20px', fontWeight:'bold',
              background: o.status==='completed'? 'rgba(34,197,94,0.2)' : o.status==='processing'? 'rgba(42,92,255,0.2)' : 'rgba(234,179,8,0.2)',
              color: o.status==='completed'? '#4ade80' : o.status==='processing'? '#60a5fa' : '#facc15'
            }}>
              {o.status === 'completed'? '✅ Done' : o.status === 'processing'? '⚙️ Processing' : '⏳ Pending'}
            </span>
          </div>
          <div style={{fontSize:'12px', marginBottom:'4px'}}>x{o.quantity} • {o.cost_xd} XD</div>
          <div style={{fontSize:'10px', color:'#8A9BB5', wordBreak:'break-all', background:'#101D35', padding:'6px', borderRadius:'6px', marginBottom:'6px'}}>{o.target_link}</div>
          <div style={{fontSize:'10px', color:'#5a6e8a'}}>{new Date(o.created_at).toLocaleString()}</div>
        </div>
      ))}
    </div>
  );
}