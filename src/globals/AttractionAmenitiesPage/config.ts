import type { GlobalConfig } from 'payload'
import { revalidateAttractionAmenitiesPage } from './hooks/revalidateAttractionAmenitiesPage'

export const AttractionAmenitiesPage: GlobalConfig = {
  slug: 'attraction-amenities-page',
  label: 'Attraction & Amenities Page',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateAttractionAmenitiesPage],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero Section',
          fields: [
            {
              name: 'heroTitle',
              type: 'text',
              required: true,
              defaultValue: 'Experience comfort, adventure, and connection',
              admin: {
                description: 'Main title displayed in the hero section',
              },
            },
            {
              name: 'heroDescription',
              type: 'textarea',
              required: true,
              defaultValue:
                'Experience comfort, adventure, and connection in one nature-filled escape — from cozy glamping tents and campfire nights to sunrise hikes, forest trails, and family-friendly fun. Every corner is designed to bring you closer to nature and closer to each other.',
              admin: {
                description: 'Description text displayed below the hero title',
              },
            },
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Background image for the hero section',
              },
            },
          ],
        },
        {
          label: 'Dining Section',
          fields: [
            {
              name: 'diningTitle',
              type: 'text',
              required: true,
              defaultValue: 'Attraction',
              admin: {
                description: 'Title for the dining section',
              },
            },
            {
              name: 'diningDescription',
              type: 'textarea',
              required: true,
              defaultValue:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
              admin: {
                description: 'Description text for the dining section',
              },
            },
          ],
        },
        {
          label: 'Amenities Section',
          fields: [
            {
              name: 'amenitiesTitle',
              type: 'text',
              required: true,
              defaultValue: 'Amenities',
              admin: {
                description: 'Title for the amenities section',
              },
            },
            {
              name: 'amenitiesDescription',
              type: 'textarea',
              required: true,
              defaultValue:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
              admin: {
                description: 'Description text for the amenities section',
              },
            },
          ],
        },
      ],
    },
  ],
}
