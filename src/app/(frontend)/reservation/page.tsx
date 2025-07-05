import { getCachedGlobal } from '@/utilities/getGlobals'
import { EventsPage } from '@/payload-types'
import HeroSection from './(_section)/HeroSection'
import ScrollIndicator from '@/components/ScrollIndicator'
import MustYouKnowSection from './(_section)/MustYouKnowSection'
import BuildExperienceSection from './(_section)/BuildExperienceSection'
import NarahubungSection from './(_section)/NarahubungSection'
import TermsConditionSection from './(_section)/TermsConditionSection'
import FAQSection from './(_section)/FAQSection'

export default async function ReservationPage() {
  const eventsPage = (await getCachedGlobal('events-page', 1)()) as EventsPage

  return (
    <>
      <MustYouKnowSection />

      <BuildExperienceSection />
      <NarahubungSection />
      <TermsConditionSection />
      <FAQSection />
    </>
  )
}
