import type { GlobalConfig } from 'payload'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'footerImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Footer Image',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Contact Information',
          fields: [
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
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
