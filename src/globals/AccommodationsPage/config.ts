import type { GlobalConfig } from 'payload'

import { revalidateAccommodationsPage } from './hooks/revalidateAccommodationsPage'

export const AccommodationsPage: GlobalConfig = {
  slug: 'accommodations-page',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
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
                  defaultValue: 'Accommodations - Camp Hulu Cai Mountain Resort',
                  admin: {
                    description: 'Page title for search engines',
                  },
                },
                {
                  name: 'description',
                  type: 'textarea',
                  defaultValue:
                    'Discover comfortable accommodations at Camp Hulu Cai. From cozy cottages to spacious villas, rest and recharge surrounded by nature at Mount Pangrango.',
                  admin: {
                    description: 'Meta description for search engines (150-160 characters)',
                  },
                },
                {
                  name: 'keywords',
                  type: 'text',
                  defaultValue:
                    'camp hulu cai accommodations, mountain resort, cottages, villas, camping ground, gunung pangrango lodging, nature accommodation',
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
                      defaultValue: 'LodgingBusiness',
                      options: [
                        { label: 'Lodging Business', value: 'LodgingBusiness' },
                        { label: 'Campground', value: 'Campground' },
                        { label: 'Resort', value: 'Resort' },
                        { label: 'Hotel', value: 'Hotel' },
                      ],
                      admin: {
                        description: 'Schema.org type for accommodation business',
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
                        description: 'List of amenities offered (for structured data)',
                      },
                    },
                    {
                      name: 'checkInTime',
                      type: 'text',
                      admin: {
                        description: 'Check-in time (e.g., "14:00")',
                      },
                    },
                    {
                      name: 'checkOutTime',
                      type: 'text',
                      admin: {
                        description: 'Check-out time (e.g., "11:00")',
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
                  ],
                  admin: {
                    description: 'Structured data for accommodation business',
                  },
                },
              ],
              admin: {
                description: 'SEO settings for the accommodations page',
              },
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateAccommodationsPage],
  },
}
