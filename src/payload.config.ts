// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'

import sharp from 'sharp' // sharp-import
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Accommodations } from './collections/Accommodations'
import { Activities } from './collections/Activities'
import { Attractions } from './collections/Attractions'
import { Amenities } from './collections/Amenities'
import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Footer } from './globals/Footer/config'
import { Header } from './globals/Header/config'
import { MainPage } from './globals/MainPage/config'
import { AccommodationsPage } from './globals/AccommodationsPage/config'
import { VillaPage } from './globals/VillaPage/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'
import { MapPage } from './globals/MapPage/config'
import { CottagePage } from './globals/CottagePage/config'
import { CabinPage } from './globals/CabinPage/config'
import { CampingGroundPage } from './globals/CampingGroundPage/config'
import { AttractionAmenitiesPage } from './globals/AttractionAmenitiesPage/config'
import { ActivitiesPage } from './globals/ActivitiesPage/config'
import { DiningPage } from './globals/DiningPage/config'
import { EventsPage } from './globals/EventsPage/config'
import { ReservationFAQPage } from './globals/ReservationFAQPage/config'
import { DiningArea } from './collections/DiningArea'
import { MeetingEventArea } from './collections/MeetingEventArea'
import { MeetingPackage } from './collections/MeetingPackage'
import { GamesGround } from './collections/GamesGround'
import { AdditionalRent } from './collections/AdditionalRent'
import { EventsIndoorPage } from './globals/EventsIndoorPage/config'
import { EventsOutdoorPage } from './globals/EventsOutdoorPage/config'
import { ReservationFormPage } from './globals/ReservationFormPage/config'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeLogin` statement on line 15.
      beforeLogin: ['@/components/BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeDashboard` statement on line 15.
      beforeDashboard: ['@/components/BeforeDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  collections: [
    Accommodations,
    Activities,
    Attractions,
    Amenities,
    DiningArea,
    MeetingEventArea,
    MeetingPackage,
    GamesGround,
    AdditionalRent,
    Pages,
    Posts,
    Media,
    Categories,
    Users,
  ],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [
    Header,
    Footer,
    MainPage,
    MapPage,
    AccommodationsPage,
    VillaPage,
    CottagePage,
    CabinPage,
    CampingGroundPage,
    AttractionAmenitiesPage,
    ActivitiesPage,
    DiningPage,
    EventsPage,
    EventsIndoorPage,
    EventsOutdoorPage,
    ReservationFAQPage,
    ReservationFormPage,
  ],
  plugins: [
    ...plugins,
    // storage-adapter-placeholder
  ],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${process.env.CRON_SECRET}`
      },
    },
    tasks: [],
  },
})
