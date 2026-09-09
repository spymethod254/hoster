import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import Header from './components/Header';

// View Page Components Imports
import Login from './pages/Login';
import Register from './pages/Register';
import Homepage from './pages/Homepage';
import Profile from './pages/Profile';
import SocialBoosting from './pages/SocialBoosting';
import MyOrders from './pages/MyOrders';

export default function App() {
  const [session, setSession] = useState(null);
  const [currentView, setCurrentView] = useState('home'); // home, profile, boosting, orders
  const [authView, setAuthView] = useState('login');     // login, register
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    fullName: '', full_name: '', xdBalance: '0.000', xd_balance: '0.000', kshBalance: '0.00', ksh_balance: '0.00', referralCode: '', referral_code: '', is_admin: false
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchProfile(session.user.id);
      else setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchProfile(session.user.id);
      else {
        setProfile({ fullName: '', full_name: '', xdBalance: '0.000', xd_balance: '0.000', kshBalance: '0.00', ksh_balance: '0.00', referralCode: '', referral_code: '', is_admin: false });
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function fetchProfile(userId) {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('full_name, xd_balance, ksh_balance, referral_code, is_admin')
        .eq('id', userId)
        .single();

      if (error) throw error;
      if (data) {
        setProfile({
          fullName: data.full_name,
          full_name: data.full_name,
          xdBalance: data.xd_balance,
          xd_balance: data.xd_balance,
          kshBalance: data.ksh_balance,
          ksh_balance: data.ksh_balance,
          referralCode: data.referral_code,
          referral_code: data.referral_code,
          is_admin: data.is_admin || false
        });
      }
    } catch (err) {
      console.error('Error binding core tokens:', err.message);
    } finally {
      setLoading(false);
    }
  }

  const handleRefresh = () => {
    if(session?.user?.id) fetchProfile(session.user.id);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-darkBg flex items-center justify-center text-neonBlue">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neonBlue"></div>
      </div>
    );
  }

  // Auth Routing Pipeline Guards
  if (!session) {
    return authView === 'login' 
      ? <Login onSwitchView={() => setAuthView('register')} /> 
      : <Register onSwitchView={() => setAuthView('login')} />;
  }

  return (
    <div className="min-h-screen bg-darkBg text-white antialiased pb-10">
      <Header userName={profile.fullName} onNavigate={setCurrentView} />

      <main className="max-w-md mx-auto px-4 mt-6 flex flex-col gap-6">
        {currentView === 'home' && (
          <Homepage profile={profile} onNavigate={setCurrentView} />
        )}

        {currentView === 'profile' && (
          <Profile profile={profile} />
        )}

        {currentView === 'boosting' && (
          <SocialBoosting profile={profile} onRefreshProfile={handleRefresh} />
        )}

        {currentView === 'orders' && (
          <MyOrders />
        )}
      </main>
    </div>
  );
}