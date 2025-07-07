import React from 'react'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { MainPage, Media } from '@/payload-types'
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

export async function generateMetadata(): Promise<Metadata> {
  const mainPage = (await getCachedGlobal('main-page', 4)()) as MainPage

  return {
    title: mainPage.seo?.title || 'Home',
    description: mainPage.seo?.description || 'Home',
    keywords: mainPage.seo?.keywords || 'Home',
    openGraph: {
      title: mainPage.seo?.title || 'Home',
      description: mainPage.seo?.description || 'Home',
      images: (mainPage.seo?.ogImage as Media).url || '/images/og-image.png',
    },
  }
}

export default async function Page() {
  const mainPage = (await getCachedGlobal('main-page', 4)()) as MainPage

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
