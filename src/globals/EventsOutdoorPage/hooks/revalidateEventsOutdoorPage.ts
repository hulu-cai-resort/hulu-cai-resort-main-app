import { revalidateTag } from 'next/cache'

import type { GlobalAfterChangeHook } from 'payload'

export const revalidateEventsOutdoorPage: GlobalAfterChangeHook = ({ doc, req: { payload } }) => {
  payload.logger.info(`Revalidating events outdoor page`)

  revalidateTag('globals_events-outdoor-page')

  return doc
}
