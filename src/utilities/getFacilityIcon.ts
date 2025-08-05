import React from 'react'
import {
  Wifi,
  Tv,
  Wind,
  Waves,
  Home,
  Bath,
  Utensils,
  ShieldCheck,
  Shirt,
  Fan,
  Droplets,
  Building,
  Briefcase,
  Refrigerator,
  Microwave,
  CookingPot,
  Coffee,
  Wine,
  Dot,
  ShowerHead,
  Droplet,
  SoapDispenserDroplet,
  Book,
  LandPlot,
  WavesLadder,
  Heater,
  PersonStanding,
  Monitor,
  HandPlatter,
  Sofa,
  FlameKindling,
  UtensilsCrossed,
  GlassWater,
  AirVent,
} from 'lucide-react'

interface FacilityIconMap {
  [key: string]: React.ComponentType<{ size?: number; className?: string }>
}

const facilityIconMap: FacilityIconMap = {
  // Outdoor & Views
  rooftop: Building,
  balcony: Home,
  terrace: LandPlot,
  privatePool: Waves,
  jacuzzi: Heater,

  // Spaces
  commonSpace: PersonStanding,
  kitchen: CookingPot,
  dedicatedWorkspace: Briefcase,

  // Climate Control
  airConditioning: AirVent,
  fan: Fan,

  // Entertainment
  tv: Tv,
  smartTv: Monitor,
  wifi: Wifi,

  // Bathroom
  bathtub: Bath,
  shower: ShowerHead,
  hotWater: Droplet,
  bodySoap: SoapDispenserDroplet,
  shampoo: SoapDispenserDroplet,
  conditioner: SoapDispenserDroplet,
  towels: Book,

  // Safety & Storage
  safe: ShieldCheck,
  clothingStorage: Shirt,

  // Dining & Living
  diningTable: HandPlatter,
  sofaLounger: Sofa,

  // Kitchen Appliances
  stove: FlameKindling,
  minibar: Wine,
  refrigerator: Refrigerator,
  microwave: Microwave,
  riceCooker: CookingPot,
  toaster: Heater,
  cookingUtensils: Utensils,
  dishesSilverware: UtensilsCrossed,
  hotWaterKettle: GlassWater,
  coffeeMaker: Coffee,
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
