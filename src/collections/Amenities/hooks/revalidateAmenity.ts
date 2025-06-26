import { revalidatePath, revalidateTag } from 'next/cache'

import type { CollectionAfterChangeHook } from 'payload'

export const revalidateAmenity: CollectionAfterChangeHook = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  const path = `/amenities/${doc.slug}`

  payload.logger.info(`Revalidating amenity at path: ${path}`)

  revalidatePath(path)
  revalidatePath('/amenities')
  revalidatePath('/attraction-amenities')
  revalidateTag('amenities')

  // If the slug changed, revalidate the old path
  if (previousDoc?.slug && doc.slug !== previousDoc.slug) {
    const oldPath = `/amenities/${previousDoc.slug}`
    payload.logger.info(`Revalidating old amenity path: ${oldPath}`)
    revalidatePath(oldPath)
  }

  return doc
}
