import type { CollectionConfig } from 'payload'
import { slugField } from '@/fields/slug'
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
      type: 'tabs',
      tabs: [
        {
          label: 'Package Information',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              admin: {
                description: 'Package title (e.g., "Package Title")',
              },
            },
            ...slugField(),
            {
              name: 'description',
              type: 'text',
              admin: {
                description:
                  'Brief description of the package (e.g., "Ideal for individuals and small businesses")',
              },
            },
            {
              name: 'detailedDescription',
              type: 'richText',
              admin: {
                description: 'Detailed description for the package detail page',
              },
            },
            {
              name: 'featured',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                description: 'Mark as featured package (will be highlighted with green background)',
              },
            },
          ],
        },
        {
          label: 'Pricing',
          fields: [
            {
              name: 'price',
              type: 'number',
              required: true,
              admin: {
                description: 'Package price in IDR (e.g., 10000000 for IDR 10.000.000)',
              },
            },
            {
              name: 'currency',
              type: 'select',
              defaultValue: 'IDR',
              options: [
                { label: 'Indonesian Rupiah (IDR)', value: 'IDR' },
                { label: 'US Dollar (USD)', value: 'USD' },
              ],
              admin: {
                description: 'Currency for the price',
              },
            },
            {
              name: 'pricePeriod',
              type: 'text',
              defaultValue: 'Per month',
              admin: {
                description: 'Pricing period (e.g., "Per month", "Per event", "Per day")',
              },
            },
            {
              name: 'discount',
              type: 'group',
              fields: [
                {
                  name: 'hasDiscount',
                  type: 'checkbox',
                  defaultValue: false,
                },
                {
                  name: 'originalPrice',
                  type: 'number',
                  admin: {
                    condition: (data, siblingData) => siblingData?.hasDiscount,
                  },
                },
                {
                  name: 'discountPercentage',
                  type: 'number',
                  admin: {
                    condition: (data, siblingData) => siblingData?.hasDiscount,
                    description: 'Discount percentage (e.g., 20 for 20% off)',
                  },
                },
              ],
              admin: {
                description: 'Optional discount information',
              },
            },
          ],
        },
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
                {
                  name: 'included',
                  type: 'checkbox',
                  defaultValue: true,
                  admin: {
                    description: 'Whether this feature is included (check mark) or not',
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
          label: 'Additional Information',
          fields: [
            {
              name: 'packageType',
              type: 'select',
              options: [
                { label: 'Basic', value: 'basic' },
                { label: 'Standard', value: 'standard' },
                { label: 'Premium', value: 'premium' },
                { label: 'Corporate', value: 'corporate' },
                { label: 'Custom', value: 'custom' },
              ],
              admin: {
                description: 'Type/tier of the package',
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
                description: 'Recommended group size for this package',
              },
            },
            {
              name: 'duration',
              type: 'text',
              admin: {
                description: 'Package duration (e.g., "Half Day", "Full Day", "2 Days")',
              },
            },
            {
              name: 'availability',
              type: 'select',
              options: [
                { label: 'Available', value: 'available' },
                { label: 'Limited', value: 'limited' },
                { label: 'Seasonal', value: 'seasonal' },
                { label: 'Unavailable', value: 'unavailable' },
              ],
              defaultValue: 'available',
              admin: {
                description: 'Current availability status',
              },
            },
            {
              name: 'bookingNotes',
              type: 'textarea',
              admin: {
                description: 'Special booking requirements or notes',
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
