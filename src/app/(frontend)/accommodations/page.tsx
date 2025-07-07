import { Accommodation, AccommodationsPage } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { HeroSection } from './(_sections)/HeroSection'
import ScrollIndicator from '@/components/ScrollIndicator'
import VillasSection from './(_sections)/VillasSection'
import CabinsSection from './(_sections)/CabinsSection'
import CottagesSection from './(_sections)/CottagesSection'
import CampingGroundsSection from './(_sections)/CampingGroundsSection'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export default async function Accommodations() {
  const accommodationsPage = (await getCachedGlobal(
    'accommodations-page',
    1,
  )()) as AccommodationsPage

  const payload = await getPayload({ config: configPromise })

  const villas = await payload.find({
    collection: 'accommodations',
    depth: 3,
    limit: 12,
    where: {
      type: {
        equals: 'villa',
      },
    },
  })

  const cabins = await payload.find({
    collection: 'accommodations',
    depth: 3,
    limit: 12,
    where: {
      type: {
        equals: 'cabin',
      },
    },
  })

  const cottages = await payload.find({
    collection: 'accommodations',
    depth: 3,
    limit: 12,
    where: {
      type: {
        equals: 'cottage',
      },
    },
  })

  const campingGrounds = await payload.find({
    collection: 'accommodations',
    depth: 3,
    limit: 12,
    where: {
      type: {
        equals: 'camping_ground',
      },
    },
  })

  return (
    <>
      <HeroSection accommodationsPage={accommodationsPage} />
      <ScrollIndicator href="#accommodations" />
      <div
        id="accommodations"
        className="mx-auto flex w-full max-w-7xl flex-col space-y-6 px-5 py-10 sm:px-8"
      >
        <div className="flex w-full flex-col items-stretch gap-3">
          <h1 className="font-raleway text-4xl font-bold leading-[1.278] text-[#1D1D1D]">
            Our Accomodation
          </h1>
          <div className="h-[1.12px] w-full bg-[#CEDADF]" />
        </div>
        <VillasSection accommodations={villas} />
        <CabinsSection accommodations={cabins} />
        <CottagesSection accommodations={cottages} />
        <CampingGroundsSection accommodations={campingGrounds} />
      </div>
    </>
  )
}
