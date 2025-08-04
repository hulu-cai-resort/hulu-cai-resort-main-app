import { revalidateTag } from 'next/cache'

import type { GlobalAfterChangeHook } from 'payload'

export const revalidateEventsIndoorPage: GlobalAfterChangeHook = ({ doc, req: { payload } }) => {
  payload.logger.info(`Revalidating events indoor page`)

  revalidateTag('globals_events-indoor-page')

  return doc
}
