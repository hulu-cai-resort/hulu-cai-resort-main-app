import React from 'react'
import {
  Wifi,
  Tv,
  Wind,
  Car,
  Coffee,
  Waves,
  Home,
  Bath,
  Utensils,
  ShieldCheck,
  Shirt,
  Car as Parking,
  ChefHat,
  Snowflake,
  Fan,
  Droplets,
  Sun,
  Users,
  Building,
  Briefcase,
  Sparkles,
  Package,
  Zap,
  Refrigerator,
  Microwave,
  CookingPot,
  Coffee as CoffeeMaker,
  Wine,
  Dot,
} from 'lucide-react'

interface FacilityIconMap {
  [key: string]: React.ComponentType<{ size?: number; className?: string }>
}

const facilityIconMap: FacilityIconMap = {
  // Outdoor & Views
  rooftop: Building,
  balcony: Home,
  terrace: Sun,
  privatePool: Waves,
  jacuzzi: Waves,

  // Spaces
  commonSpace: Users,
  kitchen: ChefHat,
  dedicatedWorkspace: Briefcase,

  // Climate Control
  airConditioning: Wind,
  fan: Fan,

  // Entertainment
  tv: Tv,
  smartTv: Tv,
  wifi: Wifi,

  // Bathroom
  bathtub: Bath,
  shower: Droplets,
  hotWater: Droplets,
  bodySoap: Sparkles,
  shampoo: Package,
  conditioner: Package,
  towels: Shirt,

  // Safety & Storage
  safe: ShieldCheck,
  clothingStorage: Shirt,

  // Dining & Living
  diningTable: Utensils,
  sofaLounger: Home,

  // Kitchen Appliances
  stove: CookingPot,
  minibar: Wine,
  refrigerator: Refrigerator,
  microwave: Microwave,
  riceCooker: CookingPot,
  toaster: Zap,
  cookingUtensils: CookingPot,
  dishesSilverware: Utensils,
  hotWaterKettle: Coffee,
  coffeeMaker: CoffeeMaker,
  waterDispenser: Droplets,
  coffeeTeaSugar: Coffee,
}

export function getFacilityIcon(
  facilityKey: string,
  size: number = 18,
  className: string = 'text-gray-900',
) {
  const IconComponent = facilityIconMap[facilityKey] || Dot
  return React.createElement(IconComponent, { size, className })
}

export function groupFacilities(accommodation: any) {
  const groups = {
    facilities: {
      title: 'Facilities',
      facilities: [
        { key: 'rooftop', label: 'Rooftop' },
        { key: 'balcony', label: 'Balcony' },
        { key: 'terrace', label: 'Terrace' },
        { key: 'privatePool', label: 'Private Pool' },
        { key: 'jacuzzi', label: 'Jacuzzi' },
        { key: 'commonSpace', label: 'Common Space' },
        { key: 'kitchen', label: 'Kitchen' },
        { key: 'dedicatedWorkspace', label: 'Dedicated Workspace' },
      ],
    },
    cooling: {
      title: 'Cooling',
      facilities: [
        { key: 'airConditioning', label: 'AC' },
        { key: 'fan', label: 'Fan' },
      ],
    },
    entertainment: {
      title: 'Entertainment',
      facilities: [
        { key: 'tv', label: 'TV' },
        { key: 'smartTv', label: 'Smart TV' },
        { key: 'wifi', label: 'Wifi' },
      ],
    },
    bathroom: {
      title: 'Bathroom',
      facilities: [
        { key: 'bathtub', label: 'Bathtub' },
        { key: 'shower', label: 'Shower' },
        { key: 'hotWater', label: 'Hot Water' },
        { key: 'bodySoap', label: 'Body Soap' },
        { key: 'shampoo', label: 'Shampoo' },
        { key: 'conditioner', label: 'Conditioner' },
      ],
    },
    bedroomLaundry: {
      title: 'Bedroom & Laundry',
      facilities: [
        { key: 'towels', label: 'Towels' },
        { key: 'safe', label: 'Safe' },
        { key: 'clothingStorage', label: 'Clothing Storage' },
      ],
    },
    commonSpace: {
      title: 'Common Space',
      facilities: [
        { key: 'diningTable', label: 'Dining Table' },
        { key: 'sofaLounger', label: 'Sofa/Lounger' },
      ],
    },
    kitchen: {
      title: 'Kitchen',
      facilities: [
        { key: 'stove', label: 'Stove' },
        { key: 'minibar', label: 'Minibar' },
        { key: 'refrigerator', label: 'Refrigerator' },
        { key: 'microwave', label: 'Microwave' },
        { key: 'riceCooker', label: 'Rice Cooker' },
        { key: 'toaster', label: 'Toaster' },
        { key: 'cookingUtensils', label: 'Cooking Utensils' },
        { key: 'dishesSilverware', label: 'Dishes and Silverware' },
        { key: 'hotWaterKettle', label: 'Hot Water Kettle' },
        { key: 'coffeeMaker', label: 'Coffee Maker' },
        { key: 'waterDispenser', label: 'Water Dispenser' },
        { key: 'coffeeTeaSugar', label: 'Coffee, Tea, and Sugar' },
      ],
    },
  }

  // Filter out facilities that are false or null and return grouped facilities
  const availableGroups = Object.entries(groups)
    .map(([groupKey, group]) => ({
      ...group,
      facilities: group.facilities.filter((facility) => accommodation[facility.key] === true),
    }))
    .filter((group) => group.facilities.length > 0)

  return availableGroups
}
