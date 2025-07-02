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
import ScrollIndicator from '@/components/ScrollIndicator'

export default async function Page() {
  const mainPage = (await getCachedGlobal('main-page', 1)()) as MainPage

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection mainPage={mainPage} />

      {/* Scroll Indicator */}
      <ScrollIndicator />

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
