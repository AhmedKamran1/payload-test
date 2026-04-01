import React, { useState, useMemo } from 'react'

// Types
import { ScoreProps } from './types'

// Components
import ResultCards from '../view-results/result-cards'

const QuizScore = ({ quizData, answers, setAnswers, setShowScore }: ScoreProps) => {
  const [notes, setNotes] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const { results } = quizData

  // Compute total score
  const totalScore = useMemo(
    () => Object.values(answers).reduce((a, b) => a + b.score, 0),
    [answers],
  )

  // Find matching result label
  const getResultLabel = () => {
    if (totalScore === 13) return 'You lucky fucker! You scored 13 exactly.'
    const res = results.find(
      ({ minScore, maxScore }) => totalScore >= minScore && totalScore <= maxScore,
    )
    return res ? res.label : 'No result'
  }

  // Reset quiz handler
  const resetQuiz = () => {
    setShowScore(false)
    setAnswers({})
    setNotes('')
    setEmail('')
  }

  // Save quiz results on submission
  const saveResults = async () => {
    setLoading(true)

    try {
      const res = await fetch(`/api/quiz-attempts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          notes,
          totalScore,
          resultLabel: getResultLabel(),
          answers: Object.values(answers),
        }),
      })
      const data = await res.json()
      window.alert('Results saved successfully!')
      console.log('result submitted:', data)
    } catch (err) {
      console.error('Error fetching results:', err)
    } finally {
      setLoading(false)
      resetQuiz()
    }
  }

  return (
    <main className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-2">{quizData.title}</h1>
      <p className="text-center text-xl mb-6">
        Your total score is: <strong>{totalScore}</strong>
      </p>

      <p className="text-center mb-6 text-lg italic">{getResultLabel()}</p>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          saveResults()
        }}
      >
        <section>
          <label htmlFor="notes" className="block font-semibold mb-1 ">
            Notes (optional)
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            className="w-full p-2 border rounded text-black bg-white"
            placeholder="Write your notes here..."
          />
        </section>

        <section>
          <label htmlFor="email" className="block font-semibold mb-1">
            Email (optional)
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded text-black bg-white"
            placeholder="Your email address"
          />
        </section>

        <button
          type="submit"
          disabled={loading || !email}
          className={`mt-6 w-full py-3 font-semibold rounded ${
            loading || !email
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          Save Results
        </button>
      </form>

      <button
        onClick={resetQuiz}
        className="mt-4 w-full py-3 rounded border border-gray-400 text-white hover:text-black hover:bg-gray-100"
      >
        Restart Quiz
      </button>

      <ResultCards answers={Object.values(answers)} />
    </main>
  )
}

export default QuizScore
