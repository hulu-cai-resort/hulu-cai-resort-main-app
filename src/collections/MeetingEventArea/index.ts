import type { CollectionConfig } from 'payload'
import { slugField } from '@/fields/slug'
import { populatePublishedAt } from '@/hooks/populatePublishedAt'
import { revalidateMeetingEventArea } from './hooks/revalidateMeetingEventArea'

export const MeetingEventArea: CollectionConfig = {
  slug: 'meeting-event-area',
  labels: {
    singular: 'Meeting Event Area',
    plural: 'Meeting Event Areas',
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
    afterChange: [revalidateMeetingEventArea],
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
                description: 'Name of the meeting event area (e.g., "Team Building", "Paint Ball")',
              },
            },
            ...slugField(),
            {
              name: 'shortDescription',
              type: 'textarea',
              admin: {
                description: 'Brief description displayed on meeting event area cards',
              },
            },
            {
              name: 'detailedDescription',
              type: 'richText',
              admin: {
                description: 'Detailed description for the meeting event area detail page',
              },
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: {
                description: 'Main image for the meeting event area',
              },
            },
          ],
        },
        {
          label: 'Meeting Event Area Details',
          fields: [
            {
              name: 'features',
              type: 'array',
              label: 'Meeting Event Features',
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
