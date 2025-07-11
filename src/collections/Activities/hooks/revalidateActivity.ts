import { revalidatePath, revalidateTag } from 'next/cache'

import type { CollectionAfterChangeHook } from 'payload'

export const revalidateActivity: CollectionAfterChangeHook = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  const path = `/activities/${doc.slug}`

  payload.logger.info(`Revalidating activity at path: ${path}`)

  revalidatePath(path)
  revalidatePath('/activities')
  revalidateTag('activities')

  // If the slug changed, revalidate the old path
  if (previousDoc?.slug && doc.slug !== previousDoc.slug) {
    const oldPath = `/activities/${previousDoc.slug}`
    payload.logger.info(`Revalidating old activity path: ${oldPath}`)
    revalidatePath(oldPath)
  }

  return doc
}
