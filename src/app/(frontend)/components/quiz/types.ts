import { Quiz } from '@/payload-types'

export type QuestionWithAnswer = {
  question: string
  selectedOption: string
  score: number
}

export type ScoreProps = {
  quizData: Quiz
  answers: Record<number, QuestionWithAnswer>
  setAnswers: React.Dispatch<React.SetStateAction<Record<number, QuestionWithAnswer>>>
  setShowScore: React.Dispatch<React.SetStateAction<boolean>>
}
