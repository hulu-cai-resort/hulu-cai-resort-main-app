import { revalidateTag } from 'next/cache'

import type { GlobalAfterChangeHook } from 'payload'

export const revalidateDiningPage: GlobalAfterChangeHook = ({ doc, req: { payload } }) => {
  payload.logger.info(`Revalidating dining page`)

  revalidateTag('globals_dining-page')

  return doc
}
