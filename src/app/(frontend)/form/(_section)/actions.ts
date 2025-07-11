'use server'

import { getPayload } from 'payload'
import config from '@payload-config'

export async function createCustomerAction(data: any) {
  try {
    const payload = await getPayload({ config })
    await payload.create({
      // Cast to any to avoid type mismatch until Payload generates updated types
      collection: 'customers' as any,
      data,
    })
    return { success: true }
  } catch (error) {
    console.error('Error submitting form:', error)
    return { success: false, error: 'Terjadi kesalahan saat mengirim reservasi' }
  }
}
