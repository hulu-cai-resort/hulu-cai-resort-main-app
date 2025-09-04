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
  diningAreas,
  restaurants,
  diningPage,
}: {
  diningAreas: PaginatedDocs<DiningArea>
  restaurants: PaginatedDocs<DiningArea>
  diningPage: DiningPage
}) {
  console.log(diningPage)
  return (
    <section className="bg-[#F5F7FA] py-10 lg:py-[64px]">
      <div className="mx-auto flex w-full justify-center">
        <div className="w-full px-5 pb-8 md:max-w-[1028px] md:px-8 lg:max-w-[1280px] lg:px-10 lg:pb-16 xl:px-0">
          <div className="mb-6 w-full text-center lg:mb-16 lg:block">
            <h2 className="mb-3 text-[28px] font-semibold leading-[1.07] text-[#1D1D1D] lg:text-[36px] lg:leading-[1.28]">
              {diningPage.restaurantTitle}
            </h2>
            <p className="text-[14px] leading-[1.43] text-[#4F4F53] lg:text-[16px] lg:leading-[1.75]">
              {diningPage.restaurantDescription}
            </p>
          </div>
          {/* Mobile Layout - Vertical Stack */}
          <div className="flex justify-center px-5 pb-8 lg:px-10 lg:pb-16">
            <div className="w-full space-y-6 md:max-w-full lg:max-w-7xl">
              {/* Mobile Layout */}
              <div className="space-y-6 md:grid md:grid-cols-2 md:gap-6 md:space-y-0 xl:grid-cols-2 xl:gap-8">
                {restaurants.docs.map((dining, index) => (
                  <div key={dining.id} className="w-full scroll-mt-24" id={`dining-${dining.id}`}>
                    {/* Mobile Card */}
                    <div className="md:hidden">
                      <div className="w-full">
                        <MobileDiningCard dining={dining} />
                        {index < restaurants.docs.length - 1 && (
                          <div className="mx-auto mt-8 h-0.5 w-full bg-[#CACCCF]" />
                        )}
                      </div>
                    </div>

                    {/* Tablet Card */}
                    <div className="hidden h-full md:block xl:hidden">
                      <TabletDiningCard dining={dining} />
                    </div>

                    {/* Desktop Card */}
                    <div className="hidden h-full xl:block">
                      <DesktopDiningCard dining={dining} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Header Section - Hidden on tablet, visible on mobile and desktop */}
          <div className="mb-6 w-full text-center lg:mb-16 lg:block">
            <h2 className="mb-3 text-[28px] font-semibold leading-[1.07] text-[#1D1D1D] lg:text-[36px] lg:leading-[1.28]">
              {diningPage.diningTitle}
            </h2>
            <p className="text-[14px] leading-[1.43] text-[#4F4F53] lg:text-[16px] lg:leading-[1.75]">
              {diningPage.diningDescription}
            </p>
          </div>
          {/* Mobile Layout - Vertical Stack */}
          <div className="flex justify-center px-5 pb-8 lg:px-10 lg:pb-16">
            <div className="w-full space-y-6 md:max-w-full lg:max-w-7xl">
              {/* Mobile Layout */}
              <div className="space-y-6 md:grid md:grid-cols-2 md:gap-6 md:space-y-0 xl:grid-cols-3 xl:gap-8">
                {diningAreas.docs.map((dining, index) => (
                  <div key={dining.id} className="w-full scroll-mt-24" id={`dining-${dining.id}`}>
                    {/* Mobile Card */}
                    <div className="md:hidden">
                      <div className="w-full">
                        <MobileDiningCard dining={dining} />
                        {index < diningAreas.docs.length - 1 && (
                          <div className="mx-auto mt-8 h-0.5 w-full bg-[#CACCCF]" />
                        )}
                      </div>
                    </div>

                    {/* Tablet Card */}
                    <div className="hidden h-full md:block xl:hidden">
                      <TabletDiningCard dining={dining} />
                    </div>

                    {/* Desktop Card */}
                    <div className="hidden h-full xl:block">
                      <DesktopDiningCard dining={dining} />
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
      <div className="flex w-full flex-col gap-3">
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
      </div>
    </div>
  )
}

// Tablet Card Component
function TabletDiningCard({ dining }: { dining: DiningArea }) {
  return (
    <div
      className="flex h-full flex-col gap-0 rounded-[20px] border-[0.5px] border-[#B5B5B5] bg-white shadow-[4px_4px_20px_0px_rgba(245,247,253,1)]"
      id={`dining-${dining.id}`}
    >
      {/* Image */}
      <div className="h-[240px] w-full overflow-hidden rounded-t-[20px] bg-gray-200">
        <Image
          src={(dining.image as Media)?.url ?? ''}
          alt={dining.title}
          width={400}
          height={240}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-6">
        <h3 className="text-[24px] font-semibold leading-[1.33] text-[#1D1D1D]">{dining.title}</h3>

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
          className="mt-3 rounded-lg bg-[#06763F] px-4 py-2.5 text-[14px] font-semibold leading-[1.33] text-white"
        >
          Link Menu
        </button>
      </div>
    </div>
  )
}

// Desktop Card Component
function DesktopDiningCard({ dining }: { dining: DiningArea }) {
  return (
    <div
      className="flex h-full flex-col gap-0 rounded-[20px] border-[0.5px] border-[#B5B5B5] bg-white shadow-[4px_4px_20px_0px_rgba(245,247,253,1)]"
      id={`dining-${dining.id}`}
    >
      {/* Image */}
      <div className="h-[332px] w-full overflow-hidden rounded-t-[20px] bg-gray-200">
        <Image
          src={(dining.image as Media)?.url ?? ''}
          alt={dining.title}
          width={350}
          height={220}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4 p-6">
        <h3 className="text-[24px] font-semibold leading-[1.33] text-[#000000]">{dining.title}</h3>

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
          className="mt-3 rounded-lg bg-[#06763F] px-5 py-3 text-[16px] font-semibold leading-[1.75] text-white"
        >
          Link Menu
        </button>
      </div>
    </div>
  )
}
