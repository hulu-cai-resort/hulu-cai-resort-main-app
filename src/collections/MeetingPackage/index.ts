import type { CollectionConfig } from 'payload'
import { populatePublishedAt } from '@/hooks/populatePublishedAt'
import { revalidateMeetingPackage } from './hooks/revalidateMeetingPackage'

export const MeetingPackage: CollectionConfig = {
  slug: 'meeting-package',
  labels: {
    singular: 'Meeting Package',
    plural: 'Meeting Packages',
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
    afterChange: [revalidateMeetingPackage],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g., "Package Title"',
      },
    },
    {
      name: 'subtitle',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g., "Package Subtitle"',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Features',
          fields: [
            {
              name: 'features',
              type: 'array',
              label: 'Package Features',
              required: true,
              fields: [
                {
                  name: 'feature',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'Individual feature (e.g., "Lorem Ipsum Dolor Fit Details")',
                  },
                },
              ],
              admin: {
                description: 'List of features included in this package',
              },
            },
          ],
        },
        {
          label: 'Package Information',
          fields: [
            {
              name: 'packageFeatures',
              type: 'array',
              required: true,
              fields: [
                {
                  name: 'specialFeatures',
                  type: 'array',
                  fields: [
                    {
                      name: 'specialFeature',
                      type: 'text',
                      admin: {
                        description: 'e.g., "Queen/King Bed, Breakfast, etc."',
                      },
                    },
                  ],
                },
                {
                  name: 'price',
                  type: 'number',
                  required: true,
                  admin: {
                    description: 'Package price in IDR (e.g., 10000000 for IDR 10.000.000)',
                  },
                },
                {
                  name: 'pricePeriod',
                  type: 'text',
                  defaultValue: 'Per pax',
                  admin: {
                    description: 'Pricing period (e.g., "Per pax", "Per group")',
                  },
                },
              ],
              admin: {
                description: 'List of features included in this package',
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
