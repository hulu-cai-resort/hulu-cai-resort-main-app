import { CampingGroundPage } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import ScrollIndicator from '@/components/ScrollIndicator'
import { AccommodationHeroSection } from '@/components/AccommodationHeroSection'
import AccommodationsDetail from '../villa/(_sections)/AccommodationsDetail'

// Dummy data for camping ground accommodations
const accommodationsData = [
  {
    id: 1,
    name: 'Forest Camping Site',
    location: 'Pine Grove Area',
    images: [
      '/api/placeholder/460/460',
      '/api/placeholder/222/222',
      '/api/placeholder/222/222',
      '/api/placeholder/222/222',
      '/api/placeholder/222/222',
    ],
    imageCount: 6,
    description:
      'Experience true outdoor adventure at our Forest Camping Site. This spacious 50-square-meter area provides level ground for tents with easy access to shared facilities. Surrounded by towering pine trees and mountain views, this site offers the perfect base for hiking, stargazing, and connecting with nature. Shared bathroom facilities and fire pit areas are conveniently located nearby.',
    facilities: [
      { icon: 'restroom', name: 'Shared Restrooms' },
      { icon: 'shower', name: 'Hot Showers' },
      { icon: 'fire', name: 'Fire Pit' },
      { icon: 'water', name: 'Fresh Water' },
    ],
    amenities: [
      { icon: 'fire', name: 'Campfire Area' },
      { icon: 'picnic', name: 'Picnic Table' },
      { icon: 'trash', name: 'Waste Disposal' },
      { icon: 'water', name: 'Potable Water' },
      { icon: 'security', name: '24/7 Security' },
      { icon: 'parking', name: 'Parking Area' },
    ],
    capacity: {
      type: 'Standard Camping',
      size: '50 sqm',
      floors: 1,
      bedrooms: 0,
      bathrooms: 'Shared',
      guests: '4 + 2',
      extraBeds: 0,
    },
    bedArrangements: [{ room: 'Tent Area', bedType: 'Bring Your Own', bedIcon: 'tent' }],
    pricing: {
      startingPrice: 'IDR 200.000',
      unit: '/site/malam',
    },
  },
  {
    id: 2,
    name: 'Premium Camping Ground',
    location: 'Mountain View Ridge',
    images: [
      '/api/placeholder/460/460',
      '/api/placeholder/222/222',
      '/api/placeholder/222/222',
      '/api/placeholder/222/222',
      '/api/placeholder/222/222',
    ],
    imageCount: 10,
    description:
      'Our Premium Camping Ground offers 80-square-meters of prime camping space with stunning mountain panoramic views. Features include elevated tent platforms, private fire ring, and proximity to premium facilities. This site comes with electrical hookups, enhanced privacy screening, and direct trail access for hiking adventures. Perfect for families and groups seeking a comfortable outdoor experience.',
    facilities: [
      { icon: 'electricity', name: 'Electrical Hookup' },
      { icon: 'restroom', name: 'Private Restroom' },
      { icon: 'shower', name: 'Hot Showers' },
      { icon: 'bbq', name: 'BBQ Station' },
    ],
    amenities: [
      { icon: 'platform', name: 'Tent Platform' },
      { icon: 'fire', name: 'Private Fire Ring' },
      { icon: 'electricity', name: 'Power Outlet' },
      { icon: 'lighting', name: 'Site Lighting' },
      { icon: 'storage', name: 'Storage Box' },
      { icon: 'trail', name: 'Trail Access' },
    ],
    capacity: {
      type: 'Premium Camping',
      size: '80 sqm',
      floors: 1,
      bedrooms: 0,
      bathrooms: 'Private',
      guests: '6 + 2',
      extraBeds: 0,
    },
    bedArrangements: [
      { room: 'Platform Area', bedType: 'Large Tent Space', bedIcon: 'tent' },
      { room: 'Overflow Area', bedType: 'Additional Space', bedIcon: 'tent' },
    ],
    pricing: {
      startingPrice: 'IDR 350.000',
      unit: '/site/malam',
    },
  },
]

export default async function CampingGround() {
  const campingGroundPage = (await getCachedGlobal('camping-ground-page', 1)()) as CampingGroundPage

  return (
    <>
      <AccommodationHeroSection accommodationPage={campingGroundPage} />
      <ScrollIndicator />
      <AccommodationsDetail accommodations={accommodationsData} />
    </>
  )
}
