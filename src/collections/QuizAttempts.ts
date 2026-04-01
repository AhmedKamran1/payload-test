import type { CollectionConfig } from 'payload'
import { encrypt, decrypt } from '../../helpers/data-encryption'

export const QuizAttempts: CollectionConfig = {
  slug: 'quiz-attempts',
  admin: {
    useAsTitle: 'email',
  },
  access: {
    create: () => true,
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data?.notes) {
          data.notes = encrypt(data.notes)
        }
        return data
      },
    ],

    afterRead: [
      ({ doc }) => {
        if (doc?.notes) {
          doc.notes = decrypt(doc.notes)
        }
        return doc
      },
    ],
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      index: true,
    },
    {
      name: 'notes',
      type: 'textarea',
    },
    {
      name: 'answers',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        {
          name: 'selectedOption',
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

    {
      name: 'totalScore',
      type: 'number',
      required: true,
    },

    {
      name: 'resultLabel',
      type: 'text',
      required: true,
    },
  ],
}
