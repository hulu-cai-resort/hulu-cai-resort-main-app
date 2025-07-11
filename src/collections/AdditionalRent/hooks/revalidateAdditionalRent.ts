import { revalidateTag } from 'next/cache'
import type { CollectionAfterChangeHook } from 'payload'

export const revalidateAdditionalRent: CollectionAfterChangeHook = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  if (doc._status === 'published') {
    const path = `/additional-rent/${doc.slug}`

    payload.logger.info(`Revalidating additional rent at path: ${path}`)

    revalidateTag('additional-rents')
    revalidateTag(`additional-rent_${doc.slug}`)
  }

  if (previousDoc?._status === 'published' && doc._status !== 'published') {
    const oldPath = `/additional-rent/${previousDoc.slug}`

    payload.logger.info(`Revalidating old additional rent at path: ${oldPath}`)

    revalidateTag('additional-rents')
    revalidateTag(`additional-rent_${previousDoc.slug}`)
  }

  return doc
}
