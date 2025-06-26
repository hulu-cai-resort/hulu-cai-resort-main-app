import { revalidateTag } from 'next/cache'

import type { GlobalAfterChangeHook } from 'payload'

export const revalidateAccommodationsPage: GlobalAfterChangeHook = ({ doc, req: { payload } }) => {
  payload.logger.info('Revalidating accommodations page')

  revalidateTag('global_accommodations-page')

  return doc
}
