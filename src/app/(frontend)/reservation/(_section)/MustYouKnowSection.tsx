'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Users, Clock, Bath, Utensils } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
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

const infoCards = [
  {
    icon: Users,
    title: 'Jumlah Pengunjung',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor iis nisi ut aliquip ex e',
  },
  {
    icon: Clock,
    title: 'Aktivitas Pengunjung',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor iis nisi ut aliquip ex e',
  },
  {
    icon: Bath,
    title: 'Pengaturan Kamar',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor iis nisi ut aliquip ex e',
  },
  {
    icon: Utensils,
    title: 'Pengaturan Makanan',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor iis nisi ut aliquip ex e',
  },
]

export default function MustYouKnowSection() {
  return (
    <section className="grid min-h-screen place-items-center bg-white px-4 pt-24 sm:px-8 md:py-0 xl:px-0">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-lg font-bold text-[#D16E2B] md:text-xl">Must You Know</h2>
          <h3 className="mb-6 text-2xl font-semibold text-gray-800 md:text-3xl lg:text-4xl">
            Informasi apa saja yang perlu disiapkan?
          </h3>
          <p className="mx-auto max-w-4xl text-base text-gray-600 md:text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12"
        >
          {infoCards.map((card, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex gap-6 rounded-lg border-l-4 border-[#D16E2B] bg-white p-6 shadow-md"
            >
              <div className="flex-shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
                  <card.icon className="h-6 w-6 text-black" strokeWidth={2} />
                </div>
              </div>
              <div className="flex-1">
                <h4 className="mb-2 text-lg font-semibold text-gray-800 md:text-xl">
                  {card.title}
                </h4>
                <p className="text-sm text-gray-600 md:text-base">{card.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
