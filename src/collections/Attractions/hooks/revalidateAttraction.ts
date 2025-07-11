import { revalidatePath, revalidateTag } from 'next/cache'

import type { CollectionAfterChangeHook } from 'payload'

export const revalidateAttraction: CollectionAfterChangeHook = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  const path = `/attractions/${doc.slug}`

  payload.logger.info(`Revalidating attraction at path: ${path}`)

  revalidatePath(path)
  revalidatePath('/attractions')
  revalidatePath('/attraction-amenities')
  revalidateTag('attractions')

  // If the slug changed, revalidate the old path
  if (previousDoc?.slug && doc.slug !== previousDoc.slug) {
    const oldPath = `/attractions/${previousDoc.slug}`
    payload.logger.info(`Revalidating old attraction path: ${oldPath}`)
    revalidatePath(oldPath)
  }

  return doc
}
