import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Footer CTA',
          fields: [
            {
              name: 'footerCtaImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Background image for footer CTA',
              },
            },
            {
              name: 'footerCtaSubtitle',
              type: 'text',
              defaultValue: 'From Meeting to All Memories',
            },
            {
              name: 'footerCtaTitle',
              type: 'text',
              defaultValue: 'All in One Place',
            },
            {
              name: 'footerCtaButton',
              type: 'group',
              fields: [
                link({
                  appearances: ['default'],
                }),
              ],
            },
          ],
        },
        {
          label: 'Contact Information',
          fields: [
            {
              name: 'companyName',
              type: 'text',
              defaultValue: 'Hulu Cai Camp',
              required: true,
            },
            {
              name: 'address',
              type: 'textarea',
              defaultValue: 'Jl.Alamat',
            },
            {
              name: 'phone',
              type: 'text',
              defaultValue: '08555555551234',
            },
            {
              name: 'email',
              type: 'email',
              defaultValue: 'hulucaicamp@gmail.com',
            },
            {
              name: 'instagramHandle',
              type: 'text',
              defaultValue: 'Hulucaicamp',
            },
            {
              name: 'copyright',
              type: 'text',
              defaultValue: '©2025 Hulu Cai Camp · All rights reserved.',
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
