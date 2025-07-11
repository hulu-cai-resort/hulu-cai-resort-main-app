import type { CollectionConfig } from 'payload'
import { populatePublishedAt } from '@/hooks/populatePublishedAt'
import { revalidateGamesGround } from './hooks/revalidateGamesGround'

export const GamesGround: CollectionConfig = {
  slug: 'games-ground',
  labels: {
    singular: 'Games Ground',
    plural: 'Games Grounds',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeChange: [populatePublishedAt],
    afterChange: [revalidateGamesGround],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General Information',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              admin: {
                description: 'Name of the games ground (e.g., Sawo, Palem, Negla)',
              },
            },
            {
              name: 'mapCode',
              type: 'text',
              admin: {
                description: 'Map code for the games ground (eg. 1, 2, 3, etc.)',
              },
            },
            {
              name: 'location',
              type: 'select',
              required: true,
              defaultValue: 'valley-cibedug',
              options: [
                {
                  label: 'Valley - Cibedug',
                  value: 'valley-cibedug',
                },
                {
                  label: 'Hills - Babakan',
                  value: 'hills-babakan',
                },
              ],
              enumName: 'accommodations_location',
            },
            {
              name: 'points',
              type: 'array',
              fields: [
                {
                  name: 'point',
                  type: 'text',
                },
              ],
              admin: {
                description: 'Points of the games ground',
              },
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: {
                description: 'Main image for the games ground',
              },
            },
          ],
        },
        {
          label: 'Games Ground Details',
          fields: [
            {
              name: 'groupSize',
              type: 'group',
              fields: [
                {
                  name: 'iceBrakingCapacity',
                  type: 'number',
                  admin: {
                    description: 'Ice breaking capacity',
                  },
                },
                {
                  name: 'gamesCapacity',
                  type: 'number',
                  admin: {
                    description: 'Games capacity',
                  },
                },
              ],
              admin: {
                description: 'Group size requirements for ice breaking and games',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
  ],
}
