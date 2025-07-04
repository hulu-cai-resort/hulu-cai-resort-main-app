'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import {
  sectionContainerVariants,
  headerTextVariants,
  gridContainerVariants,
  gridCardVariants,
  cardContentVariants,
} from '@/utilities/variants'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog'
import React from 'react'

// Meeting package data
const meetingPackages = [
  {
    id: 1,
    title: 'Full Board',
    subtitle: 'Ideal for individuals and small businesses',
    price: 'Rp 1.100.000',
    priceUnit: 'Per pax',
    features: ['2D1N Stay', 'Ground/Function Room', 'Welcome Drink', 'Sound System'],
    extendedFeatures: ['Screen', 'Projector', 'Flipchart', '2x Microphone'],
    buttonText: 'Lihat Detail',
    link: '/events/packages/full-board',
  },
  {
    id: 2,
    title: 'Full Board Kids Program',
    subtitle: 'Ideal for individuals and small businesses',
    price: 'Rp 500.000',
    priceUnit: 'Per pax',
    features: ['2D1N Stay', 'Ground/Function Room', 'Welcome Drink', 'Sound System'],
    extendedFeatures: ['Screen', 'Projector', 'Flipchart', '2x Microphone'],
    buttonText: 'Lihat Detail',
    link: '/events/packages/full-board-kids',
  },
  {
    id: 3,
    title: 'Full Day',
    subtitle: 'Ideal for individuals and small businesses',
    price: 'Rp 500.000',
    priceUnit: 'Per pax',
    features: ['2D1N Stay', 'Ground/Function Room', 'Welcome Drink', 'Sound System'],
    extendedFeatures: ['Screen', 'Projector', 'Flipchart', '2x Microphone'],
    buttonText: 'Lihat Detail',
    link: '/events/packages/full-day',
  },
  {
    id: 4,
    title: 'Full Day Kids Program',
    subtitle: 'Ideal for individuals and small businesses',
    price: 'Rp 250.000',
    priceUnit: 'Per pax',
    features: ['2D1N Stay', 'Ground/Function Room', 'Welcome Drink', 'Sound System'],
    extendedFeatures: ['Screen', 'Projector', 'Flipchart', '2x Microphone'],
    buttonText: 'Lihat Detail',
    link: '/events/packages/full-day-kids',
  },
]

interface MeetingPackage {
  id: number
  title: string
  subtitle: string
  price: string
  priceUnit: string
  features: string[]
  extendedFeatures: string[]
  buttonText: string
  link: string
}

// Add dummy special features for each package
const specialFeatures = [
  ['Private Barista', 'VIP Lounge Access', 'Personalized Stationery'],
  ['Kids Entertainer', 'Custom Goodie Bags'],
  ['Live Streaming Support', 'Dedicated Event Manager'],
  ['Kids Menu', 'Balloon Decoration'],
]

