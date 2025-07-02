import React from 'react'
import Image from 'next/image'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import type { MainPage } from '@/payload-types'

interface LocationSectionProps {
  mainPage: MainPage
}

export function LocationSection({ mainPage }: LocationSectionProps) {
  return (
    <section className="bg-gray-50 py-8">
      <div className="mb-6 px-8 text-center">
        <p className="mb-2 text-lg font-semibold text-orange-500">
          {mainPage.locationSectionTitle}
        </p>
        <h2 className="mb-4 text-2xl font-semibold leading-tight text-gray-900">
          {mainPage.locationTitle}
        </h2>
        <p className="text-sm leading-relaxed text-gray-600">{mainPage.locationDescription}</p>
      </div>

      <div className="px-8">
        {/* Location image */}
        <div className="mb-6 h-56 w-full overflow-hidden rounded-lg bg-gray-200">
          {mainPage.locationImage && typeof mainPage.locationImage === 'object' && (
            <Image
              src={getMediaUrl(mainPage.locationImage.url)}
              alt="Location"
              fill
              className="object-cover"
            />
          )}
        </div>

        {/* Location info card */}
        <div className="space-y-3 rounded-xl bg-white p-6">
          <div className="h-48 w-full rounded-lg bg-gray-200" />
          <h3 className="text-lg font-semibold text-orange-500">
            {mainPage.locationInfo?.placeName}
          </h3>
          <h4 className="text-lg font-semibold text-gray-900">{mainPage.locationInfo?.areaName}</h4>
          <p className="text-sm leading-relaxed text-gray-600">{mainPage.locationInfo?.address}</p>
        </div>
      </div>
    </section>
  )
}
