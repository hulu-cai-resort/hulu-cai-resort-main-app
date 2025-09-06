'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { AccommodationCard } from '@/components/AccommodationCard'
import {
  sectionContainerVariants,
  headerTextVariants,
  slideUpVariants,
  gridContainerVariants,
} from '@/utilities/variants'
import { useRouter } from 'next/navigation'
import { Accommodation } from '@/payload-types'
import { PaginatedDocs } from 'payload'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function CampingGroundsSection({
  accommodations,
}: {
  accommodations: PaginatedDocs<Accommodation>
}) {
  const router = useRouter()

  return (
    <motion.section
      className=""
      variants={sectionContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        {/* Camping Ground Section */}
        <motion.div
          className="flex w-full flex-col items-center gap-[22.43px]"
          variants={gridContainerVariants}
        >
          {/* Camping Ground Section Header */}
          <motion.div
            className="flex w-full items-center justify-between gap-[11.21px] rounded-[20px] bg-[#416340] px-3 py-2"
            variants={slideUpVariants}
          >
            <div className="flex items-center justify-center">
              <span className="font-raleway text-base font-semibold leading-[1.75] text-white">
                Camping Ground
              </span>
            </div>
            <motion.button
              className="flex items-center justify-center gap-2.5 rounded-[33.64px] bg-[#092B1A] px-9 py-1.5 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push('/tempat-menginap/camping-ground')}
            >
              <span className="font-raleway text-base font-semibold leading-[1.75] text-white">
                More Camping Ground
              </span>
            </motion.button>
          </motion.div>

          {/* Camping Grounds Grid/Swiper */}
          <motion.div className="relative w-full" variants={gridContainerVariants}>
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={12}
              slidesPerView={1}
              navigation={{
                nextEl: '.swiper-button-next-camping',
                prevEl: '.swiper-button-prev-camping',
              }}
              pagination={{
                clickable: true,
                el: '.swiper-pagination-camping',
              }}
              centeredSlides={true}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                  centeredSlides: true,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 16,
                  centeredSlides: false,
                },
                1280: {
                  slidesPerView: 4,
                  spaceBetween: 12,
                  centeredSlides: false,
                },
              }}
              className="camping-swiper w-full !pb-12"
            >
              {accommodations.docs.map((accommodation) => (
                <SwiperSlide key={accommodation.id} className="!h-auto">
                  <div className="mx-auto w-full md:px-1 lg:px-0">
                    <AccommodationCard accommodation={accommodation} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Buttons */}
            <div className="hidden lg:block">
              <button className="swiper-button-prev-camping absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg transition-all hover:bg-gray-50 hover:shadow-xl">
                <ChevronLeft className="h-6 w-6 text-[#1D1D1D]" />
              </button>
              <button className="swiper-button-next-camping absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg transition-all hover:bg-gray-50 hover:shadow-xl">
                <ChevronRight className="h-6 w-6 text-[#1D1D1D]" />
              </button>
            </div>

            {/* Custom Pagination for Mobile/Tablet */}
            <div className="swiper-pagination-camping mt-6 flex justify-center gap-2"></div>
          </motion.div>
        </motion.div>
      </div>

      {/* Custom Swiper Styles */}
      <style jsx global>{`
        .camping-swiper .swiper-slide {
          height: auto;
          display: flex;
          align-items: stretch;
        }

        .camping-swiper .swiper-wrapper {
          align-items: stretch;
          margin: auto;
        }

        .camping-swiper .swiper-pagination-bullet {
          background: #a8b4ae;
          opacity: 0.6;
          width: 12px;
          height: 12px;
          margin: 0 4px;
        }

        .camping-swiper .swiper-pagination-bullet-active {
          background: #06763f;
          opacity: 1;
        }
      `}</style>
    </motion.section>
  )
}
