import { GlobalConfig } from 'payload'

export const MapPage: GlobalConfig = {
  slug: 'map-page',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Title and description',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              defaultValue: 'Peta Camp Hulu Cai',

              admin: {
                description: 'Title of the map page',
              },
            },
            {
              name: 'description',
              type: 'text',
              required: true,
              defaultValue: 'Peta ini adalah peta dari camp Hulu Cai',
              admin: {
                description: 'Description of the map page',
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
                  defaultValue: 'Map & Location - Camp Hulu Cai',
                  admin: {
                    description: 'Page title for search engines',
                  },
                },
                {
                  name: 'description',
                  type: 'textarea',
                  defaultValue:
                    'Find your way to Camp Hulu Cai with our interactive map. Located at the foot of Mount Pangrango, discover our facilities, accommodations, and activities layout.',
                  admin: {
                    description: 'Meta description for search engines (150-160 characters)',
                  },
                },
                {
                  name: 'keywords',
                  type: 'text',
                  defaultValue:
                    'camp hulu cai map, location, gunung pangrango, camping site map, facilities map, accommodation location, camp layout',
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
              ],
              admin: {
                description: 'SEO settings for the map page',
              },
            },
          ],
        },
      ],
    },
  ],
}
