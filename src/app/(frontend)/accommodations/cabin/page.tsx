import { CabinPage } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import ScrollIndicator from '@/components/ScrollIndicator'
import { AccommodationHeroSection } from '@/components/AccommodationHeroSection'
import AccommodationsDetail from '../villa/(_sections)/AccommodationsDetail'

// Dummy data for cabin accommodations
const accommodationsData = [
  {
    id: 1,
    name: 'Rustic Pine Cabin',
    location: 'Forest Ridge',
    images: [
      '/api/placeholder/460/460',
      '/api/placeholder/222/222',
      '/api/placeholder/222/222',
      '/api/placeholder/222/222',
      '/api/placeholder/222/222',
    ],
    imageCount: 8,
    description:
      'Experience authentic mountain living in our 80-square-meter Rustic Pine Cabin. Built with natural wood and stone, this cozy retreat features a fireplace, rustic furnishings, and panoramic forest views. The cabin includes a comfortable living area with wooden beams, traditional mountain decor, and all essential amenities for a peaceful stay surrounded by towering pine trees.',
    facilities: [
      { icon: 'wifi', name: 'Wifi' },
      { icon: 'tv', name: 'Cable TV' },
      { icon: 'fireplace', name: 'Fireplace' },
      { icon: 'parking', name: 'Free parking' },
    ],
    amenities: [
      { icon: 'fireplace', name: 'Wood Fireplace' },
      { icon: 'coffee', name: 'Coffee Maker' },
      { icon: 'kitchen', name: 'Kitchenette' },
      { icon: 'heating', name: 'Central Heating' },
      { icon: 'wifi', name: 'Mountain WiFi' },
      { icon: 'parking', name: 'Private Parking' },
    ],
    capacity: {
      type: 'Rustic Cabin',
      size: '80 sqm',
      floors: 1,
      bedrooms: 2,
      bathrooms: '1 + 1',
      guests: '4 + 2',
      extraBeds: 2,
    },
    bedArrangements: [
      { room: 'Master Room', bedType: '1 Queen Bed', bedIcon: 'queen' },
      { room: 'Bunk Room', bedType: '2 Single Bed', bedIcon: 'single' },
    ],
    pricing: {
      startingPrice: 'IDR 800.000',
      unit: '/cabin/malam',
    },
  },
  {
    id: 2,
    name: 'Mountain Lodge Cabin',
    location: 'Alpine Heights',
    images: [
      '/api/placeholder/460/460',
      '/api/placeholder/222/222',
      '/api/placeholder/222/222',
      '/api/placeholder/222/222',
      '/api/placeholder/222/222',
    ],
    imageCount: 12,
    description:
      'Our premium Mountain Lodge Cabin offers 120-square-meters of rustic luxury with modern comfort. Featuring stone architecture, vaulted ceilings, and floor-to-ceiling windows showcasing breathtaking mountain vistas. The cabin includes a fully equipped kitchen, spacious living area with leather furnishings, and a private deck perfect for morning coffee and evening stargazing.',
    facilities: [
      { icon: 'wifi', name: 'High-Speed Wifi' },
      { icon: 'tv', name: 'Smart TV' },
      { icon: 'fireplace', name: 'Stone Fireplace' },
      { icon: 'kitchen', name: 'Full Kitchen' },
    ],
    amenities: [
      { icon: 'fireplace', name: 'Stone Fireplace' },
      { icon: 'kitchen', name: 'Full Kitchen' },
      { icon: 'deck', name: 'Private Deck' },
      { icon: 'bbq', name: 'BBQ Grill' },
      { icon: 'heating', name: 'Radiant Heating' },
      { icon: 'laundry', name: 'Washer/Dryer' },
    ],
    capacity: {
      type: 'Premium Lodge',
      size: '120 sqm',
      floors: 2,
      bedrooms: 3,
      bathrooms: '2 + 1',
      guests: '6 + 2',
      extraBeds: 2,
    },
    bedArrangements: [
      { room: 'Master Loft', bedType: '1 King Bed', bedIcon: 'king' },
      { room: 'Forest Room', bedType: '1 Queen Bed', bedIcon: 'queen' },
      { room: 'Kids Room', bedType: '2 Single Bed', bedIcon: 'single' },
    ],
    pricing: {
      startingPrice: 'IDR 1.500.000',
      unit: '/cabin/malam',
    },
  },
]

export default async function Cabin() {
  const cabinPage = (await getCachedGlobal('cabin-page', 1)()) as CabinPage

  return (
    <>
      <AccommodationHeroSection accommodationPage={cabinPage} />
      <ScrollIndicator />
      <AccommodationsDetail accommodations={accommodationsData} />
    </>
  )
}
