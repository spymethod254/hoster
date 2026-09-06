import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function Login({ onSwitchView }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setErr(error.message);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-darkBg px-4">
      <div className="w-full max-w-md bg-cardBg border border-neonBlue/20 rounded-dashboard p-8 text-white">
        <h2 className="text-2xl font-bold text-center uppercase tracking-wider mb-2">Welcome Back</h2>
        <p className="text-textMuted text-xs text-center mb-6">Log in to manage your panels and wallet balance</p>
        
        {err && <div className="bg-red-950/40 border border-red-800 text-red-400 text-xs p-3 rounded-xl mb-4 text-center">{err}</div>}
        
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input type="email" required placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} className="bg-slate-900 border border-slate-800 text-sm p-3 rounded-xl outline-none focus:border-neonBlue/50" />
          <input type="password" required placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="bg-slate-900 border border-slate-800 text-sm p-3 rounded-xl outline-none focus:border-neonBlue/50" />
          <button type="submit" disabled={loading} className="bg-accentBlue p-3 rounded-xl font-bold hover:bg-blue-600 transition text-sm disabled:opacity-50">
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
        <button onClick={onSwitchView} className="w-full text-center text-xs text-neonBlue mt-6 hover:underline">New user? Create an account</button>
      </div>
    </div>
  );
}