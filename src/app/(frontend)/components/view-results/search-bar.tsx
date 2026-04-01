import React, { useState } from 'react'

// Types
import { SearchBarProps } from './types'

const SearchBar = ({ fetchResults, loading }: SearchBarProps) => {
  const [email, setEmail] = useState<string>('')

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        fetchResults(email)
      }}
      className="space-y-4"
    >
      <div>
        <label htmlFor="search-email" className="block font-semibold mb-2">
          Enter your email to view results:
        </label>
        <div className="flex flex-wrap gap-2">
          <input
            id="search-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 p-2 border rounded text-black bg-white"
            placeholder="your@email.com"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Search'}
          </button>
        </div>
      </div>
    </form>
  )
}

export default SearchBar
