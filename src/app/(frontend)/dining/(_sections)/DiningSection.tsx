'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  sectionContainerVariants,
  headerTextVariants,
  gridContainerVariants,
  gridCardVariants,
  cardContentVariants,
} from '@/utilities/variants'

// Dummy data with 5 dining venues as requested
const diningData = [
  {
    id: 1,
    title: 'Saung Sawo',
    location: 'Hills Babakan',
    standardCapacity: '40',
    maxCapacity: '60',
    image: '/media/dining-1.jpg',
  },
  {
    id: 2,
    title: 'Teras Bale Sawo',
    location: 'Hills Babakan',
    standardCapacity: '40',
    maxCapacity: '60',
    image: '/media/dining-2.jpg',
  },
  {
    id: 3,
    title: 'Tenda atau Saung Pakis',
    location: 'Hills Babakan',
    standardCapacity: '40',
    maxCapacity: '60',
    image: '/media/dining-3.jpg',
  },
  {
    id: 4,
    title: 'Teras Bale Negla',
    location: 'Hills Babakan',
    standardCapacity: '40',
    maxCapacity: '60',
    image: '/media/dining-4.jpg',
  },
  {
    id: 5,
    title: 'Saung Kuliner',
    location: 'Valley Cibedug',
    standardCapacity: '40',
    maxCapacity: '60',
    image: '/media/dining-5.jpg',
  },
]

interface DiningCard {
  id: number
  title: string
  location: string
  standardCapacity: string
  maxCapacity: string
  image: string
}

