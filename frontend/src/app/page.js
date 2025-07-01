// frontend/src/app/page.js
'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function HomePage() {
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) setUserEmail(user.email);
    });
  }, []);

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to Codebusters Hub</h1>

      {userEmail && (
        <p className="mb-6">
          Signed in as <span className="font-mono">{userEmail}</span>
        </p>
      )}

      <nav className="space-y-2">
        <Link href="/puzzle/aristocrat-cipher" className="block text-blue-600 hover:underline">
          Try an Aristocrat Cipher
        </Link>
        <Link href="/puzzle/caesar-cipher" className="block text-blue-600 hover:underline">
          Try a Caesar Cipher
        </Link>
        <Link href="/dashboard" className="block text-blue-600 hover:underline">
          Go to Dashboard
        </Link>
      </nav>
    </main>
  );
}
