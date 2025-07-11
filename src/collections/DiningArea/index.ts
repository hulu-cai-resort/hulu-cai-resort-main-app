import type { CollectionConfig } from 'payload'
import { populatePublishedAt } from '@/hooks/populatePublishedAt'
import { revalidateDiningArea } from './hooks/revalidateDiningArea'

export const DiningArea: CollectionConfig = {
  slug: 'dining-area',
  labels: {
    singular: 'Dining Area',
    plural: 'Dining Areas',
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
    afterChange: [revalidateDiningArea],
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
                description: 'Name of the attraction (e.g., "Mini Rafting", "Giant Flower")',
              },
            },
            {
              name: 'mapCode',
              type: 'text',
              admin: {
                description: 'Map code for the dining area (eg. 1, 2, 3, etc.)',
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
                description: 'Points of the attraction',
              },
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: {
                description: 'Main image for the attraction',
              },
            },
          ],
        },
        {
          label: 'Dining Area Details',
          fields: [
            {
              name: 'menuLink',
              type: 'text',
              admin: {
                description: 'Link to the menu (eg. https://www.google.com)',
              },
            },
            {
              name: 'groupSize',
              type: 'group',
              fields: [
                {
                  name: 'minimum',
                  type: 'number',
                  admin: {
                    description: 'Standard number of participants',
                  },
                },
                {
                  name: 'maximum',
                  type: 'number',
                  admin: {
                    description: 'Maximum number of participants',
                  },
                },
              ],
              admin: {
                description: 'Group size requirements',
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
