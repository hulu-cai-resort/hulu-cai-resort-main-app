import type { CollectionConfig } from 'payload'
import { populatePublishedAt } from '@/hooks/populatePublishedAt'
import { revalidateMeetingEventArea } from './hooks/revalidateMeetingEventArea'

export const MeetingEventArea: CollectionConfig = {
  slug: 'meeting-event-area',
  labels: {
    singular: 'Meeting Event Area',
    plural: 'Meeting Event Areas',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeChange: [populatePublishedAt],
    afterChange: [revalidateMeetingEventArea],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g., Bale Sawo, Amphy Arunaya, etc.',
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
      name: 'location',
      type: 'select',
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
      enumName: 'meeting_event_area_location',
    },
    {
      name: 'buildingType',
      type: 'select',

      options: [
        {
          label: 'Bale',
          value: 'bale',
        },
        {
          label: 'Ballroom',
          value: 'ballroom',
        },
        {
          label: 'Amphitheater',
          value: 'amphitheater',
        },
      ],
      enumName: 'meeting_event_area_building_type',
      admin: {
        description: 'Type of building',
      },
    },
    {
      name: 'areaType',
      type: 'select',
      options: [
        {
          label: 'Indoor',
          value: 'indoor',
        },
        {
          label: 'Outdoor',
          value: 'outdoor',
        },
      ],
      enumName: 'meeting_event_area_area_type',
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General Information',
          fields: [
            {
              name: 'description',
              type: 'textarea',
              admin: {
                description: 'Brief description displayed on meeting event area cards',
              },
            },
            {
              name: 'size',
              type: 'number',
              admin: {
                description: 'Size in square meters (eg. 125sqm, 100sqm, etc.)',
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
          label: 'Meeting Event Area Details',
          fields: [
            {
              name: 'dimensions',
              type: 'group',
              fields: [
                {
                  name: 'width',
                  type: 'number',
                  admin: {
                    description: 'Width in meters (lebar) (10, 15, 20, etc.)',
                  },
                },
                {
                  name: 'length',
                  type: 'number',
                  admin: {
                    description: 'Length in meters (panjang) (10, 15, 20, etc.)',
                  },
                },
              ],
              admin: {
                description: 'Dimensions of the meeting event area',
              },
            },
            {
              name: 'groupSize',
              type: 'group',
              fields: [
                {
                  name: 'minimum',
                  type: 'number',
                  admin: {
                    description: 'Minimum number of participants',
                  },
                },
                {
                  name: 'maximum',
                  type: 'number',
                  admin: {
                    description: 'Maximum number of participants',
                  },
                },
              ],
              admin: {
                description: 'Group size requirements',
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
                description: 'Price unit (eg. per 8 hours)',
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
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
  ],
}
