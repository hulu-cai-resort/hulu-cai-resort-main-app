import { getCachedGlobal } from '@/utilities/getGlobals'
import { DiningPage, EventsOutdoorPage } from '@/payload-types'
import { HeroSection } from './(_section)/HeroSection'
import ScrollIndicator from '@/components/ScrollIndicator'
import EventSection from './(_section)/EventSection'
import { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function generateMetadata(): Promise<Metadata> {
  const eventsOutdoorPage = (await getCachedGlobal('events-outdoor-page', 1)()) as EventsOutdoorPage

  return {
    title: eventsOutdoorPage.meta?.title,
    description: eventsOutdoorPage.meta?.description,
    keywords: eventsOutdoorPage.meta?.keywords,
  }
}

export default async function Activities() {
  const eventsOutdoorPage = (await getCachedGlobal('events-outdoor-page', 1)()) as EventsOutdoorPage
  const payload = await getPayload({ config: configPromise })

  const outdoorAreas = await payload.find({
    collection: 'meeting-event-area',
    depth: 3,
    where: {
      areaType: {
        equals: 'outdoor',
      },
    },
    limit: 0,
  })
  return (
    <>
      <HeroSection eventsOutdoorPage={eventsOutdoorPage} />
      <ScrollIndicator href="#events-outdoor" />

      <EventSection outdoorAreas={outdoorAreas} eventsOutdoorPage={eventsOutdoorPage} />
    </>
  )
}
