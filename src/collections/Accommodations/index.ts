import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { revalidateAccommodation, revalidateDelete } from './hooks/revalidateAccommodation'

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
      name: 'mapsCode',
      type: 'text',
      admin: {
        description: 'Maps code for this accommodation location (eg. 1, 2, 3, etc.)',
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
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
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
                condition: (data) => ['villa', 'cottage'].includes(data.type),
              },
            },
            {
              name: 'cabinType',
              type: 'select',
              options: [
                {
                  label: 'Mini',
                  value: 'mini',
                },
                {
                  label: 'Junior',
                  value: 'junior',
                },
                {
                  label: 'Medium',
                  value: 'medium',
                },
                {
                  label: 'Large',
                  value: 'large',
                },
                {
                  label: 'Jumbo',
                  value: 'jumbo',
                },
              ],
              admin: {
                description: 'Cabin type classification',
                condition: (data) => ['cabin'].includes(data.type),
              },
            },

            {
              name: 'size',
              type: 'number',
              admin: {
                description: 'Size in square meters (eg. 125sqm, 100sqm, etc.)',
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
              name: 'groundCapacity',
              type: 'number',
              admin: {
                description: 'Number of tents available for specific grounds (eg. 10 tents)',
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
              type: 'text',
              admin: {
                description: 'Number of bathrooms (eg. 1, 2, 3, Sharing, etc.)',
                condition: (data) =>
                  ['villa', 'cottage', 'cabin', 'camping_ground'].includes(data.type),
              },
            },
            {
              name: 'bathroomsInBedroom',
              type: 'number',
              admin: {
                description: 'Number of bathrooms inside bedrooms',
                condition: (data) => ['villa', 'cottage', 'cabin'].includes(data.type),
              },
            },
            {
              name: 'bathroomsOutside',
              type: 'number',
              admin: {
                description: 'Number of bathrooms outside bedrooms',
                condition: (data) => ['villa', 'cottage', 'cabin'].includes(data.type),
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
                    {
                      label: 'Sleeping Bag',
                      value: 'sleeping-bag',
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
              ],
              admin: {
                description: 'Detailed bed configuration for each room',
                condition: (data) => ['villa', 'cabin', 'cottage'].includes(data.type),
              },
            },
          ],
          admin: {
            description: 'Detailed bed configuration for each room',
            condition: (data) => ['villa', 'cabin', 'cottage'].includes(data.type),
          },
        },
        {
          label: 'Tent Configuration',
          fields: [
            {
              name: 'tentConfiguration',
              type: 'array',
              fields: [
                {
                  name: 'tentType',
                  type: 'text',
                  admin: {
                    description: 'Tent type classification (eg. Tenda Sedang, Tenda Mini, etc.)',
                    condition: (data) => ['camping_ground'].includes(data.type),
                  },
                },
                {
                  name: 'tentCapacity',
                  type: 'text',
                  admin: {
                    description: 'Tent capacity (eg. 5 pax, 10 pax, etc.)',
                    condition: (data) => ['camping_ground'].includes(data.type),
                  },
                },
                {
                  name: 'numberOfTents',
                  type: 'number',
                  admin: {
                    description:
                      'Number of tents available for specific grounds (eg. 10, 20, etc.)',
                    condition: (data) => ['camping_ground'].includes(data.type),
                  },
                },
              ],
            },
          ],
          admin: {
            description: 'Detailed tent configuration for each ground',
            condition: (data) => ['camping_ground'].includes(data.type),
          },
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
              type: 'text',
              admin: {
                description:
                  'Price unit (eg. per night, per villa/night, per person/night, per spot/night)',
                condition: (data) =>
                  ['villa', 'cabin', 'cottage', 'camping_ground'].includes(data.type),
              },
            },
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
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