export default function DiningSection() {
  return (
    <motion.section
      className="bg-[#F5F7FA] py-10 lg:py-[64px]"
      initial="hidden"
      id="dining"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={sectionContainerVariants}
    >
      <div className="mx-auto flex w-full justify-center">
        <div className="w-full px-5 pb-8 md:max-w-[1028px] md:px-8 lg:max-w-[1280px] lg:px-10 lg:pb-16 xl:px-0">
          {/* Header Section - Hidden on tablet, visible on mobile and desktop */}
          <motion.div
            className="mb-6 w-full text-center lg:mb-16 lg:block"
            variants={headerTextVariants}
          >
            <h2 className="mb-3 text-[28px] font-semibold leading-[1.07] text-[#1D1D1D] lg:text-[36px] lg:leading-[1.28]">
              Dining Area
            </h2>
            <p className="text-[14px] leading-[1.43] text-[#4F4F53] lg:text-[16px] lg:leading-[1.75]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
          </motion.div>
          {/* Mobile Layout - Vertical Stack */}
          <motion.div className="flex flex-col gap-8 md:hidden" variants={gridContainerVariants}>
            {diningData.map((dining, index) => (
              <motion.div key={dining.id} className="w-full" variants={gridCardVariants}>
                <MobileDiningCard dining={dining} />
                {index < diningData.length - 1 && (
                  <div className="mx-auto mt-8 h-0.5 w-full bg-[#CACCCF]" />
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Tablet Layout - 2x2 Grid */}
          <motion.div
            className="hidden md:flex md:flex-col md:items-center md:justify-center md:gap-5 xl:hidden"
            variants={gridContainerVariants}
          >
            {diningData.map((dining) => (
              <motion.div key={dining.id} className="w-full" variants={gridCardVariants}>
                <TabletDiningCard dining={dining} />
              </motion.div>
            ))}
          </motion.div>

          {/* Desktop Layout - Single Column */}
          <motion.div
            className="hidden xl:flex xl:flex-col xl:gap-8"
            variants={gridContainerVariants}
          >
            {diningData.map((dining) => (
              <motion.div key={dining.id} className="w-full" variants={gridCardVariants}>
                <DesktopDiningCard dining={dining} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

// Mobile Card Component
function MobileDiningCard({ dining }: { dining: DiningCard }) {
  return (
    <div className="flex flex-col gap-3">
      {/* Image */}
      <div className="h-[218px] w-full overflow-hidden rounded-[20px] bg-gray-200">
        <Image
          src={dining.image}
          alt={dining.title}
          width={346}
          height={218}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <motion.div className="flex w-full flex-col gap-3" variants={cardContentVariants}>
        <h3 className="text-[18px] font-semibold leading-[1.33] text-[#1D1D1D]">{dining.title}</h3>

        {/* Features */}
        <div className="flex w-full flex-col gap-1">
          <div className="flex items-center gap-4 py-2">
            <div className="h-2 w-2 rounded-full bg-[#416340]" />
            <span className="text-[16px] leading-[1.5] text-[#1D1D1D]">
              Letak Area: {dining.location}
            </span>
          </div>
          <div className="flex items-center gap-4 py-2">
            <div className="h-2 w-2 rounded-full bg-[#416340]" />
            <span className="text-[16px] leading-[1.5] text-[#1D1D1D]">
              Kapasitas Standar: {dining.standardCapacity}
            </span>
          </div>
          <div className="flex items-center gap-4 py-2">
            <div className="h-2 w-2 rounded-full bg-[#416340]" />
            <span className="text-[16px] leading-[1.5] text-[#1D1D1D]">
              Kapasitas Maksimal: {dining.maxCapacity}
            </span>
          </div>
        </div>

        {/* Button */}
        <button className="mt-2 rounded-lg bg-[#06763F] px-3 py-2 text-[12px] font-semibold leading-[1.33] text-white">
          Link Menu
        </button>
      </motion.div>
    </div>
  )
}

// Tablet Card Component
function TabletDiningCard({ dining }: { dining: DiningCard }) {
  return (
    <div className="flex h-[348px] items-center justify-center gap-6 rounded-[20px] border-[0.5px] border-[#B5B5B5] bg-white p-0 pr-12 shadow-[4px_4px_20px_0px_rgba(245,247,253,1)]">
      {/* Image */}
      <div className="h-[348px] w-1/2 flex-shrink-0 overflow-hidden rounded-l-[20px] bg-gray-200">
        <Image
          src={dining.image}
          alt={dining.title}
          width={446}
          height={348}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <motion.div
        className="flex w-1/2 flex-col justify-center gap-3"
        variants={cardContentVariants}
      >
        <h3 className="text-[36px] font-bold leading-[1.28] text-[#1D1D1D]">{dining.title}</h3>

        {/* Features */}
        <div className="flex flex-col">
          <div className="flex items-center gap-3 py-1.5">
            <div className="h-2 w-2 rounded-full bg-[#416340]" />
            <span className="text-[16px] leading-[1.75] text-[#1D1D1D]">
              Letak Area: {dining.location}
            </span>
          </div>
          <div className="flex items-center gap-3 py-1.5">
            <div className="h-2 w-2 rounded-full bg-[#416340]" />
            <span className="text-[16px] leading-[1.75] text-[#1D1D1D]">
              Kapasitas Standar: {dining.standardCapacity}
            </span>
          </div>
          <div className="flex items-center gap-3 py-1.5">
            <div className="h-2 w-2 rounded-full bg-[#416340]" />
            <span className="text-[16px] leading-[1.75] text-[#1D1D1D]">
              Kapasitas Maksimal: {dining.maxCapacity}
            </span>
          </div>
        </div>

        {/* Button */}
        <button className="mt-2 rounded-lg bg-[#06763F] px-4 py-2.5 text-[12px] leading-[1.33] text-white">
          Link Menu
        </button>
      </motion.div>
    </div>
  )
}

// Desktop Card Component
function DesktopDiningCard({ dining }: { dining: DiningCard }) {
  return (
    <div className="flex h-[332px] items-center gap-16 rounded-[20px] border-[0.5px] border-[#B5B5B5] bg-white p-0 pr-16 shadow-[4px_4px_20px_0px_rgba(245,247,253,1)]">
      {/* Image */}
      <div className="h-[332px] w-[564px] flex-shrink-0 overflow-hidden rounded-l-[20px] bg-gray-200">
        <Image
          src={dining.image}
          alt={dining.title}
          width={564}
          height={332}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <motion.div className="flex flex-1 flex-col gap-4" variants={cardContentVariants}>
        <h3 className="text-[36px] font-bold leading-[1.28] text-[#000000]">{dining.title}</h3>

        {/* Features */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4 py-2">
            <div className="h-4 w-4 rounded-full bg-[#416340]" />
            <span className="text-[18px] leading-[1.67] text-[#1D1D1D]">
              Letak: {dining.location}
            </span>
          </div>
          <div className="flex items-center gap-4 py-2">
            <div className="h-4 w-4 rounded-full bg-[#416340]" />
            <span className="text-[16px] leading-[1.5] text-[#1D1D1D]">
              Kapasitas Standar: {dining.standardCapacity}
            </span>
          </div>
          <div className="flex items-center gap-4 py-2">
            <div className="h-4 w-4 rounded-full bg-[#416340]" />
            <span className="text-[16px] leading-[1.5] text-[#1D1D1D]">
              Kapasitas Maksimal: {dining.maxCapacity}
            </span>
          </div>
        </div>

        {/* Button */}
        <button className="mt-2 rounded-lg bg-[#06763F] px-5 py-3 text-[16px] font-semibold leading-[1.75] text-white">
          Link Menu
        </button>
      </motion.div>
    </div>
  )
}
