'use client'

import React, { useState } from 'react'
import type { MainPage } from '@/payload-types'
import { motion, AnimatePresence } from 'framer-motion'
import {
  headerTextVariants,
  activityImageVariants,
  activityButtonsContainerVariants,
  activityButtonVariants,
  activityButtonInteractive,
  sidebarContainerVariants,
} from '@/utilities/variants'

interface ActivitiesHubSectionProps {
  mainPage: MainPage
}

// TODO: Replace with actual data from CMS when database is populated
const dummyActivities = [
  {
    id: '1',
    title: 'Gathering Family',
    icon: '🤝',
    image: '/media/gathering-family.jpg',
    featured: true,
  },
  {
    id: '2',
    title: 'Meeting Package',
    icon: '🤝',
    image: '/media/meeting-package.jpg',
    featured: false,
  },
  {
    id: '3',
    title: 'Explore world',
    icon: '📽️',
    image: '/media/explore-world.jpg',
    featured: false,
  },
  {
    id: '4',
    title: 'Outbound',
    icon: '🏕️',
    image: '/media/outbound.jpg',
    featured: false,
  },
  {
    id: '5',
    title: 'Kids Program',
    icon: '🏐',
    image: '/media/kids-program.jpg',
    featured: false,
  },
  {
    id: '6',
    title: 'Camping',
    icon: '⛺',
    image: '/media/camping.jpg',
    featured: false,
  },
]

export function ActivitiesHubSection({ mainPage }: ActivitiesHubSectionProps) {
  // TODO: Use mainPage.activities when database is populated
  const activities = dummyActivities
  const [activeActivity, setActiveActivity] = useState(activities[0] || dummyActivities[0])

  const handleActivityClick = (activity: (typeof activities)[0]) => {
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
              Escape the noise. Find your peace together
            </motion.h2>
            <motion.p
              className="font-raleway text-sm leading-[1.43] text-[#1D1D1D] md:text-[16px] md:leading-[1.75] lg:mx-auto lg:w-[947px] lg:text-[16px] lg:leading-[1.75]"
              variants={headerTextVariants}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,Lorem ipsum dolor
              sit amet, consectetur adipiscing elit, sed do eiusmod
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
                    key={activeActivity.id}
                    className="mb-5 h-[537px] w-full overflow-hidden rounded-[10px] bg-gray-200 p-6"
                    variants={activityImageVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  ></motion.div>
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
                {activities.map((activity, index) => (
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
                      <span className="text-lg">{activity.icon}</span>
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
                    className="mb-5 h-[401px] w-[483px] overflow-hidden rounded-[10px] bg-gray-200 p-6"
                    variants={activityImageVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  ></motion.div>
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
                {activities.map((activity, index) => (
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
                      <span className="text-lg">{activity.icon}</span>
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
                  {activities.map((activity, index) => (
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
                        <span className="text-lg">{activity.icon}</span>
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
                    className="mb-5 h-[537px] w-full overflow-hidden rounded-[10px] bg-gray-200 p-6"
                    variants={activityImageVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  ></motion.div>
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
