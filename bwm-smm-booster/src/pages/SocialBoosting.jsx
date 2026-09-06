import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Sparkles } from 'lucide-react';

export default function SocialBoosting({ profile, onRefreshProfile }) {
  const [platform, setPlatform] = useState('Instagram');
  const [serviceType, setServiceType] = useState('Likes');
  const [targetLink, setTargetLink] = useState('');
  const [quantity, setQuantity] = useState(100);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ text: '', isError: false });

  // Simple pricing mock configuration calculation rule
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

      // 1. Log transaction order row inside table database
      const { error: orderError } = await supabase.from('smm_orders').insert({
        user_id: user.id,
        platform,
        service_type: serviceType,
        target_link: targetLink,
        quantity,
        cost_xd: totalCost
      });
      if (orderError) throw orderError;

      // 2. Adjust remaining profiles balance amounts cleanly
      const newBalance = (parseFloat(profile.xdBalance) - parseFloat(totalCost)).toFixed(3);
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ xd_balance: newBalance })
        .eq('id', user.id);
      if (updateError) throw updateError;

      setStatus({ text: 'SMM Campaign submitted successfully!', isError: false });
      setTargetLink('');
      onRefreshProfile();
    } catch (err) {
      setStatus({ text: err.message, isError: true });
    }
    setLoading(false);
  };

  return (
    <div className="bg-cardBg border border-slate-800 p-6 rounded-dashboard text-white">
      <h3 className="text-base font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
        <Sparkles size={18} className="text-neonBlue" /> Launch SMM Booster
      </h3>
      
      {status.text && (
        <div className={`text-xs p-3 rounded-xl mb-4 text-center border ${status.isError ? 'bg-red-950/40 border-red-800 text-red-400' : 'bg-green-950/40 border-green-800 text-green-400'}`}>
          {status.text}
        </div>
      )}

      <form onSubmit={handleOrder} className="flex flex-col gap-4">
        <div>
          <label className="block text-xs font-semibold text-textMuted uppercase mb-1">Target Network Channel</label>
          <select value={platform} onChange={e => setPlatform(e.target.value)} className="w-full bg-slate-900 border border-slate-800 text-sm p-3 rounded-xl outline-none text-white">
            <option>Instagram</option><option>TikTok</option><option>YouTube</option><option>Facebook</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-textMuted uppercase mb-1">Engagement Metric Type</label>
          <select value={serviceType} onChange={e => setServiceType(e.target.value)} className="w-full bg-slate-900 border border-slate-800 text-sm p-3 rounded-xl outline-none text-white">
            <option>Likes</option><option>Followers</option><option>Views</option><option>Shares</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-textMuted uppercase mb-1">Target Link URL</label>
          <input type="url" required placeholder="https://..." value={targetLink} onChange={e => setTargetLink(e.target.value)} className="w-full bg-slate-900 border border-slate-800 text-sm p-3 rounded-xl outline-none" />
        </div>

        <div>
          <label className="block text-xs font-semibold text-textMuted uppercase mb-1">Engagement Volume Quantity</label>
          <input type="number" min="10" max="10000" required value={quantity} onChange={e => setQuantity(Number(e.target.value))} className="w-full bg-slate-900 border border-slate-800 text-sm p-3 rounded-xl outline-none" />
        </div>

        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex justify-between items-center text-xs mt-2">
          <span className="text-textMuted uppercase">Campaign Processing Cost:</span>
          <span className="text-base font-bold text-neonBlue">{totalCost} XD</span>
        </div>

        <button type="submit" disabled={loading} className="bg-accentBlue hover:bg-blue-600 transition text-sm p-3 font-bold rounded-xl mt-2 disabled:opacity-50">
          {loading ? 'Processing Order...' : 'Deploy SMM Boost Campaign'}
        </button>
      </form>
    </div>
  );
}