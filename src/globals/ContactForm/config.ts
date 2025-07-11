import type { GlobalConfig } from 'payload'
import { revalidateContactForm } from './hooks/revalidateContactForm'

export const ContactForm: GlobalConfig = {
  slug: 'contact-form',
  label: 'Contact Form',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateContactForm],
  },
  fields: [
    {
      name: 'phoneNumber',
      type: 'text',
      required: true,
      admin: {
        description: 'Phone number for the contact form, should follow this format: +6281234567890',
      },
    },
  ],
}
