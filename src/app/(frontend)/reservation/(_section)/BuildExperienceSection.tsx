'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Globe, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Media, ReservationFaqPage } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import Image from 'next/image'

export default function BuildExperienceSection({
  buildExperienceSection,
}: {
  buildExperienceSection: ReservationFaqPage['reservationCTA']
}) {
  const router = useRouter()
  return (
    <section className="bg-gray-50 px-4 py-16 sm:px-8 md:py-24 xl:px-0">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-green-800 to-green-600"
        >
          {/* Background image */}
          <div className="absolute inset-0 bg-cover bg-center">
            <Image
              src={getMediaUrl((buildExperienceSection?.backgroundImage as Media)?.url || '')}
              alt="Hero Background"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 z-20 bg-black/60"></div>
          </div>

          {/* Content */}
          <div className="relative z-20 px-8 py-12 md:px-16 md:py-16">
            <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
              <div className="flex items-center gap-6">
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-white md:h-20 md:w-20">
                  <Image
                    src={getMediaUrl((buildExperienceSection?.icon as Media)?.url || '')}
                    alt="Icon"
                    width={100}
                    height={100}
                    className="size-20 rounded-full object-cover"
                  />
                </div>
                <div className="text-white">
                  <h3 className="mb-2 text-base font-normal md:text-lg">
                    {buildExperienceSection?.title}
                  </h3>
                  <h2 className="text-xl font-semibold md:text-2xl">
                    {buildExperienceSection?.subtitle}
                  </h2>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 rounded-2xl bg-[#D16E2B] px-8 py-3 font-semibold text-white transition-colors duration-300 hover:bg-[#B85A23] md:px-10 md:py-4"
                onClick={() => router.push('/form')}
              >
                <span className="text-sm md:text-base">{buildExperienceSection?.buttonText}</span>
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
