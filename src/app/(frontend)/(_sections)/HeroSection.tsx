'use client'

import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import type { MainPage } from '@/payload-types'
import { ChevronRight } from 'lucide-react'
import Wrapper from '@/components/Wrapper'
import { motion } from 'framer-motion'
import {
  containerVariants,
  itemVariants,
  buttonContainerVariants,
  buttonVariants,
} from '@/utilities/variants'
import { useRouter } from 'next/navigation'

interface HeroSectionProps {
  mainPage: MainPage
}

export function HeroSection({ mainPage }: HeroSectionProps) {
  const router = useRouter()
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
          {mainPage.heroImage &&
            typeof mainPage.heroImage === 'object' &&
            mainPage.heroImage.url && (
              <Image
                src={getMediaUrl(mainPage.heroImage.url)}
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
                className="max-w-md font-raleway text-3xl font-bold leading-[1.18] text-white sm:text-5xl lg:text-[56px] lg:leading-[1.18]"
                variants={itemVariants}
              >
                {mainPage.heroTitle}
              </motion.h1>

              <motion.div
                className="border-l border-white pl-2.5 lg:pl-[10px]"
                variants={itemVariants}
              >
                <p className="text-wrap font-raleway text-base leading-[1.2] text-white/90 sm:text-xl lg:text-[20px] lg:leading-[1.2]">
                  {mainPage.heroDescription}
                </p>
              </motion.div>

              <motion.div
                className="flex gap-3 pt-2 sm:gap-6 lg:gap-[24px] lg:pt-4"
                variants={buttonContainerVariants}
              >
                <motion.div
                  variants={buttonVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="fluid"
                    size="lg"
                    className="w-md w-fit px-5 py-3 lg:h-[48px] lg:w-[164px] lg:px-[20px] lg:py-[12px] lg:text-[16px]"
                    onClick={() => router.push('/reservation')}
                  >
                    <div className="flex items-center justify-center px-3 text-sm">
                      Make Reservation
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </div>
                  </Button>
                </motion.div>

                <motion.div
                  variants={buttonVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    size="default"
                    className="border border-white bg-white/10 px-5 py-3 font-raleway text-base font-semibold text-white backdrop-blur-[20px] hover:bg-white/20 lg:h-[48px] lg:w-[164px] lg:px-[20px] lg:py-[12px] lg:text-[16px]"
                    onClick={() => router.push('/maps')}
                  >
                    Explore
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </Wrapper>
      </section>
    </>
  )
}
