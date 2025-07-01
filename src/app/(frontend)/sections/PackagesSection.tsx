'use client'

import React from 'react'
import Image from 'next/image'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import type { MainPage } from '@/payload-types'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

interface PackagesSectionProps {
  mainPage: MainPage
}

// TODO: Replace with actual data from CMS when database is populated
const dummyPackages = [
  {
    id: '1',
    title: 'Gathering Package',
    image: '/media/placeholder-gathering.jpg',
    description: 'Perfect for team building and group gatherings',
  },
  {
    id: '2',
    title: 'Meeting Package',
    image: '/media/placeholder-meeting.jpg',
    description: 'Professional meeting spaces with modern facilities',
  },
  {
    id: '3',
    title: 'Camping Package',
    image: '/media/placeholder-camping.jpg',
    description: 'Outdoor adventure and camping experiences',
  },
  {
    id: '4',
    title: 'Kids Program',
    image: '/media/placeholder-kids.jpg',
    description: 'Fun and educational activities for children',
  },
]

export function PackagesSection({ mainPage }: PackagesSectionProps) {
  // TODO: Use mainPage.packages when database is populated
  const packages = dummyPackages

  return (
    <section className="bg-white py-10 lg:py-[64px]">
      <div className="flex justify-center px-8 lg:px-0">
        <div className="w-full max-w-[347px] md:max-w-[914px] lg:max-w-[1279px]">
          {/* Header Section */}
          <div className="mb-6 space-y-3 text-center md:mb-6 lg:mb-[24px] lg:space-y-4">
            <p className="font-raleway text-lg font-semibold leading-[1.33] text-[#D16E2B] md:text-[20px] md:font-bold md:leading-[1.2] lg:text-[20px] lg:font-semibold lg:leading-[1.2]">
              Package Vacation
            </p>
            <h2 className="font-raleway text-[28px] font-semibold leading-[1.07] text-[#1D1D1D] md:text-[36px] md:font-semibold md:leading-[1.28] lg:mx-auto lg:w-[596px] lg:text-[36px] lg:font-semibold lg:leading-[1.28]">
              Find the Perfect Package for You
            </h2>
            <p className="font-raleway text-sm leading-[1.43] text-[#1D1D1D] md:text-[16px] md:leading-[1.75] lg:mx-auto lg:w-[947px] lg:text-[16px] lg:leading-[1.75]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,Lorem ipsum dolor
              sit amet, consectetur adipiscing elit, sed do eiusmod
            </p>
          </div>

          {/* Mobile Layout - Swiper */}
          <div className="md:hidden">
            <Swiper
              modules={[Pagination]}
              spaceBetween={12}
              slidesPerView={1.05}
              centeredSlides={true}
              pagination={{
                clickable: true,
                bulletClass:
                  'swiper-pagination-bullet !bg-[#A8B4AE] !w-[18px] !h-[8px] !rounded-[20px]',
                bulletActiveClass: 'swiper-pagination-bullet-active !bg-[#06763F] !w-[55px]',
              }}
              className="!pb-12"
            >
              {packages.map((pkg, index) => (
                <SwiperSlide key={pkg.id}>
                  <div className="relative h-[323px] w-full overflow-hidden rounded-[19px] bg-gray-200">
                    <div className="absolute inset-0">
                      <div className="h-full w-full rounded-[19px] bg-gray-300" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-[115px] rounded-b-[19px] bg-gradient-to-t from-black to-transparent px-8 py-3">
                      <div className="flex h-full items-center">
                        <h3 className="font-raleway text-[28px] font-semibold leading-[1.07] text-white">
                          {pkg.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Tablet Layout - 2x2 Grid */}
          <div className="hidden sm:block xl:hidden">
            <div className="flex justify-center sm:px-10 xl:px-0">
              <div className="mx-auto grid w-full grid-cols-2 gap-[53px]">
                {packages.map((pkg, index) => (
                  <div
                    key={pkg.id}
                    className="relative h-[327px] w-full overflow-hidden rounded-[20px] bg-gray-200"
                  >
                    <div className="absolute inset-0">
                      <div className="h-full w-full rounded-[20px] bg-gray-300" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-[87px] rounded-b-[20px] bg-gradient-to-t from-black via-black/50 to-transparent px-5">
                      <div className="flex h-full items-center">
                        <h3 className="font-raleway w-[255px] text-[24px] font-bold leading-[1.42] text-white">
                          {pkg.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Layout - Single Row */}
          <div className="hidden xl:block">
            <div className="flex justify-center gap-[53px]">
              {packages.map((pkg, index) => (
                <div
                  key={pkg.id}
                  className="relative h-[327px] w-[280px] overflow-hidden rounded-[20px] bg-gray-200"
                >
                  <div className="absolute inset-0">
                    <div className="h-full w-full rounded-[20px] bg-gray-300" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-[87px] rounded-b-[20px] bg-gradient-to-t from-black via-black/50 to-transparent px-5">
                    <div className="flex h-full items-center">
                      <h3 className="font-raleway w-[255px] text-[24px] font-bold leading-[1.42] text-white">
                        {pkg.title}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
