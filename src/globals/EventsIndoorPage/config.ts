import type { GlobalConfig } from 'payload'
import { revalidateEventsIndoorPage } from './hooks/revalidateEventsIndoor'

export const EventsIndoorPage: GlobalConfig = {
  slug: 'events-indoor-page',
  label: 'Events Indoor Page',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateEventsIndoorPage],
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
                'Jump into nature-powered adventures that go beyond fun — from outbound games to forest walks and team-building challenges, every activity at Camp Hulu Cai is crafted to spark joy, collaboration, and lasting memories in the great outdoors. Perfect for schools, companies, and families alike.',
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
          label: 'Events Section',
          fields: [
            {
              name: 'eventsTitle',
              type: 'text',
              required: true,
              defaultValue: 'This activity will suits your group well',
              admin: {
                description: 'Title for the events section',
              },
            },
            {
              name: 'eventsDescription',
              type: 'textarea',
              required: true,
              defaultValue:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
              admin: {
                description: 'Description text for the events section',
              },
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'meta',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  admin: {
                    description:
                      'SEO title for the events indoor page (appears in browser tab and search results)',
                  },
                },
                {
                  name: 'description',
                  type: 'textarea',
                  admin: {
                    description:
                      'SEO meta description for search results (150-160 characters recommended)',
                  },
                },
                {
                  name: 'keywords',
                  type: 'text',
                  admin: {
                    description:
                      'SEO keywords separated by commas (e.g., "events, team building, outbound, nature adventures")',
                  },
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    description: 'Open Graph image for social media sharing',
                  },
                },
              ],
            },
            {
              name: 'canonicalUrl',
              type: 'text',
              admin: {
                description: 'Canonical URL for this page (leave blank to use default)',
              },
            },
            {
              name: 'noindex',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                description: 'Check to prevent search engines from indexing this page',
              },
            },
          ],
        },
      ],
    },
  ],
}
