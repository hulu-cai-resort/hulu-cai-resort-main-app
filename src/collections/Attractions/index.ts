import type { CollectionConfig } from 'payload'
import { slugField } from '@/fields/slug'
import { populatePublishedAt } from '@/hooks/populatePublishedAt'
import { revalidateAttraction } from './hooks/revalidateAttraction'

export const Attractions: CollectionConfig = {
  slug: 'attractions',
  labels: {
    singular: 'Attraction',
    plural: 'Attractions',
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
    afterChange: [revalidateAttraction],
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
            ...slugField(),
            {
              name: 'shortDescription',
              type: 'textarea',
              required: true,
              admin: {
                description: 'Brief description displayed on the card view',
              },
            },
            {
              name: 'detailedDescription',
              type: 'richText',
              required: true,
              admin: {
                description: 'Detailed description shown in the modal popup',
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
            {
              name: 'price',
              type: 'number',
              required: true,
              admin: {
                description: 'Price in IDR (e.g., 200000 for IDR 200.000)',
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
          label: 'Location & Timing',
          fields: [
            {
              name: 'location',
              type: 'text',
              admin: {
                description: 'Location description (e.g., "Near the east river zone")',
              },
            },
            {
              name: 'availability',
              type: 'text',
              admin: {
                description: 'Available times/schedule (e.g., "8 AM – 4 PM (Last trip at 3 PM)")',
              },
            },
            {
              name: 'capacity',
              type: 'text',
              admin: {
                description: 'Capacity information (e.g., "Up to 150 people")',
              },
            },
          ],
        },
        {
          label: 'Features & Details',
          fields: [
            {
              name: 'includes',
              type: 'array',
              label: "What's Included",
              fields: [
                {
                  name: 'item',
                  type: 'text',
                  required: true,
                },
              ],
              admin: {
                description:
                  'List of items included (e.g., "Safety Gear (Helmet) + life vest", "Raft Guide")',
              },
            },
            {
              name: 'facilities',
              type: 'array',
              label: 'Facilities Available',
              fields: [
                {
                  name: 'facility',
                  type: 'text',
                  required: true,
                },
              ],
              admin: {
                description: 'Available facilities',
              },
            },
            {
              name: 'notes',
              type: 'array',
              label: 'Important Notes',
              fields: [
                {
                  name: 'note',
                  type: 'text',
                  required: true,
                },
              ],
              admin: {
                description: 'Important notes or restrictions',
              },
            },
          ],
        },
      ],
    },
  ],
}
