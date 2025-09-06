import { getCachedGlobal } from '@/utilities/getGlobals'
import { ReservationFaqPage } from '@/payload-types'

import MustYouKnowSection from './(_section)/MustYouKnowSection'
import BuildExperienceSection from './(_section)/BuildExperienceSection'
import NarahubungSection from './(_section)/NarahubungSection'
import TermsConditionSection from './(_section)/TermsConditionSection'
import FAQSection from './(_section)/FAQSection'

export async function generateMetadata() {
  const reservationPage = (await getCachedGlobal('reservation-faq-page', 1)()) as ReservationFaqPage

  return {
    title: reservationPage.seo?.title,
    description: reservationPage.seo?.description,
    keywords: reservationPage.seo?.keywords,
  }
}

export default async function ReservationPage() {
  const reservationPage = (await getCachedGlobal('reservation-faq-page', 1)()) as ReservationFaqPage

  return (
    <>
      <MustYouKnowSection mustKnowSection={reservationPage.mustKnowSection} />

      <BuildExperienceSection buildExperienceSection={reservationPage.reservationCTA} />
      <NarahubungSection narahubungSection={reservationPage.contactSection} />
      <TermsConditionSection termsConditionSection={reservationPage.termsSection} />
      <FAQSection faqSection={reservationPage.faqSection} />
    </>
  )
}
