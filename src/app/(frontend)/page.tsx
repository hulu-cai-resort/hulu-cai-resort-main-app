import React from 'react'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { MainPage } from '@/payload-types'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import Wrapper from '@/components/Wrapper'
import { ChevronsDown } from 'lucide-react'
import { ActivitiesSection } from './sections/ActivitiesSection'
import PlaceToGoSection from './sections/PlaceToGoSection'
import { PackagesSection } from './sections/PackagesSection'
import { ActivitiesHubSection } from './sections/ActivitiesHubSection'
import LocationAndFacilitySection from './sections/LocationAndFacilitySection'
import { ReviewsSection } from './sections/ReviewsSection'
import { SocialMediaSection } from './sections/SocialMediaSection'
import { HeroSection } from './sections/HeroSection'

export default async function Page() {
  const mainPage = (await getCachedGlobal('main-page', 1)()) as MainPage

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection mainPage={mainPage} />

      {/* Scroll Indicator */}
      <div className="relative z-20 -mt-12 flex justify-center lg:-mt-[48px] lg:justify-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/50 bg-white/50 backdrop-blur-sm lg:h-[48px] lg:w-[48px] lg:border-white lg:bg-white/50">
          <ChevronsDown className="h-6 w-6 text-white lg:h-[24px] lg:w-[24px]" />
        </div>
      </div>

      {/* Activities Section */}
      <ActivitiesSection mainPage={mainPage} />

      {/* About / Place To Go Section */}
      <PlaceToGoSection mainPage={mainPage} />

      {/* Package Vacation Section */}
      <PackagesSection mainPage={mainPage} />

      {/* Activities Hub Section */}
      <ActivitiesHubSection mainPage={mainPage} />

      {/* Location & Facility Section */}
      <LocationAndFacilitySection mainPage={mainPage} />

      {/* Customer Reviews Section */}
      <ReviewsSection mainPage={mainPage} />

      {/* Social Media Section */}
      <SocialMediaSection mainPage={mainPage} />
    </div>
  )
}
