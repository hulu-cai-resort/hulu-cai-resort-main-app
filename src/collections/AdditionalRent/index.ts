import type { CollectionConfig } from 'payload'
import { slugField } from '@/fields/slug'
import { populatePublishedAt } from '@/hooks/populatePublishedAt'
import { revalidateAdditionalRent } from './hooks/revalidateAdditionalRent'

export const AdditionalRent: CollectionConfig = {
  slug: 'additional-rent',
  labels: {
    singular: 'Additional Rent',
    plural: 'Additional Rents',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'price', 'featured', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeChange: [populatePublishedAt],
    afterChange: [revalidateAdditionalRent],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g., "Additional Rent Title"',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Additional Rent Information',
          fields: [
            {
              name: 'packageFeatures',
              type: 'array',
              required: true,
              fields: [
                {
                  name: 'featureTitle',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'Feature title (e.g., "Portable screen, Proyektor, etc.")',
                  },
                },
                {
                  name: 'price',
                  type: 'number',
                  required: true,
                  admin: {
                    description: 'Additional rent price in IDR (e.g., 10000000 for IDR 10.000.000)',
                  },
                },
                {
                  name: 'pricePeriod',
                  type: 'text',
                  defaultValue: 'Per day',
                  admin: {
                    description: 'Pricing period (e.g., "Per day", "Per event")',
                  },
                },
              ],
              admin: {
                description: 'List of features included in this additional rent',
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
