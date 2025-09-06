import { VillaPage } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import ScrollIndicator from '@/components/ScrollIndicator'
import { AccommodationHeroSection } from '@/components/AccommodationHeroSection'
import AccommodationsDetail from './(_sections)/AccommodationsDetail'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function generateMetadata() {
  const villaPage = (await getCachedGlobal('villa-page', 1)()) as VillaPage

  return {
    title: villaPage.seo?.title,
    description: villaPage.seo?.description,
    keywords: villaPage.seo?.keywords,
  }
}

export default async function Villa() {
  const villaPage = (await getCachedGlobal('villa-page', 1)()) as VillaPage
  const payload = await getPayload({ config: configPromise })

  const villas = await payload.find({
    collection: 'accommodations',
    depth: 3,
    where: {
      type: {
        equals: 'villa',
      },
    },
    limit: 0,
  })

  return (
    <>
      <AccommodationHeroSection accommodationPage={villaPage} showButtons={false} />
      <ScrollIndicator href="#accommodations" />
      <AccommodationsDetail accommodations={villas} />
    </>
  )
}
