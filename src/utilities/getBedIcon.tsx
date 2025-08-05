import React from 'react'
import { Bed, BedDouble, BedSingle, Home, Users } from 'lucide-react'

export type BedType =
  | 'super-king'
  | 'king'
  | 'queen'
  | 'full-double'
  | 'twin'
  | 'single'
  | 'super-single'
  | 'bunk-bed'
  | 'sleeping-bag'

export function getBedIcon(bedType: BedType, size: number = 20): React.ReactNode {
  const iconProps = {
    size: size,
    className: 'text-gray-600',
  }

  switch (bedType) {
    case 'super-king':
    case 'king':
    case 'queen':
    case 'full-double':
      return <BedDouble {...iconProps} />

    case 'twin':
      return (
        <svg
          width={iconProps.size}
          height={iconProps.size}
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
          className={iconProps.className}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Left bed - less rounded at the top */}
          <rect x="2" y="26" width="28" height="14" rx="3" />
          <rect x="5" y="16" width="22" height="10" rx="2" />
          <path d="M2 40v6" />
          <path d="M30 40v6" />
          {/* Right bed - less rounded at the top */}
          <rect x="34" y="26" width="28" height="14" rx="3" />
          <rect x="37" y="16" width="22" height="10" rx="2" />
          <path d="M34 40v6" />
          <path d="M62 40v6" />
        </svg>
      )

    case 'single':
    case 'super-single':
      return <BedSingle {...iconProps} />

    case 'bunk-bed':
      return (
        <svg
          width={iconProps.size}
          height={iconProps.size}
          viewBox="0 0 64 48"
          fill="none"
          stroke="currentColor"
          className={iconProps.className}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Bed posts */}
          <rect x="8" y="6" width="4" height="36" rx="2" />
          <rect x="52" y="6" width="4" height="36" rx="2" />
          {/* Top bunk frame */}
          <rect x="12" y="8" width="40" height="10" rx="3" fill="white" />
          {/* Top pillow */}
          <rect
            x="14"
            y="10"
            width="8"
            height="6"
            rx="2"
            fill="white"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          {/* Bottom bunk frame */}
          <rect x="12" y="28" width="40" height="10" rx="3" fill="white" />
          {/* Bottom pillow */}
          <rect
            x="14"
            y="30"
            width="8"
            height="6"
            rx="2"
            fill="white"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          {/* Ladder */}
          <rect x="24" y="20" width="4" height="18" rx="1.2" />
          <rect x="32" y="20" width="4" height="18" rx="1.2" />
          <line x1="26" y1="24" x2="34" y2="24" />
          <line x1="26" y1="29" x2="34" y2="29" />
          <line x1="26" y1="34" x2="34" y2="34" />
        </svg>
      )

    case 'sleeping-bag':
      return <Bed {...iconProps} />

    default:
      return <Bed {...iconProps} />
  }
}

export function getBedLabel(bedType: BedType): string {
  switch (bedType) {
    case 'super-king':
      return 'Super King Bed'
    case 'king':
      return 'King Bed'
    case 'queen':
      return 'Queen Bed'
    case 'full-double':
      return 'Full/Double Bed'
    case 'twin':
      return 'Twin Beds'
    case 'single':
      return 'Single Bed'
    case 'super-single':
      return 'Super Single Bed'
    case 'bunk-bed':
      return 'Bunk Bed'
    case 'sleeping-bag':
      return 'Sleeping Bag'
    default:
      return 'Bed'
  }
}
