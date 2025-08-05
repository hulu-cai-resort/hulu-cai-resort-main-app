'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Users, BedDouble, Bath, BarChart, BedSingle, Tent, Users2, BedIcon } from 'lucide-react'
import { gridCardVariants } from '@/utilities/variants'
import { Accommodation } from '@/payload-types'
import { Media } from '@/payload-types'

interface AccommodationCardProps {
  accommodation: Accommodation
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
          src={(accommodation.images[0]?.image as Media)?.url ?? ''}
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
          <div className="flex w-full flex-col gap-1.5 xl:w-[200px]">
            {/* Duration */}
            <div className="flex w-full items-center gap-3">
              <div className="flex h-6 w-6 items-center justify-center">
                {accommodation.type === 'villa' ||
                accommodation.type === 'cottage' ||
                accommodation.type === 'cabin' ? (
                  <BedDouble className="h-4 w-5 text-[#495560]" />
                ) : (
                  <Tent className="h-4 w-5 text-[#495560]" />
                )}
              </div>
              <span className="font-raleway text-base font-normal leading-[1.75] text-[#495560]">
                {accommodation.type === 'villa'
                  ? `${accommodation.bedrooms} Kamar`
                  : accommodation.type === 'cottage'
                    ? `${accommodation.extraBeds} Ekstra Kasur`
                    : accommodation.type === 'cabin'
                      ? `${accommodation.beds} Kasur`
                      : `${accommodation.groundCapacity} Tenda`}
              </span>
            </div>

            {/* Transport */}
            <div className="flex w-full items-center gap-3">
              <div className="flex h-6 w-6 items-center justify-center">
                {accommodation.type === 'cottage' ? (
                  <BedIcon className="h-4 w-5 text-[#495560]" />
                ) : (
                  <Bath className="h-4 w-5 text-[#495560]" />
                )}
              </div>
              <span className="font-raleway text-base font-normal leading-[1.75] text-[#495560]">
                {accommodation.type === 'cottage'
                  ? formattedBedType(accommodation)
                  : accommodation.type === 'camping_ground'
                    ? `${accommodation.bathrooms}`
                    : `${accommodation.bathrooms} Kamar Mandi`}
              </span>
            </div>

            {/* Family Plan */}
            <div className="flex items-center gap-3">
              <div className="flex h-6 w-6 items-center justify-center">
                {accommodation.type === 'villa' || accommodation.type === 'cottage' ? (
                  <Users2 className="h-4 w-5 text-[#495560]" />
                ) : accommodation.type === 'cabin' ? (
                  <BedSingle className="h-4 w-5 text-[#495560]" />
                ) : (
                  <Users className="h-4 w-5 text-[#495560]" />
                )}
              </div>
              <span className="w-full font-raleway text-base font-normal leading-[1.75] text-[#495560] lg:w-full">
                {accommodation.type === 'villa'
                  ? `${accommodation.maxCapacity} Orang (Maks)`
                  : accommodation.type === 'cottage'
                    ? `${accommodation.maxCapacity} Orang (Maks)`
                    : accommodation.type === 'cabin'
                      ? `${accommodation.extraBeds} Ekstra Kasur`
                      : `${accommodation.maxCapacity} Orang (Maks)`}
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
            <span className="text-right font-raleway text-2xl font-bold leading-[1.417] text-[#06763F] drop-shadow-[0px_5.61px_14.58px_rgba(255,255,255,0.4)] lg:w-[157px]">
              IDR{accommodation.priceStartingFrom?.toLocaleString('id-ID')}
            </span>
            <span className="text-left font-raleway text-xs leading-[2] text-[#778088] xl:w-[61.43px]">
              Per malam
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const formattedBedType = (accommodation: Accommodation) => {
  const bedConfig = accommodation.bedConfiguration
  if (!bedConfig || bedConfig.length === 0) return ''
  const bedTypeRaw = bedConfig[0]?.bedType || ''
  // Convert "word1-word2" to "Word1 Word2"
  const formattedBedType = bedTypeRaw
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
  const othersCount = bedConfig.length > 1 ? ` dan ${bedConfig.length - 1} lainnya...` : ''
  return `${formattedBedType} ${othersCount}`
}