// Dialog content component
function PackageDialogContent({
  packageData,
  specialFeatures,
}: {
  packageData: MeetingPackage
  specialFeatures: string[]
}) {
  return (
    <div className="space-y-6">
      <DialogHeader>
        <DialogTitle>{packageData.title}</DialogTitle>
        <DialogDescription>{packageData.subtitle}</DialogDescription>
      </DialogHeader>
      <div>
        <div className="mb-2 text-lg font-semibold text-[#06763F]">All Features</div>
        <ul className="space-y-2">
          {[...packageData.features, ...packageData.extendedFeatures].map((feature, i) => (
            <li key={i} className="flex items-center gap-3">
              <span className="inline-block h-2 w-2 rounded-full bg-[#416340]" />
              <span className="text-base text-[#1D1D1D]">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div className="mb-2 text-lg font-semibold text-[#06763F]">Special Features</div>
        <ul className="space-y-2">
          {specialFeatures.map((feature, i) => (
            <li key={i} className="flex items-center gap-3">
              <span className="inline-block h-2 w-2 rounded-full bg-[#416340]" />
              <span className="text-base text-[#1D1D1D]">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// Mobile Card Component
function MobilePackageCard({
  packageData,
  dialogIndex,
  setDialogIndex,
}: {
  packageData: MeetingPackage
  dialogIndex: number | null
  setDialogIndex: (i: number | null) => void
}) {
  const idx = meetingPackages.findIndex((p) => p.id === packageData.id)
  return (
    <Dialog open={dialogIndex === idx} onOpenChange={(open) => setDialogIndex(open ? idx : null)}>
      <motion.div
        variants={gridCardVariants}
        className="w-full max-w-[347px] rounded-[20px] border-[0.5px] border-[#B5B5B5] bg-[#F5F5F5] p-6 shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05),0px_1px_4px_0px_rgba(12,12,13,0.1)]"
      >
        <motion.div variants={cardContentVariants} className="flex flex-col items-center gap-3">
          {/* Title + Description */}
          <div className="w-full max-w-[299px]">
            <h3 className="text-[18px] font-bold leading-[1.33] text-[#0A0A0A]">
              {packageData.title}
            </h3>
            <p className="text-[16px] leading-[1.5] text-[#404040]">{packageData.subtitle}</p>
          </div>
          {/* Price */}
          <div className="w-full max-w-[299px]">
            <p className="text-[28px] font-semibold leading-[1.07] text-[#0A0A0A]">
              {packageData.price}
            </p>
            <p className="text-[16px] leading-[1.5] text-[#404040]">{packageData.priceUnit}</p>
          </div>
          {/* Features */}
          <div className="w-full max-w-[299px]">
            {packageData.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-4 py-2">
                <div className="h-2 w-2 rounded-full bg-[#416340]" />
                <span className="text-[16px] leading-[1.5] text-[#1D1D1D]">{feature}</span>
              </div>
            ))}
          </div>
          {/* Button */}
          <DialogTrigger asChild>
            <button className="flex w-full max-w-[299px] items-center justify-center gap-2 rounded-lg bg-[#06763F] px-3 py-2 text-[12px] font-semibold leading-[1.33] text-white">
              {packageData.buttonText}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M6 12l4-4-4-4"
                  stroke="currentColor"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </DialogTrigger>
        </motion.div>
      </motion.div>
      <DialogContent>
        <PackageDialogContent
          packageData={packageData}
          specialFeatures={specialFeatures[idx] ?? []}
        />
      </DialogContent>
    </Dialog>
  )
}

// Tablet Card Component
function TabletPackageCard({
  packageData,
  dialogIndex,
  setDialogIndex,
}: {
  packageData: MeetingPackage
  dialogIndex: number | null
  setDialogIndex: (i: number | null) => void
}) {
  const idx = meetingPackages.findIndex((p) => p.id === packageData.id)
  return (
    <Dialog open={dialogIndex === idx} onOpenChange={(open) => setDialogIndex(open ? idx : null)}>
      <motion.div
        variants={gridCardVariants}
        className="w-full max-w-[347px] rounded-[20px] border-[0.5px] border-[#B5B5B5] bg-[#F5F5F5] p-6 shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05),0px_1px_4px_0px_rgba(12,12,13,0.1)]"
      >
        <motion.div variants={cardContentVariants} className="flex flex-col items-center gap-3">
          {/* Title + Description */}
          <div className="w-full max-w-[299px]">
            <h3 className="text-[24px] font-bold leading-[1.42] text-[#0A0A0A]">
              {packageData.title}
            </h3>
            <p className="text-[18px] leading-[1.67] text-[#404040]">{packageData.subtitle}</p>
          </div>
          {/* Price */}
          <div className="w-full max-w-[299px]">
            <p className="text-[36px] font-semibold leading-[1.28] text-[#0A0A0A]">
              {packageData.price}
            </p>
            <p className="text-[18px] leading-[1.67] text-[#404040]">{packageData.priceUnit}</p>
          </div>
          {/* Features */}
          <div className="w-full max-w-[299px]">
            {packageData.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-4 py-2">
                <div className="h-[10px] w-[10px] rounded-full bg-[#416340]" />
                <span className="text-[18px] leading-[1.67] text-[#1D1D1D]">{feature}</span>
              </div>
            ))}
          </div>
          {/* Button */}
          <DialogTrigger asChild>
            <button className="flex w-full max-w-[299px] items-center justify-center gap-2 rounded-lg bg-[#06763F] px-3 py-2 text-[12px] font-semibold leading-[1.33] text-white">
              {packageData.buttonText}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M6 12l4-4-4-4"
                  stroke="currentColor"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </DialogTrigger>
        </motion.div>
      </motion.div>
      <DialogContent>
        <PackageDialogContent
          packageData={packageData}
          specialFeatures={specialFeatures[idx] ?? []}
        />
      </DialogContent>
    </Dialog>
  )
}

// Desktop Card Component
function DesktopPackageCard({
  packageData,
  dialogIndex,
  setDialogIndex,
}: {
  packageData: MeetingPackage
  dialogIndex: number | null
  setDialogIndex: (i: number | null) => void
}) {
  const idx = meetingPackages.findIndex((p) => p.id === packageData.id)
  return (
    <Dialog open={dialogIndex === idx} onOpenChange={(open) => setDialogIndex(open ? idx : null)}>
      <motion.div
        variants={gridCardVariants}
        className="rounded-[20px] border-[0.5px] border-[#B5B5B5] bg-[#F5F5F5] p-8 shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05),0px_1px_4px_0px_rgba(12,12,13,0.1)]"
      >
        <motion.div variants={cardContentVariants} className="flex flex-col justify-between gap-6">
          {/* Header */}
          <div className="flex gap-16">
            {/* Title + Description */}
            <div className="w-[260px]">
              <h3 className="text-[24px] font-bold leading-[1.42] text-[#0A0A0A]">
                {packageData.title}
              </h3>
              <p className="text-[18px] leading-[1.67] text-[#404040]">{packageData.subtitle}</p>
            </div>
            {/* Price */}
            <div className="w-[226px]">
              <p className="text-[36px] font-semibold leading-[1.28] text-[#0A0A0A]">
                {packageData.price}
              </p>
              <p className="text-[18px] leading-[1.67] text-[#404040]">{packageData.priceUnit}</p>
            </div>
          </div>

          {/* Features */}
          <div className="flex gap-16">
            {/* Basic Features */}
            <div className="flex flex-col">
              {packageData.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-4 py-2">
                  <div className="h-[10px] w-[10px] rounded-full bg-[#416340]" />
                  <span className="text-[18px] leading-[1.67] text-[#1D1D1D]">{feature}</span>
                </div>
              ))}
            </div>

            {/* Extended Features */}
            <div className="flex w-[226px] flex-col">
              {packageData.extendedFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-4 py-2">
                  <div className="h-[10px] w-[10px] rounded-full bg-[#416340]" />
                  <span className="text-[18px] leading-[1.67] text-[#1D1D1D]">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Button */}
          <DialogTrigger asChild>
            <button className="flex items-center justify-center gap-3 rounded-lg bg-[#06763F] px-5 py-3 text-[16px] font-semibold leading-[1.75] text-white">
              {packageData.buttonText}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M6 12l4-4-4-4"
                  stroke="currentColor"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </DialogTrigger>
        </motion.div>
      </motion.div>
      <DialogContent>
        <PackageDialogContent
          packageData={packageData}
          specialFeatures={specialFeatures[idx] ?? []}
        />
      </DialogContent>
    </Dialog>
  )
}

export default function MeetingPackageSection() {
  const [dialogIndex, setDialogIndex] = React.useState<number | null>(null)
  return (
    <motion.section
      className="bg-white px-8 py-10 md:px-16 md:py-[64px] lg:px-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={sectionContainerVariants}
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div variants={headerTextVariants} className="mb-6 text-center md:mb-8">
          <h2 className="mb-3 text-[28px] font-semibold leading-[1.07] text-[#000000] md:text-[36px] md:leading-[1.28]">
            Meeting Package
          </h2>
          <p className="text-[14px] leading-[1.43] text-[#4F4F53] md:text-[14px] md:leading-[1.43]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        </motion.div>
        {/* Mobile Layout */}
        <motion.div
          variants={gridContainerVariants}
          className="flex flex-col items-center gap-6 md:hidden"
        >
          {meetingPackages.map((packageData, idx) => (
            <MobilePackageCard
              key={packageData.id}
              packageData={packageData}
              dialogIndex={dialogIndex}
              setDialogIndex={setDialogIndex}
            />
          ))}
        </motion.div>
        {/* Tablet Layout */}
        <motion.div
          variants={gridContainerVariants}
          className="mx-auto hidden w-full grid-cols-2 place-items-center gap-12 md:grid xl:hidden"
        >
          {meetingPackages.map((packageData, idx) => (
            <TabletPackageCard
              key={packageData.id}
              packageData={packageData}
              dialogIndex={dialogIndex}
              setDialogIndex={setDialogIndex}
            />
          ))}
        </motion.div>
        {/* Desktop Layout */}
        <motion.div variants={gridContainerVariants} className="hidden grid-cols-2 gap-12 xl:grid">
          {meetingPackages.map((packageData, idx) => (
            <DesktopPackageCard
              key={packageData.id}
              packageData={packageData}
              dialogIndex={dialogIndex}
              setDialogIndex={setDialogIndex}
            />
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}
