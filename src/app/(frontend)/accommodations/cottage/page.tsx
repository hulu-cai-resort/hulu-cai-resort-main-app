import { CottagePage } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import ScrollIndicator from '@/components/ScrollIndicator'
import { AccommodationHeroSection } from '@/components/AccommodationHeroSection'
import AccommodationsDetail from '../villa/(_sections)/AccommodationsDetail'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function generateMetadata() {
  const cottagePage = (await getCachedGlobal('cottage-page', 1)()) as CottagePage

  return {
    title: cottagePage.seo?.title,
    description: cottagePage.seo?.description,
    keywords: cottagePage.seo?.keywords,
  }
}

export default async function Cottage() {
  const cottagePage = (await getCachedGlobal('cottage-page', 1)()) as CottagePage

  const payload = await getPayload({ config: configPromise })

  const cottages = await payload.find({
    collection: 'accommodations',
    depth: 3,
    where: {
      type: {
        equals: 'cottage',
      },
    },
    limit: 0,
  })

  return (
    <>
      <AccommodationHeroSection accommodationPage={cottagePage} />
      <ScrollIndicator href="#accommodations" />
      <AccommodationsDetail accommodations={cottages} />
    </>
  )
}
