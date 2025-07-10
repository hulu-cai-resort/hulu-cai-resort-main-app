import { getCachedGlobal } from '@/utilities/getGlobals'
import { EventsIndoorPage } from '@/payload-types'
import { HeroSection } from './(_section)/HeroSection'
import ScrollIndicator from '@/components/ScrollIndicator'
import EventSection from './(_section)/EventSection'
import { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function generateMetadata(): Promise<Metadata> {
  const eventsIndoorPage = (await getCachedGlobal('events-indoor-page', 1)()) as EventsIndoorPage

  return {
    title: eventsIndoorPage.meta?.title,
    description: eventsIndoorPage.meta?.description,
    keywords: eventsIndoorPage.meta?.keywords,
  }
}

export default async function Activities() {
  const eventsIndoorPage = (await getCachedGlobal('events-indoor-page', 1)()) as EventsIndoorPage

  const payload = await getPayload({ config: configPromise })

  const indoorAreas = await payload.find({
    collection: 'meeting-event-area',
    depth: 3,
    where: {
      areaType: {
        equals: 'indoor',
      },
    },
  })

  return (
    <>
      <HeroSection eventsIndoorPage={eventsIndoorPage} />
      <ScrollIndicator href="#events-indoor" />

      <EventSection indoorAreas={indoorAreas} eventsIndoorPage={eventsIndoorPage} />
    </>
  )
}
