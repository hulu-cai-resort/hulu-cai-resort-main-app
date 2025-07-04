import { getCachedGlobal } from '@/utilities/getGlobals'
import { AttractionAmenitiesPage } from '@/payload-types'
import { HeroSection } from './(_sections)/HeroSection'
import ScrollIndicator from '@/components/ScrollIndicator'
import AttractionsSection from './(_sections)/AttractionsSection'
import AmenitiesSection from './(_sections)/AmenitiesSection'

export default async function AttractionAmenities() {
  const attractionAmenitiesPage = (await getCachedGlobal(
    'attraction-amenities-page',
    1,
  )()) as AttractionAmenitiesPage

  return (
    <>
      <HeroSection attractionAmenitiesPage={attractionAmenitiesPage} />
      <ScrollIndicator href="#attractions" />

      <AttractionsSection />
      <AmenitiesSection />
    </>
  )
}
