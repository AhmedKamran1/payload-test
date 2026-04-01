import React from 'react'

// Types
import { ResultCardProps } from './types'

const ResultCards = ({ answers }: ResultCardProps) => {
  if (answers.length === 0) {
    return null
  }

  return (
    <div>
      <h3 className="font-semibold mb-2">Answers (Score Breakdown):</h3>
      <div className="space-y-3">
        {answers.map((answer, id) => (
          <div key={id} className="p-3 border-l-4 border-blue-600 bg-gray-900">
            <p className="font-bold">Question: {answer.question}</p>
            <p className="text-sm">Selected Answer: {answer.selectedOption}</p>
            <p className="text-sm text-green-600">Score: {answer.score}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ResultCards
