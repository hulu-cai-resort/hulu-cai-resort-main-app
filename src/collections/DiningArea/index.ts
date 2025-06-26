import type { CollectionConfig } from 'payload'
import { slugField } from '@/fields/slug'
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
    defaultColumns: ['title', 'price', 'updatedAt'],
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
                description: 'Name of the dining area (e.g., "Team Building", "Paint Ball")',
              },
            },
            ...slugField(),
            {
              name: 'shortDescription',
              type: 'textarea',
              admin: {
                description: 'Brief description displayed on dining area cards',
              },
            },
            {
              name: 'detailedDescription',
              type: 'richText',
              admin: {
                description: 'Detailed description for the dining area detail page',
              },
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: {
                description: 'Main image for the dining area',
              },
            },
            {
              name: 'price',
              type: 'number',
              required: true,
              admin: {
                description: 'Price in IDR',
                step: 1000,
              },
            },
            {
              name: 'priceUnit',
              type: 'text',
              defaultValue: 'per orang',
              admin: {
                description: 'Price unit (e.g., "per orang", "per group")',
              },
            },
          ],
        },
        {
          label: 'Dining Area Details',
          fields: [
            {
              name: 'features',
              type: 'array',
              label: 'Dining Features',
              fields: [
                {
                  name: 'feature',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'Individual feature or highlight (e.g., "Lorem ipsum")',
                  },
                },
              ],
              admin: {
                description: 'List of features or highlights for this activity',
              },
            },
            {
              name: 'duration',
              type: 'text',
              admin: {
                description: 'Dining duration (e.g., "2 hours", "Half day")',
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
                    description: 'Minimum number of participants',
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
