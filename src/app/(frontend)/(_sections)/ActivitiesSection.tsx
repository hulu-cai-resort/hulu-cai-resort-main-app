'use client'

import React from 'react'
import Image from 'next/image'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import type { MainPage, Media } from '@/payload-types'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import { motion } from 'framer-motion'
import {
  sectionContainerVariants,
  mobileContainerVariants,
  featuredCardVariants,
  gridContainerVariants,
  gridCardVariants,
  cardContentVariants,
} from '@/utilities/variants'
import 'swiper/css'
import 'swiper/css/pagination'
import { useRouter } from 'next/navigation'
import { ChevronRight } from 'lucide-react'

interface ActivitiesSectionProps {
  mainPage: MainPage
}

export function ActivitiesSection({ mainPage }: ActivitiesSectionProps) {
  const router = useRouter()
  const featuredActivity = mainPage.services?.[0]

  if (!featuredActivity) {
    return null
  }

  return (
    <motion.section
      className="bg-white py-8 lg:py-16"
      id="activities"
      variants={sectionContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="flex justify-center px-8 lg:px-0">
        <div className="w-full max-w-[922px] lg:max-w-7xl">
          {/* Mobile Layout - Swiper */}
          <motion.div
            className="md:hidden"
            variants={mobileContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <Swiper
              modules={[Pagination]}
              spaceBetween={32}
              slidesPerView={1.1}
              centeredSlides={true}
              pagination={{
                clickable: true,
                el: '.swiper-pagination-activities',
              }}
              className="activities-swiper !px-0 !pb-12"
            >
              {mainPage.services?.map((activity) => (
                <SwiperSlide key={activity.id}>
                  <div className="relative h-[250px] w-full overflow-hidden rounded-[19px] bg-gray-200">
                    <div
                      onClick={() => router.push(activity.link ?? '')}
                      className="absolute inset-0 cursor-pointer"
                    >
                      <Image
                        src={getMediaUrl((activity.image as Media)?.url ?? '')}
                        alt=""
                        width={500}
                        height={500}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-[115px] rounded-b-[19px] bg-gradient-to-t from-black to-transparent px-3 py-3"
                      variants={cardContentVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      <div className="flex h-full items-center justify-between">
                        <div className="flex flex-1 flex-col justify-center">
                          <h3 className="font-raleway text-[28px] font-semibold leading-[1.07] text-white">
                            {activity.title}
                          </h3>
                          <p className="font-raleway text-sm font-semibold text-white">
                            {activity.subtitle}
                          </p>
                        </div>
                        <motion.div
                          className="flex h-[39px] w-[40px] cursor-pointer items-center justify-center rounded-full border-2 border-white"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => router.push(activity.link ?? '')}
                        >
                          <ChevronRight className="h-4 w-4 text-white" />
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="swiper-pagination-activities mt-1 flex justify-center gap-2 sm:mt-6"></div>
          </motion.div>

          <style jsx global>{`
            .activities-swiper .swiper-slide {
              height: auto;
              display: flex;
              align-items: stretch;
            }

            .activities-swiper .swiper-wrapper {
              align-items: stretch;
              margin: auto;
            }

            .activities-swiper .swiper-pagination-bullet {
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

          {/* Tablet Layout - Featured card on top, 2x2 grid below */}
          <div className="hidden md:block xl:hidden">
            <motion.div
              className="flex flex-col items-center gap-10 sm:px-10 xl:px-0"
              variants={sectionContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {/* Featured card */}
              <motion.div
                className="relative h-[625px] w-full overflow-hidden rounded-[20px] bg-gray-200"
                variants={featuredCardVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <div
                  onClick={() => router.push(featuredActivity.link ?? '')}
                  className="absolute inset-0 cursor-pointer"
                >
                  <Image
                    src={getMediaUrl((featuredActivity.image as Media)?.url ?? '')}
                    alt=""
                    width={500}
                    height={500}
                    className="h-full w-full object-cover"
                  />
                </div>
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-[120px] rounded-b-[20px] bg-gradient-to-t from-black to-transparent px-5 py-5"
                  variants={cardContentVariants}
                >
                  <div className="flex h-full items-center justify-between">
                    <div className="flex w-[329px] flex-col justify-center">
                      <h3 className="font-raleway text-[36px] font-semibold leading-[1.28] text-white">
                        {featuredActivity.title}
                      </h3>
                      <p className="font-raleway text-sm font-semibold text-white">
                        {featuredActivity.subtitle}
                      </p>
                    </div>
                    <motion.div
                      className="flex h-[42px] w-[42px] cursor-pointer items-center justify-center rounded-full border-2 border-white"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => router.push(featuredActivity.link ?? '')}
                    >
                      <ChevronRight className="h-4 w-4 text-white" />
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>

              {/* 2x2 Grid of smaller cards */}
              <motion.div
                className="grid w-full grid-cols-2 gap-10"
                variants={gridContainerVariants}
              >
                {mainPage.services?.slice(1, 5).map((activity) => (
                  <motion.div
                    key={activity.id}
                    className="relative h-[387px] w-full overflow-hidden rounded-[20px] bg-gray-200"
                    variants={gridCardVariants}
                    whileHover={{ scale: 1.03, y: -5 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  >
                    <div
                      onClick={() => router.push(activity.link ?? '')}
                      className="absolute inset-0 cursor-pointer"
                    >
                      <Image
                        src={getMediaUrl((activity.image as Media)?.url ?? '')}
                        alt=""
                        width={500}
                        height={500}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <motion.div
                      className="via-black/76 absolute bottom-0 left-0 right-0 h-[120px] rounded-b-[20px] bg-gradient-to-t from-black to-black/10 px-5 py-5"
                      variants={cardContentVariants}
                    >
                      <div className="flex h-full items-center justify-between">
                        <div className="flex w-[198px] flex-col justify-center">
                          <h3 className="font-raleway text-[24px] font-semibold leading-[1.42] text-white">
                            {activity.title}
                          </h3>
                          <p className="font-raleway text-sm text-white">{activity.subtitle}</p>
                        </div>
                        <motion.div
                          className="flex h-[42px] w-[42px] cursor-pointer items-center justify-center rounded-full border-2 border-white"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => router.push(activity.link ?? '')}
                        >
                          <ChevronRight className="h-4 w-4 text-white" />
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Desktop Layout - Featured card left + 2x2 grid right */}
          <div className="hidden xl:block">
            <motion.div
              className="flex justify-center gap-10 sm:px-10 xl:px-0"
              variants={sectionContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {/* Featured card */}
              <motion.div
                className="relative h-[625px] w-full overflow-hidden rounded-[20px] bg-gray-200"
                variants={featuredCardVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <div
                  onClick={() => router.push(featuredActivity.link ?? '')}
                  className="absolute inset-0 cursor-pointer"
                >
                  <Image
                    src={getMediaUrl((featuredActivity.image as Media)?.url ?? '')}
                    alt=""
                    width={500}
                    height={500}
                    className="h-full w-full object-cover"
                  />
                </div>
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-[120px] rounded-b-[20px] bg-gradient-to-t from-black to-transparent px-5 py-5"
                  variants={cardContentVariants}
                >
                  <div className="flex h-full items-center justify-between">
                    <div className="flex w-full flex-col justify-center">
                      <h3 className="font-raleway text-[36px] font-semibold leading-[1.28] text-white">
                        {featuredActivity.title}
                      </h3>
                      <p className="font-raleway text-sm font-semibold text-white">
                        {featuredActivity.subtitle}
                      </p>
                    </div>
                    <motion.div
                      className="flex h-[42px] w-[42px] cursor-pointer items-center justify-center rounded-full border-2 border-white"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => router.push(featuredActivity.link ?? '')}
                    >
                      <ChevronRight className="h-4 w-4 text-white" />
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>

              {/* 2x2 Grid of smaller cards */}
              <motion.div
                className="grid w-full grid-cols-2 gap-10"
                variants={gridContainerVariants}
              >
                {mainPage.services?.slice(1, 5).map((activity) => (
                  <motion.div
                    key={activity.id}
                    className="relative h-[291px] w-[315px] overflow-hidden rounded-[20px] bg-gray-200"
                    variants={gridCardVariants}
                    whileHover={{ scale: 1.03, y: -5 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  >
                    <div
                      onClick={() => router.push(activity.link ?? '')}
                      className="absolute inset-0 cursor-pointer"
                    >
                      <Image
                        src={getMediaUrl((activity.image as Media)?.url ?? '')}
                        alt=""
                        width={500}
                        height={500}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <motion.div
                      className="via-black/76 absolute bottom-0 left-0 right-0 h-[120px] rounded-b-[20px] bg-gradient-to-t from-black to-black/10 px-5 py-5"
                      variants={cardContentVariants}
                    >
                      <div className="flex h-full items-center justify-between">
                        <div className="flex w-[198px] flex-col justify-center">
                          <h3 className="font-raleway text-[24px] font-semibold leading-[1.42] text-white">
                            {activity.title}
                          </h3>
                          <p className="font-raleway text-sm text-white">{activity.subtitle}</p>
                        </div>
                        <motion.div
                          className="flex h-[42px] w-[42px] cursor-pointer items-center justify-center rounded-full border-2 border-white"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => router.push(featuredActivity.link ?? '')}
                        >
                          <ChevronRight className="h-4 w-4 text-white" />
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
