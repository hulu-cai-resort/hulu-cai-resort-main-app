import type { GlobalConfig } from 'payload'

import { revalidateAccommodationsPage } from './hooks/revalidateAccommodationsPage'

export const AccommodationsPage: GlobalConfig = {
  slug: 'accommodations-page',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'heroTitle',
      type: 'text',
      required: true,
      defaultValue: 'Rest. Recharge. Reconnect.',
      admin: {
        description: 'Main title displayed on the accommodations page hero section',
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
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Background image for the accommodations page hero section',
      },
    },
    {
      name: 'accommodationsTitle',
      type: 'text',
      required: true,
      defaultValue: 'Our Accommodations',
      admin: {
        description: 'Title text for the accommodations section',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateAccommodationsPage],
  },
}
