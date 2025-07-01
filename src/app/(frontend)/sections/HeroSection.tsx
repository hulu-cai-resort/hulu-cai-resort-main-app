import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import type { MainPage } from '@/payload-types'
import { ChevronRight } from 'lucide-react'
import Wrapper from '@/components/Wrapper'

interface HeroSectionProps {
  mainPage: MainPage
}

export function HeroSection({ mainPage }: HeroSectionProps) {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          {mainPage.heroImage &&
            typeof mainPage.heroImage === 'object' &&
            mainPage.heroImage.url && (
              <Image
                src={getMediaUrl(mainPage.heroImage.url)}
                alt="Camp Hulu Cai Hero"
                fill
                className="absolute inset-0 h-full w-full object-cover"
                priority
                sizes="100vw"
              />
            )}
          <div className="absolute inset-0 h-screen w-full bg-black/50" />
        </div>

        {/* Hero Content */}
        <Wrapper>
          <div className="absolute z-10 flex h-screen flex-col items-end justify-end px-4 pb-32 sm:px-0 sm:pt-16 md:items-start md:justify-center lg:pt-24">
            <div className="max-w-[670px] space-y-4 lg:space-y-[13px]">
              <h1 className="font-raleway max-w-md text-3xl font-bold leading-[1.18] text-white sm:text-5xl lg:text-[56px] lg:leading-[1.18]">
                {mainPage.heroTitle}
              </h1>

              <div className="border-l border-white pl-2.5 lg:pl-[10px]">
                <p className="font-raleway text-wrap text-base font-semibold leading-[1.2] text-white/90 sm:text-xl lg:text-[20px] lg:leading-[1.2]">
                  {mainPage.heroDescription}
                </p>
              </div>

              <div className="flex gap-3 pt-2 sm:gap-6 lg:gap-[24px] lg:pt-4">
                <Button
                  variant="fluid"
                  size="default"
                  className="px-5 py-3 lg:h-[48px] lg:w-[164px] lg:px-[20px] lg:py-[12px] lg:text-[16px]"
                >
                  Get Started
                  <ChevronRight className="ml-3 h-4 w-4 lg:h-[16px] lg:w-[16px]" />
                </Button>

                <Button
                  size="default"
                  className="font-raleway border border-white bg-white/10 px-5 py-3 text-base font-semibold text-white backdrop-blur-[20px] hover:bg-white/20 lg:h-[48px] lg:w-[164px] lg:px-[20px] lg:py-[12px] lg:text-[16px]"
                >
                  Explore
                </Button>
              </div>
            </div>
          </div>
        </Wrapper>
      </section>
    </>
  )
}
