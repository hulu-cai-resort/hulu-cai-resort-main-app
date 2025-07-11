'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import type { MainPage, Media } from '@/payload-types'
import {
  sectionContainerVariants,
  headerTextVariants,
  gridContainerVariants,
  gridCardVariants,
  buttonVariants,
  slideUpVariants,
} from '@/utilities/variants'
import Image from 'next/image'
import { getMediaUrl } from '@/utilities/getMediaUrl'

interface ReviewsSectionProps {
  mainPage: MainPage
}

// Custom variants for photo grid animations
const photoGridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const photoVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
}

export function ReviewsSection({ mainPage }: ReviewsSectionProps) {
  const reviews = mainPage.reviews ?? []

  return (
    <motion.section
      className="bg-white py-10 lg:py-[64px]"
      variants={sectionContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="mx-auto flex w-full max-w-7xl justify-center px-8 lg:px-0">
        <div className="w-full max-w-[344px] md:max-w-[928px] lg:max-w-7xl">
          {/* Header Section */}
          <motion.div
            className="mb-6 space-y-2 text-center md:mb-6 lg:mb-[24px] lg:space-y-4"
            variants={headerTextVariants}
          >
            <motion.p
              className="font-raleway text-lg font-semibold leading-[1.33] text-[#D16E2B] md:text-[20px] md:font-semibold md:leading-[1.2] lg:text-[20px] lg:font-semibold lg:leading-[1.2]"
              variants={slideUpVariants}
            >
              {mainPage.reviewsSectionTitle}
            </motion.p>
            <motion.h2
              className="font-raleway text-[28px] font-semibold leading-[1.07] text-[#1D1D1D] md:text-[36px] md:font-semibold md:leading-[1.28] lg:text-[36px] lg:leading-[1.28]"
              variants={slideUpVariants}
            >
              {mainPage.reviewsTitle}
            </motion.h2>
            <motion.p
              className="font-raleway text-sm leading-[1.43] text-[#1D1D1D] md:text-[16px] md:leading-[1.75] lg:mx-auto lg:w-[947px] lg:text-[16px] lg:leading-[1.75]"
              variants={slideUpVariants}
            >
              {mainPage.reviewsDescription}
            </motion.p>
          </motion.div>

          {/* Mobile Layout */}
          <div className="md:hidden">
            <div className="flex flex-col items-center gap-8">
              {/* Customer Photos Grid */}
              <motion.div className="relative h-[274px] w-full" variants={photoGridVariants}>
                {/* Top left image */}
                <motion.div
                  className="absolute left-0 top-0 h-[93px] w-[140px] overflow-hidden rounded-br-[20px] rounded-tl-[20px] bg-gray-200"
                  variants={photoVariants}
                >
                  <Image
                    src={getMediaUrl((mainPage.reviewsImage?.[0]?.image as Media)?.url ?? '')}
                    alt="Review Image"
                    width={140}
                    height={93}
                    className="h-full w-full object-cover"
                  />
                </motion.div>
                {/* Top right image */}
                <motion.div
                  className="absolute right-0 top-[14px] h-[128px] w-[160px] overflow-hidden rounded-bl-[30px] rounded-tr-[30px] bg-gray-200"
                  variants={photoVariants}
                >
                  <Image
                    src={getMediaUrl((mainPage.reviewsImage?.[1]?.image as Media)?.url ?? '')}
                    alt="Review Image"
                    width={160}
                    height={128}
                    className="h-full w-full object-cover"
                  />
                </motion.div>
                {/* Bottom left image */}
                <motion.div
                  className="absolute bottom-0 left-0 h-[171px] w-[140px] overflow-hidden rounded-br-[30px] rounded-tl-[30px] bg-gray-200"
                  variants={photoVariants}
                >
                  <Image
                    src={getMediaUrl((mainPage.reviewsImage?.[2]?.image as Media)?.url ?? '')}
                    alt="Review Image"
                    width={140}
                    height={171}
                    className="h-full w-full object-cover"
                  />
                </motion.div>
                {/* Bottom right image */}
                <motion.div
                  className="absolute bottom-[5px] right-[0px] h-[114px] w-[160px] overflow-hidden rounded-br-[20px] rounded-tl-[20px] bg-gray-200"
                  variants={photoVariants}
                >
                  <Image
                    src={getMediaUrl((mainPage.reviewsImage?.[3]?.image as Media)?.url ?? '')}
                    alt="Review Image"
                    width={160}
                    height={114}
                    className="h-full w-full object-cover"
                  />
                </motion.div>
              </motion.div>

              {/* Review Cards */}
              <motion.div className="w-full space-y-3" variants={gridContainerVariants}>
                {reviews.map((review) => (
                  <motion.div
                    key={review.id}
                    className={`rounded-lg p-2.5 ${
                      review.featured
                        ? 'border-l-[5px] border-[#D16E2B]'
                        : 'border-l-[5px] border-[#CACCCF]'
                    }`}
                    variants={gridCardVariants}
                  >
                    <div className="flex items-start gap-3">
                      <div className="h-[69px] w-[69px] flex-shrink-0 overflow-hidden rounded-full bg-gray-200">
                        <Image
                          src={getMediaUrl((review.customerImage as Media)?.url ?? '')}
                          alt="Review Image"
                          width={69}
                          height={69}
                          className="h-full w-full object-cover"
                        />
                      </div>
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
                  </motion.div>
                ))}
              </motion.div>

              {/* Button */}
              <motion.div className="w-full" variants={buttonVariants}>
                <Button
                  onClick={() => {
                    window.open(
                      'https://www.google.com/travel/search?q=camp%20hulu%20cai%20review%20google%20maps&g2lb=4965990%2C4969803%2C72277293%2C72302247%2C72317059%2C72414906%2C72471280%2C72472051%2C72485658%2C72560029%2C72573224%2C72616120%2C72647020%2C72648289%2C72686036%2C72760082%2C72803964%2C72832976%2C72882230%2C72958594%2C72958624%2C72959982%2C72963671%2C72972048%2C73010541&hl=en-ID&gl=id&cs=1&ssta=1&ts=CAESCgoCCAMKAggDEAAaHBIaEhQKBwjpDxAHGA4SBwjpDxAHGA8YATICEAAqBwoFOgNJRFI&qs=CAEyE0Nnb0lnNnJld3NXSnM0b2RFQUU4CEIJEaRr80Qy___DQgkRiIbWCLGLUZo&ap=aAG6AQhvdmVydmlldw&ictx=111&ved=0CAAQ5JsGahcKEwiAmvXj06qOAxUAAAAAHQAAAAAQEQ',
                    )
                  }}
                  className="font-raleway h-[40px] w-full rounded-[8px] bg-[#06763F] text-xs font-semibold leading-[1.33] text-white"
                >
                  Lihat Selengkapnya
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Tablet Layout */}
          <div className="hidden md:block xl:hidden">
            <div className="flex w-full flex-col items-start justify-center gap-8">
              {/* Customer Photos Grid */}
              <motion.div
                className="relative mx-auto h-[446px] w-[561px] flex-shrink-0"
                variants={photoGridVariants}
              >
                {/* Top left image */}
                <motion.div
                  className="absolute left-0 top-0 h-[151px] w-[227px] overflow-hidden rounded-br-[20px] rounded-tl-[20px] bg-gray-200"
                  variants={photoVariants}
                >
                  <Image
                    src={getMediaUrl((mainPage.reviewsImage?.[0]?.image as Media)?.url ?? '')}
                    alt="Review Image"
                    width={227}
                    height={151}
                    className="h-full w-full object-cover"
                  />
                </motion.div>
                {/* Top right image */}
                <motion.div
                  className="absolute right-0 top-[24px] h-[209px] w-[313px] overflow-hidden rounded-bl-[30px] rounded-tr-[30px] bg-gray-200"
                  variants={photoVariants}
                >
                  <Image
                    src={getMediaUrl((mainPage.reviewsImage?.[1]?.image as Media)?.url ?? '')}
                    alt="Review Image"
                    width={313}
                    height={209}
                    className="h-full w-full object-cover"
                  />
                </motion.div>
                {/* Bottom left image */}
                <motion.div
                  className="absolute bottom-0 left-0 h-[278px] w-[227px] overflow-hidden rounded-br-[30px] rounded-tl-[30px] bg-gray-200"
                  variants={photoVariants}
                >
                  <Image
                    src={getMediaUrl((mainPage.reviewsImage?.[2]?.image as Media)?.url ?? '')}
                    alt="Review Image"
                    width={227}
                    height={278}
                    className="h-full w-full object-cover"
                  />
                </motion.div>
                {/* Bottom right image */}
                <motion.div
                  className="absolute bottom-[13px] right-[0px] h-[185px] w-[315px] overflow-hidden rounded-br-[20px] rounded-tl-[20px] bg-gray-200"
                  variants={photoVariants}
                >
                  <Image
                    src={getMediaUrl((mainPage.reviewsImage?.[3]?.image as Media)?.url ?? '')}
                    alt="Review Image"
                    width={315}
                    height={185}
                    className="h-full w-full object-cover"
                  />
                </motion.div>
              </motion.div>

              {/* Review Cards */}
              <motion.div
                className="mx-auto w-full max-w-[579px] space-y-3"
                variants={gridContainerVariants}
              >
                {reviews.map((review, index) => (
                  <motion.div
                    key={review.id}
                    className={`rounded-lg p-2.5 ${
                      review.featured
                        ? 'border-l-[5px] border-[#D16E2B]'
                        : 'border-l-[5px] border-[#CACCCF]'
                    } ${index === 0 ? 'ml-20' : index === 1 ? 'w-[500px]' : 'ml-28'}`}
                    variants={gridCardVariants}
                  >
                    <div className="flex items-start gap-[13px]">
                      <div className="h-[69px] w-[69px] flex-shrink-0 overflow-hidden rounded-full bg-gray-200">
                        <Image
                          src={getMediaUrl((review.customerImage as Media)?.url ?? '')}
                          alt="Review Image"
                          width={69}
                          height={69}
                          className="h-full w-full object-cover"
                        />
                      </div>
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
                  </motion.div>
                ))}

                {/* Button */}
                <motion.div className="pt-6" variants={buttonVariants}>
                  <Button
                    onClick={() => {
                      window.open(
                        'https://www.google.com/travel/search?q=camp%20hulu%20cai%20review%20google%20maps&g2lb=4965990%2C4969803%2C72277293%2C72302247%2C72317059%2C72414906%2C72471280%2C72472051%2C72485658%2C72560029%2C72573224%2C72616120%2C72647020%2C72648289%2C72686036%2C72760082%2C72803964%2C72832976%2C72882230%2C72958594%2C72958624%2C72959982%2C72963671%2C72972048%2C73010541&hl=en-ID&gl=id&cs=1&ssta=1&ts=CAESCgoCCAMKAggDEAAaHBIaEhQKBwjpDxAHGA4SBwjpDxAHGA8YATICEAAqBwoFOgNJRFI&qs=CAEyE0Nnb0lnNnJld3NXSnM0b2RFQUU4CEIJEaRr80Qy___DQgkRiIbWCLGLUZo&ap=aAG6AQhvdmVydmlldw&ictx=111&ved=0CAAQ5JsGahcKEwiAmvXj06qOAxUAAAAAHQAAAAAQEQ',
                      )
                    }}
                    className="font-raleway h-[48px] w-full rounded-[8px] bg-[#06763F] text-base font-semibold leading-[1.75] text-white"
                  >
                    Lihat Selengkapnya
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden xl:block">
            <div className="flex items-start justify-center gap-8">
              {/* Customer Photos Grid */}
              <motion.div
                className="relative h-[446px] w-[561px] flex-shrink-0"
                variants={photoGridVariants}
              >
                {/* Top left image */}
                <motion.div
                  className="absolute left-0 top-0 h-[151px] w-[227px] overflow-hidden rounded-br-[20px] rounded-tl-[20px] bg-gray-200"
                  variants={photoVariants}
                >
                  <Image
                    src={getMediaUrl((mainPage.reviewsImage?.[0]?.image as Media)?.url ?? '')}
                    alt="Review Image"
                    width={227}
                    height={151}
                    className="h-full w-full object-cover"
                  />
                </motion.div>
                {/* Top right image */}
                <motion.div
                  className="absolute right-0 top-[24px] h-[209px] w-[313px] overflow-hidden rounded-bl-[30px] rounded-tr-[30px] bg-gray-200"
                  variants={photoVariants}
                >
                  <Image
                    src={getMediaUrl((mainPage.reviewsImage?.[1]?.image as Media)?.url ?? '')}
                    alt="Review Image"
                    width={313}
                    height={209}
                    className="h-full w-full object-cover"
                  />
                </motion.div>
                {/* Bottom left image */}
                <motion.div
                  className="absolute bottom-0 left-0 h-[278px] w-[227px] overflow-hidden rounded-br-[30px] rounded-tl-[30px] bg-gray-200"
                  variants={photoVariants}
                >
                  <Image
                    src={getMediaUrl((mainPage.reviewsImage?.[2]?.image as Media)?.url ?? '')}
                    alt="Review Image"
                    width={227}
                    height={278}
                    className="h-full w-full object-cover"
                  />
                </motion.div>
                {/* Bottom right image */}
                <motion.div
                  className="absolute bottom-[13px] right-[0px] h-[185px] w-[315px] overflow-hidden rounded-br-[20px] rounded-tl-[20px] bg-gray-200"
                  variants={photoVariants}
                >
                  <Image
                    src={getMediaUrl((mainPage.reviewsImage?.[3]?.image as Media)?.url ?? '')}
                    alt="Review Image"
                    width={315}
                    height={185}
                    className="h-full w-full object-cover"
                  />
                </motion.div>
              </motion.div>

              {/* Review Cards */}
              <div className="flex flex-col items-center gap-3">
                <motion.div className="space-y-6" variants={gridContainerVariants}>
                  {reviews.map((review, index) => (
                    <motion.div
                      key={review.id}
                      className={`rounded-lg p-2.5 ${
                        review.featured
                          ? 'border-l-[5px] border-[#D16E2B]'
                          : 'border-l-[5px] border-[#CACCCF]'
                      } ${index === 0 ? 'w-[477px]' : index === 1 ? 'ml-20 w-[500px]' : 'w-[527px]'}`}
                      variants={gridCardVariants}
                    >
                      <div className="flex items-start gap-[13px]">
                        <div className="h-[69px] w-[69px] flex-shrink-0 overflow-hidden rounded-full bg-gray-200">
                          <Image
                            src={getMediaUrl((review.customerImage as Media)?.url ?? '')}
                            alt="Review Image"
                            width={69}
                            height={69}
                            className="h-full w-full object-cover"
                          />
                        </div>
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
                    </motion.div>
                  ))}
                </motion.div>

                {/* Button */}
                <motion.div className="w-full max-w-[527px] pt-6" variants={buttonVariants}>
                  <Button
                    onClick={() => {
                      window.open(
                        'https://www.google.com/travel/search?q=camp%20hulu%20cai%20review%20google%20maps&g2lb=4965990%2C4969803%2C72277293%2C72302247%2C72317059%2C72414906%2C72471280%2C72472051%2C72485658%2C72560029%2C72573224%2C72616120%2C72647020%2C72648289%2C72686036%2C72760082%2C72803964%2C72832976%2C72882230%2C72958594%2C72958624%2C72959982%2C72963671%2C72972048%2C73010541&hl=en-ID&gl=id&cs=1&ssta=1&ts=CAESCgoCCAMKAggDEAAaHBIaEhQKBwjpDxAHGA4SBwjpDxAHGA8YATICEAAqBwoFOgNJRFI&qs=CAEyE0Nnb0lnNnJld3NXSnM0b2RFQUU4CEIJEaRr80Qy___DQgkRiIbWCLGLUZo&ap=aAG6AQhvdmVydmlldw&ictx=111&ved=0CAAQ5JsGahcKEwiAmvXj06qOAxUAAAAAHQAAAAAQEQ',
                      )
                    }}
                    className="font-raleway h-[48px] w-full rounded-[8px] bg-[#06763F] text-base font-semibold leading-[1.75] text-white"
                  >
                    Lihat Selengkapnya
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
