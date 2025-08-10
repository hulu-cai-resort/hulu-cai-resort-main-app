import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { Footer, Media } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'

export async function Footer() {
  const footer = (await getCachedGlobal('footer', 1)()) as Footer

  return (
    <footer className="bg-[#092B1A] text-white">
      {/* Hero Section */}
      <div className="flex items-center justify-center px-8 py-16">
        <div className="relative flex w-full max-w-7xl items-center justify-center py-32">
          {/* Background with overlay */}
          <div className="absolute inset-0 mx-auto max-w-7xl overflow-hidden rounded-2xl">
            <Image
              src={getMediaUrl((footer.footerImage as Media)?.url ?? '')}
              alt="Footer Image"
              fill
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-[#1D1D1D]/60 via-transparent to-[#1D1D1D]" />
          </div>

          <div className="relative z-10 max-w-2xl text-center">
            <div className="mb-5 space-y-5">
              <h2 className="text-2xl font-normal leading-tight md:text-3xl lg:text-4xl">
                From Meeting to All Memories
              </h2>
              <h3 className="text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
                All in One Place
              </h3>
            </div>

            <Link
              href="/form"
              className="inline-flex items-center gap-3 rounded-xl bg-white/15 px-11 py-5 text-white backdrop-blur-md transition-all hover:bg-white/20"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="text-xl font-normal md:text-2xl">Reserve Here!</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="px-8">
        <div className="mx-auto max-w-7xl space-y-10">
          {/* Logo and Divider */}
          <div className="mb-15 flex items-center gap-5">
            <div className="w-13 h-13">
              <Image src="/assets/logo.png" alt="Hulu Cai Camp" width={52} height={52} />
            </div>
            <div className="h-px flex-1 bg-white"></div>
          </div>

          {/* Navigation Columns */}
          <div className="grid grid-cols-1 gap-8 pb-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
            {/* About Hulu Cai Camp */}
            <div className="space-y-4">
              <h4 className="mb-4 text-base font-bold">Tentang Camp Hulu Cai</h4>
              <nav className="space-y-2">
                <Link
                  href="/maps"
                  className="block text-base font-medium transition-colors hover:text-gray-300"
                >
                  Peta
                </Link>
                <Link
                  href="/accommodations"
                  className="block text-base font-medium transition-colors hover:text-gray-300"
                >
                  Akomodasi
                </Link>
                <Link
                  href="/attractions-amenities"
                  className="block text-base font-medium transition-colors hover:text-gray-300"
                >
                  Atraksi & Amenitas
                </Link>
                <Link
                  href="/activities"
                  className="block text-base font-medium transition-colors hover:text-gray-300"
                >
                  Group Activities
                </Link>
              </nav>
            </div>

            {/* Additional Navigation */}
            <div className="space-y-2 lg:justify-self-start">
              <Link
                href="/dining"
                className="block text-base font-medium transition-colors hover:text-gray-300"
              >
                Restoran
              </Link>
              <Link
                href="/events"
                className="block text-base font-medium transition-colors hover:text-gray-300"
              >
                Meeting & Event
              </Link>
              <Link
                href="/reservation"
                className="block text-base font-medium transition-colors hover:text-gray-300"
              >
                Reservasi
              </Link>
              <Link
                href="/faq"
                className="block text-base font-medium transition-colors hover:text-gray-300"
              >
                FAQ
              </Link>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h4 className="mb-4 text-base font-bold">Datang & Hubungi CHC</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-1">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="flex-shrink-0"
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  <span className="text-base font-medium">{footer.address}</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="flex-shrink-0"
                  >
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                  <span className="text-base font-medium">{footer.phone}</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="flex-shrink-0"
                  >
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                  <span className="text-base font-medium">{footer.email}</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="flex-shrink-0"
                  >
                    <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
                  </svg>
                  <span className="text-base font-medium">{footer.instagramHandle}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div>
            <div className="h-px w-full bg-white"></div>

            {/* Bottom Section */}
            <div className="flex items-center justify-between gap-6 py-5 md:flex-row">
              <p className="text-sm">
                ©{new Date().getFullYear()} Hulu Cai Camp · All rights reserved.
              </p>

              <div className="flex items-center gap-6">
                <p className="text-sm font-medium">Term of use</p>
                <p className="text-sm font-medium">Privacy policy</p>
                <p className="text-sm font-medium">Security</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
