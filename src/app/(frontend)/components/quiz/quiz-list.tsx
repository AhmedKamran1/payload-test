'use client'

import React, { useState } from 'react'
import Link from 'next/link'

// Types
import { Quiz } from '@/payload-types'
import { QuestionWithAnswer } from './types'

// Components
import QuizScore from './quiz-score'

const QuizList = ({ quizData }: { quizData: Quiz }) => {
  const [answers, setAnswers] = useState<Record<string, QuestionWithAnswer>>({})
  const [showScore, setShowScore] = useState<boolean>(false)

  const { questions } = quizData

  // Handler to select an answer option
  const selectAnswer = (questionId: string, option: QuestionWithAnswer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }))
  }

  // Check if all questions answered
  const allAnswered = questions.length === Object.keys(answers).length

  // If score is not shown, display quiz questions and options
  if (!showScore) {
    return (
      <main className="max-w-xl mx-auto p-6 space-y-8 ">
        <h1 className="text-3xl font-bold text-center mb-4">{quizData.title}</h1>
        <p>
          Already attempted quiz before? search your results
          <Link href="/results">
            <span className="ml-1 underline">here</span>
          </Link>
        </p>
        {questions.map(({ id, question, options }) => (
          <section key={id} className="border rounded p-4">
            <h2 className="font-semibold mb-3">{question}</h2>
            <div className="space-y-2">
              {options.map(({ label, score }) => (
                <button
                  key={label}
                  onClick={() =>
                    selectAnswer(id as string, { question, selectedOption: label, score })
                  }
                  className={`block w-full text-left p-2 rounded border 
                    ${
                      answers[id as string]?.score === score
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-black hover:text-black text-white/80 border-gray-300 hover:bg-blue-400'
                    }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </section>
        ))}
        <button
          disabled={!allAnswered}
          onClick={() => {
            setShowScore(true)
            window.scrollTo({ top: 0, behavior: 'instant' })
          }}
          className={`mt-6 w-full py-3 rounded text-white font-semibold ${
            allAnswered ? 'bg-blue-700 hover:bg-blue-800' : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Submit Quiz
        </button>
      </main>
    )
  }

  // Score page UI
  return (
    <QuizScore
      quizData={quizData}
      answers={answers}
      setAnswers={setAnswers}
      setShowScore={setShowScore}
    />
  )
}

export default QuizList
