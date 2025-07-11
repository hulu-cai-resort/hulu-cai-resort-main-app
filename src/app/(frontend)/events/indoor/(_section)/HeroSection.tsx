'use client'

import React from 'react'
import Image from 'next/image'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import type { EventsIndoorPage } from '@/payload-types'
import Wrapper from '@/components/Wrapper'
import { motion } from 'framer-motion'
import { containerVariants, itemVariants } from '@/utilities/variants'

interface HeroSectionProps {
  eventsIndoorPage: EventsIndoorPage
}

export function HeroSection({ eventsIndoorPage }: HeroSectionProps) {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Image */}
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2 }}
        >
          {eventsIndoorPage.heroImage &&
            typeof eventsIndoorPage.heroImage === 'object' &&
            eventsIndoorPage.heroImage.url && (
              <Image
                src={getMediaUrl(eventsIndoorPage.heroImage.url)}
                alt="Camp Hulu Cai Hero"
                fill
                className="absolute inset-0 h-full w-full object-cover"
                priority
                sizes="100vw"
              />
            )}
          <motion.div
            className="absolute inset-0 h-screen w-full bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          />
        </motion.div>

        {/* Hero Content */}
        <Wrapper>
          <motion.div
            className="absolute z-10 flex h-screen flex-col items-end justify-end px-4 pb-32 sm:px-0 sm:pt-16 md:items-start md:justify-center lg:pt-24"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="max-w-[670px] space-y-4 lg:space-y-[13px]">
              <motion.h1
                className="font-raleway max-w-md text-3xl font-bold leading-[1.18] text-white sm:text-5xl lg:text-[56px] lg:leading-[1.18]"
                variants={itemVariants}
              >
                {eventsIndoorPage.heroTitle}
              </motion.h1>

              <motion.div variants={itemVariants}>
                <p className="font-raleway text-wrap text-base font-semibold leading-[1.2] text-white/90 sm:text-xl lg:text-[20px] lg:leading-[1.2]">
                  {eventsIndoorPage.heroDescription}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </Wrapper>
      </section>
    </>
  )
}
