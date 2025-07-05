import { revalidatePath } from 'next/cache'

import type { GlobalAfterChangeHook } from 'payload'

export const revalidateReservationFormPage: GlobalAfterChangeHook = ({ doc, req: { payload } }) => {
  payload.logger.info(`Revalidating reservation form page`)

  revalidatePath('globals_reservation-form-page')

  return doc
}
