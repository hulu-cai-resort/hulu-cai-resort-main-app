import React from 'react'
import { Button } from '@/components/ui/button'
import type { MainPage } from '@/payload-types'

interface ReviewsSectionProps {
  mainPage: MainPage
}

// TODO: Replace with actual data from CMS when database is populated
const dummyReviews = [
  {
    id: '1',
    customerName: 'Marina Rosya',
    review:
      'Lorem ipsum dolor sit amet, consectetur adipiscing ipsum dolor sit amet, consectetur adipiscing elit',
    customerImage: '/media/customer-1.jpg',
    featured: false,
  },
  {
    id: '2',
    customerName: 'Budi Santoso',
    review:
      'Lorem ipsum dolor sit amet, consectetur adipiscing ipsum dolor sit amet, consectetur adipiscing elit',
    customerImage: '/media/customer-2.jpg',
    featured: true,
  },
  {
    id: '3',
    customerName: 'Sari Dewi',
    review:
      'Lorem ipsum dolor sit amet, consectetur adipiscing ipsum dolor sit amet, consectetur adipiscing elit',
    customerImage: '/media/customer-3.jpg',
    featured: false,
  },
]

export function ReviewsSection({ mainPage }: ReviewsSectionProps) {
  // TODO: Use mainPage.reviews when database is populated
  const reviews = dummyReviews

  return (
    <section className="bg-white py-10 lg:py-[64px]">
      <div className="mx-auto flex w-full max-w-7xl justify-center px-8 lg:px-0">
        <div className="w-full max-w-[344px] md:max-w-[928px] lg:max-w-7xl">
          {/* Header Section */}
          <div className="mb-6 space-y-2 text-center md:mb-6 lg:mb-[24px] lg:space-y-4">
            <p className="font-raleway text-lg font-semibold leading-[1.33] text-[#D16E2B] md:text-[20px] md:font-semibold md:leading-[1.2] lg:text-[20px] lg:font-semibold lg:leading-[1.2]">
              Review Customer
            </p>
            <h2 className="font-raleway text-[28px] font-semibold leading-[1.07] text-[#1D1D1D] md:text-[36px] md:font-semibold md:leading-[1.28] lg:text-[36px] lg:leading-[1.28]">
              What Our Customer Says
            </h2>
            <p className="font-raleway text-sm leading-[1.43] text-[#1D1D1D] md:text-[16px] md:leading-[1.75] lg:mx-auto lg:w-[947px] lg:text-[16px] lg:leading-[1.75]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,Lorem ipsum dolor
              sit amet, consectetur adipiscing elit, sed do eiusmod
            </p>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden">
            <div className="flex flex-col items-center gap-8">
              {/* Customer Photos Grid */}
              <div className="relative h-[274px] w-full">
                {/* Top left image */}
                <div className="absolute left-0 top-0 h-[93px] w-[140px] overflow-hidden rounded-br-[20px] rounded-tl-[20px] bg-gray-200" />
                {/* Top right image */}
                <div className="absolute right-0 top-[14px] h-[128px] w-[160px] overflow-hidden rounded-bl-[30px] rounded-tr-[30px] bg-gray-200" />
                {/* Bottom left image */}
                <div className="absolute bottom-0 left-0 h-[171px] w-[140px] overflow-hidden rounded-br-[30px] rounded-tl-[30px] bg-gray-200" />
                {/* Bottom right image */}
                <div className="absolute bottom-[5px] right-[0px] h-[114px] w-[160px] overflow-hidden rounded-br-[20px] rounded-tl-[20px] bg-gray-200" />
              </div>

              {/* Review Cards */}
              <div className="w-full space-y-3">
                {reviews.map((review, index) => (
                  <div
                    key={review.id}
                    className={`rounded-lg p-2.5 ${
                      review.featured
                        ? 'border-l-[5px] border-[#D16E2B]'
                        : 'border-l-[5px] border-[#CACCCF]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="h-[69px] w-[69px] flex-shrink-0 overflow-hidden rounded-full bg-gray-200" />
                      <div className="flex-1">
                        <h4 className="font-raleway mb-0 text-base font-bold leading-[1.88] text-[#1D1D1D]">
                          {review.customerName}
                        </h4>
                        <p className="font-raleway text-xs leading-[1.33] text-[#1D1D1D]">
                          {review.review}
                        </p>
                      </div>
                      <div className="h-6 w-6 flex-shrink-0">
                        <svg fill="#CACCCF" viewBox="0 0 24 24" className="h-full w-full">
                          <path d="M14,17H17L19,13V7H13V13H16M6,17H9L11,13V7H5V13H8L6,17Z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Button */}
              <div className="w-full">
                <Button className="font-raleway h-[40px] w-full rounded-[8px] bg-[#06763F] text-xs font-semibold leading-[1.33] text-white">
                  Lihat Selengkapnya
                </Button>
              </div>
            </div>
          </div>

          {/* Tablet Layout */}
          <div className="hidden md:block xl:hidden">
            <div className="flex w-full flex-col items-start justify-center gap-8">
              {/* Customer Photos Grid */}
              <div className="relative mx-auto h-[446px] w-[561px] flex-shrink-0">
                {/* Top left image */}
                <div className="absolute left-0 top-0 h-[151px] w-[227px] overflow-hidden rounded-br-[20px] rounded-tl-[20px] bg-gray-200" />
                {/* Top right image */}
                <div className="absolute right-0 top-[24px] h-[209px] w-[313px] overflow-hidden rounded-bl-[30px] rounded-tr-[30px] bg-gray-200" />
                {/* Bottom left image */}
                <div className="absolute bottom-0 left-0 h-[278px] w-[227px] overflow-hidden rounded-br-[30px] rounded-tl-[30px] bg-gray-200" />
                {/* Bottom right image */}
                <div className="absolute bottom-[13px] right-[0px] h-[185px] w-[315px] overflow-hidden rounded-br-[20px] rounded-tl-[20px] bg-gray-200" />
              </div>

              {/* Review Cards */}
              <div className="mx-auto w-full max-w-[579px] space-y-3">
                {reviews.map((review, index) => (
                  <div
                    key={review.id}
                    className={`rounded-lg p-2.5 ${
                      review.featured
                        ? 'border-l-[5px] border-[#D16E2B]'
                        : 'border-l-[5px] border-[#CACCCF]'
                    } ${index === 0 ? 'ml-20' : index === 1 ? 'w-[500px]' : 'ml-28'}`}
                  >
                    <div className="flex items-start gap-[13px]">
                      <div className="h-[69px] w-[69px] flex-shrink-0 overflow-hidden rounded-full bg-gray-200" />
                      <div className="w-[332px] flex-1">
                        <h4 className="font-raleway mb-0 text-base font-bold leading-[1.88] text-[#1D1D1D]">
                          {review.customerName}
                        </h4>
                        <p className="font-raleway text-xs leading-[2] text-[#1D1D1D]">
                          {review.review}
                        </p>
                      </div>
                      <div className="h-6 w-6 flex-shrink-0">
                        <svg
                          fill={review.featured ? '#D16E2B' : '#CACCCF'}
                          viewBox="0 0 24 24"
                          className="h-full w-full"
                        >
                          <path d="M14,17H17L19,13V7H13V13H16M6,17H9L11,13V7H5V13H8L6,17Z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Button */}
                <div className="pt-6">
                  <Button className="font-raleway h-[48px] w-full rounded-[8px] bg-[#06763F] text-base font-semibold leading-[1.75] text-white">
                    Lihat Selengkapnya
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden xl:block">
            <div className="flex items-start justify-center gap-8">
              {/* Customer Photos Grid */}
              <div className="relative h-[446px] w-[561px] flex-shrink-0">
                {/* Top left image */}
                <div className="absolute left-0 top-0 h-[151px] w-[227px] overflow-hidden rounded-br-[20px] rounded-tl-[20px] bg-gray-200" />
                {/* Top right image */}
                <div className="absolute right-0 top-[24px] h-[209px] w-[313px] overflow-hidden rounded-bl-[30px] rounded-tr-[30px] bg-gray-200" />
                {/* Bottom left image */}
                <div className="absolute bottom-0 left-0 h-[278px] w-[227px] overflow-hidden rounded-br-[30px] rounded-tl-[30px] bg-gray-200" />
                {/* Bottom right image */}
                <div className="absolute bottom-[13px] right-[0px] h-[185px] w-[315px] overflow-hidden rounded-br-[20px] rounded-tl-[20px] bg-gray-200" />
              </div>

              {/* Review Cards */}
              <div className="flex flex-col items-center gap-3">
                <div className="space-y-6">
                  {reviews.map((review, index) => (
                    <div
                      key={review.id}
                      className={`rounded-lg p-2.5 ${
                        review.featured
                          ? 'border-l-[5px] border-[#D16E2B]'
                          : 'border-l-[5px] border-[#CACCCF]'
                      } ${index === 0 ? 'w-[477px]' : index === 1 ? 'ml-20 w-[500px]' : 'w-[527px]'}`}
                    >
                      <div className="flex items-start gap-[13px]">
                        <div className="h-[69px] w-[69px] flex-shrink-0 overflow-hidden rounded-full bg-gray-200" />
                        <div className="w-[332px] flex-1">
                          <h4 className="font-raleway mb-0 text-base font-bold leading-[1.88] text-[#1D1D1D]">
                            {review.customerName}
                          </h4>
                          <p className="font-raleway text-xs leading-[2] text-[#1D1D1D]">
                            {review.review}
                          </p>
                        </div>
                        <div className="h-6 w-6 flex-shrink-0">
                          <svg
                            fill={review.featured ? '#D16E2B' : '#CACCCF'}
                            viewBox="0 0 24 24"
                            className="h-full w-full"
                          >
                            <path d="M14,17H17L19,13V7H13V13H16M6,17H9L11,13V7H5V13H8L6,17Z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Button */}
                <div className="w-full max-w-[527px] pt-6">
                  <Button className="font-raleway h-[48px] w-full rounded-[8px] bg-[#06763F] text-base font-semibold leading-[1.75] text-white">
                    Lihat Selengkapnya
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
