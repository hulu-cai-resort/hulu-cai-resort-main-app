import { CampingGroundPage } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import ScrollIndicator from '@/components/ScrollIndicator'
import { AccommodationHeroSection } from '@/components/AccommodationHeroSection'
import AccommodationsDetail from '../villa/(_sections)/AccommodationsDetail'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function generateMetadata() {
  const campingGroundPage = (await getCachedGlobal('camping-ground-page', 1)()) as CampingGroundPage

  return {
    title: campingGroundPage.seo?.title,
    description: campingGroundPage.seo?.description,
    keywords: campingGroundPage.seo?.keywords,
  }
}

export default async function CampingGround() {
  const campingGroundPage = (await getCachedGlobal('camping-ground-page', 1)()) as CampingGroundPage

  const payload = await getPayload({ config: configPromise })

  const campingGrounds = await payload.find({
    collection: 'accommodations',
    depth: 3,
    where: {
      type: {
        equals: 'camping_ground',
      },
    },
    limit: 0,
  })
  return (
    <>
      <AccommodationHeroSection accommodationPage={campingGroundPage} />
      <ScrollIndicator href="#accommodations" />
      <AccommodationsDetail accommodations={campingGrounds} />
    </>
  )
}
