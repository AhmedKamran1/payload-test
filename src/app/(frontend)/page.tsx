import React from 'react'

// Payload
import { getPayload } from 'payload'
import config from '@payload-config'

// Styles
import './styles.css'

// Components
import QuizList from '@/app/(frontend)/components/quiz/quiz-list'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  // Fetch the first quiz to display on the homepage
  const payload = await getPayload({ config })

  const quizzes = await payload.find({
    collection: 'quizzes',
    limit: 1,
  })

  const quizData = quizzes.docs[0]

  if (!quizData) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">No Quiz Found</h1>
        <p>Please create a quiz in the admin panel.</p>
      </div>
    )
  }

  return <QuizList quizData={quizData} />
}
