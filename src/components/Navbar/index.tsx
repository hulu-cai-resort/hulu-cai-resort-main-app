'use client'

import React from 'react'
import Link from 'next/link'
import { Logo } from '@/components/Logo/Logo'

interface NavItem {
  label: string
  href: string
}

const navItems: NavItem[] = [
  { label: 'Maps', href: '/maps' },
  { label: 'Accommodation', href: '/accommodations' },
  { label: 'Attraction & Amenities', href: '/attractions-amenities' },
  { label: 'Activities', href: '/activities' },
  { label: 'Dining', href: '/dining' },
  { label: 'Events', href: '/events' },
  { label: 'Reservation', href: '/reservation' },
]

export function Navbar() {
  return (
    <div className="fixed left-0 right-0 top-0 z-50 py-10">
      <div className="mx-auto flex max-w-7xl items-center justify-center px-40">
        {/* Logo Section */}
        <div className="mr-9">
          <div className="flex h-[72px] w-[72px] items-center justify-center rounded-lg border border-white/50 bg-white/5 p-3.5 saturate-[1.2] backdrop-blur-[1.5px]">
            <Link href="/" className="flex h-full w-full items-center justify-center">
              <Logo />
            </Link>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex items-center gap-3 rounded-full border border-white/50 bg-white/5 p-2 saturate-[1.2] backdrop-blur-[1.5px]">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="font-raleway flex items-center justify-center whitespace-nowrap rounded-full px-6 py-3 text-base font-normal leading-[1.75em] text-white/80 transition-all duration-200 hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
