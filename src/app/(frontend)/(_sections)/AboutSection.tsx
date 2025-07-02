import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import type { MainPage } from '@/payload-types'

interface AboutSectionProps {
  mainPage: MainPage
}

export function AboutSection({ mainPage }: AboutSectionProps) {
  return (
    <section className="bg-white px-8 py-8">
      <div className="mb-6 space-y-2 text-center">
        <p className="text-lg font-semibold text-orange-500">{mainPage.aboutSectionTitle}</p>
        <h2 className="text-2xl font-semibold leading-tight text-gray-900">
          {mainPage.aboutTitle}
        </h2>
        <p className="text-sm leading-relaxed text-gray-600">{mainPage.aboutDescription}</p>
      </div>

      {/* Main Image with testimonials */}
      <div className="relative mb-6">
        <div className="h-96 w-full overflow-hidden rounded-2xl bg-gray-200">
          {mainPage.aboutImage && typeof mainPage.aboutImage === 'object' && (
            <Image
              src={getMediaUrl(mainPage.aboutImage.url)}
              alt="About Hulu Cai Camp"
              fill
              className="object-cover"
            />
          )}
        </div>

        {/* Floating testimonial cards */}
        <div className="absolute -left-8 -top-4 w-44 rounded-lg bg-white p-3 shadow-lg">
          <div className="flex gap-2">
            <div className="h-10 w-10 rounded-full bg-gray-200" />
            <div>
              <p className="text-xs font-semibold text-gray-900">Melanie</p>
              <p className="text-xs text-gray-600">Best Experience Ever !</p>
            </div>
          </div>
        </div>

        <div className="absolute -right-8 top-20 w-48 rounded-lg bg-white p-3 shadow-lg">
          <div className="flex gap-2">
            <div className="h-10 w-10 rounded-full bg-gray-200" />
            <div>
              <p className="text-xs font-semibold text-gray-900">Carren J</p>
              <p className="text-xs text-gray-600">That&apos;s a Wonderfull view</p>
            </div>
          </div>
        </div>

        <div className="absolute -left-8 bottom-8 w-48 rounded-lg bg-white p-3 shadow-lg">
          <div className="flex gap-2">
            <div className="h-10 w-10 rounded-full bg-gray-200" />
            <div>
              <p className="text-xs font-semibold text-gray-900">Janice M</p>
              <p className="text-xs text-gray-600">That&apos;s a Wonderfull view</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features list */}
      <div className="space-y-8">
        {mainPage.features?.map((feature, index) => (
          <div key={feature.id || index} className="flex gap-4">
            <div
              className={`flex h-6 w-10 items-center justify-center rounded-lg ${
                index === 1 ? 'bg-orange-500' : 'bg-green-900'
              }`}
            >
              <span className="text-sm font-normal text-white">{feature.number}</span>
            </div>
            <div className="flex-1">
              <h3 className="mb-2 text-lg font-semibold text-gray-900">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-gray-600">{feature.description}</p>
            </div>
          </div>
        ))}

        <Button className="w-full bg-primary text-white">Mulai Jelajahi</Button>
      </div>
    </section>
  )
}
