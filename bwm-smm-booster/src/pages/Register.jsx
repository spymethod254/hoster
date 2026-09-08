import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function Register({ onSwitchView }) {
  const [form, setForm] = useState({ fullName: '', email: '', username: '', phone: '', password: '', referral: '' });
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ text: '', isError: false });

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!agree) { setMsg({ text: 'You must agree to Terms', isError: true }); return }
    if (form.password.length < 6) { setMsg({ text: 'Password must be 6+ chars', isError: true }); return }

    setLoading(true);
    setMsg({ text: '', isError: false });

    try {
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: { data: { full_name: form.fullName, username: form.username } }
      });
      if (error) throw error;

      // Create profile for SMM panel
      if (data.user) {
        await supabase.from('profiles').insert({
          id: data.user.id,
          full_name: form.fullName,
          username: form.username,
          email: form.email,
          phone: form.phone || null,
          referral_code: form.referral || null,
          balance: 0
        });
      }
      setMsg({ text: 'Registration successful! Check email for confirmation.', isError: false });
    } catch (error) {
      setMsg({ text: error.message, isError: true });
    }
    setLoading(false);
  };

  const L = "text-[#8A9BB5] text-[10px] font-bold tracking-widest";
  const I = "mt-1.5 w-full bg-[#0C1A32] border border-[#1E335B] text-white text-[13px] p-3 rounded-xl outline-none placeholder:text-[#4A5C7A] focus:border-[#2A5CFF]";

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050A18] px-4 py-8">
      <div className="w-full max-w-[410px] bg-[#101D35] border border-[#1E335B] rounded-[24px] p-8">
        <div className="flex flex-col items-center">
          <div className="w-14 h-14 rounded-[16px] bg-[#0B162C] flex items-center justify-center border border-[#1E335B]">🏠</div>
          <h2 className="text-white text-[18px] font-bold mt-3">Create Account</h2>
          <p className="text-[#8A9BB5] text-[12px]">Sign up to get started</p>
        </div>

        {msg.text && (
          <div className={`mt-4 border text-xs p-3 rounded-xl text-center ${msg.isError? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-green-500/10 border-green-500/20 text-green-400'}`}>
            {msg.text}
          </div>
        )}

        <form onSubmit={handleRegister} className="flex flex-col gap-3 mt-5">
          <div><label className={L}>FULL NAME</label><input required className={I} placeholder="Enter your full name" value={form.fullName} onChange={e => setForm({...form, fullName: e.target.value})} /></div>
          <div><label className={L}>EMAIL</label><input required type="email" className={I} placeholder="Enter your email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></div>
          <div><label className={L}>USERNAME</label><input required className={I} placeholder="Choose a username" value={form.username} onChange={e => setForm({...form, username: e.target.value})} /></div>
          <div><label className={L}>PHONE (OPTIONAL)</label><input className={I} placeholder="Enter your phone number" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} /></div>
          <div><label className={L}>PASSWORD</label><input required type="password" className={I} placeholder="Strong password required" value={form.password} onChange={e => setForm({...form, password: e.target.value})} /></div>
          <div><label className={L}>REFERRAL CODE (OPTIONAL)</label><input className={I} placeholder="Enter referral code" value={form.referral} onChange={e => setForm({...form, referral: e.target.value})} /></div>

          <div className="flex items-start gap-2 pt-1">
            <input type="checkbox" checked={agree} onChange={e=>setAgree(e.target.checked)} className="mt-0.5 accent-[#2A5CFF]" />
            <p className="text-[11px] text-[#5A6D8A]">I agree to the <span className="text-[#2A5CFF]">Terms & Conditions</span> and <span className="text-[#2A5CFF]">Privacy Policy</span></p>
          </div>

          <div className="flex items-center gap-3 mt-2">
            <button type="button" onClick={onSwitchView} className="flex-1 text-[#2A5CFF] font-semibold text-xs py-3">Log In</button>
            <button type="submit" disabled={loading} className="flex-1 bg-[#2A5CFF] text-white py-3 rounded-xl font-bold text-xs disabled:opacity-50">{loading? 'Creating...' : 'Sign Up'}</button>
          </div>
        </form>
        <p className="text-center text-[#4A5C7A] text-[10px] mt-4">or continue with Google / GitHub</p>
      </div>
    </div>
  );
}