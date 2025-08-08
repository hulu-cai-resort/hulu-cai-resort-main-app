import { getCachedGlobal } from '@/utilities/getGlobals'
import { ActivitiesPage } from '@/payload-types'
import { HeroSection } from './(_sections)/HeroSection'
import ScrollIndicator from '@/components/ScrollIndicator'
import ActivitiesSection from './(_sections)/ActivitiesSection'
import { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function generateMetadata(): Promise<Metadata> {
  const activitiesPage = (await getCachedGlobal('activities-page', 1)()) as ActivitiesPage

  return {
    title: activitiesPage.meta?.title,
    description: activitiesPage.meta?.description,
    keywords: activitiesPage.meta?.keywords,
  }
}

export default async function Activities() {
  const activitiesPage = (await getCachedGlobal('activities-page', 1)()) as ActivitiesPage

  const payload = await getPayload({ config: configPromise })

  const activities = await payload.find({
    collection: 'activities',
    depth: 1,
    limit: 0,
  })

  return (
    <>
      <HeroSection activitiesPage={activitiesPage} />
      <ScrollIndicator href="#activities" />

      <ActivitiesSection activities={activities} activitiesPage={activitiesPage} />
    </>
  )
}
