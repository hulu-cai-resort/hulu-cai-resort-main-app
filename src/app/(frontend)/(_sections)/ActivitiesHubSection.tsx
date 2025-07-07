'use client'

import React, { useState } from 'react'
import type { MainPage, Media } from '@/payload-types'
import { motion, AnimatePresence } from 'framer-motion'
import {
  headerTextVariants,
  activityImageVariants,
  activityButtonsContainerVariants,
  activityButtonVariants,
  sidebarContainerVariants,
} from '@/utilities/variants'
import Image from 'next/image'
import { getMediaUrl } from '@/utilities/getMediaUrl'

interface ActivitiesHubSectionProps {
  mainPage: MainPage
}

const iconMapping: Record<string, string> = {
  'heart-handshake': '🤝',
  projector: '📽️',
  'tent-tree': '🏕️',
  volleyball: '🏐',
  tent: '⛺',
}

export function ActivitiesHubSection({ mainPage }: ActivitiesHubSectionProps) {
  const activities = mainPage.activities
  const [activeActivity, setActiveActivity] = useState(activities?.[0])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleActivityClick = (activity: any) => {
    setActiveActivity(activity)
  }

  if (!activeActivity) {
    return null
  }

  return (
    <motion.section
      className="bg-white py-10 lg:py-[64px]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={headerTextVariants}
    >
      <div className="flex justify-center px-8 lg:px-0">
        <div className="w-full max-w-[350px] md:max-w-[930px] lg:max-w-[1280px]">
          {/* Header Section */}
          <motion.div
            className="mb-6 space-y-2 text-center md:mb-6 lg:mb-[24px] lg:space-y-4"
            variants={headerTextVariants}
          >
            <motion.p
              className="font-raleway text-lg font-semibold leading-[1.33] text-[#D16E2B] md:text-[20px] md:font-bold md:leading-[1.2] lg:text-[20px] lg:font-semibold lg:leading-[1.2]"
              variants={headerTextVariants}
            >
              Place To Go
            </motion.p>
            <motion.h2
              className="font-raleway text-[28px] font-semibold leading-[1.07] text-[#1D1D1D] md:text-[36px] md:font-semibold md:leading-[1.28] lg:mx-auto lg:w-[745px] lg:text-[36px] lg:leading-[1.28]"
              variants={headerTextVariants}
            >
              {mainPage.activitiesTitle}
            </motion.h2>
            <motion.p
              className="font-raleway text-sm leading-[1.43] text-[#1D1D1D] md:text-[16px] md:leading-[1.75] lg:mx-auto lg:w-[947px] lg:text-[16px] lg:leading-[1.75]"
              variants={headerTextVariants}
            >
              {mainPage.activitiesDescription}
            </motion.p>
          </motion.div>

          {/* Mobile Layout */}
          <div className="md:hidden">
            <div className="flex flex-col items-center gap-6">
              {/* Image with pagination */}
              <motion.div
                className="w-[336px]"
                variants={activityImageVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeActivity?.id}
                    className="mb-5 h-[537px] w-full overflow-hidden rounded-[10px] bg-gray-200"
                    variants={activityImageVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <Image
                      src={getMediaUrl((activeActivity.image as Media)?.url ?? '')}
                      alt=""
                      width={700}
                      height={700}
                      className="h-full w-full object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* Activity buttons */}
              <motion.div
                className="w-[343px] space-y-4"
                variants={activityButtonsContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                {activities?.map((activity) => (
                  <motion.button
                    key={activity.id}
                    onClick={() => handleActivityClick(activity)}
                    className={`flex h-14 w-full items-center gap-4 px-3 transition-colors ${
                      activeActivity.id === activity.id
                        ? 'rounded-[12px] bg-[#06763F] text-white'
                        : 'text-[#1D1D1D]'
                    }`}
                    variants={activityButtonVariants}
                    whileHover={{
                      scale: 1.02,
                      x: 5,
                      transition: { duration: 0.2 },
                    }}
                    whileTap={{
                      scale: 0.98,
                      transition: { duration: 0.1 },
                    }}
                    animate={
                      activeActivity.id === activity.id
                        ? {
                            scale: 1.05,
                            x: 8,
                            transition: { duration: 0.3 },
                          }
                        : {
                            scale: 1,
                            x: 0,
                            transition: { duration: 0.3 },
                          }
                    }
                  >
                    <div
                      className={`flex h-[31px] w-[31px] items-center justify-center rounded ${
                        activeActivity.id === activity.id ? 'bg-white/20' : 'bg-gray-200'
                      }`}
                    >
                      <span className="text-lg">{iconMapping[activity.icon]}</span>
                    </div>
                    <span className="font-raleway text-lg font-semibold leading-[1.33]">
                      {activity.title}
                    </span>
                  </motion.button>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Tablet Layout */}
          <div className="hidden md:block lg:hidden">
            <div className="flex items-center justify-center gap-16">
              {/* Image with pagination */}
              <motion.div
                className="w-full"
                variants={activityImageVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeActivity.id}
                    className="mb-5 h-[401px] w-[483px] overflow-hidden rounded-[10px] bg-gray-200"
                    variants={activityImageVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <Image
                      src={getMediaUrl((activeActivity.image as Media)?.url ?? '')}
                      alt=""
                      width={700}
                      height={700}
                      className="h-full w-full object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* Activity buttons */}
              <motion.div
                className="w-full space-y-4"
                variants={activityButtonsContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                {activities?.map((activity) => (
                  <motion.button
                    key={activity.id}
                    onClick={() => handleActivityClick(activity)}
                    className={`flex h-14 w-full items-center gap-3 px-3 transition-colors ${
                      activeActivity.id === activity.id
                        ? 'rounded-[10px] bg-[#06763F] text-white'
                        : 'text-[#1D1D1D]'
                    }`}
                    variants={activityButtonVariants}
                    whileHover={{
                      scale: 1.02,
                      x: 5,
                      transition: { duration: 0.2 },
                    }}
                    whileTap={{
                      scale: 0.98,
                      transition: { duration: 0.1 },
                    }}
                    animate={
                      activeActivity.id === activity.id
                        ? {
                            scale: 1.05,
                            x: 8,
                            transition: { duration: 0.3 },
                          }
                        : {
                            scale: 1,
                            x: 0,
                            transition: { duration: 0.3 },
                          }
                    }
                  >
                    <div
                      className={`flex h-[31px] w-[31px] items-center justify-center rounded ${
                        activeActivity.id === activity.id ? 'bg-white/20' : 'bg-gray-200'
                      }`}
                    >
                      <span className="text-lg">{iconMapping[activity.icon]}</span>
                    </div>
                    <span className="font-raleway text-xl font-semibold leading-[1.2]">
                      {activity.title}
                    </span>
                  </motion.button>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:block">
            <div className="flex items-center justify-center gap-16 sm:px-10 xl:px-0">
              {/* Activity buttons */}
              <motion.div
                className="w-[389px] rounded-[20px] bg-white p-3 shadow-[4px_4px_20px_0px_rgba(245,247,253,1)]"
                variants={sidebarContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <motion.div
                  className="w-[324px] space-y-[30px] p-3"
                  variants={activityButtonsContainerVariants}
                >
                  {activities?.map((activity) => (
                    <motion.button
                      key={activity.id}
                      onClick={() => handleActivityClick(activity)}
                      className={`flex h-14 w-full items-center gap-3 px-2.5 transition-colors ${
                        activeActivity.id === activity.id
                          ? 'rounded-[10px] bg-[#06763F] text-white'
                          : 'text-[#1D1D1D]'
                      }`}
                      variants={activityButtonVariants}
                      whileHover={{
                        scale: 1.02,
                        x: 5,
                        transition: { duration: 0.2 },
                      }}
                      whileTap={{
                        scale: 0.98,
                        transition: { duration: 0.1 },
                      }}
                      animate={
                        activeActivity.id === activity.id
                          ? {
                              scale: 1.05,
                              x: 8,
                              transition: { duration: 0.3 },
                            }
                          : {
                              scale: 1,
                              x: 0,
                              transition: { duration: 0.3 },
                            }
                      }
                    >
                      <div
                        className={`flex h-[31px] w-[31px] items-center justify-center rounded ${
                          activeActivity.id === activity.id ? 'bg-white/20' : 'bg-gray-200'
                        }`}
                      >
                        <span className="text-lg">{iconMapping[activity.icon]}</span>
                      </div>
                      <span className="font-raleway text-xl font-semibold leading-[1.2]">
                        {activity.title}
                      </span>
                    </motion.button>
                  ))}
                </motion.div>
              </motion.div>

              {/* Image with pagination */}
              <motion.div
                className="w-[826px]"
                variants={activityImageVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeActivity.id}
                    className="mb-5 h-[537px] w-full overflow-hidden rounded-[10px] bg-gray-200"
                    variants={activityImageVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <Image
                      src={getMediaUrl((activeActivity.image as Media)?.url ?? '')}
                      alt=""
                      width={700}
                      height={700}
                      className="h-full w-full object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
