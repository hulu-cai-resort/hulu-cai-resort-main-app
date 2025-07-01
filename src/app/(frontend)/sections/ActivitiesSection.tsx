'use client'

import React from 'react'
import Image from 'next/image'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import type { MainPage } from '@/payload-types'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

interface ActivitiesSectionProps {
  mainPage: MainPage
}

// TODO: Replace with actual data from CMS when database is populated
const dummyActivities = [
  {
    id: '1',
    title: 'Activities',
    subtitle: 'Camping',
    image: '/media/placeholder-camping.jpg',
    featured: true,
  },
  {
    id: '2',
    title: 'Facilities',
    subtitle: 'Resort Amenities',
    image: '/media/placeholder-facilities.jpg',
    featured: false,
  },
  {
    id: '3',
    title: 'Accommodation',
    subtitle: 'Comfortable Stay',
    image: '/media/placeholder-accommodation.jpg',
    featured: false,
  },
  {
    id: '4',
    title: 'Events',
    subtitle: 'Special Occasions',
    image: '/media/placeholder-events.jpg',
    featured: false,
  },
  {
    id: '5',
    title: 'Food Facility',
    subtitle: 'Dining Experience',
    image: '/media/placeholder-dining.jpg',
    featured: false,
  },
]

export function ActivitiesSection({ mainPage }: ActivitiesSectionProps) {
  // TODO: Use mainPage.services when database is populated
  const activities = dummyActivities
  const featuredActivity = activities[0]

  if (!featuredActivity) {
    return null
  }

  return (
    <section className="bg-white py-8 lg:py-16" id="activities">
      <div className="flex justify-center px-8 lg:px-0">
        <div className="w-full max-w-[922px] lg:max-w-[1439px]">
          {/* Mobile Layout - Swiper */}
          <div className="md:hidden">
            <Swiper
              modules={[Pagination]}
              spaceBetween={32}
              slidesPerView={1.1}
              centeredSlides={true}
              pagination={{
                clickable: true,
                bulletClass:
                  'swiper-pagination-bullet !bg-[#A8B4AE] !w-[18px] !h-[8px] !rounded-full',
                bulletActiveClass: 'swiper-pagination-bullet-active !bg-[#06763F] !w-[55px]',
              }}
              className="!px-0 !pb-12"
            >
              {activities.map((activity, index) => (
                <SwiperSlide key={activity.id}>
                  <div className="relative h-[250px] w-full overflow-hidden rounded-[19px] bg-gray-200">
                    <div className="absolute inset-0">
                      <div className="h-full w-full rounded-[19px] bg-gray-300" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-[115px] rounded-b-[19px] bg-gradient-to-t from-black to-transparent px-3 py-3">
                      <div className="flex h-full items-center justify-between">
                        <div className="flex flex-1 flex-col justify-center">
                          <h3 className="font-raleway text-[28px] font-semibold leading-[1.07] text-white">
                            {activity.title}
                          </h3>
                          <p className="font-raleway text-[18px] font-semibold leading-[1.33] text-white">
                            {activity.subtitle}
                          </p>
                        </div>
                        <div className="flex h-[39px] w-[40px] items-center justify-center rounded-full border-2 border-white">
                          <svg
                            className="h-[18px] w-[18px] text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M5 15l7-7 7 7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Tablet Layout - Featured card on top, 2x2 grid below */}
          <div className="hidden md:block xl:hidden">
            <div className="flex flex-col items-center gap-10 sm:px-10 xl:px-0">
              {/* Featured card */}
              <div className="relative h-[625px] w-full overflow-hidden rounded-[20px] bg-gray-200">
                <div className="absolute inset-0">
                  <div className="h-full w-full rounded-[20px] bg-gray-300" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-[120px] rounded-b-[20px] bg-gradient-to-t from-black to-transparent px-5 py-5">
                  <div className="flex h-full items-center justify-between">
                    <div className="flex w-[329px] flex-col justify-center">
                      <h3 className="font-raleway text-[36px] font-semibold leading-[1.28] text-white">
                        {featuredActivity.title}
                      </h3>
                      <p className="font-raleway text-[24px] font-semibold leading-[1.42] text-white">
                        {featuredActivity.subtitle}
                      </p>
                    </div>
                    <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full border-2 border-white">
                      <svg
                        className="h-[18px] w-[18px] text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2x2 Grid of smaller cards */}
              <div className="grid w-full grid-cols-2 gap-10">
                {activities.slice(1, 5).map((activity, index) => (
                  <div
                    key={activity.id}
                    className="relative h-[387px] w-full overflow-hidden rounded-[20px] bg-gray-200"
                  >
                    <div className="absolute inset-0">
                      <div className="h-full w-full rounded-[20px] bg-gray-300" />
                    </div>
                    <div className="via-black/76 absolute bottom-0 left-0 right-0 h-[120px] rounded-b-[20px] bg-gradient-to-t from-black to-black/10 px-5 py-5">
                      <div className="flex h-full items-center justify-between">
                        <div className="flex w-[198px] flex-col justify-center">
                          <h3 className="font-raleway text-[24px] font-semibold leading-[1.42] text-white">
                            {activity.title}
                          </h3>
                          <p className="font-raleway text-[16px] leading-[1.75] text-white">
                            {activity.subtitle}
                          </p>
                        </div>
                        <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full border-2 border-white">
                          <svg
                            className="h-[18px] w-[18px] text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M5 15l7-7 7 7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Layout - Featured card left + 2x2 grid right */}
          <div className="hidden xl:block">
            <div className="flex justify-center gap-10 sm:px-10 xl:px-0">
              {/* Featured card */}
              <div className="relative h-[625px] w-full overflow-hidden rounded-[20px] bg-gray-200">
                <div className="absolute inset-0">
                  <div className="h-full w-full rounded-[20px] bg-gray-300" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-[120px] rounded-b-[20px] bg-gradient-to-t from-black to-transparent px-5 py-5">
                  <div className="flex h-full items-center justify-between">
                    <div className="flex w-full flex-col justify-center">
                      <h3 className="font-raleway text-[36px] font-semibold leading-[1.28] text-white">
                        {featuredActivity.title}
                      </h3>
                      <p className="font-raleway text-[24px] font-semibold leading-[1.42] text-white">
                        {featuredActivity.subtitle}
                      </p>
                    </div>
                    <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full border-2 border-white">
                      <svg
                        className="h-[18px] w-[18px] text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2x2 Grid of smaller cards */}
              <div className="grid w-full grid-cols-2 gap-10">
                {activities.slice(1, 5).map((activity, index) => (
                  <div
                    key={activity.id}
                    className="relative h-[291px] w-[315px] overflow-hidden rounded-[20px] bg-gray-200"
                  >
                    <div className="absolute inset-0">
                      <div className="h-full w-full rounded-[20px] bg-gray-300" />
                    </div>
                    <div className="via-black/76 absolute bottom-0 left-0 right-0 h-[120px] rounded-b-[20px] bg-gradient-to-t from-black to-black/10 px-5 py-5">
                      <div className="flex h-full items-center justify-between">
                        <div className="flex w-[198px] flex-col justify-center">
                          <h3 className="font-raleway text-[24px] font-semibold leading-[1.42] text-white">
                            {activity.title}
                          </h3>
                          <p className="font-raleway text-[16px] leading-[1.75] text-white">
                            {activity.subtitle}
                          </p>
                        </div>
                        <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full border-2 border-white">
                          <svg
                            className="h-[18px] w-[18px] text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M5 15l7-7 7 7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
