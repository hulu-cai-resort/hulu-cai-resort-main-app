'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Ban } from 'lucide-react'
import { Media, ReservationFaqPage } from '@/payload-types'
import Image from 'next/image'
import { getMediaUrl } from '@/utilities/getMediaUrl'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export default function TermsConditionSection({
  termsConditionSection,
}: {
  termsConditionSection: ReservationFaqPage['termsSection']
}) {
  return (
    <section className="bg-gray-50 px-4 py-16 sm:px-8 md:py-24 xl:px-0">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-lg font-bold text-[#D16E2B] md:text-xl">
            {termsConditionSection?.title}
          </h2>
          <h3 className="mb-6 text-2xl font-semibold text-gray-800 md:text-3xl lg:text-4xl">
            {termsConditionSection?.subtitle}
          </h3>
          <p className="mx-auto max-w-4xl text-base text-gray-600 md:text-lg">
            {termsConditionSection?.description}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          viewport={{ once: true, amount: 0.2 }}
          whileInView="visible"
          className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
        >
          {termsConditionSection?.rules?.map((rule, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg md:h-24 md:w-24">
                <Image
                  src={getMediaUrl((rule?.icon as Media)?.url || '')}
                  alt="Icon"
                  width={100}
                  height={100}
                  className="size-20 rounded-full object-cover"
                />
              </div>
              <p className="max-w-[150px] text-sm font-medium text-gray-800 md:text-base">
                {rule?.title}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
