'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  sectionContainerVariants,
  gridContainerVariants,
  gridCardVariants,
  cardContentVariants,
} from '@/utilities/variants'
import { PaginatedDocs } from 'payload'
import { Attraction, AttractionAmenitiesPage, Media } from '@/payload-types'
import { FeatureItem } from '@/components/FeatureItem'

export default function AttractionsSection({
  attractions,
  attractionAmenitiesPage,
}: {
  attractions: PaginatedDocs<Attraction>
  attractionAmenitiesPage: AttractionAmenitiesPage
}) {
  return (
    <>
      <div className="w-full bg-white">
        <div
          id="attractions"
          className="mx-auto flex w-full flex-col items-stretch gap-3 px-5 py-8 text-center md:max-w-2xl md:px-0 lg:max-w-7xl lg:py-16"
        >
          <h1 className="font-raleway text-4xl font-medium leading-[1.278] text-[#1D1D1D]">
            {attractionAmenitiesPage.attractionsTitle}
          </h1>
          <p className="text-sm font-medium text-border">
            {attractionAmenitiesPage.attractionsDescription}
          </p>
        </div>
      </div>

      <motion.section
        className="bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionContainerVariants}
      >
        <div className="flex justify-center px-5 pb-8 lg:px-10 lg:pb-16">
          <div className="w-full md:max-w-full lg:max-w-7xl">
            {/* Mobile Layout */}
            <motion.div className="flex flex-col gap-6 md:hidden" variants={gridContainerVariants}>
              {attractions.docs.map((attraction, index) => (
                <motion.div
                  key={attraction.id}
                  className="mx-auto w-full"
                  variants={gridCardVariants}
                >
                  <MobileAttractionCard attraction={attraction} />
                  {index < attractions.docs.length - 1 && (
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
              {attractions.docs.map((attraction) => (
                <motion.div key={attraction.id} className="w-full px-4" variants={gridCardVariants}>
                  <TabletAttractionCard attraction={attraction} />
                </motion.div>
              ))}
            </motion.div>

            {/* Desktop Layout */}
            <motion.div
              className="hidden xl:flex xl:flex-col xl:gap-8"
              variants={gridContainerVariants}
            >
              {attractions.docs.map((attraction) => (
                <motion.div key={attraction.id} className="w-full" variants={gridCardVariants}>
                  <DesktopAttractionCard attraction={attraction} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>
    </>
  )
}

// Mobile Card Component
function MobileAttractionCard({ attraction }: { attraction: Attraction }) {
  return (
    <div className="flex w-full flex-col items-center gap-3">
      {/* Image */}
      <div className="h-[218px] w-full overflow-hidden rounded-[20px] bg-gray-200">
        <Image
          src={(attraction.image as Media)?.url ?? ''}
          alt={attraction.title}
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
        <h3 className="font-raleway w-full text-[18px] font-semibold leading-[1.33] text-[#1D1D1D]">
          {attraction.title}
        </h3>

        {/* Features */}
        <div className="flex w-full flex-col">
          {attraction.points?.map((point) => (
            <FeatureItem key={point.id} icon="location" text={point.point ?? ''} />
          ))}
        </div>

        {/* Price */}
        <div className="flex w-full flex-col items-end">
          <p className="font-raleway text-[18px] font-bold leading-[1.67] text-[#1D1D1D]">
            {new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(attraction.price || 0)}
          </p>
          <p className="font-raleway w-full text-right text-[12px] font-normal leading-[2] text-[#1D1D1D]">
            {attraction.priceUnit}
          </p>
        </div>
      </motion.div>
    </div>
  )
}

// Tablet Card Component
function TabletAttractionCard({ attraction }: { attraction: Attraction }) {
  return (
    <div className="flex h-[348px] flex-row items-center gap-6 rounded-[20px] border-[0.5px] border-[#B5B5B5] bg-white p-0 pr-6 shadow-[4px_4px_20px_0px_rgba(245,247,253,1)]">
      {/* Image */}
      <div className="h-[348px] w-1/2 flex-shrink-0 overflow-hidden rounded-l-[20px] bg-gray-200">
        <Image
          src={(attraction.image as Media)?.url ?? ''}
          alt={attraction.title}
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
          {attraction.title}
        </h3>

        {/* Features */}
        <div className="flex w-full flex-col">
          {attraction.points?.map((point) => (
            <FeatureItem key={point.id} icon="location" text={point.point ?? ''} />
          ))}
        </div>

        {/* Price */}
        <div className="flex w-full flex-col items-end">
          <p className="font-raleway text-[25px] font-bold leading-[1.17] text-[#1D1D1D]">
            {new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(attraction.price || 0)}
          </p>
          <p className="font-raleway text-right text-[13px] font-medium leading-[1.17] text-[#1D1D1D]">
            {attraction.priceUnit}
          </p>
        </div>
      </motion.div>
    </div>
  )
}

// Desktop Card Component
function DesktopAttractionCard({ attraction }: { attraction: Attraction }) {
  return (
    <div className="flex flex-row items-center gap-16 rounded-[20px] border-[0.5px] border-[#B5B5B5] bg-white p-0 pr-16 shadow-[4px_4px_20px_0px_rgba(245,247,253,1)]">
      {/* Image */}
      <div className="h-[332px] w-[564px] flex-shrink-0 overflow-hidden rounded-l-[20px] bg-gray-200">
        <Image
          src={(attraction.image as Media)?.url ?? ''}
          alt={attraction.title}
          width={564}
          height={332}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <motion.div
        className="flex w-[588px] flex-col items-end gap-3"
        variants={cardContentVariants}
      >
        {/* Title */}
        <h3 className="font-raleway w-full text-[36px] font-bold leading-[1.28] text-[#000000]">
          {attraction.title}
        </h3>

        {/* Features */}
        <div className="flex w-full flex-col">
          {attraction.points?.map((point) => (
            <FeatureItem key={point.id} icon="location" text={point.point ?? ''} />
          ))}
        </div>

        {/* Price */}
        <div className="flex flex-col items-end">
          <p className="font-raleway text-[24px] font-bold leading-[1.42] text-[#000000]">
            {new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(attraction.price || 0)}
          </p>
          <p className="font-raleway text-right text-[12px] font-normal leading-[2] text-[#000000]">
            {attraction.priceUnit}
          </p>
        </div>
      </motion.div>
    </div>
  )
}
