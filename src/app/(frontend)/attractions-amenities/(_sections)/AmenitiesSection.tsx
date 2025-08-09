'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  sectionContainerVariants,
  headerTextVariants,
  gridContainerVariants,
  gridCardVariants,
  cardContentVariants,
} from '@/utilities/variants'
import { Amenity, AttractionAmenitiesPage, Media } from '@/payload-types'
import { PaginatedDocs } from 'payload'
import { FeatureItem } from '@/components/FeatureItem'

interface AmenityCard {
  id: number
  title: string
  description: string
  image: string
}

export default function AmenitiesSection({
  amenities,
  attractionAmenitiesPage,
}: {
  amenities: PaginatedDocs<Amenity>
  attractionAmenitiesPage: AttractionAmenitiesPage
}) {
  return (
    <section className="bg-white py-4 md:py-8 lg:py-16">
      <div className="mx-auto w-full">
        {/* Header Section */}
        <div className="mx-auto mb-6 flex w-full flex-col items-stretch gap-3 px-5 py-8 text-center md:mb-8 md:max-w-2xl md:px-0 lg:mb-16 lg:max-w-7xl lg:py-16">
          <h2 className="mb-3 font-raleway text-[28px] font-semibold leading-[1.07] text-[#000000] md:mb-[15px] md:text-[37px] md:font-medium md:leading-[1.2] lg:text-[37px]">
            {attractionAmenitiesPage.amenitiesTitle}
          </h2>
          <p className="mx-auto max-w-[352px] font-raleway text-[14px] font-normal leading-[1.43] text-[#4F4F53] md:max-w-[675px] md:text-[15px] md:leading-[1.17] lg:max-w-full lg:text-[15px]">
            {attractionAmenitiesPage.amenitiesDescription}
          </p>
        </div>

        <div className="flex justify-center px-5 pb-8 lg:px-10 lg:pb-16">
          <div className="w-full space-y-6 md:max-w-full lg:max-w-7xl">
            {amenities.docs.map((amenity, index) => (
              <div key={amenity.id} className="w-full scroll-mt-24" id={`amenity-${amenity.id}`}>
                {/* Mobile Layout */}
                <div className="flex flex-col items-center gap-6 md:hidden">
                  <div className="w-full">
                    <MobileAmenityCard amenity={amenity} />
                    {index < amenities.docs.length - 1 && (
                      <div className="mx-auto mt-6 h-px w-full max-w-[348px] bg-[#CEDADF]" />
                    )}
                  </div>
                </div>

                {/* Tablet Layout */}
                <div className="hidden w-full md:flex md:flex-row md:flex-wrap md:justify-center md:gap-5 xl:hidden">
                  <div className="w-full px-4">
                    <TabletAmenityCard amenity={amenity} />
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden xl:flex xl:flex-col xl:gap-8">
                  <div className="w-full">
                    <DesktopAmenityCard amenity={amenity} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Mobile Card Component
function MobileAmenityCard({ amenity }: { amenity: Amenity }) {
  return (
    <div className="flex flex-col items-center gap-3">
      {/* Image */}
      <div className="h-[218px] w-full overflow-hidden rounded-[20px] bg-gray-200">
        <Image
          src={(amenity.image as Media)?.url ?? ''}
          alt={amenity.title}
          width={348}
          height={218}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex w-full flex-col items-center gap-3">
        {/* Title */}
        <h3 className="w-full text-left font-raleway text-[18px] font-semibold leading-[1.33] text-[#1D1D1D]">
          {amenity.title}
        </h3>

        {/* Description */}
        <div className="flex w-full flex-col">
          {amenity.points?.map((point) => (
            <FeatureItem key={point.id} icon="location" text={point.point ?? ''} />
          ))}
        </div>
      </div>
    </div>
  )
}

// Tablet Card Component
function TabletAmenityCard({ amenity }: { amenity: Amenity }) {
  return (
    <div className="flex h-[348px] flex-row items-center gap-6 rounded-[20px] border-[0.5px] border-[#B5B5B5] bg-white p-0 pr-12 shadow-[4px_4px_20px_0px_rgba(245,247,253,1)]">
      {/* Image */}
      <div className="h-[348px] w-1/2 flex-shrink-0 overflow-hidden rounded-l-[20px] bg-gray-200">
        <Image
          src={(amenity.image as Media)?.url ?? ''}
          alt={amenity.title}
          width={446}
          height={348}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex w-1/2 flex-col justify-center gap-3">
        {/* Title */}
        <h3 className="w-full font-raleway text-[36px] font-bold leading-[1.28] text-[#1D1D1D]">
          {amenity.title}
        </h3>

        {/* Description */}
        <div className="flex w-full flex-col">
          {amenity.points?.map((point) => (
            <FeatureItem key={point.id} icon="location" text={point.point ?? ''} />
          ))}
        </div>
      </div>
    </div>
  )
}

// Desktop Card Component
function DesktopAmenityCard({ amenity }: { amenity: Amenity }) {
  return (
    <div className="flex flex-row items-center gap-16 rounded-[20px] border-[0.5px] border-[#B5B5B5] bg-white p-0 pr-16 shadow-[4px_4px_20px_0px_rgba(245,247,253,1)]">
      {/* Image */}
      <div className="h-[332px] w-[564px] flex-shrink-0 overflow-hidden rounded-l-[20px] bg-gray-200">
        <Image
          src={(amenity.image as Media)?.url ?? ''}
          alt={amenity.title}
          width={564}
          height={332}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex w-[588px] flex-col gap-3">
        {/* Title */}
        <h3 className="w-full font-raleway text-[36px] font-bold leading-[1.28] text-[#000000]">
          {amenity.title}
        </h3>

        {/* Description */}
        <div className="flex w-full flex-col">
          {amenity.points?.map((point) => (
            <FeatureItem key={point.id} icon="location" text={point.point ?? ''} />
          ))}
        </div>
      </div>
    </div>
  )
}
