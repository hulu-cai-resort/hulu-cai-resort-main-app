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
              type: 'select',
              required: true,
              defaultValue: 'valley-cibedug',
              options: [
                {
                  label: 'Valley - Cibedug',
                  value: 'valley-cibedug',
                },
                {
                  label: 'Hills - Babakan',
                  value: 'hills-babakan',
                },
              ],
              enumName: 'accommodations_location',
            },
            {
              name: 'mapsPointer',
              type: 'text',
              admin: {
                description: 'Google Maps link for this accommodation location',
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
              type: 'select',
              options: [
                {
                  label: 'Super Executive',
                  value: 'super-executive',
                },
                {
                  label: 'Executive',
                  value: 'executive',
                },
                {
                  label: 'Deluxe',
                  value: 'deluxe',
                },
                {
                  label: 'Superior',
                  value: 'superior',
                },
                {
                  label: 'Standard',
                  value: 'standard',
                },
              ],
              admin: {
                description: 'Unit type classification',
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
                condition: (data) => ['villa'].includes(data.type),
              },
            },
            {
              name: 'floorLocation',
              type: 'number',
              admin: {
                description: 'Floor location (e.g., Lantai 1, Lantai 2)',
                condition: (data) => ['cottage'].includes(data.type),
              },
            },
            {
              name: 'bedrooms',
              type: 'number',
              admin: {
                description: 'Number of bedrooms',
                condition: (data) => ['villa'].includes(data.type),
              },
            },
            {
              name: 'tentCapacity',
              type: 'number',
              admin: {
                description: 'Number of tents available for specific spots',
                condition: (data) => ['camping_ground'].includes(data.type),
              },
            },
            {
              name: 'minCapacity',
              type: 'number',
              admin: {
                description: 'Standard guest capacity',
                condition: (data) =>
                  ['villa', 'cabin', 'cottage', 'camping_ground'].includes(data.type),
              },
              label: 'Standard Capacity',
            },
            {
              name: 'maxCapacity',
              type: 'number',
              required: true,
              admin: {
                description: 'Maximum number of guests',
                condition: (data) =>
                  ['villa', 'cabin', 'cottage', 'camping_ground'].includes(data.type),
              },
            },
            {
              name: 'beds',
              type: 'number',
              admin: {
                description: 'Number of beds',
                condition: (data) => ['cabin'].includes(data.type),
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
              name: 'bathrooms',
              type: 'number',
              admin: {
                description: 'Number of bathrooms',
                condition: (data) => ['villa', 'cabin'].includes(data.type),
              },
            },
            {
              name: 'bathroomsInBedroom',
              type: 'number',
              admin: {
                description: 'Number of bathrooms inside bedrooms',
                condition: (data) => ['villa', 'cabin'].includes(data.type),
              },
            },
            {
              name: 'bathroomsOutside',
              type: 'number',
              admin: {
                description: 'Number of bathrooms outside bedrooms',
                condition: (data) => ['villa', 'cabin'].includes(data.type),
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
                      label: 'Super King',
                      value: 'super-king',
                    },
                    {
                      label: 'King',
                      value: 'king',
                    },
                    {
                      label: 'Queen',
                      value: 'queen',
                    },
                    {
                      label: 'Full Double',
                      value: 'full-double',
                    },
                    {
                      label: 'Twin',
                      value: 'twin',
                    },
                    {
                      label: 'Single',
                      value: 'single',
                    },
                    {
                      label: 'Super Single',
                      value: 'super-single',
                    },
                    {
                      label: 'Bunk Bed',
                      value: 'bunk-bed',
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
            {
              name: 'tentConfiguration',
              type: 'array',
              fields: [
                {
                  name: 'tentName',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'e.g., Tent A, Tent B, Premium Tent',
                  },
                },
                {
                  name: 'capacity',
                  type: 'number',
                  required: true,
                  admin: {
                    description: 'Number of people this tent can accommodate',
                  },
                },
                {
                  name: 'bedType',
                  type: 'select',
                  required: true,
                  options: [
                    {
                      label: 'Sleeping Bag',
                      value: 'sleeping-bag',
                    },
                  ],
                  enumName: 'accommodations_tent_bed_type',
                },
                {
                  name: 'tentImage',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    description: 'Image of the tent',
                  },
                },
              ],
              admin: {
                description: 'Tents configuration',
                condition: (data) => data.type === 'camping_ground',
              },
            },
          ],
        },
        {
          label: 'Facilities & Amenities',
          fields: [
            {
              type: 'collapsible',
              label: 'Facilities',
              fields: [
                {
                  name: 'rooftop',
                  type: 'checkbox',
                  label: 'Rooftop',
                },
                {
                  name: 'balcony',
                  type: 'checkbox',
                  label: 'Balcony',
                },
                {
                  name: 'terrace',
                  type: 'checkbox',
                  label: 'Terrace',
                },
                {
                  name: 'privatePool',
                  type: 'checkbox',
                  label: 'Private Pool',
                },
                {
                  name: 'jacuzzi',
                  type: 'checkbox',
                  label: 'Jacuzzi',
                },
                {
                  name: 'commonSpace',
                  type: 'checkbox',
                  label: 'Common Space',
                },
                {
                  name: 'kitchen',
                  type: 'checkbox',
                  label: 'Kitchen',
                },
                {
                  name: 'dedicatedWorkspace',
                  type: 'checkbox',
                  label: 'Dedicated Workspace',
                },
              ],
            },
            {
              type: 'collapsible',
              label: 'Cooling',
              fields: [
                {
                  name: 'airConditioning',
                  type: 'checkbox',
                  label: 'Air Conditioning',
                },
                {
                  name: 'fan',
                  type: 'checkbox',
                  label: 'Fan',
                },
              ],
            },
            {
              type: 'collapsible',
              label: 'Entertainment',
              fields: [
                {
                  name: 'tv',
                  type: 'checkbox',
                  label: 'TV',
                },
                {
                  name: 'smartTv',
                  type: 'checkbox',
                  label: 'Smart TV',
                },
                {
                  name: 'wifi',
                  type: 'checkbox',
                  label: 'WiFi',
                },
              ],
            },
            {
              type: 'collapsible',
              label: 'Bathroom',
              fields: [
                {
                  name: 'bathtub',
                  type: 'checkbox',
                  label: 'Bathtub',
                },
                {
                  name: 'shower',
                  type: 'checkbox',
                  label: 'Shower',
                },
                {
                  name: 'hotWater',
                  type: 'checkbox',
                  label: 'Hot Water',
                },
                {
                  name: 'bodySoap',
                  type: 'checkbox',
                  label: 'Body Soap',
                },
                {
                  name: 'shampoo',
                  type: 'checkbox',
                  label: 'Shampoo',
                },
                {
                  name: 'conditioner',
                  type: 'checkbox',
                  label: 'Conditioner',
                },
              ],
            },
            {
              type: 'collapsible',
              label: 'Bedroom & Laundry',
              fields: [
                {
                  name: 'towels',
                  type: 'checkbox',
                  label: 'Towels',
                },
                {
                  name: 'safe',
                  type: 'checkbox',
                  label: 'Safe',
                },
                {
                  name: 'clothingStorage',
                  type: 'checkbox',
                  label: 'Clothing Storage',
                },
              ],
            },
            {
              type: 'collapsible',
              label: 'Common Space',
              fields: [
                {
                  name: 'diningTable',
                  type: 'checkbox',
                  label: 'Dining Table',
                },
                {
                  name: 'sofaLounger',
                  type: 'checkbox',
                  label: 'Sofa Lounger',
                },
              ],
            },
            {
              type: 'collapsible',
              label: 'Kitchen',
              fields: [
                {
                  name: 'stove',
                  type: 'checkbox',
                  label: 'Stove',
                },
                {
                  name: 'minibar',
                  type: 'checkbox',
                  label: 'Minibar',
                },
                {
                  name: 'refrigerator',
                  type: 'checkbox',
                  label: 'Refrigerator',
                },
                {
                  name: 'microwave',
                  type: 'checkbox',
                  label: 'Microwave',
                },
                {
                  name: 'riceCooker',
                  type: 'checkbox',
                  label: 'Rice Cooker',
                },
                {
                  name: 'toaster',
                  type: 'checkbox',
                  label: 'Toaster',
                },
                {
                  name: 'cookingUtensils',
                  type: 'checkbox',
                  label: 'Cooking Utensils',
                },
                {
                  name: 'dishesSilverware',
                  type: 'checkbox',
                  label: 'Dishes & Silverware',
                },
                {
                  name: 'hotWaterKettle',
                  type: 'checkbox',
                  label: 'Hot Water Kettle',
                },
                {
                  name: 'coffeeMaker',
                  type: 'checkbox',
                  label: 'Coffee Maker',
                },
                {
                  name: 'waterDispenser',
                  type: 'checkbox',
                  label: 'Water Dispenser',
                },
                {
                  name: 'coffeeTeaSugar',
                  type: 'checkbox',
                  label: 'Coffee, Tea & Sugar',
                },
              ],
            },
            {
              name: 'other',
              type: 'array',
              fields: [
                {
                  name: 'amenity',
                  type: 'text',
                  required: true,
                },
              ],
              admin: {
                description: 'Other amenities not listed above',
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
