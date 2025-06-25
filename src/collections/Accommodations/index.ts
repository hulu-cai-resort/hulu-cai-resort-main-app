import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { slugField } from '@/fields/slug'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { revalidateAccommodation, revalidateDelete } from './hooks/revalidateAccommodation'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Accommodations: CollectionConfig<'accommodations'> = {
  slug: 'accommodations',
  labels: {
    singular: 'Accommodation',
    plural: 'Accommodations',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    type: true,
    location: true,
    priceStartingFrom: true,
  },
  admin: {
    defaultColumns: ['title', 'type', 'location', 'priceStartingFrom', 'status', 'updatedAt'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g., Villa Zaitun 1, Cabin Maple, Cottage Rose',
      },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Villa',
          value: 'villa',
        },
        {
          label: 'Cabin',
          value: 'cabin',
        },
        {
          label: 'Cottage',
          value: 'cottage',
        },
        {
          label: 'Camping Ground',
          value: 'camping_ground',
        },
      ],
      enumName: 'accommodations_type',
      admin: {
        description: 'Type of accommodation',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'available',
      options: [
        {
          label: 'Available',
          value: 'available',
        },
        {
          label: 'Booked',
          value: 'booked',
        },
        {
          label: 'Maintenance',
          value: 'maintenance',
        },
        {
          label: 'Unavailable',
          value: 'unavailable',
        },
      ],
      enumName: 'accommodations_status',
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Basic Information',
          fields: [
            {
              name: 'location',
              type: 'text',
              required: true,
              admin: {
                description: 'e.g., Hills Babakan',
              },
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
              admin: {
                description: 'Detailed description of the accommodation',
              },
            },
            {
              name: 'images',
              type: 'array',
              required: true,
              minRows: 1,
              maxRows: 10,
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'caption',
                  type: 'text',
                },
              ],
              admin: {
                description: 'Photo gallery of the accommodation',
              },
            },
          ],
        },
        {
          label: 'Unit & Capacity',
          fields: [
            {
              name: 'unitType',
              type: 'text',
              admin: {
                description: 'e.g., Super Executive, Standard, Deluxe',
                condition: (data) => ['villa', 'cabin', 'cottage'].includes(data.type),
              },
            },
            {
              name: 'size',
              type: 'number',
              admin: {
                description: 'Size in square meters',
                condition: (data) => ['villa', 'cabin', 'cottage'].includes(data.type),
              },
            },
            {
              name: 'floors',
              type: 'number',
              admin: {
                description: 'Number of floors',
                condition: (data) => ['villa', 'cabin', 'cottage'].includes(data.type),
              },
            },
            {
              name: 'bedrooms',
              type: 'number',
              admin: {
                description: 'Number of bedrooms',
                condition: (data) => ['villa', 'cabin', 'cottage'].includes(data.type),
              },
            },
            {
              name: 'additionalBedrooms',
              type: 'number',
              admin: {
                description: 'Additional bedrooms (e.g., +1 extra bedroom)',
                condition: (data) => ['villa', 'cabin', 'cottage'].includes(data.type),
              },
            },
            {
              name: 'maxCapacity',
              type: 'number',
              required: true,
              admin: {
                description: 'Maximum number of guests',
              },
            },
            {
              name: 'additionalCapacity',
              type: 'number',
              admin: {
                description: 'Additional capacity with extra beds',
              },
            },
            {
              name: 'extraBeds',
              type: 'number',
              admin: {
                description: 'Number of extra beds available',
                condition: (data) => ['villa', 'cabin', 'cottage'].includes(data.type),
              },
            },
            {
              name: 'campingSpots',
              type: 'number',
              admin: {
                description: 'Number of camping spots available',
                condition: (data) => data.type === 'camping_ground',
              },
            },
          ],
        },
        {
          label: 'Bed Configuration',
          fields: [
            {
              name: 'bedConfiguration',
              type: 'array',
              fields: [
                {
                  name: 'roomName',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'e.g., Room 1, Master Bedroom',
                  },
                },
                {
                  name: 'bedType',
                  type: 'select',
                  required: true,
                  options: [
                    {
                      label: 'King Bed',
                      value: 'king',
                    },
                    {
                      label: 'Queen Bed',
                      value: 'queen',
                    },
                    {
                      label: 'Single Bed',
                      value: 'single',
                    },
                    {
                      label: 'Double Bed',
                      value: 'double',
                    },
                    {
                      label: 'Bunk Bed',
                      value: 'bunk',
                    },
                  ],
                  enumName: 'accommodations_bed_type',
                },
                {
                  name: 'bedCount',
                  type: 'number',
                  required: true,
                  defaultValue: 1,
                  admin: {
                    description: 'Number of beds of this type in the room',
                  },
                },
                {
                  name: 'roomImage',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    description: 'Optional image of the room/bed setup',
                  },
                },
              ],
              admin: {
                description: 'Detailed bed configuration for each room',
                condition: (data) => ['villa', 'cabin', 'cottage'].includes(data.type),
              },
            },
          ],
        },
        {
          label: 'Facilities & Amenities',
          fields: [
            {
              name: 'generalFacilities',
              type: 'array',
              fields: [
                {
                  name: 'facility',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'icon',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    description: 'Icon for the facility',
                  },
                },
              ],
              admin: {
                description: 'General facilities like WiFi, AC, Parking, etc.',
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
                {
                  name: 'icon',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    description: 'Icon for the amenity',
                  },
                },
              ],
              admin: {
                description: 'Additional amenities and services',
              },
            },
            {
              name: 'additionalFacilities',
              type: 'textarea',
              admin: {
                description: 'Additional facilities not listed above',
              },
            },
          ],
        },
        {
          label: 'Pricing & Availability',
          fields: [
            {
              name: 'priceStartingFrom',
              type: 'number',
              required: true,
              admin: {
                description: 'Starting price in IDR',
              },
            },
            {
              name: 'priceUnit',
              type: 'select',
              required: true,
              defaultValue: 'per_night',
              options: [
                {
                  label: 'Per Night',
                  value: 'per_night',
                },
                {
                  label: 'Per Villa/Night',
                  value: 'per_villa_night',
                },
                {
                  label: 'Per Person/Night',
                  value: 'per_person_night',
                },
                {
                  label: 'Per Spot/Night',
                  value: 'per_spot_night',
                },
              ],
              enumName: 'accommodations_price_unit',
            },
            {
              name: 'seasonalPricing',
              type: 'array',
              fields: [
                {
                  name: 'season',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'e.g., High Season, Low Season, Holiday',
                  },
                },
                {
                  name: 'price',
                  type: 'number',
                  required: true,
                },
                {
                  name: 'startDate',
                  type: 'date',
                },
                {
                  name: 'endDate',
                  type: 'date',
                },
              ],
              admin: {
                description: 'Different pricing for different seasons',
              },
            },
            {
              name: 'minimumStay',
              type: 'number',
              admin: {
                description: 'Minimum number of nights required',
              },
            },
          ],
        },
        {
          label: 'Booking Settings',
          fields: [
            {
              name: 'bookingEnabled',
              type: 'checkbox',
              defaultValue: true,
              admin: {
                description: 'Enable online booking for this accommodation',
              },
            },
            {
              name: 'instantBooking',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                description: 'Allow instant booking without confirmation',
              },
            },
            {
              name: 'advanceBookingDays',
              type: 'number',
              admin: {
                description: 'How many days in advance can guests book',
              },
            },
            {
              name: 'checkInTime',
              type: 'text',
              admin: {
                description: 'e.g., 3:00 PM',
              },
            },
            {
              name: 'checkOutTime',
              type: 'text',
              admin: {
                description: 'e.g., 11:00 AM',
              },
            },
            {
              name: 'specialInstructions',
              type: 'textarea',
              admin: {
                description: 'Special instructions for guests',
              },
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Feature this accommodation on the homepage',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidateAccommodation],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
    },
    maxPerDoc: 50,
  },
}
