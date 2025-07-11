import { revalidatePath, revalidateTag } from 'next/cache'

import type { CollectionAfterChangeHook } from 'payload'

export const revalidateMeetingEventArea: CollectionAfterChangeHook = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  const path = `/meeting-event-area/${doc.slug}`

  payload.logger.info(`Revalidating meeting event area at path: ${path}`)

  revalidatePath(path)
  revalidatePath('/meeting-event-area')
  revalidateTag('meeting-event-area')

  // If the slug changed, revalidate the old path
  if (previousDoc?.slug && doc.slug !== previousDoc.slug) {
    const oldPath = `/meeting-event-area/${previousDoc.slug}`
    payload.logger.info(`Revalidating old meeting event area path: ${oldPath}`)
    revalidatePath(oldPath)
  }

  return doc
}
