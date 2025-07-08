import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import PageClient from './page.client'
import { MapPage } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'

export default async function MapsPage() {
  const payload = await getPayload({ config: configPromise })

  const mapPage = await payload.findGlobal({
    slug: 'map-page',
    depth: 1,
  })

  return <PageClient mapPage={mapPage} />
}

export async function generateMetadata(): Promise<Metadata> {
  const mapPage = (await getCachedGlobal('map-page', 1)()) as MapPage

  return {
    title: mapPage.seo?.title,
    description: mapPage.seo?.description,
    keywords: mapPage.seo?.keywords,
  }
}
