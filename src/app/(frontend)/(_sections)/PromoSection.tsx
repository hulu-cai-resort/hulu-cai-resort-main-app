'use client'

import { MainPage } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import {
  sectionContainerVariants,
  headerTextVariants,
  mainImageVariants,
} from '@/utilities/variants'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

export default function PromoSection({ mainPage }: { mainPage: MainPage }) {
  return (
    <motion.section
      className="py-10 lg:py-[64px]"
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
              {mainPage.promoSectionTitle}
            </motion.p>
            <motion.h2
              className="font-raleway text-[28px] font-semibold leading-[1.07] text-[#1D1D1D] md:text-[36px] md:font-semibold md:leading-[1.28] lg:mx-auto lg:w-[745px] lg:text-[36px] lg:leading-[1.28]"
              variants={headerTextVariants}
            >
              {mainPage.promoTitle}
            </motion.h2>
            <motion.p
              className="font-raleway text-sm leading-[1.43] text-[#1D1D1D] md:text-[16px] md:leading-[1.75] lg:mx-auto lg:w-full lg:text-[16px] lg:leading-[1.75]"
              variants={headerTextVariants}
            >
              {mainPage.promoDescription}
            </motion.p>
          </motion.div>

          {/* Image Swiper */}
          {mainPage.promoImage && mainPage.promoImage.length > 0 && (
            <motion.div
              className="relative h-[225px] w-full md:h-[305px] lg:h-[400px]"
              variants={mainImageVariants}
            >
              <Swiper
                modules={[Pagination]}
                spaceBetween={12}
                slidesPerView={1}
                centeredSlides={true}
                pagination={{
                  clickable: true,
                  el: '.promo-swiper-pagination',
                }}
                breakpoints={{
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 16,
                    centeredSlides: false,
                  },
                  1024: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                    centeredSlides: false,
                  },
                }}
                className="h-full !pb-12"
              >
                {mainPage.promoImage.map((item, index) => {
                  if (!item.image || typeof item.image !== 'object') return null
                  return (
                    <SwiperSlide key={item.id || index}>
                      <div className="h-full w-full overflow-hidden rounded-[8px] bg-gray-200 md:rounded-[20px]">
                        <Image
                          src={getMediaUrl(item.image.url ?? '')}
                          alt={`Promo Image ${index + 1}`}
                          width={1279}
                          height={452}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </SwiperSlide>
                  )
                })}
              </Swiper>

              {/* Custom Pagination */}
              <div className="promo-swiper-pagination mt-4 flex justify-center"></div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.section>
  )
}
