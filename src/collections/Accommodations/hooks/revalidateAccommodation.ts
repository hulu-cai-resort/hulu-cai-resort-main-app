import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Accommodation } from '../../../payload-types'

export const revalidateAccommodation: CollectionAfterChangeHook<Accommodation> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/accommodations/${doc.id}`

      payload.logger.info(`Revalidating accommodation at path: ${path}`)

      revalidatePath(path)
      revalidatePath('/accommodations') // Revalidate the main accommodations list page
      revalidateTag('accommodations-sitemap')
    }

    // If the accommodation was previously published, we need to revalidate the old path
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const oldPath = `/accommodations/${previousDoc.id}`

      payload.logger.info(`Revalidating old accommodation at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidatePath('/accommodations')
      revalidateTag('accommodations-sitemap')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Accommodation> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    const path = `/accommodations/${doc?.id}`
    revalidatePath(path)
    revalidatePath('/accommodations')
    revalidateTag('accommodations-sitemap')
  }

  return doc
}
