import { revalidateTag } from 'next/cache'

import type { GlobalAfterChangeHook } from 'payload'

export const revalidateActivitiesPage: GlobalAfterChangeHook = ({ doc, req: { payload } }) => {
  payload.logger.info(`Revalidating activities page`)

  revalidateTag('globals_activities-page')

  return doc
}
