import { getCachedGlobal } from '@/utilities/getGlobals'
import ReservationFormSection from './(_section)/ReservationFormSection'
import { Metadata } from 'next'
import { ContactForm, EventsPage } from '@/payload-types'

export const metadata: Metadata = {
  title: 'Form Contact',
  description: 'Fill the form to contact us',
  keywords: ['Form Contact', 'Contact Form', 'Contact'],
}

export default async function ReservationPage() {
  const contactForm = (await getCachedGlobal('contact-form', 1)()) as ContactForm
  return (
    <>
      <ReservationFormSection phoneNumber={contactForm.phoneNumber} />
    </>
  )
}
