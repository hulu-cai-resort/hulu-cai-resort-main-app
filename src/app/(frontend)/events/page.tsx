import { getCachedGlobal } from '@/utilities/getGlobals'
import { EventsPage } from '@/payload-types'
import { HeroSection } from './(_sections)/HeroSection'
import ScrollIndicator from '@/components/ScrollIndicator'
import EventSection from './(_sections)/EventSection'
import MeetingPackageSection from './(_sections)/MeetingPackageSection'

export default async function Activities() {
  const eventsPage = (await getCachedGlobal('events-page', 1)()) as EventsPage

  return (
    <>
      <HeroSection eventsPage={eventsPage} />
      <ScrollIndicator href="#dining" />

      <EventSection />
      <MeetingPackageSection />
    </>
  )
}
