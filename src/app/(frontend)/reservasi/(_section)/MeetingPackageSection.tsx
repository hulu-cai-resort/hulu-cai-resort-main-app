'use client'

import React from 'react'
import { motion } from 'framer-motion'

export default function MeetingPackageSection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="mb-6 text-2xl font-semibold text-gray-800 md:text-3xl lg:text-4xl">
            Meeting Package Section
          </h2>
          <p className="mx-auto max-w-4xl text-base text-gray-600 md:text-lg">
            This section can display meeting packages and related information.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
