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

  const labelStyle = {color:'#8A9BB5', fontSize:'10px', fontWeight:'bold', letterSpacing:'1px'};
  const inputStyle = {marginTop:'6px', width:'100%', background:'#0C1A32', border:'1px solid #1E335B', color:'white', fontSize:'13px', padding:'11px', borderRadius:'12px', outline:'none'};

  return (
    <div style={{minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#050A18', padding:'32px 16px'}}>
      <div style={{width:'100%', maxWidth:'410px', background:'#101D35', border:'1px solid #1E335B', borderRadius:'24px', padding:'32px'}}>
        <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
          <div style={{width:'56px', height:'56px', borderRadius:'16px', background:'#0B162C', display:'flex', alignItems:'center', justifyContent:'center', border:'1px solid #1E335B'}}>🏠</div>
          <h2 style={{color:'white', fontSize:'18px', fontWeight:'bold', marginTop:'12px'}}>Create Account</h2>
          <p style={{color:'#8A9BB5', fontSize:'12px'}}>Sign up to get started</p>
        </div>

        {msg.text && (
          <div style={{marginTop:'16px', border:'1px solid', fontSize:'12px', padding:'10px', borderRadius:'12px', textAlign:'center', background: msg.isError ? 'rgba(239,68,68,0.1)' : 'rgba(34,197,94,0.1)', borderColor: msg.isError ? 'rgba(239,68,68,0.2)' : 'rgba(34,197,94,0.2)', color: msg.isError ? '#f87171' : '#4ade80'}}>
            {msg.text}
          </div>
        )}

        <form onSubmit={handleRegister} style={{display:'flex', flexDirection:'column', gap:'12px', marginTop:'20px'}}>
          <div><label style={labelStyle}>FULL NAME</label><input required style={inputStyle} placeholder="Enter your full name" value={form.fullName} onChange={e => setForm({...form, fullName: e.target.value})} /></div>
          <div><label style={labelStyle}>EMAIL</label><input required type="email" style={inputStyle} placeholder="Enter your email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></div>
          <div><label style={labelStyle}>USERNAME</label><input required style={inputStyle} placeholder="Choose a username" value={form.username} onChange={e => setForm({...form, username: e.target.value})} /></div>
          <div><label style={labelStyle}>PHONE (OPTIONAL)</label><input style={inputStyle} placeholder="Enter your phone number" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} /></div>
          <div><label style={labelStyle}>PASSWORD</label><input required type="password" style={inputStyle} placeholder="Strong password required" value={form.password} onChange={e => setForm({...form, password: e.target.value})} /></div>
          <div><label style={labelStyle}>REFERRAL CODE (OPTIONAL)</label><input style={inputStyle} placeholder="Enter referral code" value={form.referral} onChange={e => setForm({...form, referral: e.target.value})} /></div>

          <div style={{display:'flex', alignItems:'flex-start', gap:'8px', paddingTop:'4px'}}>
            <input type="checkbox" checked={agree} onChange={e=>setAgree(e.target.checked)} style={{marginTop:'2px', accentColor:'#2A5CFF'}} />
            <p style={{fontSize:'11px', color:'#5A6D8A'}}>I agree to the <span style={{color:'#2A5CFF'}}>Terms & Conditions</span> and <span style={{color:'#2A5CFF'}}>Privacy Policy</span></p>
          </div>

          <div style={{display:'flex', alignItems:'center', gap:'12px', marginTop:'8px'}}>
            <button type="button" onClick={onSwitchView} style={{flex:1, color:'#2A5CFF', fontWeight:600, fontSize:'12px', padding:'12px', background:'transparent', border:'none', cursor:'pointer'}}>Log In</button>
            <button type="submit" disabled={loading} style={{flex:1, background:'#2A5CFF', color:'white', padding:'12px', borderRadius:'12px', fontWeight:'bold', fontSize:'12px', border:'none', cursor:'pointer', opacity: loading?0.5:1}}>{loading? 'Creating...' : 'Sign Up'}</button>
          </div>
        </form>
        <p style={{textAlign:'center', color:'#4A5C7A', fontSize:'10px', marginTop:'16px'}}>or continue with Google / GitHub</p>
      </div>
    </div>
  );
}