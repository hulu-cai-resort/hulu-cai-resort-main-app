import { MetadataRoute } from 'next'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getServerSideURL } from '@/utilities/getURL'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getServerSideURL()

  try {
    // Fetch all page globals to get real update dates
    const [
      mainPage,
      accommodationsPage,
      villaPage,
      cabinPage,
      cottagePage,
      campingGroundPage,
      activitiesPage,
      attractionAmenitiesPage,
      diningPage,
      eventsPage,
      eventsIndoorPage,
      eventsOutdoorPage,
      mapPage,
      reservationPage,
      reservationFormPage,
    ] = await Promise.all([
      getCachedGlobal('main-page', 1)(),
      getCachedGlobal('accommodations-page', 1)(),
      getCachedGlobal('villa-page', 1)(),
      getCachedGlobal('cabin-page', 1)(),
      getCachedGlobal('cottage-page', 1)(),
      getCachedGlobal('camping-ground-page', 1)(),
      getCachedGlobal('activities-page', 1)(),
      getCachedGlobal('attraction-amenities-page', 1)(),
      getCachedGlobal('dining-page', 1)(),
      getCachedGlobal('events-page', 1)(),
      getCachedGlobal('events-indoor-page', 1)(),
      getCachedGlobal('events-outdoor-page', 1)(),
      getCachedGlobal('map-page', 1)(),
      getCachedGlobal('reservation-faq-page', 1)(),
      getCachedGlobal('reservation-form-page', 1)(),
    ])

    return [
      // Homepage
      {
        url: baseUrl,
        lastModified: new Date(mainPage?.updatedAt || new Date()),
        changeFrequency: 'weekly',
        priority: 1.0,
      },

      // Accommodations Section
      {
        url: `${baseUrl}/accommodations`,
        lastModified: new Date(accommodationsPage?.updatedAt || new Date()),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/accommodations/villa`,
        lastModified: new Date(villaPage?.updatedAt || new Date()),
        changeFrequency: 'monthly',
        priority: 0.7,
      },
      {
        url: `${baseUrl}/accommodations/cabin`,
        lastModified: new Date(cabinPage?.updatedAt || new Date()),
        changeFrequency: 'monthly',
        priority: 0.7,
      },
      {
        url: `${baseUrl}/accommodations/cottage`,
        lastModified: new Date(cottagePage?.updatedAt || new Date()),
        changeFrequency: 'monthly',
        priority: 0.7,
      },
      {
        url: `${baseUrl}/accommodations/camping-ground`,
        lastModified: new Date(campingGroundPage?.updatedAt || new Date()),
        changeFrequency: 'monthly',
        priority: 0.7,
      },

      // Activities
      {
        url: `${baseUrl}/activities`,
        lastModified: new Date(activitiesPage?.updatedAt || new Date()),
        changeFrequency: 'monthly',
        priority: 0.8,
      },

      // Attractions & Amenities
      {
        url: `${baseUrl}/attractions-amenities`,
        lastModified: new Date(attractionAmenitiesPage?.updatedAt || new Date()),
        changeFrequency: 'monthly',
        priority: 0.8,
      },

      // Dining
      {
        url: `${baseUrl}/dining`,
        lastModified: new Date(diningPage?.updatedAt || new Date()),
        changeFrequency: 'monthly',
        priority: 0.8,
      },

      // Events
      {
        url: `${baseUrl}/events`,
        lastModified: new Date(eventsPage?.updatedAt || new Date()),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/events/indoor`,
        lastModified: new Date(eventsIndoorPage?.updatedAt || new Date()),
        changeFrequency: 'monthly',
        priority: 0.7,
      },
      {
        url: `${baseUrl}/events/outdoor`,
        lastModified: new Date(eventsOutdoorPage?.updatedAt || new Date()),
        changeFrequency: 'monthly',
        priority: 0.7,
      },

      // Maps
      {
        url: `${baseUrl}/maps`,
        lastModified: new Date(mapPage?.updatedAt || new Date()),
        changeFrequency: 'monthly',
        priority: 0.6,
      },

      // Reservation (High Priority - Conversion Pages)
      {
        url: `${baseUrl}/reservation`,
        lastModified: new Date(reservationPage?.updatedAt || new Date()),
        changeFrequency: 'weekly',
        priority: 0.9,
      },

      // Form (High Priority - Conversion Page)
      {
        url: `${baseUrl}/form`,
        lastModified: new Date(reservationFormPage?.updatedAt || new Date()),
        changeFrequency: 'weekly',
        priority: 0.9,
      },
    ]
  } catch (error) {
    console.error('Error generating sitemap:', error)

    // Fallback sitemap if globals fail to load
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1.0,
      },
    ]
  }
}
