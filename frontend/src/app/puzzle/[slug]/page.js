'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function PuzzlePage() {
  const slug = usePathname().split('/').pop();
  const [puzzle, setPuzzle] = useState(null);
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    supabase
      .from('puzzles')
      .select('*')
      .eq('slug', slug)
      .single()
      .then(({ data }) => setPuzzle(data));
  }, [slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // call your local API to check & record
    const res = await fetch('/api/solve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, solution: input }),
    });
    const { correct } = await res.json();
    setFeedback(correct ? '✅ Correct!' : '❌ Try again.');
  };

  if (!puzzle) return <p>Loading puzzle…</p>;

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">{puzzle.name}</h1>
      {/* You’d render the cipher input UI here based on puzzle.type/config */}
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          placeholder="Your solution"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border rounded p-2 w-64"
        />
        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
          Submit
        </button>
      </form>
      {feedback && <p className="mt-4">{feedback}</p>}
    </main>
  );
}
