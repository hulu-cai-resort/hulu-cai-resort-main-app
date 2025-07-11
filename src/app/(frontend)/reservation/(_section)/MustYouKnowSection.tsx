'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Users, Clock, Bath, Utensils } from 'lucide-react'
import { ReservationFaqPage } from '@/payload-types'

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

// Add a mapping from icon identifiers coming from CMS to Lucide icon components
const iconMap: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  users: Users,
  clock: Clock,
  bath: Bath,
  salad: Utensils,
}

export default function MustYouKnowSection({
  mustKnowSection,
}: {
  mustKnowSection: ReservationFaqPage['mustKnowSection']
}) {
  return (
    <section className="grid min-h-screen place-items-center bg-white px-4 pt-24 sm:px-8 md:py-0 xl:px-0">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-lg font-bold text-[#D16E2B] md:text-xl">
            {mustKnowSection?.title}
          </h2>
          <h3 className="mb-6 text-2xl font-semibold text-gray-800 md:text-3xl lg:text-4xl">
            {mustKnowSection?.subtitle}
          </h3>
          <p className="mx-auto max-w-4xl text-base text-gray-600 md:text-lg">
            {mustKnowSection?.description}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12"
        >
          {mustKnowSection?.infoCards?.map((card, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex gap-6 rounded-lg border-l-4 border-[#D16E2B] bg-white p-6 shadow-md"
            >
              <div className="flex flex-shrink-0 items-center justify-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
                  {(() => {
                    const IconComponent = iconMap[card.icon] || Users
                    return <IconComponent className="h-8 w-8 text-black" strokeWidth={2} />
                  })()}
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
