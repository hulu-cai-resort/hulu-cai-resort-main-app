'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface HeroSectionProps {
  eventsPage: any
}

export default function HeroSection({ eventsPage }: HeroSectionProps) {
  return (
    <section className="relative bg-gradient-to-r from-green-800 to-green-600 text-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">Reservasi</h1>
          <p className="mx-auto mb-8 max-w-4xl text-xl md:text-2xl">
            Panduan lengkap untuk reservasi dan booking Camp Hulu Cai
          </p>
        </motion.div>
      </div>
    </section>
  )
}
