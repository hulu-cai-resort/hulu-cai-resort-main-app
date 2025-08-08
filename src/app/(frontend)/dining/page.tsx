import { getCachedGlobal } from '@/utilities/getGlobals'
import { DiningPage } from '@/payload-types'
import { HeroSection } from './(_sections)/HeroSection'
import ScrollIndicator from '@/components/ScrollIndicator'
import DiningSection from './(_sections)/DiningSection'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const diningPage = (await getCachedGlobal('dining-page', 1)()) as DiningPage

  return {
    title: diningPage.meta?.title,
    description: diningPage.meta?.description,
    keywords: diningPage.meta?.keywords,
  }
}
export default async function Dining() {
  const diningPage = (await getCachedGlobal('dining-page', 1)()) as DiningPage

  const payload = await getPayload({ config: configPromise })

  const dinings = await payload.find({
    collection: 'dining-area',
    depth: 1,
    limit: 0,
  })

  return (
    <>
      <HeroSection diningPage={diningPage} />
      <ScrollIndicator href="#dining" />

      <DiningSection dinings={dinings} diningPage={diningPage} />
    </>
  )
}
