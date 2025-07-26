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
import { DiningArea, DiningPage, Media } from '@/payload-types'
import { PaginatedDocs } from 'payload'
import { FeatureItem } from '@/components/FeatureItem'

export default function DiningSection({
  dinings,
  diningPage,
}: {
  dinings: PaginatedDocs<DiningArea>
  diningPage: DiningPage
}) {
  return (
    <motion.section
      className="bg-[#F5F7FA] py-10 lg:py-[64px]"
      initial="hidden"
      id="dining"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={sectionContainerVariants}
    >
      <div className="mx-auto flex w-full justify-center">
        <div className="w-full px-5 pb-8 md:max-w-[1028px] md:px-8 lg:max-w-[1280px] lg:px-10 lg:pb-16 xl:px-0">
          {/* Header Section - Hidden on tablet, visible on mobile and desktop */}
          <motion.div
            className="mb-6 w-full text-center lg:mb-16 lg:block"
            variants={headerTextVariants}
          >
            <h2 className="mb-3 text-[28px] font-semibold leading-[1.07] text-[#1D1D1D] lg:text-[36px] lg:leading-[1.28]">
              {diningPage.heroTitle}
            </h2>
            <p className="text-[14px] leading-[1.43] text-[#4F4F53] lg:text-[16px] lg:leading-[1.75]">
              {diningPage.heroDescription}
            </p>
          </motion.div>
          {/* Mobile Layout - Vertical Stack */}
          {dinings.docs.map((dining, index) => (
            <div key={dining.id} className="w-full scroll-mt-24" id={`dining-${dining.id}`}>
              {/* Mobile Layout */}
              <motion.div
                className="flex flex-col gap-8 md:hidden"
                variants={gridContainerVariants}
              >
                <motion.div className="w-full" variants={gridCardVariants}>
                  <MobileDiningCard dining={dining} />
                  {index < dinings.docs.length - 1 && (
                    <div className="mx-auto mt-8 h-0.5 w-full bg-[#CACCCF]" />
                  )}
                </motion.div>
              </motion.div>

              {/* Tablet Layout */}
              <motion.div
                className="hidden md:flex md:flex-col md:items-center md:justify-center md:gap-5 xl:hidden"
                variants={gridContainerVariants}
              >
                <motion.div className="w-full" variants={gridCardVariants}>
                  <TabletDiningCard dining={dining} />
                </motion.div>
              </motion.div>

              {/* Desktop Layout */}
              <motion.div
                className="hidden xl:flex xl:flex-col xl:gap-8"
                variants={gridContainerVariants}
              >
                <motion.div className="w-full" variants={gridCardVariants}>
                  <DesktopDiningCard dining={dining} />
                </motion.div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

// Mobile Card Component
function MobileDiningCard({ dining }: { dining: DiningArea }) {
  return (
    <div className="flex flex-col gap-3" id={`dining-${dining.id}`}>
      {/* Image */}
      <div className="h-[218px] w-full overflow-hidden rounded-[20px] bg-gray-200">
        <Image
          src={(dining.image as Media)?.url ?? ''}
          alt={dining.title}
          width={346}
          height={218}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <motion.div className="flex w-full flex-col gap-3" variants={cardContentVariants}>
        <h3 className="px-2 text-[18px] font-semibold leading-[1.33] text-[#1D1D1D]">
          {dining.title}
        </h3>

        {/* Features */}
        <div className="flex w-full flex-col gap-1 px-2">
          {dining.points?.map((point) => (
            <FeatureItem key={point.id} icon="location" text={point.point ?? ''} />
          ))}
        </div>

        {/* Button */}
        <button
          onClick={() => {
            window.open(dining.menuLink ?? '', '_blank')
          }}
          className="mt-2 rounded-lg bg-[#06763F] px-3 py-2 text-[12px] font-semibold leading-[1.33] text-white"
        >
          Link Menu
        </button>
      </motion.div>
    </div>
  )
}

// Tablet Card Component
function TabletDiningCard({ dining }: { dining: DiningArea }) {
  return (
    <div
      className="flex h-[348px] items-center justify-center gap-6 rounded-[20px] border-[0.5px] border-[#B5B5B5] bg-white p-0 pr-12 shadow-[4px_4px_20px_0px_rgba(245,247,253,1)]"
      id={`dining-${dining.id}`}
    >
      {/* Image */}
      <div className="h-[348px] w-1/2 flex-shrink-0 overflow-hidden rounded-l-[20px] bg-gray-200">
        <Image
          src={(dining.image as Media)?.url ?? ''}
          alt={dining.title}
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
        <h3 className="text-[36px] font-bold leading-[1.28] text-[#1D1D1D]">{dining.title}</h3>

        {/* Features */}
        <div className="flex flex-col gap-2">
          {dining.points?.map((point) => (
            <FeatureItem key={point.id} icon="location" text={point.point ?? ''} />
          ))}
        </div>

        {/* Button */}
        <button
          onClick={() => {
            window.open(dining.menuLink ?? '', '_blank')
          }}
          className="mt-2 rounded-lg bg-[#06763F] px-4 py-2.5 text-[12px] leading-[1.33] text-white"
        >
          Link Menu
        </button>
      </motion.div>
    </div>
  )
}

// Desktop Card Component
function DesktopDiningCard({ dining }: { dining: DiningArea }) {
  return (
    <div
      className="flex h-[332px] items-center gap-16 rounded-[20px] border-[0.5px] border-[#B5B5B5] bg-white p-0 pr-16 shadow-[4px_4px_20px_0px_rgba(245,247,253,1)]"
      id={`dining-${dining.id}`}
    >
      {/* Image */}
      <div className="h-[332px] w-[564px] flex-shrink-0 overflow-hidden rounded-l-[20px] bg-gray-200">
        <Image
          src={(dining.image as Media)?.url ?? ''}
          alt={dining.title}
          width={564}
          height={332}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <motion.div className="flex flex-1 flex-col gap-4" variants={cardContentVariants}>
        <h3 className="text-[36px] font-bold leading-[1.28] text-[#000000]">{dining.title}</h3>

        {/* Features */}
        <div className="flex flex-col gap-2">
          {dining.points?.map((point) => (
            <FeatureItem key={point.id} icon="location" text={point.point ?? ''} />
          ))}
        </div>

        {/* Button */}
        <button
          onClick={() => {
            window.open(dining.menuLink ?? '', '_blank')
          }}
          className="mt-2 rounded-lg bg-[#06763F] px-5 py-3 text-[16px] font-semibold leading-[1.75] text-white"
        >
          Link Menu
        </button>
      </motion.div>
    </div>
  )
}
