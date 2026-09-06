import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function Register({ onSwitchView }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ text: '', isError: false });

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg({ text: '', isError: false });

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } }
    });

    if (error) {
      setMsg({ text: error.message, isError: true });
    } else {
      setMsg({ text: 'Registration successful! Check email for confirmation details.', isError: false });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-darkBg px-4">
      <div className="w-full max-w-md bg-cardBg border border-neonBlue/20 rounded-dashboard p-8 text-white">
        <h2 className="text-2xl font-bold text-center uppercase tracking-wider mb-2">Create Profile</h2>
        <p className="text-textMuted text-xs text-center mb-6">Join BWM for lightning fast automation setups</p>

        {msg.text && (
          <div className={`border text-xs p-3 rounded-xl mb-4 text-center ${msg.isError ? 'bg-red-950/40 border-red-800 text-red-400' : 'bg-green-950/40 border-green-800 text-green-400'}`}>
            {msg.text}
          </div>
        )}

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input type="text" required placeholder="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} className="bg-slate-900 border border-slate-800 text-sm p-3 rounded-xl outline-none" />
          <input type="email" required placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} className="bg-slate-900 border border-slate-800 text-sm p-3 rounded-xl outline-none" />
          <input type="password" required placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="bg-slate-900 border border-slate-800 text-sm p-3 rounded-xl outline-none" />
          <button type="submit" disabled={loading} className="bg-accentBlue p-3 rounded-xl font-bold hover:bg-blue-600 transition text-sm disabled:opacity-50">
            {loading ? 'Creating...' : 'Register'}
          </button>
        </form>
        <button onClick={onSwitchView} className="w-full text-center text-xs text-neonBlue mt-6 hover:underline">Already configured? Sign In</button>
      </div>
    </div>
  );
}