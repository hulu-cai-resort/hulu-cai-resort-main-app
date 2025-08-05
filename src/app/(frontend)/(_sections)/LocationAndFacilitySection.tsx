'use client'

import { MainPage } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  sectionContainerVariants,
  headerTextVariants,
  mainImageVariants,
} from '@/utilities/variants'

export default function LocationAndFacilitySection({ mainPage }: { mainPage: MainPage }) {
  return (
    <motion.section
      className="bg-[#F5F7FA] py-10 lg:py-[64px]"
      id="location-and-facility"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={sectionContainerVariants}
    >
      <div className="flex justify-center px-8 md:px-[80px]">
        <div className="w-full max-w-[328px] md:max-w-full lg:max-w-7xl">
          {/* Header Section */}
          <motion.div
            className="mb-6 space-y-3 text-center md:mb-6 lg:mb-[24px] lg:space-y-4"
            variants={headerTextVariants}
          >
            <motion.p
              className="font-raleway text-lg font-semibold leading-[1.33] text-[#D16E2B] md:text-[20px] md:font-bold md:leading-[1.2] lg:text-[20px] lg:font-semibold lg:leading-[1.2]"
              variants={headerTextVariants}
            >
              {mainPage.locationSectionTitle}
            </motion.p>
            <motion.h2
              className="font-raleway text-[28px] font-semibold leading-[1.07] text-[#1D1D1D] md:text-[36px] md:font-semibold md:leading-[1.28] lg:mx-auto lg:w-[745px] lg:text-[36px] lg:leading-[1.28]"
              variants={headerTextVariants}
            >
              {mainPage.locationTitle}
            </motion.h2>
            <motion.p
              className="font-raleway text-sm leading-[1.43] text-[#1D1D1D] md:text-[16px] md:leading-[1.75] lg:mx-auto lg:w-full lg:text-[16px] lg:leading-[1.75]"
              variants={headerTextVariants}
            >
              {mainPage.locationDescription}
            </motion.p>
          </motion.div>

          {/* Mobile Layout */}
          <div className="md:hidden">
            <div className="flex flex-col items-center gap-6">
              {/* Main Location Image */}
              <motion.div
                className="h-[225px] w-full overflow-hidden rounded-[8px] bg-gray-200"
                variants={mainImageVariants}
              >
                {mainPage.locationImage && typeof mainPage.locationImage === 'object' && (
                  <Image
                    src={getMediaUrl(mainPage.locationImage.url ?? '')}
                    alt="Camp Location"
                    width={348}
                    height={225}
                    className="h-full w-full object-cover"
                  />
                )}
              </motion.div>
            </div>
          </div>

          {/* Tablet Layout */}
          <div className="hidden md:block lg:hidden">
            <div className="flex flex-col items-center gap-6">
              {/* Main Location Image */}
              <motion.div
                className="h-[305px] w-full overflow-hidden rounded-[20px] bg-gray-200"
                variants={mainImageVariants}
              >
                {mainPage.locationImage && typeof mainPage.locationImage === 'object' && (
                  <Image
                    src={getMediaUrl(mainPage.locationImage.url ?? '')}
                    alt="Camp Location"
                    width={862}
                    height={305}
                    className="h-full w-full object-cover"
                  />
                )}
              </motion.div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:block">
            <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 sm:px-10 xl:px-0">
              {/* Main Location Image */}
              <motion.div
                className="h-[452px] w-full overflow-hidden rounded-[20px] bg-gray-200"
                variants={mainImageVariants}
              >
                {mainPage.locationImage && typeof mainPage.locationImage === 'object' && (
                  <Image
                    src={getMediaUrl(mainPage.locationImage.url ?? '')}
                    alt="Camp Location"
                    width={1279}
                    height={452}
                    className="h-full w-full object-cover"
                  />
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
