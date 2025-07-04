import { getCachedGlobal } from '@/utilities/getGlobals'
import { DiningPage } from '@/payload-types'
import { HeroSection } from './(_sections)/HeroSection'
import ScrollIndicator from '@/components/ScrollIndicator'
import DiningSection from './(_sections)/DiningSection'

export default async function Activities() {
  const diningPage = (await getCachedGlobal('dining-page', 1)()) as DiningPage

  return (
    <>
      <HeroSection diningPage={diningPage} />
      <ScrollIndicator href="#dining" />

      <DiningSection />
    </>
  )
}
