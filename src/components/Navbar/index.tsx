'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'

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
  const { scrollYProgress } = useScroll()
  const [visible, setVisible] = useState(true)
  const [isAtTop, setIsAtTop] = useState(true)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const pathname = usePathname()

  useMotionValueEvent(scrollYProgress, 'change', (current) => {
    if (typeof current === 'number') {
      const direction = current! - scrollYProgress.getPrevious()!

      if (current < 0.05) {
        setVisible(true)
        setIsAtTop(true)
      } else {
        setIsAtTop(false)
        if (direction < 0 || showMobileMenu) {
          setVisible(true)
        } else {
          setVisible(false)
        }
      }
    }
  })

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className="fixed left-0 right-0 top-0 z-40 pt-10"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-16 lg:px-40 xl:justify-center xl:px-0">
          {/* Logo Section */}
          <div className="mr-4 md:mr-9">
            <div
              className={`flex h-[72px] w-[72px] items-center justify-center rounded-lg border border-white/50 saturate-[1.2] backdrop-blur-[2px] ${
                isAtTop ? 'bg-white/5' : 'bg-primary/80'
              }`}
            >
              <Link href="/" className="flex h-full w-full items-center justify-center">
                <Image src="/assets/logo.png" alt="Hulu Cai Camp" width={52} height={52} />
              </Link>
            </div>
          </div>

          {/* Navigation Menu - Desktop */}
          <nav
            className={`hidden items-center gap-3 rounded-full border border-white/50 p-2 saturate-[1.2] backdrop-blur-[2px] xl:flex ${
              isAtTop ? 'bg-white/5' : 'bg-primary/80'
            }`}
          >
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`font-raleway flex items-center justify-center whitespace-nowrap rounded-full px-6 py-3 text-base font-semibold leading-[1.75em] transition-all duration-200 ${
                    isActive
                      ? 'border border-white/50 bg-white/20 font-semibold text-white'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className={`flex h-[72px] w-[72px] items-center justify-center rounded-lg border border-white/50 text-white saturate-[1.2] backdrop-blur-[2px] xl:hidden ${
              isAtTop ? 'bg-white/5' : 'bg-primary/80'
            }`}
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <div className="relative h-6 w-6">
              <div
                className={`absolute left-0 top-0 h-6 w-6 transform transition-transform duration-500 ease-in-out ${
                  showMobileMenu ? 'rotate-0 opacity-100' : 'rotate-180 opacity-0'
                }`}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div
                className={`absolute left-0 top-0 h-6 w-6 transform transition-transform duration-500 ease-in-out ${
                  showMobileMenu ? 'rotate-180 opacity-0' : 'rotate-0 opacity-100'
                }`}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </div>
            </div>
          </button>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <motion.div
          key="mobileMenu"
          initial={{
            opacity: 0,
            y: -100,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          exit={{
            opacity: 0,
            y: -100,
          }}
          transition={{
            duration: 0.5,
          }}
          className="fixed left-0 right-0 top-[102px] z-30 mx-auto max-w-7xl px-6 md:px-16 lg:px-40 xl:hidden"
        >
          <div
            className={`rounded-2xl border border-white/50 p-4 shadow-2xl saturate-[1.2] backdrop-blur-[2px] ${
              isAtTop ? 'bg-white/5' : 'bg-primary/80'
            }`}
          >
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setShowMobileMenu(false)}
                    className={`font-raleway flex items-center justify-center whitespace-nowrap rounded-full px-6 py-4 text-base font-semibold leading-[1.75em] transition-all duration-200 ${
                      isActive
                        ? 'border border-white/50 bg-white/20 font-semibold text-white'
                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
