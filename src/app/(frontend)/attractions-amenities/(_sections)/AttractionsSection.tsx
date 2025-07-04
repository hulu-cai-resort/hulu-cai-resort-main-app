'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  sectionContainerVariants,
  gridContainerVariants,
  gridCardVariants,
  cardContentVariants,
} from '@/utilities/variants'

// Dummy data based on Figma design
const attractionsData = [
  {
    id: 1,
    title: 'Tiket Masuk Resort',
    location: 'Hills Babakan',
    ageRequirement: '-',
    terms: 'Free untuk pengunjung yang menginap dan menyewa fasilitas',
    price: 'IDR 25.000',
    priceUnit: 'per pax',
    image: '/media/attraction-1.jpg',
  },
  {
    id: 2,
    title: 'Kolam Renang Babakan',
    location: 'Hills Babakan',
    ageRequirement: 'Ramah Anak',
    terms: 'Free untuk pengunjung yang menginap dan menyewa fasilitas',
    price: 'Free',
    priceUnit: 'per pax',
    image: '/media/attraction-2.jpg',
  },
  {
    id: 3,
    title: 'Kids Zone',
    location: 'Hills Babakan',
    ageRequirement: 'Ramah Anak',
    terms: 'Free untuk pengunjung yang menginap dan menyewa fasilitas',
    price: 'Free',
    priceUnit: 'per pax',
    image: '/media/attraction-3.jpg',
  },
  {
    id: 4,
    title: 'Flying Fox Kids',
    location: 'Hills Babakan',
    ageRequirement: 'Ramah Anak',
    terms: 'S&K: -',
    price: 'Rp 35.000',
    priceUnit: 'per pax',
    image: '/media/attraction-4.jpg',
  },
  {
    id: 5,
    title: 'Taman Layla',
    location: 'Hills Babakan',
    ageRequirement: 'Ramah Anak',
    terms: 'Free untuk pengunjung yang menginap dan menyewa fasilitas',
    price: 'Free',
    priceUnit: 'per pax',
    image: '/media/attraction-5.jpg',
  },
]

interface AttractionCard {
  id: number
  title: string
  location: string
  ageRequirement: string
  terms: string
  price: string
  priceUnit: string
  image: string
}

