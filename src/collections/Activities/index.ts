import type { CollectionConfig } from 'payload'
import { slugField } from '@/fields/slug'
import { populatePublishedAt } from '@/hooks/populatePublishedAt'
import { revalidateActivity } from './hooks/revalidateActivity'

export const Activities: CollectionConfig = {
  slug: 'activities',
  labels: {
    singular: 'Activity',
    plural: 'Activities',
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
    afterChange: [revalidateActivity],
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
                description: 'Name of the activity (e.g., "Team Building", "Paint Ball")',
              },
            },
            ...slugField(),
            {
              name: 'shortDescription',
              type: 'textarea',
              admin: {
                description: 'Brief description displayed on activity cards',
              },
            },
            {
              name: 'detailedDescription',
              type: 'richText',
              admin: {
                description: 'Detailed description for the activity detail page',
              },
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: {
                description: 'Main image for the activity',
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
          label: 'Activity Details',
          fields: [
            {
              name: 'features',
              type: 'array',
              label: 'Activity Features',
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
                description: 'Activity duration (e.g., "2 hours", "Half day")',
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
            {
              name: 'difficulty',
              type: 'select',
              options: [
                { label: 'Easy', value: 'easy' },
                { label: 'Medium', value: 'medium' },
                { label: 'Hard', value: 'hard' },
              ],
              admin: {
                description: 'Difficulty level of the activity',
              },
            },
            {
              name: 'ageRestriction',
              type: 'text',
              admin: {
                description: 'Age restrictions if any (e.g., "12+ years", "All ages")',
              },
            },
          ],
        },
        {
          label: 'Logistics',
          fields: [
            {
              name: 'location',
              type: 'text',
              admin: {
                description: 'Where the activity takes place',
              },
            },
            {
              name: 'equipment',
              type: 'array',
              label: 'Equipment Provided',
              fields: [
                {
                  name: 'item',
                  type: 'text',
                  required: true,
                },
              ],
              admin: {
                description: 'Equipment or materials provided for the activity',
              },
            },
            {
              name: 'requirements',
              type: 'array',
              label: 'Requirements',
              fields: [
                {
                  name: 'requirement',
                  type: 'text',
                  required: true,
                },
              ],
              admin: {
                description: 'What participants need to bring or prepare',
              },
            },
            {
              name: 'weatherDependent',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                description: 'Check if activity is weather dependent',
              },
            },
            {
              name: 'specialNotes',
              type: 'textarea',
              admin: {
                description: 'Any special notes or instructions for participants',
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
