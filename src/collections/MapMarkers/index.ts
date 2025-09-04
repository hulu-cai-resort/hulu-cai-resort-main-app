import type { CollectionConfig } from 'payload'
import { populatePublishedAt } from '@/hooks/populatePublishedAt'
import { revalidateMapMarkers } from './hooks/revalidateMapMarkers'

export const MapMarkers: CollectionConfig = {
  slug: 'map-markers',
  labels: {
    singular: 'Map Marker',
    plural: 'Map Markers',
  },
  admin: {
    useAsTitle: 'label',
    defaultColumns: ['label', 'title', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeChange: [populatePublishedAt],
    afterChange: [revalidateMapMarkers],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description:
          'Internal identifier for this marker group (e.g., villa, cottage, dining-area)',
      },
    },
    {
      name: 'label',
      type: 'text',
      required: true,
      admin: {
        description: 'Display label for this marker group (e.g., Villa, Cottage, Dining Area)',
      },
    },
    {
      name: 'points',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          admin: {
            description: 'Display text for this marker point',
          },
        },
        {
          name: 'lat',
          type: 'number',
          required: true,
          admin: {
            description: 'Latitude coordinate',
          },
        },
        {
          name: 'lng',
          type: 'number',
          required: true,
          admin: {
            description: 'Longitude coordinate',
          },
        },
        {
          name: 'mapCode',
          type: 'text',
          admin: {
            description: 'Map code to match with collection items (e.g., 01, 02, 03)',
          },
        },
        {
          name: 'pointerImage',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Pointer image for this marker point',
          },
        },
        {
          name: 'relatedAccommodation',
          type: 'relationship',
          relationTo: 'accommodations',
          admin: {
            description:
              'Link to related accommodation (for villa, cottage, cabin, camping-ground markers)',
          },
        },
        {
          name: 'relatedMeetingEventArea',
          type: 'relationship',
          relationTo: 'meeting-event-area',
          admin: {
            description: 'Link to related meeting/event area (for meeting-room markers)',
          },
        },
        {
          name: 'relatedDiningArea',
          type: 'relationship',
          relationTo: 'dining-area',
          admin: {
            description: 'Link to related dining area (for dining-area markers)',
          },
        },
        {
          name: 'relatedAttraction',
          type: 'relationship',
          relationTo: 'attractions',
          admin: {
            description: 'Link to related attraction (for attractions-facilities markers)',
          },
        },
        {
          name: 'relatedAmenity',
          type: 'relationship',
          relationTo: 'amenities',
          admin: {
            description: 'Link to related amenity (for public facilities, masjid, parking markers)',
          },
        },
      ],
      admin: {
        description: 'Individual marker points for this category',
      },
    },
  ],
}
