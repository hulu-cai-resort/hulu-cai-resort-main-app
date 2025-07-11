import type { GlobalConfig } from 'payload'

import { revalidateCampingGroundPage } from './hooks/revalidateCampingGroundPage'

export const CampingGroundPage: GlobalConfig = {
  slug: 'camping-ground-page',
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
              defaultValue: 'Cottage: Quaint Haven, Peaceful Retreat.',
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
        {
          label: 'SEO',
          fields: [
            {
              name: 'seo',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: 'Camping Ground - Camp Hulu Cai Mountain Resort',
                  admin: {
                    description: 'Page title for search engines',
                  },
                },
                {
                  name: 'description',
                  type: 'textarea',
                  defaultValue:
                    'Experience authentic camping at Camp Hulu Cai camping grounds. Pitch your tent under the stars with modern facilities and stunning mountain views at Mount Pangrango.',
                  admin: {
                    description: 'Meta description for search engines (150-160 characters)',
                  },
                },
                {
                  name: 'keywords',
                  type: 'text',
                  defaultValue:
                    'camp hulu cai camping, mountain camping, camping ground, tent camping, outdoor camping, gunung pangrango camping, nature camping',
                  admin: {
                    description: 'SEO keywords separated by commas',
                  },
                },
                {
                  name: 'ogImage',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    description:
                      'Open Graph image for social media sharing (recommended: 1200x630px)',
                  },
                },
                {
                  name: 'ogTitle',
                  type: 'text',
                  admin: {
                    description: 'Open Graph title (optional, uses page title if empty)',
                  },
                },
                {
                  name: 'ogDescription',
                  type: 'textarea',
                  admin: {
                    description:
                      'Open Graph description (optional, uses meta description if empty)',
                  },
                },
                {
                  name: 'canonicalUrl',
                  type: 'text',
                  admin: {
                    description: 'Canonical URL for this page (optional)',
                  },
                },
                {
                  name: 'noIndex',
                  type: 'checkbox',
                  defaultValue: false,
                  admin: {
                    description: 'Prevent search engines from indexing this page',
                  },
                },
                {
                  name: 'noFollow',
                  type: 'checkbox',
                  defaultValue: false,
                  admin: {
                    description: 'Prevent search engines from following links on this page',
                  },
                },
                {
                  name: 'structuredData',
                  type: 'group',
                  fields: [
                    {
                      name: 'accommodationType',
                      type: 'select',
                      defaultValue: 'Campground',
                      options: [
                        { label: 'Campground', value: 'Campground' },
                        { label: 'RVPark', value: 'RVPark' },
                        { label: 'LodgingBusiness', value: 'LodgingBusiness' },
                      ],
                      admin: {
                        description: 'Schema.org type for camping ground',
                      },
                    },
                    {
                      name: 'maxOccupancy',
                      type: 'number',
                      min: 1,
                      admin: {
                        description: 'Maximum number of campers per site',
                      },
                    },
                    {
                      name: 'numberOfSites',
                      type: 'number',
                      min: 1,
                      admin: {
                        description: 'Total number of camping sites available',
                      },
                    },
                    {
                      name: 'amenities',
                      type: 'array',
                      fields: [
                        {
                          name: 'amenity',
                          type: 'text',
                          required: true,
                        },
                      ],
                      admin: {
                        description: 'List of camping ground amenities (for structured data)',
                      },
                    },
                    {
                      name: 'starRating',
                      type: 'number',
                      min: 1,
                      max: 5,
                      admin: {
                        description: 'Star rating (1-5)',
                      },
                    },
                    {
                      name: 'petsAllowed',
                      type: 'checkbox',
                      defaultValue: false,
                      admin: {
                        description: 'Whether pets are allowed in the camping ground',
                      },
                    },
                  ],
                  admin: {
                    description: 'Structured data for camping ground',
                  },
                },
              ],
              admin: {
                description: 'SEO settings for the camping ground page',
              },
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateCampingGroundPage],
  },
}
