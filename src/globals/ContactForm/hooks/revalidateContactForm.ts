import { revalidatePath } from 'next/cache'

import type { GlobalAfterChangeHook } from 'payload'

export const revalidateContactForm: GlobalAfterChangeHook = ({ doc, req: { payload } }) => {
  payload.logger.info(`Revalidating contact form`)

  revalidatePath('globals_contact-form')

  return doc
}
