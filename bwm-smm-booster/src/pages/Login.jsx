import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function Login({ onSwitchView }) {
  const [loginInput, setLoginInput] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); setErr('');
    try {
      let emailToUse = loginInput.trim();
      if (!emailToUse.includes('@')) {
        const { data } = await supabase.from('profiles').select('email').eq('username', emailToUse).single();
        if (!data) throw new Error('Username not found');
        emailToUse = data.email;
      }
      const { error } = await supabase.auth.signInWithPassword({ email: emailToUse, password });
      if (error) throw error;
    } catch (e) { setErr(e.message); }
    setLoading(false);
  };

  const handleOAuth = async (provider) => {
    await supabase.auth.signInWithOAuth({ provider, options: { redirectTo: window.location.origin }});
  }

  return (
    <div style={{minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#050A18', padding:'16px'}}>
      <style>{`
        input::placeholder { color: #5A6D8A !important; opacity:1; }
      `}</style>
      <div style={{width:'100%', maxWidth:'410px', background:'#101D35', border:'1px solid #1E335B', borderRadius:'24px', padding:'32px'}}>
        <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
          <div style={{width:'64px', height:'64px', borderRadius:'18px', background:'#0B162C', display:'flex', alignItems:'center', justifyContent:'center', border:'1px solid #1E335B'}}>🏠</div>
          <p style={{color:'#3B82F6', fontSize:'13px', marginTop:'12px', fontWeight:600}}>Bots. Boosting. VPS</p>
          <h2 style={{color:'white', fontSize:'28px', fontWeight:'bold', marginTop:'16px'}}>Let's Login</h2>
          <p style={{color:'#8A9BB5', fontSize:'14px', marginTop:'4px'}}>Login to your account to continue</p>
        </div>

        {err && <div style={{marginTop:'20px', background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.2)', color:'#f87171', fontSize:'12px', padding:'10px', borderRadius:'12px', textAlign:'center'}}>{err}</div>}

        <form onSubmit={(e)=>handleLogin(e)} style={{marginTop:'24px', display:'flex', flexDirection:'column', gap:'16px'}}>
          <div>
            <label style={{color:'#8A9BB5', fontSize:'10px', fontWeight:'bold', letterSpacing:'1.5px'}}>EMAIL OR USERNAME</label>
            <input value={loginInput} onChange={e=>setLoginInput(e.target.value)} required placeholder="Enter your email or username"
              style={{marginTop:'8px', width:'100%', background:'#0C1A32', border:'1px solid #1E335B', color:'white', padding:'14px', borderRadius:'12px', outline:'none', fontSize:'14px', boxSizing:'border-box'}} />
          </div>
          <div>
            <label style={{color:'#8A9BB5', fontSize:'10px', fontWeight:'bold', letterSpacing:'1.5px'}}>PASSWORD</label>
            <div style={{position:'relative', marginTop:'8px', display:'flex', alignItems:'center'}}>
              <input type={showPass?'text':'password'} value={password} onChange={e=>setPassword(e.target.value)} required placeholder="Enter your password"
                style={{width:'100%', background:'#0C1A32', border:'1px solid #1E335B', color:'white', padding:'14px 44px 14px 14px', borderRadius:'12px', outline:'none', fontSize:'14px', boxSizing:'border-box'}} />
              <button type="button" onClick={()=>setShowPass(!showPass)} style={{position:'absolute', right:'4px', width:'36px', height:'36px', background:'transparent', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'16px'}}>
                {showPass ? '🙈' : '👁️'}
              </button>
            </div>
          </div>
          
          <button type="button" onClick={()=>alert('Enter email above then click - reset link sent')} style={{textAlign:'right', color:'#2A5CFF', fontSize:'12px', background:'transparent', border:'none', cursor:'pointer', fontWeight:500}}>Forgot password?</button>

          <div style={{display:'flex', gap:'12px', marginTop:'4px'}}>
            <button type="button" onClick={onSwitchView} style={{flex:1, background:'transparent', color:'#2A5CFF', border:'none', fontWeight:600, fontSize:'14px', padding:'12px', cursor:'pointer'}}>Sign Up</button>
            <button type="submit" disabled={loading} style={{flex:1, background:'#2A5CFF', color:'white', border:'none', padding:'12px', borderRadius:'12px', fontWeight:'bold', fontSize:'14px', cursor:'pointer'}}>{loading?'...':'LOG IN'}</button>
          </div>
        </form>

        <p style={{textAlign:'center', color:'#5A6D8A', fontSize:'12px', marginTop:'24px'}}>or continue with</p>
        <div style={{display:'flex', justifyContent:'center', gap:'12px', marginTop:'16px'}}>
          <button onClick={()=>handleOAuth('google')} style={{flex:1, background:'#0C1A32', border:'1px solid #1E335B', color:'white', fontSize:'13px', display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', padding:'10px', borderRadius:'12px', cursor:'pointer', fontWeight:500}}>
            <span style={{width:'20px', height:'20px', background:'white', borderRadius:'50%', color:'black', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'11px', fontWeight:'bold'}}>G</span> Google
          </button>
          <button onClick={()=>handleOAuth('github')} style={{flex:1, background:'#0C1A32', border:'1px solid #1E335B', color:'white', fontSize:'13px', display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', padding:'10px', borderRadius:'12px', cursor:'pointer', fontWeight:500}}>
            <span style={{fontSize:'16px'}}>●</span> GitHub
          </button>
        </div>
      </div>
    </div>
  );
}