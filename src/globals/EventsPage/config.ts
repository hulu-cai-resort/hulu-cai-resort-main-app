import type { GlobalConfig } from 'payload'
import { revalidateEventsPage } from './hooks/revalidateEventsPage'

export const EventsPage: GlobalConfig = {
  slug: 'events-page',
  label: 'Events Page',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateEventsPage],
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
          label: 'Meeting and Event Area',
          fields: [
            {
              name: 'meetingAndEventAreaTitle',
              type: 'text',
              required: true,
              defaultValue: 'This activity will suits your group well',
              admin: {
                description: 'Title for the meeting and event area section',
              },
            },
            {
              name: 'meetingAndEventAreaDescription',
              type: 'textarea',
              required: true,
              defaultValue:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
              admin: {
                description: 'Description text for the meeting and event area section',
              },
            },
            {
              name: 'meetingAndEventAreaOutdoorTitle',
              type: 'text',
              required: true,
              defaultValue: 'Outdoor',
              admin: {
                description: 'Title for the outdoor section',
              },
            },
            {
              name: 'meetingAndEventAreaOutdoorDescription',
              type: 'textarea',
              required: true,
              defaultValue:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
              admin: {
                description: 'Description text for the outdoor section',
              },
            },
            {
              name: 'meetingAndEventAreaOutdoorImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Image for the outdoor section',
              },
            },
            {
              name: 'meetingAndEventAreaIndoorTitle',
              type: 'text',
              required: true,
              defaultValue: 'Indoor',
              admin: {
                description: 'Title for the indoor section',
              },
            },
            {
              name: 'meetingAndEventAreaIndoorDescription',
              type: 'textarea',
              required: true,
              defaultValue:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
              admin: {
                description: 'Description text for the indoor section',
              },
            },
            {
              name: 'meetingAndEventAreaIndoorImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Image for the indoor section',
              },
            },
          ],
        },
        {
          label: 'Meeting Package',
          fields: [
            {
              name: 'meetingPackageTitle',
              type: 'text',
              required: true,
              defaultValue: 'This activity will suits your group well',
              admin: {
                description: 'Title for the meeting package section',
              },
            },
            {
              name: 'meetingPackageDescription',
              type: 'textarea',
              required: true,
              defaultValue:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
              admin: {
                description: 'Description text for the meeting package section',
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
                      'SEO title for the events page (appears in browser tab and search results)',
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
