import React from 'react'
import { Star, Award, Crown, Gem, Shield } from 'lucide-react'

export type UnitType = 'super-executive' | 'executive' | 'deluxe' | 'superior' | 'standard'

export function getUnitTypeLabel(unitType: UnitType | null | undefined): string {
  if (!unitType) return 'Standard'

  switch (unitType) {
    case 'super-executive':
      return 'Super Executive'
    case 'executive':
      return 'Executive'
    case 'deluxe':
      return 'Deluxe'
    case 'superior':
      return 'Superior'
    case 'standard':
      return 'Standard'
    default:
      return 'Standard'
  }
}

export function getUnitTypeIcon(
  unitType: UnitType | null | undefined,
  size: number = 20,
): React.ReactNode {
  const iconProps = {
    size: size,
    className: 'text-yellow-600',
  }

  if (!unitType) return <Star {...iconProps} />

  switch (unitType) {
    case 'super-executive':
      return <Crown {...iconProps} />
    case 'executive':
      return <Gem {...iconProps} />
    case 'deluxe':
      return <Award {...iconProps} />
    case 'superior':
      return <Shield {...iconProps} />
    case 'standard':
      return <Star {...iconProps} />
    default:
      return <Star {...iconProps} />
  }
}

export function getUnitTypeRating(unitType: UnitType | null | undefined): number {
  if (!unitType) return 3

  switch (unitType) {
    case 'super-executive':
      return 5
    case 'executive':
      return 4.5
    case 'deluxe':
      return 4
    case 'superior':
      return 3.5
    case 'standard':
      return 3
    default:
      return 3
  }
}
