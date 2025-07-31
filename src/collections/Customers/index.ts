import type { CollectionConfig } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'

export const Customers: CollectionConfig = {
  slug: 'customers',
  labels: {
    singular: 'Customer',
    plural: 'Customers',
  },
  access: {
    create: anyone,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
    admin: authenticated,
  },
  admin: {
    defaultColumns: [
      'nama',
      'email',
      'nomorTelepon',
      'paketAkomodasi',
      'paketMakan',
      'paketAktivitas',
      'tanggal',
      'createdAt',
    ],
    useAsTitle: 'nama',
  },
  fields: [
    { name: 'paketAkomodasi', type: 'text', required: true },
    { name: 'jumlahTamu', type: 'number', required: true },
    { name: 'paketMakan', type: 'text', required: true },
    { name: 'paketAktivitas', type: 'text', required: true },
    { name: 'tanggal', type: 'date', required: true },
    { name: 'keterangan', type: 'textarea' },
    { name: 'nama', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'nomorTelepon', type: 'text', required: true },
    { name: 'alamat', type: 'textarea', required: true },
  ],
  timestamps: true,
}
