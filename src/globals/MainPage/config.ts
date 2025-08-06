import type { GlobalConfig } from 'payload'

import { revalidateMainPage } from './hooks/revalidateMainPage'

export const MainPage: GlobalConfig = {
  slug: 'main-page',
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
              name: 'testimonials',
              type: 'array',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                },
                {
                  name: 'message',
                  type: 'text',
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                },
              ],
              admin: {
                description: 'Testimonials from customers',
              },
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
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
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
          label: 'Promo',
          fields: [
            {
              name: 'promoSectionTitle',
              type: 'text',
              defaultValue: 'Promo',
            },
            {
              name: 'promoTitle',
              type: 'text',
              defaultValue: 'Promo',
            },
            {
              name: 'promoDescription',
              type: 'textarea',
              defaultValue:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
            },
            {
              name: 'promoImage',
              type: 'array',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    description: 'Promo image',
                  },
                },
              ],
              admin: {
                description: 'Promo images',
              },
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
              name: 'reviewsImage',
              type: 'array',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                },
              ],
              admin: {
                description: 'Images for the reviews section',
              },
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
                  defaultValue: 'Camp Hulu Cai - Mountain Resort & Camping Experience',
                  admin: {
                    description: 'Page title for search engines',
                  },
                },
                {
                  name: 'description',
                  type: 'textarea',
                  defaultValue:
                    'Experience the ultimate mountain getaway at Camp Hulu Cai. Located at the foot of Mount Pangrango, enjoy fresh air, beautiful scenery, and unforgettable camping adventures.',
                  admin: {
                    description: 'Meta description for search engines (150-160 characters)',
                  },
                },
                {
                  name: 'keywords',
                  type: 'text',
                  defaultValue:
                    'camp hulu cai, mountain camping, gunung pangrango, camping resort, outdoor adventure, nature retreat, mountain resort, camping indonesia',
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
                      name: 'organizationName',
                      type: 'text',
                      defaultValue: 'Camp Hulu Cai',
                      admin: {
                        description: 'Organization name for structured data',
                      },
                    },
                    {
                      name: 'organizationType',
                      type: 'select',
                      defaultValue: 'TouristAttraction',
                      options: [
                        { label: 'Tourist Attraction', value: 'TouristAttraction' },
                        { label: 'Campground', value: 'Campground' },
                        { label: 'Resort', value: 'Resort' },
                        { label: 'Organization', value: 'Organization' },
                      ],
                      admin: {
                        description: 'Schema.org type for the organization',
                      },
                    },
                    {
                      name: 'address',
                      type: 'group',
                      fields: [
                        {
                          name: 'streetAddress',
                          type: 'text',
                          admin: {
                            description: 'Street address',
                          },
                        },
                        {
                          name: 'addressLocality',
                          type: 'text',
                          admin: {
                            description: 'City or locality',
                          },
                        },
                        {
                          name: 'addressRegion',
                          type: 'text',
                          admin: {
                            description: 'State or region',
                          },
                        },
                        {
                          name: 'postalCode',
                          type: 'text',
                          admin: {
                            description: 'Postal code',
                          },
                        },
                        {
                          name: 'addressCountry',
                          type: 'text',
                          defaultValue: 'ID',
                          admin: {
                            description: 'Country code (e.g., ID for Indonesia)',
                          },
                        },
                      ],
                      admin: {
                        description: 'Address information for structured data',
                      },
                    },
                    {
                      name: 'telephone',
                      type: 'text',
                      admin: {
                        description: 'Contact telephone number',
                      },
                    },
                    {
                      name: 'email',
                      type: 'text',
                      admin: {
                        description: 'Contact email address',
                      },
                    },
                    {
                      name: 'priceRange',
                      type: 'text',
                      admin: {
                        description: 'Price range (e.g., "$$" or "IDR 100,000 - 500,000")',
                      },
                    },
                  ],
                  admin: {
                    description: 'Structured data for rich search results',
                  },
                },
              ],
              admin: {
                description: 'SEO settings for the main page',
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
