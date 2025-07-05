import { getCachedGlobal } from '@/utilities/getGlobals'
import { ReservationFormPage } from '@/payload-types'
import ReservationFormSection from './(_section)/ReservationFormSection'

export default async function ReservationPage() {
  const reservationFormPage = (await getCachedGlobal(
    'reservation-form-page',
    1,
  )()) as ReservationFormPage

  return (
    <>
      <ReservationFormSection />
    </>
  )
}
