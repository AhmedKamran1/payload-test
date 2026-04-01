import { QuizAttempt } from '@/payload-types'

export type ResultCardProps = {
  answers: QuizAttempt['answers']
}

export type ResultListProps = {
  results: QuizAttempt[]
  selectedResult: QuizAttempt | null
  setSelectedResult: React.Dispatch<React.SetStateAction<QuizAttempt | null>>
}

export type SearchBarProps = {
  fetchResults: (email: string) => void
  loading: boolean
}
