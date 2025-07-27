import { revalidatePath, revalidateTag } from 'next/cache'

import type { GlobalAfterChangeHook } from 'payload'

export const revalidateContactForm: GlobalAfterChangeHook = ({ doc, req: { payload } }) => {
  payload.logger.info(`Revalidating contact form`)

  revalidateTag('global_contact-form')

  return doc
}
