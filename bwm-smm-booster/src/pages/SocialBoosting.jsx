import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function SocialBoosting({ profile, onRefreshProfile }) {
  const [platform, setPlatform] = useState('Instagram');
  const [serviceType, setServiceType] = useState('Likes');
  const [targetLink, setTargetLink] = useState('');
  const [quantity, setQuantity] = useState(100);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ text: '', isError: false });

  const costPerUnit = 0.05; 
  const totalCost = (quantity * costPerUnit).toFixed(3);

  const handleOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ text: '', isError: false });
    if (parseFloat(profile.xdBalance) < parseFloat(totalCost)) {
      setStatus({ text: 'Insufficient XD funds inside wallet balance.', isError: true });
      setLoading(false);
      return;
    }
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const { error: orderError } = await supabase.from('smm_orders').insert({
        user_id: user.id,
        platform,
        service_type: serviceType,
        target_link: targetLink,
        quantity,
        cost_xd: totalCost
      });
      if (orderError) throw orderError;
      const newBalance = (parseFloat(profile.xdBalance) - parseFloat(totalCost)).toFixed(3);
      const { error: updateError } = await supabase.from('profiles').update({ xd_balance: newBalance }).eq('id', user.id);
      if (updateError) throw updateError;
      setStatus({ text: 'SMM Campaign submitted successfully!', isError: false });
      setTargetLink('');
      onRefreshProfile();
    } catch (err) {
      setStatus({ text: err.message, isError: true });
    }
    setLoading(false);
  };

  const labelStyle = {display:'block', fontSize:'10px', fontWeight:'600', color:'#8A9BB5', textTransform:'uppercase', letterSpacing:'1px', marginBottom:'6px'};
  const inputStyle = {width:'100%', background:'#0C1A32', border:'1px solid #1E335B', color:'white', fontSize:'13px', padding:'12px', borderRadius:'12px', outline:'none', boxSizing:'border-box'};

  return (
    <div style={{minHeight:'100vh', background:'#050A18', padding:'16px', paddingBottom:'90px'}}>
      <div style={{background:'#101D35', border:'1px solid #1E335B', padding:'24px', borderRadius:'20px', color:'white'}}>
        <h3 style={{fontSize:'15px', fontWeight:'bold', textTransform:'uppercase', letterSpacing:'1px', marginBottom:'16px', display:'flex', alignItems:'center', gap:'8px'}}>
          <span style={{color:'#3B82F6'}}>✨</span> Launch SMM Booster
        </h3>

        {status.text && (
          <div style={{fontSize:'12px', padding:'10px', borderRadius:'12px', marginBottom:'16px', textAlign:'center', border:'1px solid', background: status.isError ? 'rgba(239,68,68,0.1)' : 'rgba(34,197,94,0.1)', borderColor: status.isError ? 'rgba(239,68,68,0.2)' : 'rgba(34,197,94,0.2)', color: status.isError ? '#f87171' : '#4ade80'}}>
            {status.text}
          </div>
        )}

        <form onSubmit={handleOrder} style={{display:'flex', flexDirection:'column', gap:'14px'}}>
          <div>
            <label style={labelStyle}>Target Network Channel</label>
            <select value={platform} onChange={e => setPlatform(e.target.value)} style={inputStyle}>
              <option>Instagram</option><option>TikTok</option><option>YouTube</option><option>Facebook</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Engagement Metric Type</label>
            <select value={serviceType} onChange={e => setServiceType(e.target.value)} style={inputStyle}>
              <option>Likes</option><option>Followers</option><option>Views</option><option>Shares</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Target Link URL</label>
            <input type="url" required placeholder="https://..." value={targetLink} onChange={e => setTargetLink(e.target.value)} style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}>Engagement Volume Quantity</label>
            <input type="number" min="10" max="10000" required value={quantity} onChange={e => setQuantity(Number(e.target.value))} style={inputStyle} />
          </div>

          <div style={{background:'#0C1A32', padding:'14px', borderRadius:'12px', border:'1px solid #1E335B', display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:'12px', marginTop:'4px'}}>
            <span style={{color:'#8A9BB5', textTransform:'uppercase'}}>Campaign Cost:</span>
            <span style={{fontSize:'16px', fontWeight:'bold', color:'#3B82F6'}}>{totalCost} XD</span>
          </div>

          <button type="submit" disabled={loading} style={{background:'#2A5CFF', color:'white', fontSize:'13px', padding:'14px', fontWeight:'bold', borderRadius:'12px', marginTop:'8px', border:'none', cursor:'pointer', opacity: loading?0.5:1}}>
            {loading ? 'Processing Order...' : 'Deploy SMM Boost Campaign'}
          </button>
        </form>
      </div>
    </div>
  );
}