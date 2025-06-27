import { revalidateTag } from 'next/cache'
import type { CollectionAfterChangeHook } from 'payload'

export const revalidateMeetingPackage: CollectionAfterChangeHook = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  if (doc._status === 'published') {
    const path = `/meeting-package/${doc.slug}`

    payload.logger.info(`Revalidating meeting package at path: ${path}`)

    revalidateTag('meeting-packages')
    revalidateTag(`meeting-package_${doc.slug}`)
  }

  if (previousDoc?._status === 'published' && doc._status !== 'published') {
    const oldPath = `/meeting-package/${previousDoc.slug}`

    payload.logger.info(`Revalidating old meeting package at path: ${oldPath}`)

    revalidateTag('meeting-packages')
    revalidateTag(`meeting-package_${previousDoc.slug}`)
  }

  return doc
}
