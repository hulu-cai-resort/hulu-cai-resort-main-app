'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { Media, ReservationFaqPage } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import Image from 'next/image'
import {
  containerVariants,
  itemVariants,
  buttonContainerVariants,
  buttonVariants,
  scaleVariants,
} from '@/utilities/variants'

export default function NarahubungSection({
  narahubungSection,
}: {
  narahubungSection: ReservationFaqPage['contactSection']
}) {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* derive first three images for ease */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col items-center gap-16 lg:gap-16 xl:flex-row xl:justify-center xl:gap-10"
        >
          {/* Images */}
          <motion.div variants={itemVariants} className="flex-shrink-0">
            <motion.div variants={scaleVariants} className="relative">
              {/* Mobile: 3 columns layout */}
              <div className="grid h-44 w-[278px] grid-cols-3 gap-1 md:hidden">
                {[0, 1, 2].map((idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: idx * 0.15 }}
                    className={idx === 0 || idx === 2 ? 'mt-[30px]' : ''}
                  >
                    <Image
                      src={getMediaUrl(
                        (narahubungSection?.images?.[idx]?.image as Media)?.url || '',
                      )}
                      alt="Image"
                      width={86}
                      height={145}
                      className="h-[145px] w-[86px] rounded-2xl object-cover"
                    />
                  </motion.div>
                ))}
              </div>

              {/* Tablet/Desktop: 3 columns layout */}
              <div className="hidden h-[276px] w-[438px] grid-cols-3 gap-2 md:grid">
                {[0, 1, 2].map((idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: idx * 0.15 }}
                    className={idx === 0 || idx === 2 ? 'mt-[47px]' : ''}
                  >
                    <Image
                      src={getMediaUrl(
                        (narahubungSection?.images?.[idx]?.image as Media)?.url || '',
                      )}
                      alt="Image"
                      width={136}
                      height={227}
                      className="h-[227px] w-[136px] rounded-2xl object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            variants={itemVariants}
            className="w-full max-w-[349px] text-left md:max-w-[689px]"
          >
            {/* Header */}
            <div className="mb-6">
              <h2 className="mb-6 text-lg font-semibold text-[#D16E2B] md:text-xl md:font-bold">
                {narahubungSection?.title}
              </h2>
              <div className="space-y-3">
                <h3 className="text-4xl font-semibold leading-[1.28] text-gray-800">
                  {narahubungSection?.subtitle}
                </h3>
                <p className="text-sm leading-[1.43] text-gray-800 md:text-base md:leading-[1.75]">
                  {narahubungSection?.description}
                </p>
              </div>
            </div>

            {/* WhatsApp Buttons */}
            <motion.div
              variants={buttonContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center md:justify-start"
            >
              {narahubungSection?.contacts?.map((contact, idx) => (
                <motion.button
                  key={idx}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="mx-auto flex h-[38px] w-[183px] items-center justify-center gap-2 rounded-lg bg-[#06763F] font-semibold text-white transition-colors duration-300 hover:bg-[#055530]"
                  onClick={() => window.open(contact?.link || '', '_blank')}
                >
                  <MessageCircle className="h-[15px] w-[15px]" strokeWidth={2} />
                  <span className="text-base leading-[1.75]">{contact?.label}</span>
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
