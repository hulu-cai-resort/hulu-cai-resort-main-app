'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Ban } from 'lucide-react'

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

const prohibitions = [
  'Dilarang Merokok',
  'Dilarang Merokok',
  'Dilarang Merokok',
  'Dilarang Merokok',
  'Dilarang Merokok',
  'Dilarang Merokok',
  'Dilarang Merokok',
  'Dilarang Merokok',
  'Dilarang Merokok',
  'Dilarang Merokok',
  'Dilarang Merokok',
  'Dilarang Merokok',
]

export default function TermsConditionSection() {
  return (
    <section className="bg-gray-50 px-4 py-16 sm:px-8 md:py-24 xl:px-0">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-lg font-bold text-[#D16E2B] md:text-xl">Terms & Condition</h2>
          <h3 className="mb-6 text-2xl font-semibold text-gray-800 md:text-3xl lg:text-4xl">
            Peraturan apa saja yang berlaku di Camp Hulu Cai
          </h3>
          <p className="mx-auto max-w-4xl text-base text-gray-600 md:text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex e
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
        >
          {prohibitions.map((prohibition, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg md:h-24 md:w-24">
                <Ban className="h-12 w-12 text-red-600 md:h-16 md:w-16" strokeWidth={2} />
              </div>
              <p className="max-w-[150px] text-sm font-medium text-gray-800 md:text-base">
                {prohibition}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
