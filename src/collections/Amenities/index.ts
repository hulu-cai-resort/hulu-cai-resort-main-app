import type { CollectionConfig } from 'payload'
import { slugField } from '@/fields/slug'
import { populatePublishedAt } from '@/hooks/populatePublishedAt'
import { revalidateAmenity } from './hooks/revalidateAmenity'

export const Amenities: CollectionConfig = {
  slug: 'amenities',
  labels: {
    singular: 'Amenity',
    plural: 'Amenities',
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
    afterChange: [revalidateAmenity],
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
                description: 'Name of the amenity (e.g., "Amphy", "Function Room")',
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
                description: 'Main image for the amenity',
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
                description: 'Location description (e.g., "Central camp zone, near the main hall")',
              },
            },
            {
              name: 'availability',
              type: 'text',
              admin: {
                description: 'Available times/schedule (e.g., "Available until 9 PM")',
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
                description: 'List of items included with the amenity',
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
                description:
                  'Available facilities (e.g., "Built-in stage", "Sound system & lighting")',
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
                description:
                  'Important notes or restrictions (e.g., "Reservation required for private use")',
              },
            },
          ],
        },
      ],
    },
  ],
}
