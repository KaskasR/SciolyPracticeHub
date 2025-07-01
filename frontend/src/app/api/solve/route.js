// frontend/src/app/api/solve/route.js
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// use your SERVICE_ROLE_KEY here so you can write to the DB
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function POST(request) {
  const { slug, solution } = await request.json()

  // fetch the puzzle definition
  const { data: puzzle } = await supabase
    .from('puzzles')
    .select('id, type, config')
    .eq('slug', slug)
    .single()

  // your own solution-checking logic:
  const correct = checkSolution(solution, puzzle)

  // record the attempt
  await supabase.from('user_progress').insert({
    user_id:   (await supabase.auth.getUser()).data.user.id,
    puzzle_id: puzzle.id,
    solved:    correct,
    attempts:  1,
    last_score: correct ? 1 : 0,
  })

  return NextResponse.json({ correct })
}

// example checker — customize per puzzle.type
function checkSolution(solution, puzzle) {
  if (puzzle.type === 'cipher') {
    // for Caesar: shift each letter back
    const { shift } = puzzle.config
    // ... implement your logic ...
    return solution.toUpperCase() === /* expected */;
  }
  return false
}
