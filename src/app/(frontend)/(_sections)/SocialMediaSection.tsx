'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import type { MainPage } from '@/payload-types'
import { FacebookIcon, InstagramIcon, YoutubeIcon } from 'lucide-react'
import {
  sectionContainerVariants,
  headerTextVariants,
  slideUpVariants,
  slideLeftVariants,
  slideRightVariants,
  buttonContainerVariants,
  buttonVariants,
} from '@/utilities/variants'
import { FaTiktok } from 'react-icons/fa'

interface SocialMediaSectionProps {
  mainPage: MainPage
}

// Custom variants for social media section
const socialImageVariants = {
  hidden: {
    opacity: 0,
    scale: 1.1,
    x: -50,
  },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      duration: 0.8,
      delay: 0.2,
    },
  },
}

const socialButtonHoverVariants = {
  rest: {
    scale: 1,
    y: 0,
  },
  hover: {
    scale: 1.05,
    y: -3,
    transition: {
      duration: 0.3,
    },
  },
  tap: {
    scale: 0.95,
    y: 0,
    transition: {
      duration: 0.1,
    },
  },
}

export function SocialMediaSection({ mainPage }: SocialMediaSectionProps) {
  const socialLinks = mainPage.socialLinks ?? []

  return (
    <motion.section
      className="bg-[#F5F7FA] py-10 lg:py-[64px]"
      variants={sectionContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="flex justify-center px-8 lg:px-0">
        <div className="w-full max-w-[326px] md:max-w-[900px] lg:max-w-7xl">
          {/* Mobile Layout */}
          <div className="md:hidden">
            <div className="flex flex-col items-center gap-10">
              {/* Background Image */}
              <motion.div
                className="h-[336px] w-full overflow-hidden bg-gray-200"
                variants={socialImageVariants}
              >
                {mainPage.socialBackgroundImage &&
                  typeof mainPage.socialBackgroundImage === 'object' && (
                    <Image
                      src={getMediaUrl(mainPage.socialBackgroundImage.url)}
                      alt="Social Media Background"
                      width={325}
                      height={336}
                      className="h-full w-full object-cover"
                    />
                  )}
              </motion.div>

              {/* Content Section */}
              <motion.div className="w-full space-y-6" variants={slideUpVariants}>
                {/* Text Content */}
                <motion.div className="space-y-3" variants={headerTextVariants}>
                  <motion.p
                    className="font-raleway text-lg font-semibold leading-[1.33] text-[#D16E2B]"
                    variants={slideUpVariants}
                  >
                    {mainPage.socialSectionTitle}
                  </motion.p>
                  <div className="space-y-2.5">
                    <motion.h2
                      className="font-raleway text-[28px] font-semibold leading-[1.07] text-[#1D1D1D]"
                      variants={slideUpVariants}
                    >
                      {mainPage.socialTitle}
                    </motion.h2>
                    <motion.p
                      className="font-raleway text-sm leading-[1.43] text-[#1D1D1D]"
                      variants={slideUpVariants}
                    >
                      {mainPage.socialDescription}
                    </motion.p>
                  </div>
                </motion.div>

                {/* Social Media Buttons */}
                <motion.div
                  className="flex flex-wrap items-center justify-center gap-3"
                  variants={buttonContainerVariants}
                >
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.id}
                      href={social.url}
                      className="flex h-[38px] w-[183px] items-center justify-center gap-[7px] rounded-[8px] bg-[#06763F] px-3 text-white"
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      custom={socialButtonHoverVariants}
                    >
                      <div className="flex h-[18px] w-[18px] items-center justify-center">
                        {social.platform === 'instagram' ? (
                          <InstagramIcon className="size-10" />
                        ) : social.platform === 'youtube' ? (
                          <YoutubeIcon className="size-10" />
                        ) : social.platform === 'facebook' ? (
                          <FacebookIcon className="size-10" />
                        ) : (
                          <FaTiktok className="size-10" />
                        )}
                      </div>
                      <span className="font-raleway text-base font-semibold leading-[1.75]">
                        {social.username}
                      </span>
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Tablet Layout */}
          <div className="hidden md:block xl:hidden">
            <div className="flex flex-col items-center justify-center gap-16 sm:px-10 xl:px-0">
              {/* Background Image */}
              <motion.div
                className="h-[302px] w-[292px] flex-shrink-0 overflow-hidden bg-gray-200"
                variants={socialImageVariants}
              >
                {mainPage.socialBackgroundImage &&
                  typeof mainPage.socialBackgroundImage === 'object' && (
                    <Image
                      src={getMediaUrl(mainPage.socialBackgroundImage.url)}
                      alt="Social Media Background"
                      width={292}
                      height={302}
                      className="h-full w-full object-cover"
                    />
                  )}
              </motion.div>

              {/* Content Section */}
              <motion.div className="w-full space-y-6" variants={slideUpVariants}>
                {/* Text Content */}
                <motion.div className="space-y-2.5" variants={headerTextVariants}>
                  <motion.p
                    className="font-raleway text-xl font-bold leading-[1.2] text-[#D16E2B]"
                    variants={slideUpVariants}
                  >
                    {mainPage.socialSectionTitle}
                  </motion.p>
                  <div className="space-y-2.5">
                    <motion.h2
                      className="w-[502px] font-raleway text-[36px] font-semibold leading-[1.28] text-[#1D1D1D]"
                      variants={slideUpVariants}
                    >
                      {mainPage.socialTitle}
                    </motion.h2>
                    <motion.p
                      className="font-raleway text-base leading-[1.75] text-[#1D1D1D]"
                      variants={slideUpVariants}
                    >
                      {mainPage.socialDescription}
                    </motion.p>
                  </div>
                </motion.div>

                {/* Social Media Buttons */}
                <motion.div className="flex items-center gap-11" variants={buttonContainerVariants}>
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.id}
                      href={social.url}
                      className="flex h-[38px] w-[183px] items-center justify-center gap-[7px] rounded-[8px] bg-[#06763F] px-3 text-white"
                      variants={socialButtonHoverVariants}
                      initial="rest"
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <div className="flex h-[18px] w-[18px] items-center justify-center">
                        {social.platform === 'instagram' ? (
                          <InstagramIcon className="size-10" />
                        ) : social.platform === 'youtube' ? (
                          <YoutubeIcon className="size-10" />
                        ) : social.platform === 'facebook' ? (
                          <FacebookIcon className="size-10" />
                        ) : (
                          <FaTiktok className="size-10" />
                        )}
                      </div>
                      <span className="font-raleway text-base font-semibold leading-[1.75]">
                        {social.username}
                      </span>
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden xl:block">
            <div className="flex items-center justify-center gap-16">
              {/* Background Image */}
              <motion.div
                className="h-[447px] w-[433px] flex-shrink-0 overflow-hidden bg-gray-200"
                variants={slideLeftVariants}
              >
                {mainPage.socialBackgroundImage &&
                  typeof mainPage.socialBackgroundImage === 'object' && (
                    <Image
                      src={getMediaUrl(mainPage.socialBackgroundImage.url)}
                      alt="Social Media Background"
                      width={433}
                      height={447}
                      className="h-full w-full object-cover"
                    />
                  )}
              </motion.div>

              {/* Content Section */}
              <motion.div className="w-full space-y-[25px]" variants={slideRightVariants}>
                {/* Text Content */}
                <motion.div className="space-y-[23px]" variants={headerTextVariants}>
                  <motion.p
                    className="font-raleway text-xl font-bold leading-[1.2] text-[#D16E2B]"
                    variants={slideUpVariants}
                  >
                    {mainPage.socialSectionTitle}
                  </motion.p>
                  <div className="space-y-2.5">
                    <motion.h2
                      className="w-full font-raleway text-[36px] font-semibold leading-[1.28] text-[#1D1D1D]"
                      variants={slideUpVariants}
                    >
                      {mainPage.socialTitle}
                    </motion.h2>
                    <motion.p
                      className="font-raleway text-base leading-[1.75] text-[#1D1D1D]"
                      variants={slideUpVariants}
                    >
                      {mainPage.socialDescription}
                    </motion.p>
                  </div>
                </motion.div>

                {/* Social Media Buttons */}
                <motion.div className="flex items-center gap-11" variants={buttonContainerVariants}>
                  {mainPage.socialLinks?.map((social) => (
                    <motion.a
                      key={social.id}
                      href={social.url}
                      className="flex h-[38px] w-[183px] items-center justify-center gap-[7px] rounded-[8px] bg-[#06763F] px-3 text-white transition-colors hover:bg-[#055a2f]"
                      variants={socialButtonHoverVariants}
                      initial="rest"
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <div className="flex h-[18px] w-[18px] items-center justify-center">
                        {social.platform === 'instagram' ? (
                          <InstagramIcon className="size-10" />
                        ) : social.platform === 'youtube' ? (
                          <YoutubeIcon className="size-10" />
                        ) : social.platform === 'facebook' ? (
                          <FacebookIcon className="size-10" />
                        ) : (
                          <FaTiktok className="size-10" />
                        )}
                      </div>
                      <span className="font-raleway text-base font-semibold leading-[1.75]">
                        {social.username}
                      </span>
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
