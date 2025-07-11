import type { CollectionConfig } from 'payload'
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
              name: 'ageRange',
              type: 'select',
              options: [
                {
                  label: 'Kids Friendly',
                  value: 'kids-friendly',
                },
                {
                  label: 'Pre Teen Friendly',
                  value: 'pre-teen-friendly',
                },
                {
                  label: 'Adults Only',
                  value: 'adults-only',
                },
              ],
              admin: {
                description: 'Age range of the attraction',
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
      ],
    },
  ],
}
