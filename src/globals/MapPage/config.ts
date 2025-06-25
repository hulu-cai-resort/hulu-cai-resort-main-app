import { GlobalConfig } from 'payload'

export const MapPage: GlobalConfig = {
  slug: 'mapPage',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Title and description',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              defaultValue: 'Peta Camp Hulu Cai',

              admin: {
                description: 'Title of the map page',
              },
            },
            {
              name: 'description',
              type: 'text',
              required: true,
              defaultValue: 'Peta ini adalah peta dari camp Hulu Cai',
              admin: {
                description: 'Description of the map page',
              },
            },
          ],
        },
      ],
    },
  ],
}
