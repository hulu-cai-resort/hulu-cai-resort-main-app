import type { GlobalConfig } from 'payload'
import { revalidateReservationFAQPage } from './hooks/revalidateReservationFAQPage'

export const ReservationFAQPage: GlobalConfig = {
  slug: 'reservation-faq-page',
  label: 'Reservation FAQ Page',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateReservationFAQPage],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Must You Know Section',
          fields: [
            {
              name: 'mustKnowSection',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: 'Must You Know',
                  required: true,
                  admin: {
                    description: 'Section title (e.g., "Must You Know")',
                  },
                },
                {
                  name: 'subtitle',
                  type: 'text',
                  defaultValue: 'Informasi apa saja yang perlu disiapkan?',
                  admin: {
                    description: 'Section subtitle/question',
                  },
                },
                {
                  name: 'description',
                  type: 'textarea',
                  admin: {
                    description: 'Brief description about preparation information',
                  },
                },
                {
                  name: 'infoCards',
                  type: 'array',
                  label: 'Information Cards',
                  fields: [
                    {
                      name: 'icon',
                      type: 'select',
                      options: [
                        { label: 'Users (Visitor Count)', value: 'users' },
                        { label: 'Clock (Activities)', value: 'clock' },
                        { label: 'Bath (Room Settings)', value: 'bath' },
                        { label: 'Salad (Food Settings)', value: 'salad' },
                      ],
                      required: true,
                      admin: {
                        description: 'Icon type for the information card',
                      },
                    },
                    {
                      name: 'title',
                      type: 'text',
                      required: true,
                      admin: {
                        description: 'Card title (e.g., "Jumlah Pengunjung")',
                      },
                    },
                    {
                      name: 'description',
                      type: 'textarea',
                      required: true,
                      admin: {
                        description: 'Card description explaining the requirement',
                      },
                    },
                  ],
                  admin: {
                    description: 'Information cards about preparation requirements',
                  },
                },
              ],
              admin: {
                description: 'Must You Know section content',
              },
            },
          ],
        },
        {
          label: 'FAQ Section',
          fields: [
            {
              name: 'faqSection',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: 'Frequently Asked Questions',
                  required: true,
                  admin: {
                    description: 'FAQ section title',
                  },
                },
                {
                  name: 'faqs',
                  type: 'array',
                  label: 'FAQ Items',
                  fields: [
                    {
                      name: 'question',
                      type: 'text',
                      required: true,
                      admin: {
                        description: 'FAQ question (e.g., "Bagaimana Cara Booking Camp HuluCai?")',
                      },
                    },
                    {
                      name: 'answer',
                      type: 'richText',
                      required: true,
                      admin: {
                        description: 'FAQ answer with rich text formatting',
                      },
                    },
                    {
                      name: 'isExpanded',
                      type: 'checkbox',
                      defaultValue: false,
                      admin: {
                        description: 'Whether this FAQ should be expanded by default',
                      },
                    },
                  ],
                  admin: {
                    description: 'List of frequently asked questions',
                  },
                },
                {
                  name: 'questionForm',
                  type: 'group',
                  fields: [
                    {
                      name: 'title',
                      type: 'text',
                      defaultValue: 'Ada Pertanyaan?',
                      admin: {
                        description: 'Question form title',
                      },
                    },
                    {
                      name: 'description',
                      type: 'text',
                      defaultValue: 'Kamu bisa menambahkan pertanyaanmu pada kolom berikut :',
                      admin: {
                        description: 'Question form description',
                      },
                    },
                    {
                      name: 'placeholder',
                      type: 'text',
                      defaultValue: 'Tulis disini',
                      admin: {
                        description: 'Input placeholder text',
                      },
                    },
                    {
                      name: 'submitButtonText',
                      type: 'text',
                      defaultValue: 'Submit',
                      admin: {
                        description: 'Submit button text',
                      },
                    },
                  ],
                  admin: {
                    description: 'Question submission form configuration',
                  },
                },
              ],
              admin: {
                description: 'FAQ section content',
              },
            },
          ],
        },
        {
          label: 'Contact Section',
          fields: [
            {
              name: 'contactSection',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: 'Narahubung',
                  required: true,
                  admin: {
                    description: 'Contact section title',
                  },
                },
                {
                  name: 'subtitle',
                  type: 'text',
                  defaultValue: 'More Than a Trip',
                  admin: {
                    description: 'Contact section subtitle',
                  },
                },
                {
                  name: 'description',
                  type: 'textarea',
                  admin: {
                    description: 'Contact section description',
                  },
                },
                {
                  name: 'contacts',
                  type: 'array',
                  label: 'Contact Information',
                  fields: [
                    {
                      name: 'type',
                      type: 'select',
                      options: [
                        { label: 'WhatsApp', value: 'whatsapp' },
                        { label: 'Phone', value: 'phone' },
                        { label: 'Email', value: 'email' },
                      ],
                      required: true,
                      admin: {
                        description: 'Type of contact',
                      },
                    },
                    {
                      name: 'label',
                      type: 'text',
                      required: true,
                      admin: {
                        description: 'Contact label (e.g., "WA Admin1")',
                      },
                    },
                    {
                      name: 'value',
                      type: 'text',
                      required: true,
                      admin: {
                        description: 'Contact value (phone number, email, etc.)',
                      },
                    },
                    {
                      name: 'link',
                      type: 'text',
                      admin: {
                        description: 'Optional link (WhatsApp URL, tel:, mailto:)',
                      },
                    },
                  ],
                  admin: {
                    description: 'Contact information list',
                  },
                },
              ],
              admin: {
                description: 'Contact section content',
              },
            },
          ],
        },
        {
          label: 'Terms & Conditions',
          fields: [
            {
              name: 'termsSection',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: 'Terms & Condition',
                  required: true,
                  admin: {
                    description: 'Terms section title',
                  },
                },
                {
                  name: 'subtitle',
                  type: 'text',
                  defaultValue: 'Peraturan apa saja yang berlaku di Camp Hulu Cai',
                  admin: {
                    description: 'Terms section subtitle',
                  },
                },
                {
                  name: 'description',
                  type: 'textarea',
                  admin: {
                    description: 'Brief description about camp rules',
                  },
                },
                {
                  name: 'rules',
                  type: 'array',
                  label: 'Rules & Regulations',
                  fields: [
                    {
                      name: 'icon',
                      type: 'upload',
                      relationTo: 'media',
                      admin: {
                        description: 'Rule icon/image (e.g., no smoking icon)',
                      },
                    },
                    {
                      name: 'title',
                      type: 'text',
                      required: true,
                      admin: {
                        description: 'Rule title (e.g., "Dilarang Merokok")',
                      },
                    },
                    {
                      name: 'description',
                      type: 'textarea',
                      admin: {
                        description: 'Optional rule description',
                      },
                    },
                  ],
                  admin: {
                    description: 'List of camp rules and regulations',
                  },
                },
              ],
              admin: {
                description: 'Terms and conditions section content',
              },
            },
          ],
        },
        {
          label: 'Reservation CTA',
          fields: [
            {
              name: 'reservationCTA',
              type: 'group',
              fields: [
                {
                  name: 'backgroundImage',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    description: 'Background image for the reservation CTA section',
                  },
                },
                {
                  name: 'icon',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    description: 'Icon for the CTA (e.g., earth/globe icon)',
                  },
                },
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: 'Build Your Own Experience',
                  required: true,
                  admin: {
                    description: 'CTA title',
                  },
                },
                {
                  name: 'subtitle',
                  type: 'text',
                  defaultValue: 'Build Your Own Experience',
                  admin: {
                    description: 'CTA subtitle',
                  },
                },
                {
                  name: 'buttonText',
                  type: 'text',
                  defaultValue: 'Isi Form Reservasi',
                  required: true,
                  admin: {
                    description: 'Button text',
                  },
                },
                {
                  name: 'buttonLink',
                  type: 'text',
                  admin: {
                    description: 'Button link URL',
                  },
                },
              ],
              admin: {
                description: 'Reservation call-to-action section',
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
                  defaultValue: 'Reservation & FAQ - Camp Hulu Cai',
                  admin: {
                    description: 'Page title for search engines',
                  },
                },
                {
                  name: 'description',
                  type: 'textarea',
                  defaultValue:
                    'Find answers to frequently asked questions about reservations at Camp Hulu Cai. Learn about booking procedures, camp rules, and get in touch with our team.',
                  admin: {
                    description: 'Meta description for search engines (150-160 characters)',
                  },
                },
                {
                  name: 'keywords',
                  type: 'text',
                  admin: {
                    description: 'SEO keywords separated by commas',
                  },
                },
                {
                  name: 'ogImage',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    description: 'Open Graph image for social media sharing',
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
                    description: 'Canonical URL for this page',
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
                description: 'SEO settings for the Reservation FAQ page',
              },
            },
          ],
        },
      ],
    },
  ],
}
