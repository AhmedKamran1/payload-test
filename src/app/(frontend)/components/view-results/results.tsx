'use client'

import React, { useState } from 'react'
import Link from 'next/link'

// Types
import { QuizAttempt } from '@/payload-types'

// Components
import SearchBar from './search-bar'
import ResultList from './result-list'

const Result = () => {
  const [results, setResults] = useState<QuizAttempt[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [selectedResult, setSelectedResult] = useState<QuizAttempt | null>(null)

  // Fetch quiz attempts based on email search
  const fetchResults = async (email: string) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/quiz-attempts?where[email][equals]=${email}&limit=0`)
      const data = await res.json()
      setResults(data.docs || [])
      if (data.docs && data.docs.length > 0) {
        setSelectedResult(data.docs[0])
      }
    } catch (err) {
      console.error('Error fetching results:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/">
          <span className="underline">Back to Quiz</span>
        </Link>
        <h1 className="text-3xl font-bold">Quiz Results</h1>
      </div>

      <SearchBar fetchResults={fetchResults} loading={loading} />

      <ResultList
        results={results}
        selectedResult={selectedResult}
        setSelectedResult={setSelectedResult}
      />
    </main>
  )
}

export default Result
