import { getCachedGlobal } from '@/utilities/getGlobals'
import { DiningPage, EventsPage } from '@/payload-types'
import { HeroSection } from './(_sections)/HeroSection'
import ScrollIndicator from '@/components/ScrollIndicator'
import EventSection from './(_sections)/EventSection'
import MeetingPackageSection from './(_sections)/MeetingPackageSection'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const eventsPage = (await getCachedGlobal('events-page', 1)()) as EventsPage

  return {
    title: eventsPage.meta?.title,
    description: eventsPage.meta?.description,
    keywords: eventsPage.meta?.keywords,
  }
}

export default async function Activities() {
  const eventsPage = (await getCachedGlobal('events-page', 1)()) as EventsPage

  const payload = await getPayload({ config: configPromise })

  const meetingPackages = await payload.find({
    collection: 'meeting-package',
    depth: 4,
    limit: 0,
  })

  return (
    <>
      <HeroSection eventsPage={eventsPage} />
      <ScrollIndicator href="#events" />

      <EventSection eventsPage={eventsPage} />
      <MeetingPackageSection meetingPackages={meetingPackages} eventsPage={eventsPage} />
    </>
  )
}
