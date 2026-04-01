import type { CollectionConfig } from 'payload'
import { Quiz } from '@/payload-types'

export const Quizzes: CollectionConfig = {
  slug: 'quizzes',
  admin: {
    useAsTitle: 'title',
  },
  hooks: {
    afterRead: [
      ({ doc }: { doc: Quiz }) => {
        if (!doc.shuffling) return doc

        // Shuffle questions and options if shuffling is enabled
        const shuffleArray = <T>(items: T[]): T[] => {
          const shuffled = [...items]

          for (let i = shuffled.length - 1; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * (i + 1))

            const temp = shuffled[i]
            shuffled[i] = shuffled[randomIndex]
            shuffled[randomIndex] = temp
          }

          return shuffled
        }

        const shuffledOptions = doc.questions.map((question) => {
          return {
            ...question,
            options: shuffleArray(question.options),
          }
        })

        const shuffledQuestions = shuffleArray(shuffledOptions)

        return {
          ...doc,
          questions: shuffledQuestions,
        }
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'questions',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        {
          name: 'options',
          type: 'array',
          required: true,
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'score',
              type: 'number',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'results',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'minScore',
          type: 'number',
          required: true,
        },
        {
          name: 'maxScore',
          type: 'number',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'shuffling',
      type: 'checkbox',
      defaultValue: false,
      label: 'Enable Question / Option Shuffling',
      admin: {
        description: 'Randomize question and options order for each quiz attempt',
      },
    },
  ],
}
