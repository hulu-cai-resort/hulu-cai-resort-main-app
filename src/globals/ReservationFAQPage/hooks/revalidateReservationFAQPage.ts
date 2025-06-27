import { revalidateTag } from 'next/cache'
import type { GlobalAfterChangeHook } from 'payload'

export const revalidateReservationFAQPage: GlobalAfterChangeHook = ({ doc, req: { payload } }) => {
  payload.logger.info('Revalidating reservation FAQ page')

  revalidateTag('global_reservation-faq-page')
  revalidateTag('reservation-faq')

  return doc
}
