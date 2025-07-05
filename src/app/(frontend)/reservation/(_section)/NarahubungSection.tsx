'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

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

export default function NarahubungSection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-16 lg:gap-16 xl:flex-row xl:justify-center xl:gap-10"
        >
          {/* Images - Mobile: on top, Tablet/Desktop: on left */}
          <motion.div variants={itemVariants} className="flex-shrink-0">
            <div className="relative">
              {/* Mobile: 3 columns layout */}
              <div className="grid h-44 w-[278px] grid-cols-3 gap-1 md:hidden">
                <div
                  className="rounded-2xl bg-gradient-to-br from-gray-300 to-gray-400 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=400&h=300&fit=crop')`,
                    marginTop: '30px',
                    height: '144px',
                    width: '86px',
                  }}
                ></div>
                <div
                  className="rounded-2xl bg-gradient-to-br from-gray-300 to-gray-400 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=400&h=300&fit=crop')`,
                    height: '145px',
                    width: '86px',
                  }}
                ></div>
                <div
                  className="rounded-2xl bg-gradient-to-br from-gray-300 to-gray-400 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1586348943529-beaae6c28db9?q=80&w=400&h=300&fit=crop')`,
                    marginTop: '30px',
                    height: '145px',
                    width: '86px',
                  }}
                ></div>
              </div>

              {/* Tablet/Desktop: 3 columns layout */}
              <div className="hidden h-[276px] w-[438px] grid-cols-3 gap-2 md:grid">
                <div
                  className="rounded-2xl bg-gradient-to-br from-gray-300 to-gray-400 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=400&h=300&fit=crop')`,
                    marginTop: '47px',
                    height: '227px',
                    width: '136px',
                  }}
                ></div>
                <div
                  className="rounded-2xl bg-gradient-to-br from-gray-300 to-gray-400 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=400&h=300&fit=crop')`,
                    height: '229px',
                    width: '136px',
                  }}
                ></div>
                <div
                  className="rounded-2xl bg-gradient-to-br from-gray-300 to-gray-400 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1586348943529-beaae6c28db9?q=80&w=400&h=300&fit=crop')`,
                    marginTop: '47px',
                    height: '229px',
                    width: '136px',
                  }}
                ></div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            variants={itemVariants}
            className="w-full max-w-[349px] text-left md:max-w-[689px]"
          >
            {/* Header */}
            <div className="mb-6">
              <h2 className="mb-6 text-lg font-semibold text-[#D16E2B] md:text-xl md:font-bold">
                Narahubung
              </h2>
              <div className="space-y-3">
                <h3 className="text-4xl font-semibold leading-[1.28] text-gray-800">
                  More Than a Trip
                </h3>
                <p className="text-sm leading-[1.43] text-gray-800 md:text-base md:leading-[1.75]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,Lorem ipsum
                  dolor
                </p>
              </div>
            </div>

            {/* WhatsApp Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center md:justify-start">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mx-auto flex h-[38px] w-[183px] items-center justify-center gap-2 rounded-lg bg-[#06763F] font-semibold text-white transition-colors duration-300 hover:bg-[#055530]"
              >
                <MessageCircle className="h-[15px] w-[15px]" strokeWidth={2} />
                <span className="text-base leading-[1.75]">WA Admin1</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mx-auto flex h-[38px] w-[183px] items-center justify-center gap-2 rounded-lg bg-[#06763F] font-semibold text-white transition-colors duration-300 hover:bg-[#055530]"
              >
                <MessageCircle className="h-[15px] w-[15px]" strokeWidth={2} />
                <span className="text-base leading-[1.75]">WA Admin2</span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
