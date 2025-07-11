import { revalidatePath, revalidateTag } from 'next/cache'

import type { CollectionAfterChangeHook } from 'payload'

export const revalidateGamesGround: CollectionAfterChangeHook = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  const path = `/games-ground/${doc.slug}`

  payload.logger.info(`Revalidating games ground at path: ${path}`)

  revalidatePath(path)
  revalidatePath('/games-ground')
  revalidateTag('games-ground')

  // If the slug changed, revalidate the old path
  if (previousDoc?.slug && doc.slug !== previousDoc.slug) {
    const oldPath = `/games-ground/${previousDoc.slug}`
    payload.logger.info(`Revalidating old games ground path: ${oldPath}`)
    revalidatePath(oldPath)
  }

  return doc
}
