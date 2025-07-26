import { revalidateTag } from 'next/cache'

import type { CollectionAfterChangeHook } from 'payload'

export const revalidateMapMarkers: CollectionAfterChangeHook = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  if (doc._status === 'published') {
    const path = `/maps`

    payload.logger.info(`Revalidating map markers at path: ${path}`)

    revalidateTag('global_map-markers')
  }

  return doc
}
