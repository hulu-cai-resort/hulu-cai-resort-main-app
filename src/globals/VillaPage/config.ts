import type { GlobalConfig } from 'payload'

import { revalidateVillaPage } from './hooks/revalidateVillaPage'

export const VillaPage: GlobalConfig = {
  slug: 'villa-page',
  access: {
    read: () => true,
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
              defaultValue: 'Villa: Spacious Comfort. Private Serenity.',
              admin: {
                description: 'Main title displayed on the villa page hero section',
              },
            },
            {
              name: 'heroDescription',
              type: 'textarea',
              required: true,
              defaultValue:
                'Experience restful nights and peaceful mornings in accommodations surrounded by towering trees and crisp mountain breeze. At Camp Hulu Cai, each room is thoughtfully designed to offer comfort while keeping you connected to the natural beauty just outside your window — the perfect place to rest, recharge, and reconnect.',
              admin: {
                description: 'Description text in the hero section',
              },
            },
            {
              name: 'heroBackgroundImage',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: {
                description: 'Background image for the villa page hero section',
              },
            },
            {
              name: 'showScrollIndicator',
              type: 'checkbox',
              defaultValue: true,
              admin: {
                description: 'Show the scroll down indicator in the hero section',
              },
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateVillaPage],
  },
}
