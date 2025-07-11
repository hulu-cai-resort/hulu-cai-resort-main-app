'use client'

import React from 'react'
import Image from 'next/image'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import type { MainPage, Media } from '@/payload-types'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import { motion } from 'framer-motion'
import {
  headerTextVariants,
  packageCardVariants,
  packageGridVariants,
  packageHoverVariants,
  swiperContainerVariants,
} from '@/utilities/variants'
import 'swiper/css'
import 'swiper/css/pagination'
import { useRouter } from 'next/navigation'

interface PackagesSectionProps {
  mainPage: MainPage
}

export function PackagesSection({ mainPage }: PackagesSectionProps) {
  const router = useRouter()
  return (
    <motion.section
      className="bg-white py-10 lg:py-[64px]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={headerTextVariants}
    >
      <div className="flex justify-center px-8 lg:px-0">
        <div className="w-full max-w-[347px] md:max-w-[914px] lg:max-w-[1279px]">
          {/* Header Section */}
          <motion.div
            className="mb-6 space-y-3 text-center md:mb-6 lg:mb-[24px] lg:space-y-4"
            variants={headerTextVariants}
          >
            <motion.p
              className="font-raleway text-lg font-semibold leading-[1.33] text-[#D16E2B] md:text-[20px] md:font-bold md:leading-[1.2] lg:text-[20px] lg:font-semibold lg:leading-[1.2]"
              variants={headerTextVariants}
            >
              {mainPage.packagesSectionTitle}
            </motion.p>
            <motion.h2
              className="font-raleway text-[28px] font-semibold leading-[1.07] text-[#1D1D1D] md:text-[36px] md:font-semibold md:leading-[1.28] lg:mx-auto lg:w-[596px] lg:text-[36px] lg:font-semibold lg:leading-[1.28]"
              variants={headerTextVariants}
            >
              {mainPage.packagesTitle}
            </motion.h2>
            <motion.p
              className="font-raleway text-sm leading-[1.43] text-[#1D1D1D] md:text-[16px] md:leading-[1.75] lg:mx-auto lg:w-[947px] lg:text-[16px] lg:leading-[1.75]"
              variants={headerTextVariants}
            >
              {mainPage.packagesDescription}
            </motion.p>
          </motion.div>

          {/* Mobile Layout - Swiper */}
          <motion.div
            className="md:hidden"
            variants={swiperContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <Swiper
              modules={[Pagination]}
              spaceBetween={12}
              slidesPerView={1.05}
              centeredSlides={true}
              pagination={{
                clickable: true,
                el: '.packages-swiper-pagination',
              }}
              className="!pb-12"
            >
              {mainPage.packages?.map((pkg) => (
                <SwiperSlide key={pkg.id}>
                  <motion.div
                    className="relative h-[323px] w-full overflow-hidden rounded-[19px] bg-gray-200"
                    variants={packageHoverVariants}
                    initial="rest"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <div
                      className="absolute inset-0 cursor-pointer"
                      onClick={() => router.push(pkg.link ?? '')}
                    >
                      <Image
                        src={getMediaUrl((pkg.image as Media)?.url ?? '')}
                        alt=""
                        width={500}
                        height={500}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-[115px] rounded-b-[19px] bg-gradient-to-t from-black to-transparent px-8 py-3">
                      <div className="flex h-full items-center">
                        <h3 className="font-raleway text-[28px] font-semibold leading-[1.07] text-white">
                          {pkg.title}
                        </h3>
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="packages-swiper-pagination mt-1 flex justify-center gap-2 sm:mt-6" />
          </motion.div>

          <style jsx global>{`
            .packages-swiper .swiper-slide {
              height: auto;
              display: flex;
              align-items: stretch;
            }

            .packages-swiper .swiper-wrapper {
              align-items: stretch;
              margin: auto;
            }

            .packages-swiper .swiper-pagination-bullet {
              background: #a8b4ae;
              opacity: 0.6;
              width: 12px;
              height: 12px;
              margin: 0 4px;
            }

            .activities-swiper .swiper-pagination-bullet-active {
              background: #06763f;
              opacity: 1;
              width: 24px;
              border-radius: 6px;
            }
          `}</style>

          {/* Tablet Layout - 2x2 Grid */}
          <div className="hidden sm:block xl:hidden">
            <div className="flex justify-center sm:px-10 xl:px-0">
              <motion.div
                className="mx-auto grid w-full grid-cols-2 gap-[53px]"
                variants={packageGridVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                {mainPage.packages?.map((pkg) => (
                  <motion.div
                    key={pkg.id}
                    className="relative h-[327px] w-full overflow-hidden rounded-[20px] bg-gray-200"
                    variants={packageCardVariants}
                    whileHover={{
                      scale: 1.03,
                      y: -8,
                      transition: { duration: 0.3 },
                    }}
                    whileTap={{
                      scale: 0.98,
                      y: 0,
                      transition: { duration: 0.1 },
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <div
                      className="absolute inset-0 cursor-pointer"
                      onClick={() => router.push(pkg.link ?? '')}
                    >
                      <Image
                        src={getMediaUrl((pkg.image as Media)?.url ?? '')}
                        alt=""
                        width={500}
                        height={500}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-[87px] rounded-b-[20px] bg-gradient-to-t from-black via-black/50 to-transparent px-5">
                      <div className="flex h-full items-center">
                        <h3 className="font-raleway w-[255px] text-[24px] font-bold leading-[1.42] text-white">
                          {pkg.title}
                        </h3>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Desktop Layout - Single Row */}
          <div className="hidden xl:block">
            <motion.div
              className="flex justify-center gap-[53px]"
              variants={packageGridVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {mainPage.packages?.map((pkg) => (
                <motion.div
                  key={pkg.id}
                  className="relative h-[327px] w-[280px] overflow-hidden rounded-[20px] bg-gray-200"
                  variants={packageCardVariants}
                  whileHover={{
                    scale: 1.03,
                    y: -8,
                    transition: { duration: 0.3 },
                  }}
                  whileTap={{
                    scale: 0.98,
                    y: 0,
                    transition: { duration: 0.1 },
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <div
                    className="absolute inset-0 cursor-pointer"
                    onClick={() => router.push(pkg.link ?? '')}
                  >
                    <Image
                      src={getMediaUrl((pkg.image as Media)?.url ?? '')}
                      alt=""
                      width={500}
                      height={500}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-[87px] rounded-b-[20px] bg-gradient-to-t from-black via-black/50 to-transparent px-5">
                    <div className="flex h-full items-center">
                      <h3 className="font-raleway w-[255px] text-[24px] font-bold leading-[1.42] text-white">
                        {pkg.title}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
