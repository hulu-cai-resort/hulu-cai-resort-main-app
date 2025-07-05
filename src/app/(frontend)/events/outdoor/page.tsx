import { getCachedGlobal } from '@/utilities/getGlobals'
import { EventsOutdoorPage } from '@/payload-types'
import { HeroSection } from './(_section)/HeroSection'
import ScrollIndicator from '@/components/ScrollIndicator'
import EventSection from './(_section)/EventSection'

export default async function Activities() {
  const eventsOutdoorPage = (await getCachedGlobal('events-outdoor-page', 1)()) as EventsOutdoorPage

  return (
    <>
      <HeroSection eventsOutdoorPage={eventsOutdoorPage} />
      <ScrollIndicator href="#events-outdoor" />

      <EventSection />
    </>
  )
}
