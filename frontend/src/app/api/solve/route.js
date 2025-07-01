// frontend/src/app/api/solve/route.js
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Use your Service Role key so you can write to the DB
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function POST(request) {
  const { slug, solution } = await request.json()

  // 1) Fetch puzzle definition
  const { data: puzzle, error: puzzleError } = await supabase
    .from('puzzles')
    .select('id, type, config')
    .eq('slug', slug)
    .single()

  if (puzzleError || !puzzle) {
    return NextResponse.json(
      { error: puzzleError?.message || 'Puzzle not found' },
      { status: 400 }
    )
  }

  // 2) Check the solution (stubbed for now)
  let correct = false

  // TODO: replace this with real logic based on puzzle.type/config
  // e.g. for Caesar cipher: decode solution using puzzle.config.shift
  // and compare to an expected plaintext stored in your DB or config.
  // For now we just leave `correct = false`.

  // 3) Record the attempt
  const {
    data: { user },
  } = await supabase.auth.getUser()

  await supabase.from('user_progress').insert({
    user_id: user.id,
    puzzle_id: puzzle.id,
    solved: correct,
    attempts: 1,
    last_score: correct ? 1 : 0,
  })

  // 4) Return the result
  return NextResponse.json({ correct })
}
