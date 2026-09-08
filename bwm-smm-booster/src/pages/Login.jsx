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
    setLoading(true);
    setErr('');

    try {
      let emailToUse = loginInput.trim();
      // Allow username login
      if (!emailToUse.includes('@')) {
        const { data, error } = await supabase.from('profiles').select('email').eq('username', emailToUse).single();
        if (error ||!data) throw new Error('Username not found');
        emailToUse = data.email;
      }
      const { error } = await supabase.auth.signInWithPassword({ email: emailToUse, password });
      if (error) throw error;
    } catch (error) {
      setErr(error.message);
    }
    setLoading(false);
  };

  const handleForgot = async () => {
    if (!loginInput.includes('@')) { setErr('Enter your email to reset password'); return }
    const { error } = await supabase.auth.resetPasswordForEmail(loginInput);
    if(error) setErr(error.message);
    else setErr('Password reset link sent to your email');
  }

  const handleOAuth = async (provider) => {
    await supabase.auth.signInWithOAuth({ provider, options: { redirectTo: window.location.origin }});
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050A18] px-4">
      <div className="w-full max-w-[410px] bg-[#101D35] border border-[#1E335B] rounded-[24px] p-8 shadow-2xl">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-[18px] bg-[#0B162C] flex items-center justify-center border border-[#1E335B]">
            <span className="text-xl">🏠</span>
          </div>
          <p className="text-[#3B82F6] text-[13px] mt-3 font-semibold">Bots. Boosting. VPS</p>
          <h2 className="text-white text-[28px] font-bold mt-4">Let's Login</h2>
          <p className="text-[#8A9BB5] text-[14px] mt-1">Login to your account to continue</p>
        </div>

        {err && <div className="mt-6 bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3 rounded-xl text-center">{err}</div>}

        <form onSubmit={handleLogin} className="flex flex-col gap-4 mt-6">
          <div>
            <label className="text-[#8A9BB5] text-[11px] font-bold tracking-widest">EMAIL OR USERNAME</label>
            <input type="text" required placeholder="Enter your email or username" value={loginInput} onChange={e => setLoginInput(e.target.value)}
              className="mt-2 w-full bg-[#0C1A32] border border-[#1E335B] text-white text-sm p-[14px] rounded-xl outline-none placeholder:text-[#4A5C7A] focus:border-[#2A5CFF]" />
          </div>
          <div>
            <label className="text-[#8A9BB5] text-[11px] font-bold tracking-widest">PASSWORD</label>
            <div className="relative mt-2">
              <input type={showPass? 'text' : 'password'} required placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)}
                className="w-full bg-[#0C1A32] border border-[#1E335B] text-white text-sm p-[14px] pr-10 rounded-xl outline-none placeholder:text-[#4A5C7A] focus:border-[#2A5CFF]" />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-[14px] text-[#4A5C7A]">👁️</button>
            </div>
          </div>

          <button type="button" onClick={handleForgot} className="text-right text-[#2A5CFF] text-xs font-medium -mt-1">Forgot password?</button>

          <div className="flex items-center gap-3 mt-2">
            <button type="button" onClick={onSwitchView} className="flex-1 text-[#2A5CFF] font-semibold text-sm py-3">Sign Up</button>
            <button type="submit" disabled={loading} className="flex-1 bg-[#2A5CFF] hover:bg-[#234EE0] text-white p-3 rounded-xl font-bold text-sm shadow-lg shadow-blue-600/20 transition disabled:opacity-50">
              {loading? '...' : 'LOG IN'}
            </button>
          </div>
        </form>

        <p className="text-center text-[#4A5C7A] text-xs mt-6">or continue with</p>
        <div className="flex justify-center gap-12 mt-4">
          <button onClick={()=>handleOAuth('google')} className="text-white text-sm flex items-center gap-2 font-medium"><span className="w-5 h-5 bg-white rounded-full text-black flex items-center justify-center text-xs">G</span> Google</button>
          <button onClick={()=>handleOAuth('github')} className="text-white text-sm flex items-center gap-2 font-medium">◉ GitHub</button>
        </div>
      </div>
    </div>
  );
}