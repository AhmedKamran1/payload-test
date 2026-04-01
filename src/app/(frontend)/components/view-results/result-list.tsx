import React from 'react'

// Types
import { ResultListProps } from './types'

// Components
import ResultCards from './result-cards'

const ResultList = ({ results, selectedResult, setSelectedResult }: ResultListProps) => {
  return (
    <div>
      {results.length > 0 ? (
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-4">
            <h2 className="text-xl font-bold mb-4">Your Results ({results.length})</h2>
            <div className="space-y-2">
              {results.map((result) => (
                <button
                  key={result.id}
                  onClick={() => setSelectedResult(result)}
                  className={`w-full p-3 rounded text-left transition ${
                    selectedResult?.id === result.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-black hover:bg-gray-300'
                  }`}
                >
                  <div className="font-semibold">Total Score: {result.totalScore}</div>
                </button>
              ))}
            </div>
          </div>

          {selectedResult && (
            <div className="p-6 rounded col-span-12 lg:col-span-8">
              <h2 className="text-2xl font-bold mb-2">Total Score: {selectedResult.totalScore}</h2>
              <p className="text-lg italic mb-4">{selectedResult.resultLabel}</p>

              {selectedResult.notes && (
                <div className="mb-4">
                  <h3 className="font-bold mb-1">Notes:</h3>
                  <p className="p-1 rounded">{selectedResult.notes}</p>
                </div>
              )}

              <ResultCards answers={selectedResult.answers} />
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-white">No quiz attempts found.</p>
        </div>
      )}
    </div>
  )
}

export default ResultList
