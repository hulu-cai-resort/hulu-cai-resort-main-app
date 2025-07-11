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
      return <Users {...iconProps} />

    case 'single':
    case 'super-single':
      return <BedSingle {...iconProps} />

    case 'bunk-bed':
      return <Home {...iconProps} />

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
