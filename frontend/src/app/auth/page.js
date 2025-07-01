'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState('');

  // If already signed in, send them back to home
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.replace('/');
      }
    });
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert('');
    const { error } = await supabase.auth.signInWithOtp({ email });
    setLoading(false);

    if (error) {
      setAlert(error.message);
    } else {
      setAlert('Magic link sent! Check your email to complete sign-in.');
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-semibold mb-4 text-center">Sign In / Sign Up</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'Sending…' : 'Send Magic Link'}
          </button>
        </form>
        {alert && (
          <p className="mt-4 text-center text-sm text-gray-700">
            {alert}
          </p>
        )}
      </div>
    </main>
  );
}
