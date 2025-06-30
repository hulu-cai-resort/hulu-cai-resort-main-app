import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function MapsPage() {
  const payload = await getPayload({ config: configPromise })

  const mapPage = await payload.findGlobal({
    slug: 'map-page',
    depth: 1,
  })

  return <PageClient mapPage={mapPage} />
}

export function generateMetadata(): Metadata {
  return {
    title: 'Map & Location - Camp Hulu Cai',
    description:
      'Find your way to Camp Hulu Cai with our interactive map. Located at the foot of Mount Pangrango, discover our facilities, accommodations, and activities layout.',
    keywords:
      'camp hulu cai map, location, gunung pangrango, camping site map, facilities map, accommodation location, camp layout',
  }
}
