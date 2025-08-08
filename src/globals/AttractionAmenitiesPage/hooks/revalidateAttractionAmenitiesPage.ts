import { revalidateTag } from 'next/cache'

import type { GlobalAfterChangeHook } from 'payload'

export const revalidateAttractionAmenitiesPage: GlobalAfterChangeHook = ({
  doc,
  req: { payload },
}) => {
  payload.logger.info(`Revalidating attraction amenities page`)

  revalidateTag('global_attraction-amenities-page')

  return doc
}
