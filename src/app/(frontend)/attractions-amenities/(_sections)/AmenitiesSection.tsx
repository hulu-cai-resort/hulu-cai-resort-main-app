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
    <motion.section
      className="bg-white py-4 md:py-8 lg:py-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={sectionContainerVariants}
    >
      <div className="mx-auto flex w-full flex-col items-stretch gap-3 px-5 py-8 text-center md:max-w-2xl md:px-0 lg:max-w-7xl lg:py-10">
        {/* Header Section */}
        <motion.div className="mb-6 text-center md:mb-8 lg:mb-16" variants={headerTextVariants}>
          <motion.h2
            className="font-raleway mb-3 text-[28px] font-semibold leading-[1.07] text-[#000000] md:mb-[15px] md:text-[37px] md:font-medium md:leading-[1.2] lg:text-[37px]"
            variants={headerTextVariants}
          >
            {attractionAmenitiesPage.amenitiesTitle}
          </motion.h2>
          <motion.p
            className="font-raleway mx-auto max-w-[352px] text-[14px] font-normal leading-[1.43] text-[#4F4F53] md:max-w-[675px] md:text-[15px] md:leading-[1.17] lg:max-w-full lg:text-[15px]"
            variants={headerTextVariants}
          >
            {attractionAmenitiesPage.amenitiesDescription}
          </motion.p>
        </motion.div>

        {/* Mobile Layout */}
        <motion.div
          className="flex flex-col items-center gap-6 md:hidden"
          variants={gridContainerVariants}
        >
          {amenities.docs.map((amenity, index) => (
            <motion.div key={amenity.id} className="w-full" variants={gridCardVariants}>
              <MobileAmenityCard amenity={amenity} />
              {index < amenities.docs.length - 1 && (
                <div className="mx-auto mt-6 h-px w-full max-w-[348px] bg-[#CEDADF]" />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Tablet Layout */}
        <motion.div
          className="hidden md:flex md:flex-row md:flex-wrap md:justify-center md:gap-5 xl:hidden"
          variants={gridContainerVariants}
        >
          {amenities.docs.map((amenity) => (
            <motion.div key={amenity.id} className="w-full px-4" variants={gridCardVariants}>
              <TabletAmenityCard amenity={amenity} />
            </motion.div>
          ))}
        </motion.div>

        {/* Desktop Layout */}
        <motion.div
          className="hidden xl:flex xl:flex-col xl:gap-8"
          variants={gridContainerVariants}
        >
          {amenities.docs.map((amenity) => (
            <motion.div key={amenity.id} className="w-full" variants={gridCardVariants}>
              <DesktopAmenityCard amenity={amenity} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
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
      <motion.div
        className="flex w-full flex-col items-center gap-3"
        variants={cardContentVariants}
      >
        {/* Title */}
        <h3 className="font-raleway w-full text-left text-[18px] font-semibold leading-[1.33] text-[#1D1D1D]">
          {amenity.title}
        </h3>

        {/* Description */}
        <div className="flex w-full flex-col">
          {amenity.points?.map((point) => (
            <FeatureItem key={point.id} icon="location" text={point.point ?? ''} />
          ))}
        </div>
      </motion.div>
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
      <motion.div
        className="flex w-1/2 flex-col justify-center gap-3"
        variants={cardContentVariants}
      >
        {/* Title */}
        <h3 className="font-raleway w-full text-[36px] font-bold leading-[1.28] text-[#1D1D1D]">
          {amenity.title}
        </h3>

        {/* Description */}
        <div className="flex w-full flex-col">
          {amenity.points?.map((point) => (
            <FeatureItem key={point.id} icon="location" text={point.point ?? ''} />
          ))}
        </div>
      </motion.div>
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
      <motion.div className="flex w-[588px] flex-col gap-3" variants={cardContentVariants}>
        {/* Title */}
        <h3 className="font-raleway w-full text-[36px] font-bold leading-[1.28] text-[#000000]">
          {amenity.title}
        </h3>

        {/* Description */}
        <div className="flex w-full flex-col">
          {amenity.points?.map((point) => (
            <FeatureItem key={point.id} icon="location" text={point.point ?? ''} />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
