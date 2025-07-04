import { getCachedGlobal } from '@/utilities/getGlobals'
import { EventsIndoorPage } from '@/payload-types'
import { HeroSection } from './(_section)/HeroSection'
import ScrollIndicator from '@/components/ScrollIndicator'
import EventSection from './(_section)/EventSection'

export default async function Activities() {
  const eventsIndoorPage = (await getCachedGlobal('events-indoor-page', 1)()) as EventsIndoorPage

  return (
    <>
      <HeroSection eventsIndoorPage={eventsIndoorPage} />
      <ScrollIndicator href="#events-indoor" />

      <EventSection />
    </>
  )
}
