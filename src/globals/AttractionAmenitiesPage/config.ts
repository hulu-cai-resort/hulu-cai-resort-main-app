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
          label: 'Attractions Section',
          fields: [
            {
              name: 'attractionsTitle',
              type: 'text',
              required: true,
              defaultValue: 'Attraction',
              admin: {
                description: 'Title for the attractions section',
              },
            },
            {
              name: 'attractionsDescription',
              type: 'textarea',
              required: true,
              defaultValue:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
              admin: {
                description: 'Description text for the attractions section',
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
                  defaultValue: 'Attractions & Amenities - Camp Hulu Cai Mountain Resort',
                  admin: {
                    description: 'Page title for search engines',
                  },
                },
                {
                  name: 'description',
                  type: 'textarea',
                  defaultValue:
                    'Discover amazing attractions and premium amenities at Camp Hulu Cai. From adventure activities to comfortable facilities, experience the perfect mountain getaway at Mount Pangrango.',
                  admin: {
                    description: 'Meta description for search engines (150-160 characters)',
                  },
                },
                {
                  name: 'keywords',
                  type: 'text',
                  defaultValue:
                    'camp hulu cai attractions, amenities, mountain activities, facilities, adventure activities, gunung pangrango attractions, resort amenities',
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
                  name: 'schema',
                  type: 'group',
                  fields: [
                    {
                      name: 'type',
                      type: 'select',
                      defaultValue: 'TouristAttraction',
                      options: [
                        { label: 'Tourist Attraction', value: 'TouristAttraction' },
                        { label: 'Amusement Park', value: 'AmusementPark' },
                        { label: 'Resort', value: 'Resort' },
                        { label: 'Recreation Center', value: 'RecreationCenter' },
                      ],
                      admin: {
                        description: 'Schema.org type for attractions and amenities',
                      },
                    },
                    {
                      name: 'categories',
                      type: 'array',
                      fields: [
                        {
                          name: 'item',
                          type: 'select',
                          options: [
                            { label: 'Adventure Sports', value: 'adventure-sports' },
                            { label: 'Nature Activities', value: 'nature-activities' },
                            { label: 'Family Entertainment', value: 'family-entertainment' },
                            { label: 'Outdoor Recreation', value: 'outdoor-recreation' },
                            { label: 'Water Activities', value: 'water-activities' },
                            { label: 'Hiking & Trekking', value: 'hiking-trekking' },
                          ],
                          required: true,
                        },
                      ],
                      admin: {
                        description: 'Categories of attractions offered',
                      },
                    },
                    {
                      name: 'amenities',
                      type: 'array',
                      fields: [
                        {
                          name: 'item',
                          type: 'select',
                          options: [
                            { label: 'Restaurant', value: 'restaurant' },
                            { label: 'Swimming Pool', value: 'swimming-pool' },
                            { label: 'Spa & Wellness', value: 'spa-wellness' },
                            { label: 'Conference Facilities', value: 'conference-facilities' },
                            { label: 'Recreation Center', value: 'recreation-center' },
                            { label: 'Parking', value: 'parking' },
                            { label: 'WiFi', value: 'wifi' },
                            { label: 'Gift Shop', value: 'gift-shop' },
                          ],
                          required: true,
                        },
                      ],
                      admin: {
                        description: 'Types of amenities available',
                      },
                    },
                    {
                      name: 'hours',
                      type: 'group',
                      fields: [
                        {
                          name: 'open',
                          type: 'text',
                          admin: {
                            description: 'Opening time (e.g., "08:00")',
                          },
                        },
                        {
                          name: 'close',
                          type: 'text',
                          admin: {
                            description: 'Closing time (e.g., "18:00")',
                          },
                        },
                        {
                          name: 'days',
                          type: 'array',
                          fields: [
                            {
                              name: 'day',
                              type: 'select',
                              options: [
                                { label: 'Monday', value: 'Monday' },
                                { label: 'Tuesday', value: 'Tuesday' },
                                { label: 'Wednesday', value: 'Wednesday' },
                                { label: 'Thursday', value: 'Thursday' },
                                { label: 'Friday', value: 'Friday' },
                                { label: 'Saturday', value: 'Saturday' },
                                { label: 'Sunday', value: 'Sunday' },
                              ],
                              required: true,
                            },
                          ],
                          admin: {
                            description: 'Days of the week when open',
                          },
                        },
                      ],
                      admin: {
                        description: 'Operating hours',
                      },
                    },
                    {
                      name: 'price',
                      type: 'select',
                      options: [
                        { label: '$', value: '$' },
                        { label: '$$', value: '$$' },
                        { label: '$$$', value: '$$$' },
                        { label: '$$$$', value: '$$$$' },
                      ],
                      admin: {
                        description: 'Price range',
                      },
                    },
                    {
                      name: 'rating',
                      type: 'number',
                      min: 1,
                      max: 5,
                      admin: {
                        description: 'Star rating (1-5)',
                      },
                    },
                  ],
                  admin: {
                    description: 'Structured data schema',
                  },
                },
              ],
              admin: {
                description: 'SEO settings for the attractions & amenities page',
              },
            },
          ],
        },
      ],
    },
  ],
}
