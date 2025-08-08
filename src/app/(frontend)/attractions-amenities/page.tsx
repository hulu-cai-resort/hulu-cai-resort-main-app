import { getCachedGlobal } from '@/utilities/getGlobals'
import { AttractionAmenitiesPage } from '@/payload-types'
import { HeroSection } from './(_sections)/HeroSection'
import ScrollIndicator from '@/components/ScrollIndicator'
import AttractionsSection from './(_sections)/AttractionsSection'
import AmenitiesSection from './(_sections)/AmenitiesSection'
import { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function generateMetadata(): Promise<Metadata> {
  const attractionAmenitiesPage = (await getCachedGlobal(
    'attraction-amenities-page',
    1,
  )()) as AttractionAmenitiesPage

  return {
    title: attractionAmenitiesPage.seo?.title,
    description: attractionAmenitiesPage.seo?.description,
    keywords: attractionAmenitiesPage.seo?.keywords,
  }
}

export default async function AttractionAmenities() {
  const attractionAmenitiesPage = (await getCachedGlobal(
    'attraction-amenities-page',
    1,
  )()) as AttractionAmenitiesPage

  const payload = await getPayload({ config: configPromise })

  const attractions = await payload.find({
    collection: 'attractions',
    depth: 1,
    limit: 0,
  })

  const amenities = await payload.find({
    collection: 'amenities',
    depth: 1,
    limit: 0,
  })

  return (
    <>
      <HeroSection attractionAmenitiesPage={attractionAmenitiesPage} />
      <ScrollIndicator href="#attractions" />

      <AttractionsSection
        attractions={attractions}
        attractionAmenitiesPage={attractionAmenitiesPage}
      />
      <AmenitiesSection amenities={amenities} attractionAmenitiesPage={attractionAmenitiesPage} />
    </>
  )
}
