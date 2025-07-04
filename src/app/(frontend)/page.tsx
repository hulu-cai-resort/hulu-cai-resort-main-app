import React from 'react'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { MainPage } from '@/payload-types'
import { ActivitiesSection } from './(_sections)/ActivitiesSection'
import PlaceToGoSection from './(_sections)/PlaceToGoSection'
import { PackagesSection } from './(_sections)/PackagesSection'
import { ActivitiesHubSection } from './(_sections)/ActivitiesHubSection'
import LocationAndFacilitySection from './(_sections)/LocationAndFacilitySection'
import { ReviewsSection } from './(_sections)/ReviewsSection'
import { SocialMediaSection } from './(_sections)/SocialMediaSection'
import { HeroSection } from './(_sections)/HeroSection'
import ScrollIndicator from '@/components/ScrollIndicator'
import { Metadata } from 'next'

export function generateMetadata(): Metadata {
  return {
    title: `Home`,
  }
}

export default async function Page() {
  const mainPage = (await getCachedGlobal('main-page', 1)()) as MainPage

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection mainPage={mainPage} />

      {/* Scroll Indicator */}
      <ScrollIndicator href="#activities" />

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
