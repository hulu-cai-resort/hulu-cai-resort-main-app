'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Clock, Car, Users } from 'lucide-react'
import { gridCardVariants } from '@/utilities/variants'

interface AccommodationCardProps {
  accommodation: {
    id: string
    title: string
    duration: string
    transport: string
    familyPlan: string
    image: string
    pricePerNight: number
  }
  className?: string
}

export function AccommodationCard({ accommodation, className = '' }: AccommodationCardProps) {
  return (
    <motion.div
      className={`flex h-auto w-full flex-col items-center gap-3 rounded-[24px] bg-white p-3 shadow-[4px_4px_20px_0px_rgba(245,247,253,1)] xl:w-[300px] ${className}`}
      variants={gridCardVariants}
    >
      {/* Accommodation Image */}
      <div className="aspect-[277.78/201.85] w-full overflow-hidden rounded-[12px] bg-[#E2E6EE] lg:h-[201.85px] xl:w-[277.78px]">
        <Image
          src={accommodation.image}
          alt={accommodation.title}
          width={278}
          height={202}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Card Content */}
      <div className="flex w-full flex-col items-center gap-3">
        {/* Accommodation Info Section */}
        <div className="flex w-full flex-col gap-6 px-2 xl:w-[251.49px] xl:gap-8 xl:px-0">
          {/* Accommodation Title */}
          <h3 className="font-raleway text-base font-bold leading-[1.875] text-[#1C2B38] drop-shadow-[0px_5.61px_14.58px_rgba(255,255,255,0.4)]">
            {accommodation.title}
          </h3>

          {/* Amenities */}
          <div className="flex w-full flex-col gap-1.5 xl:w-[162px]">
            {/* Duration */}
            <div className="flex w-full items-center gap-3">
              <div className="flex h-6 w-6 items-center justify-center">
                <Clock className="h-5 w-5 text-[#495560]" />
              </div>
              <span className="font-raleway text-base font-normal leading-[1.75] text-[#495560]">
                {accommodation.duration}
              </span>
            </div>

            {/* Transport */}
            <div className="flex w-full items-center gap-3">
              <div className="flex h-6 w-6 items-center justify-center">
                <Car className="h-4 w-5 text-[#495560]" />
              </div>
              <span className="font-raleway text-base font-normal leading-[1.75] text-[#495560]">
                {accommodation.transport}
              </span>
            </div>

            {/* Family Plan */}
            <div className="flex items-center gap-3">
              <div className="flex h-6 w-6 items-center justify-center">
                <Users className="h-4 w-5 text-[#495560]" />
              </div>
              <span className="font-raleway text-base font-normal leading-[1.75] text-[#495560] lg:w-[85.21px]">
                {accommodation.familyPlan}
              </span>
            </div>
          </div>
        </div>

        {/* Separator Line */}
        <div className="h-px w-full bg-[#E8EAEB]"></div>

        {/* Price Section */}
        <div className="flex w-full flex-row justify-between gap-2 px-2 xl:w-[267.92px] xl:px-0">
          <span className="font-raleway text-base font-semibold leading-[1.75] text-black xl:w-[103px]">
            Mulai dari
          </span>
          <div className="flex flex-col items-end">
            <span className="font-raleway text-right text-2xl font-bold leading-[1.417] text-[#06763F] drop-shadow-[0px_5.61px_14.58px_rgba(255,255,255,0.4)] lg:w-[157px]">
              IDR{accommodation.pricePerNight.toLocaleString('id-ID')}
            </span>
            <span className="font-raleway text-left text-xs leading-[2] text-[#778088] xl:w-[61.43px]">
              Per malam
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