export default function AttractionsSection() {
  return (
    <>
      <div className="w-full bg-white">
        <div
          id="attractions"
          className="mx-auto flex w-full flex-col items-stretch gap-3 px-5 py-8 text-center md:max-w-2xl md:px-0 lg:max-w-7xl lg:py-16"
        >
          <h1 className="font-raleway text-4xl font-medium leading-[1.278] text-[#1D1D1D]">
            Attraction
          </h1>
          <p className="text-sm font-medium text-border">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>

      <motion.section
        className="bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionContainerVariants}
      >
        <div className="flex justify-center px-5 pb-8 lg:px-10 lg:pb-16">
          <div className="w-full md:max-w-full lg:max-w-7xl">
            {/* Mobile Layout */}
            <motion.div className="flex flex-col gap-6 md:hidden" variants={gridContainerVariants}>
              {attractionsData.map((attraction, index) => (
                <motion.div
                  key={attraction.id}
                  className="mx-auto w-full"
                  variants={gridCardVariants}
                >
                  <MobileAttractionCard attraction={attraction} />
                  {index < attractionsData.length - 1 && (
                    <div className="mx-auto mt-6 h-px w-full max-w-[348px] bg-[#CEDADF]" />
                  )}
                </motion.div>
              ))}
            </motion.div>

            {/* Tablet Layout */}
            <motion.div
              className="hidden md:flex md:flex-row md:flex-wrap md:justify-center md:gap-5 xl:hidden"
              variants={gridContainerVariants}
            >
              {attractionsData.map((attraction) => (
                <motion.div key={attraction.id} className="w-full px-4" variants={gridCardVariants}>
                  <TabletAttractionCard attraction={attraction} />
                </motion.div>
              ))}
            </motion.div>

            {/* Desktop Layout */}
            <motion.div
              className="hidden xl:flex xl:flex-col xl:gap-8"
              variants={gridContainerVariants}
            >
              {attractionsData.map((attraction) => (
                <motion.div key={attraction.id} className="w-full" variants={gridCardVariants}>
                  <DesktopAttractionCard attraction={attraction} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>
    </>
  )
}

// Mobile Card Component
function MobileAttractionCard({ attraction }: { attraction: AttractionCard }) {
  return (
    <div className="flex w-full flex-col items-center gap-3">
      {/* Image */}
      <div className="h-[218px] w-full overflow-hidden rounded-[20px] bg-gray-200">
        <Image
          src={attraction.image}
          alt={attraction.title}
          width={348}
          height={218}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <motion.div
        className="flex w-full flex-col items-center gap-3"
        variants={cardContentVariants}
      >
        {/* Title */}
        <h3 className="font-raleway w-full text-[18px] font-semibold leading-[1.33] text-[#1D1D1D]">
          {attraction.title}
        </h3>

        {/* Features */}
        <div className="flex w-full flex-col">
          <FeatureItem icon="location" text={`Letak: ${attraction.location}`} />
          <FeatureItem icon="age" text={`Ketentuan Usia: ${attraction.ageRequirement}`} />
          <FeatureItem icon="terms" text={attraction.terms} />
        </div>

        {/* Price */}
        <div className="flex w-full flex-col items-end">
          <p className="font-raleway text-[18px] font-bold leading-[1.67] text-[#1D1D1D]">
            {attraction.price}
          </p>
          <p className="font-raleway w-full text-right text-[12px] font-normal leading-[2] text-[#1D1D1D]">
            {attraction.priceUnit}
          </p>
        </div>
      </motion.div>
    </div>
  )
}

// Tablet Card Component
function TabletAttractionCard({ attraction }: { attraction: AttractionCard }) {
  return (
    <div className="flex h-[348px] flex-row items-center gap-6 rounded-[20px] border-[0.5px] border-[#B5B5B5] bg-white p-0 pr-6 shadow-[4px_4px_20px_0px_rgba(245,247,253,1)]">
      {/* Image */}
      <div className="h-[348px] w-1/2 flex-shrink-0 overflow-hidden rounded-l-[20px] bg-gray-200">
        <Image
          src={attraction.image}
          alt={attraction.title}
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
        {/* Title */}
        <h3 className="font-raleway w-full text-[36px] font-bold leading-[1.28] text-[#1D1D1D]">
          {attraction.title}
        </h3>

        {/* Features */}
        <div className="flex w-full flex-col">
          <FeatureItem icon="location" text={`Letak: ${attraction.location}`} />
          <FeatureItem icon="age" text={`Ketentuan Usia: ${attraction.ageRequirement}`} />
          <FeatureItem icon="terms" text={attraction.terms} />
        </div>

        {/* Price */}
        <div className="flex w-full flex-col items-end">
          <p className="font-raleway text-[25px] font-bold leading-[1.17] text-[#1D1D1D]">
            {attraction.price}
          </p>
          <p className="font-raleway text-right text-[13px] font-medium leading-[1.17] text-[#1D1D1D]">
            {attraction.priceUnit}
          </p>
        </div>
      </motion.div>
    </div>
  )
}

// Desktop Card Component
function DesktopAttractionCard({ attraction }: { attraction: AttractionCard }) {
  return (
    <div className="flex flex-row items-center gap-16 rounded-[20px] border-[0.5px] border-[#B5B5B5] bg-white p-0 pr-16 shadow-[4px_4px_20px_0px_rgba(245,247,253,1)]">
      {/* Image */}
      <div className="h-[332px] w-[564px] flex-shrink-0 overflow-hidden rounded-l-[20px] bg-gray-200">
        <Image
          src={attraction.image}
          alt={attraction.title}
          width={564}
          height={332}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <motion.div
        className="flex w-[588px] flex-col items-end gap-3"
        variants={cardContentVariants}
      >
        {/* Title */}
        <h3 className="font-raleway w-full text-[36px] font-bold leading-[1.28] text-[#000000]">
          {attraction.title}
        </h3>

        {/* Features */}
        <div className="flex w-full flex-col">
          <FeatureItem icon="location" text={`Letak: ${attraction.location}`} />
          <FeatureItem icon="age" text={`Ketentuan Usia: ${attraction.ageRequirement}`} />
          <FeatureItem icon="terms" text={attraction.terms} />
        </div>

        {/* Price */}
        <div className="flex flex-col items-end">
          <p className="font-raleway text-[24px] font-bold leading-[1.42] text-[#000000]">
            {attraction.price}
          </p>
          <p className="font-raleway text-right text-[12px] font-normal leading-[2] text-[#000000]">
            {attraction.priceUnit}
          </p>
        </div>
      </motion.div>
    </div>
  )
}

// Feature Item Component
function FeatureItem({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-center gap-3 py-2 md:gap-4 md:py-[6px] lg:py-2">
      <div className="h-2 w-2 flex-shrink-0 rounded-full bg-[#416340] md:h-2 md:w-2 xl:h-4 xl:w-4" />
      <p className="font-raleway flex-1 text-[16px] font-normal leading-[1.5] text-[#1D1D1D] md:leading-[1.75]">
        {text}
      </p>
    </div>
  )
}
