// frontend/src/components/AuthGuard.jsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AuthGuard({ children }) {
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      // If not logged in and not on /auth, redirect
      if (!user && !window.location.pathname.startsWith('/auth')) {
        router.replace('/auth');
      }
    });
  }, [router]);

  // Always render children immediately to avoid hydration mismatches
  return <>{children}</>;
}
