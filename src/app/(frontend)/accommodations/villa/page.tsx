import { VillaPage } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import ScrollIndicator from '@/components/ScrollIndicator'
import { AccommodationHeroSection } from '@/components/AccommodationHeroSection'
import AccommodationsDetail from './(_sections)/AccommodationsDetail'

// Dummy data for accommodations
const accommodationsData = [
  {
    id: 1,
    name: 'Villa Bukit Indah Hills',
    location: 'Hills Babakan',
    images: [
      '/api/placeholder/460/460',
      '/api/placeholder/222/222',
      '/api/placeholder/222/222',
      '/api/placeholder/222/222',
      '/api/placeholder/222/222',
    ],
    imageCount: 13,
    description:
      'The luxurious 130-square-meter Two Bedroom Ocean View Suites offer an upgraded experience with breathtaking views of the Indian Ocean. These spacious suites feature a private balcony, walk-in closet, and king-size canopy bed. The living area includes a cozy L-shaped sofa and plasma TV, complemented by two elegant marble bathrooms for a g-size canopy bed. The living area includes a cozy L-shaped sofa and plasma TV, complemented by two elegant marble bathrooms for a',
    facilities: [
      { icon: 'wifi', name: 'Wifi' },
      { icon: 'tv', name: 'Smart TV' },
      { icon: 'ac', name: 'AC' },
      { icon: 'parking', name: 'Free parking' },
    ],
    amenities: [
      { icon: 'wifi', name: 'Smoking Area' },
      { icon: 'tv', name: 'Toileteries' },
      { icon: 'jacuzzi', name: 'Jacuzzi' },
      { icon: 'coffee', name: 'Free Coffee' },
      { icon: 'ac', name: 'Air Conditioning' },
      { icon: 'parking', name: 'Parking Area' },
    ],
    capacity: {
      type: 'Super Executive',
      size: '129 sqm',
      floors: 3,
      bedrooms: 5,
      bathrooms: '5 + 1',
      guests: '10 + 10',
      extraBeds: 10,
    },
    bedArrangements: [
      { room: 'Kamar 1', bedType: '1 King Bed', bedIcon: 'king' },
      { room: 'Kamar 2', bedType: '1 King Bed', bedIcon: 'king' },
      { room: 'Kamar 3', bedType: '1 Queen Bed', bedIcon: 'queen' },
      { room: 'Kamar 4', bedType: '2 Single Bed', bedIcon: 'single' },
      { room: 'Kamar 5', bedType: '2 Single Bed', bedIcon: 'single' },
      { room: 'Kamar 6', bedType: '1 King Bed', bedIcon: 'king' },
    ],
    pricing: {
      startingPrice: 'IDR 1.200.000',
      unit: '/villa/malam',
    },
  },
  {
    id: 2,
    name: 'Villa Sunset Paradise',
    location: 'Ocean View',
    images: [
      '/api/placeholder/460/460',
      '/api/placeholder/222/222',
      '/api/placeholder/222/222',
      '/api/placeholder/222/222',
      '/api/placeholder/222/222',
    ],
    imageCount: 15,
    description:
      'Experience ultimate luxury in our Ocean View Villa featuring panoramic sunset views and premium amenities. This expansive villa includes private pool access, dedicated butler service, and world-class dining facilities. Perfect for families and groups seeking an unforgettable getaway with modern comfort and traditional elegance combined in perfect harmony.',
    facilities: [
      { icon: 'wifi', name: 'High-Speed Wifi' },
      { icon: 'tv', name: 'Smart TV' },
      { icon: 'ac', name: 'Central AC' },
      { icon: 'parking', name: 'Private Parking' },
    ],
    amenities: [
      { icon: 'jacuzzi', name: 'Private Pool' },
      { icon: 'coffee', name: 'Mini Bar' },
      { icon: 'wifi', name: 'Butler Service' },
      { icon: 'tv', name: 'Entertainment Room' },
      { icon: 'ac', name: 'Climate Control' },
      { icon: 'parking', name: 'Valet Parking' },
    ],
    capacity: {
      type: 'Presidential',
      size: '180 sqm',
      floors: 2,
      bedrooms: 4,
      bathrooms: '4 + 2',
      guests: '8 + 4',
      extraBeds: 4,
    },
    bedArrangements: [
      { room: 'Master Suite', bedType: '1 King Bed', bedIcon: 'king' },
      { room: 'Ocean Room', bedType: '1 Queen Bed', bedIcon: 'queen' },
      { room: 'Garden Room', bedType: '1 Queen Bed', bedIcon: 'queen' },
      { room: 'Twin Room', bedType: '2 Single Bed', bedIcon: 'single' },
    ],
    pricing: {
      startingPrice: 'IDR 2.500.000',
      unit: '/villa/malam',
    },
  },
]

export default async function Accommodations() {
  const villaPage = (await getCachedGlobal('accommodations-page', 1)()) as VillaPage

  return (
    <>
      <AccommodationHeroSection accommodationPage={villaPage} showButtons={false} />
      <ScrollIndicator href="#accommodations" />
      <AccommodationsDetail accommodations={accommodationsData} />
    </>
  )
}
