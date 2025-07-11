import { CabinPage } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import ScrollIndicator from '@/components/ScrollIndicator'
import { AccommodationHeroSection } from '@/components/AccommodationHeroSection'
import AccommodationsDetail from '../villa/(_sections)/AccommodationsDetail'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function generateMetadata() {
  const cabinPage = (await getCachedGlobal('cabin-page', 1)()) as CabinPage

  return {
    title: cabinPage.seo?.title,
    description: cabinPage.seo?.description,
    keywords: cabinPage.seo?.keywords,
  }
}

export default async function Cabin() {
  const cabinPage = (await getCachedGlobal('cabin-page', 1)()) as CabinPage

  const payload = await getPayload({ config: configPromise })

  const cabins = await payload.find({
    collection: 'accommodations',
    depth: 3,
    where: {
      type: {
        equals: 'cabin',
      },
    },
  })

  return (
    <>
      <AccommodationHeroSection accommodationPage={cabinPage} />
      <ScrollIndicator href="#accommodations" />
      <AccommodationsDetail accommodations={cabins} />
    </>
  )
}
