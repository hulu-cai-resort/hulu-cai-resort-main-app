import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  const footerData = (await getCachedGlobal('footer', 1)()) as Footer

  return (
    <footer className="mt-auto border-t border-border bg-black text-white dark:bg-card">
      <div className="container flex flex-col gap-8 py-8 md:flex-row md:justify-between">
        <Link className="flex items-center" href="/">
          <Logo />
        </Link>

        <div className="flex flex-col-reverse items-start gap-4 md:flex-row md:items-center">
          <ThemeSelector />
          <div className="flex flex-col gap-2 text-sm">
            {footerData?.companyName && <div className="font-medium">{footerData.companyName}</div>}
            {footerData?.address && <div>{footerData.address}</div>}
            {footerData?.phone && <div>Phone: {footerData.phone}</div>}
            {footerData?.email && <div>Email: {footerData.email}</div>}
            {footerData?.instagramHandle && <div>Instagram: @{footerData.instagramHandle}</div>}
            {footerData?.copyright && (
              <div className="text-xs opacity-75">{footerData.copyright}</div>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
