import { getCachedGlobal } from '@/utilities/getGlobals'
import { ActivitiesPage } from '@/payload-types'
import { HeroSection } from './(_sections)/HeroSection'
import ScrollIndicator from '@/components/ScrollIndicator'
import ActivitiesSection from './(_sections)/ActivitiesSection'

export default async function Activities() {
  const activitiesPage = (await getCachedGlobal('activities-page', 1)()) as ActivitiesPage

  return (
    <>
      <HeroSection activitiesPage={activitiesPage} />
      <ScrollIndicator href="#activities" />

      <ActivitiesSection />
    </>
  )
}
