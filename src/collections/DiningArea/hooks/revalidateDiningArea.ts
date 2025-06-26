import { revalidatePath, revalidateTag } from 'next/cache'

import type { CollectionAfterChangeHook } from 'payload'

export const revalidateDiningArea: CollectionAfterChangeHook = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  const path = `/dining-area/${doc.slug}`

  payload.logger.info(`Revalidating dining area at path: ${path}`)

  revalidatePath(path)
  revalidatePath('/dining-area')
  revalidateTag('dining-area')

  // If the slug changed, revalidate the old path
  if (previousDoc?.slug && doc.slug !== previousDoc.slug) {
    const oldPath = `/dining/${previousDoc.slug}`
    payload.logger.info(`Revalidating old dining path: ${oldPath}`)
    revalidatePath(oldPath)
  }

  return doc
}
