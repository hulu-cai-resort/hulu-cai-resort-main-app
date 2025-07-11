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
import { EventsPage, MeetingPackage } from '@/payload-types'
import { PaginatedDocs } from 'payload'
import { ChevronRight } from 'lucide-react'

// Dialog content component
function PackageDialogContent({ packageData }: { packageData: MeetingPackage }) {
  return (
    <div className="h-[500px] space-y-6 overflow-y-auto">
      <DialogHeader>
        <DialogTitle>{packageData.title}</DialogTitle>
        <DialogDescription>{packageData.subtitle}</DialogDescription>
      </DialogHeader>
      <div>
        <div className="mb-2 text-lg font-semibold text-[#06763F]">All Features</div>
        <ul className="grid gap-2.5 sm:grid-cols-2">
          {packageData.features.map((feature, i) => (
            <li key={i} className="flex items-center gap-3">
              <span className="inline-block h-2 w-2 rounded-full bg-[#416340]" />
              <span className="text-base text-[#1D1D1D]">{feature.feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div className="grid gap-4 xl:grid-cols-2">
          {packageData.packageFeatures.map((feature, i) => (
            <div
              key={i}
              className="flex flex-col gap-3 rounded-lg border border-[#B5B5B5] bg-white p-4 shadow-sm"
            >
              {/* Price */}
              <div>
                <p className="text-xs text-[#4F4F53]">Mulai</p>
                <p className="text-lg font-semibold text-[#0A0A0A]">
                  {new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(feature.price)}
                </p>
                {feature.pricePeriod && (
                  <p className="text-xs text-[#4F4F53]">{feature.pricePeriod}</p>
                )}
              </div>

              {/* Special Features */}
              {feature.specialFeatures && feature.specialFeatures.length > 0 && (
                <ul className="space-y-1">
                  {feature.specialFeatures.map((specialFeature, j) => (
                    <li key={j} className="flex items-center gap-2">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#416340]" />
                      <span className="text-sm text-[#1D1D1D]">
                        {specialFeature.specialFeature}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Mobile Card Component
function MobilePackageCard({
  packageData,
  dialogIndex,
  setDialogIndex,
  idx,
}: {
  packageData: MeetingPackage
  dialogIndex: number | null
  setDialogIndex: (i: number | null) => void
  idx: number
}) {
  const point = Math.min(packageData.features.length, 4)
  const lowestPrice = packageData.packageFeatures.reduce((min, feature) => {
    return Math.min(min, feature.price)
  }, Infinity)
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
            <p className="text-[12px] leading-[1.67] text-[#404040]">mulai dari</p>
            <p className="text-[28px] font-semibold leading-[1.07] text-[#0A0A0A]">
              {new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(lowestPrice || 0)}
            </p>
            <p className="text-[16px] leading-[1.5] text-[#404040]">
              {packageData.packageFeatures[0]?.pricePeriod}
            </p>
          </div>
          {/* Features */}
          <div className="w-full max-w-[299px]">
            {packageData.features.slice(0, point).map((feature, index) => (
              <div key={index} className="flex items-center gap-4 py-2">
                <div className="h-2 w-2 rounded-full bg-[#416340]" />
                <span className="text-[16px] leading-[1.5] text-[#1D1D1D]">{feature.feature}</span>
              </div>
            ))}
          </div>
          {/* Button */}
          <DialogTrigger asChild>
            <button className="flex w-full max-w-[299px] items-center justify-center gap-2 rounded-lg bg-[#06763F] px-3 py-2 text-[12px] font-semibold leading-[1.33] text-white">
              Lihat Detail
              <ChevronRight className="h-4 w-4" />
            </button>
          </DialogTrigger>
        </motion.div>
      </motion.div>
      <DialogContent>
        <DialogTitle className="hidden">Meeting Package</DialogTitle>
        <PackageDialogContent packageData={packageData} />
      </DialogContent>
    </Dialog>
  )
}

// Tablet Card Component
function TabletPackageCard({
  packageData,
  dialogIndex,
  setDialogIndex,
  idx,
}: {
  packageData: MeetingPackage
  dialogIndex: number | null
  setDialogIndex: (i: number | null) => void
  idx: number
}) {
  const point = Math.min(packageData.features.length, 4)
  const lowestPrice = packageData.packageFeatures.reduce((min, feature) => {
    return Math.min(min, feature.price)
  }, Infinity)
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
            <p className="text-[12px] leading-[1.67] text-[#404040]">mulai dari</p>
            <p className="text-[36px] font-semibold leading-[1.28] text-[#0A0A0A]">
              {new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(lowestPrice || 0)}
            </p>
            <p className="text-[18px] leading-[1.67] text-[#404040]">
              {packageData.packageFeatures[0]?.pricePeriod}
            </p>
          </div>
          {/* Features */}
          <div className="w-full max-w-[299px]">
            {packageData.features.slice(0, point).map((feature, index) => (
              <div key={index} className="flex items-center gap-4 py-2">
                <div className="h-[10px] w-[10px] rounded-full bg-[#416340]" />
                <span className="text-[18px] leading-[1.67] text-[#1D1D1D]">{feature.feature}</span>
              </div>
            ))}
          </div>
          {/* Button */}
          <DialogTrigger asChild>
            <button className="flex w-full max-w-[299px] items-center justify-center gap-2 rounded-lg bg-[#06763F] px-3 py-2 text-[12px] font-semibold leading-[1.33] text-white">
              Lihat Detail
              <ChevronRight className="h-4 w-4" />
            </button>
          </DialogTrigger>
        </motion.div>
      </motion.div>
      <DialogContent>
        <DialogTitle className="hidden">Meeting Package</DialogTitle>
        <PackageDialogContent packageData={packageData} />
      </DialogContent>
    </Dialog>
  )
}

// Desktop Card Component
function DesktopPackageCard({
  packageData,
  dialogIndex,
  setDialogIndex,
  idx,
}: {
  packageData: MeetingPackage
  dialogIndex: number | null
  setDialogIndex: (i: number | null) => void
  idx: number
}) {
  const point = Math.min(packageData.features.length, 8)
  const lowestPrice = packageData.packageFeatures.reduce((min, feature) => {
    return Math.min(min, feature.price)
  }, Infinity)
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
              <p className="text-[12px] leading-[1.67] text-[#404040]">mulai dari</p>
              <p className="text-[36px] font-semibold leading-[1.28] text-[#0A0A0A]">
                {new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(lowestPrice || 0)}
              </p>
              <p className="text-[18px] leading-[1.67] text-[#404040]">
                {packageData.packageFeatures[0]?.pricePeriod}
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="flex gap-16">
            {/* Basic Features */}
            <div className="grid w-full grid-flow-col grid-cols-2 grid-rows-4">
              {packageData.features.slice(0, point).map((feature, index) => (
                <div key={index} className="flex items-center gap-4 py-2">
                  <div className="h-[10px] w-[10px] rounded-full bg-[#416340]" />
                  <span className="text-[18px] leading-[1.67] text-[#1D1D1D]">
                    {feature.feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Button */}
          <DialogTrigger asChild>
            <button className="flex items-center justify-center gap-3 rounded-lg bg-[#06763F] px-5 py-3 text-[16px] font-semibold leading-[1.75] text-white">
              Lihat Detail
              <ChevronRight className="h-4 w-4" />
            </button>
          </DialogTrigger>
        </motion.div>
      </motion.div>
      <DialogContent>
        <DialogTitle className="hidden">Meeting Package</DialogTitle>
        <PackageDialogContent packageData={packageData} />
      </DialogContent>
    </Dialog>
  )
}

export default function MeetingPackageSection({
  meetingPackages,
  eventsPage,
}: {
  meetingPackages: PaginatedDocs<MeetingPackage>
  eventsPage: EventsPage
}) {
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
          {meetingPackages.docs.map((packageData, idx) => (
            <MobilePackageCard
              key={packageData.id}
              packageData={packageData}
              dialogIndex={dialogIndex}
              setDialogIndex={setDialogIndex}
              idx={idx}
            />
          ))}
        </motion.div>
        {/* Tablet Layout */}
        <motion.div
          variants={gridContainerVariants}
          className="mx-auto hidden w-full grid-cols-2 place-items-center gap-12 md:grid xl:hidden"
        >
          {meetingPackages.docs.map((packageData, idx) => (
            <TabletPackageCard
              key={packageData.id}
              packageData={packageData}
              dialogIndex={dialogIndex}
              setDialogIndex={setDialogIndex}
              idx={idx}
            />
          ))}
        </motion.div>
        {/* Desktop Layout */}
        <motion.div variants={gridContainerVariants} className="hidden grid-cols-2 gap-12 xl:grid">
          {meetingPackages.docs.map((packageData, idx) => (
            <DesktopPackageCard
              key={packageData.id}
              packageData={packageData}
              dialogIndex={dialogIndex}
              setDialogIndex={setDialogIndex}
              idx={idx}
            />
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}
