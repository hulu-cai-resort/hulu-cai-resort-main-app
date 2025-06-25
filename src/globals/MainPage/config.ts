import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateMainPage } from './hooks/revalidateMainPage'

export const MainPage: GlobalConfig = {
  slug: 'mainPage',
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
              defaultValue: 'Welcome to Camp Hulu Cai',
              admin: {
                description: 'Main title displayed on the homepage hero section',
              },
            },
            {
              name: 'heroDescription',
              type: 'textarea',
              required: true,
              defaultValue:
                'Terletak di kaki Gunung Pangrango dengan udara sejuk dan panorama hijau, menciptakan suasana alami dan menyegarkan',
              admin: {
                description: 'Description text below the hero title',
              },
            },
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: {
                description: 'Background image for the hero section',
              },
            },
            {
              name: 'heroButtons',
              type: 'array',
              fields: [
                link({
                  appearances: ['default', 'outline'],
                }),
              ],
              maxRows: 2,
              admin: {
                description: 'Call-to-action buttons in the hero section',
              },
            },
          ],
        },
        {
          label: 'Services',
          fields: [
            {
              name: 'servicesTitle',
              type: 'text',
              defaultValue: 'Our Services',
              admin: {
                description: 'Title for the services section',
              },
            },
            {
              name: 'services',
              type: 'array',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'subtitle',
                  type: 'text',
                  defaultValue: 'Camping',
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'link',
                  type: 'text',
                  admin: {
                    description: 'URL or anchor link for this service',
                  },
                },
              ],
              admin: {
                description: 'Main service categories displayed as cards',
              },
            },
          ],
        },
        {
          label: 'About Section',
          fields: [
            {
              name: 'aboutSectionTitle',
              type: 'text',
              defaultValue: 'Place To Go',
              admin: {
                description: 'Section identifier',
              },
            },
            {
              name: 'aboutTitle',
              type: 'text',
              defaultValue: 'Why Nature Feels Better Here',
              admin: {
                description: 'Main title for the about section',
              },
            },
            {
              name: 'aboutDescription',
              type: 'textarea',
              defaultValue:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
            },
            {
              name: 'aboutImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Main image for the about section',
              },
            },
            {
              name: 'features',
              type: 'array',
              fields: [
                {
                  name: 'number',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  required: true,
                },
              ],
              admin: {
                description: 'Key features or benefits of the camp',
              },
            },
            {
              name: 'aboutCTA',
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
          label: 'Packages',
          fields: [
            {
              name: 'packagesSectionTitle',
              type: 'text',
              defaultValue: 'Package Vacation',
            },
            {
              name: 'packagesTitle',
              type: 'text',
              defaultValue: 'Find the Perfect Package for You',
            },
            {
              name: 'packagesDescription',
              type: 'textarea',
              defaultValue:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
            },
            {
              name: 'packages',
              type: 'array',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'link',
                  type: 'text',
                  admin: {
                    description: 'URL for this package',
                  },
                },
              ],
              admin: {
                description: 'Available vacation packages',
              },
            },
          ],
        },
        {
          label: 'Activities Hub',
          fields: [
            {
              name: 'activitiesTitle',
              type: 'text',
              defaultValue: 'Escape the noise. Find your peace together',
            },
            {
              name: 'activitiesDescription',
              type: 'textarea',
              defaultValue:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
            },
            {
              name: 'activities',
              type: 'array',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'icon',
                  type: 'select',
                  options: [
                    { label: 'Heart Handshake', value: 'heart-handshake' },
                    { label: 'Projector', value: 'projector' },
                    { label: 'Tent Tree', value: 'tent-tree' },
                    { label: 'Volleyball', value: 'volleyball' },
                    { label: 'Tent', value: 'tent' },
                  ],
                  required: true,
                },
                {
                  name: 'featured',
                  type: 'checkbox',
                  defaultValue: false,
                  admin: {
                    description: 'Highlight this activity',
                  },
                },
              ],
              admin: {
                description: 'Activities available at the camp',
              },
            },
          ],
        },
        {
          label: 'Location & Facility',
          fields: [
            {
              name: 'locationSectionTitle',
              type: 'text',
              defaultValue: 'Our Location and Facility',
            },
            {
              name: 'locationTitle',
              type: 'text',
              defaultValue: 'Escape the noise. Find your peace together',
            },
            {
              name: 'locationDescription',
              type: 'textarea',
              defaultValue:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
            },
            {
              name: 'locationImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Map or location image',
              },
            },
            {
              name: 'locationInfo',
              type: 'group',
              fields: [
                {
                  name: 'placeName',
                  type: 'text',
                  defaultValue: 'Place 1',
                },
                {
                  name: 'areaName',
                  type: 'text',
                  defaultValue: 'Area Camping',
                },
                {
                  name: 'address',
                  type: 'textarea',
                  defaultValue:
                    'Alamat : JL. Kalpataru No. Malang\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
                },
              ],
            },
          ],
        },
        {
          label: 'Customer Reviews',
          fields: [
            {
              name: 'reviewsSectionTitle',
              type: 'text',
              defaultValue: 'Review Customer',
            },
            {
              name: 'reviewsTitle',
              type: 'text',
              defaultValue: 'What Our Customer Says',
            },
            {
              name: 'reviewsDescription',
              type: 'textarea',
              defaultValue:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
            },
            {
              name: 'reviews',
              type: 'array',
              fields: [
                {
                  name: 'customerName',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'customerImage',
                  type: 'upload',
                  relationTo: 'media',
                },
                {
                  name: 'review',
                  type: 'textarea',
                  required: true,
                },
                {
                  name: 'featured',
                  type: 'checkbox',
                  defaultValue: false,
                  admin: {
                    description: 'Feature this review prominently',
                  },
                },
              ],
              admin: {
                description: 'Customer testimonials and reviews',
              },
            },
            {
              name: 'reviewsCTA',
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
          label: 'Social Media',
          fields: [
            {
              name: 'socialSectionTitle',
              type: 'text',
              defaultValue: 'Social Media',
            },
            {
              name: 'socialTitle',
              type: 'text',
              defaultValue: "Let's Check this out our Social Media",
            },
            {
              name: 'socialDescription',
              type: 'textarea',
              defaultValue:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,Lorem ipsum dolor',
            },
            {
              name: 'socialBackgroundImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Background image for social media section',
              },
            },
            {
              name: 'socialLinks',
              type: 'array',
              fields: [
                {
                  name: 'platform',
                  type: 'select',
                  options: [
                    { label: 'Instagram', value: 'instagram' },
                    { label: 'YouTube', value: 'youtube' },
                    { label: 'Facebook', value: 'facebook' },
                    { label: 'TikTok', value: 'tiktok' },
                  ],
                  required: true,
                },
                {
                  name: 'username',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'url',
                  type: 'text',
                  required: true,
                },
              ],
              admin: {
                description: 'Social media accounts',
              },
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateMainPage],
  },
}
