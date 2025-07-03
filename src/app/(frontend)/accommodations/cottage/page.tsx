import { CottagePage } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import ScrollIndicator from '@/components/ScrollIndicator'
import { AccommodationHeroSection } from '@/components/AccommodationHeroSection'
import AccommodationsDetail from '../villa/(_sections)/AccommodationsDetail'

// Dummy data for cottage accommodations
const accommodationsData = [
  {
    id: 1,
    name: 'Charming Garden Cottage',
    location: 'Flower Garden Area',
    images: [
      '/api/placeholder/460/460',
      '/api/placeholder/222/222',
      '/api/placeholder/222/222',
      '/api/placeholder/222/222',
      '/api/placeholder/222/222',
    ],
    imageCount: 9,
    description:
      'Discover peace and tranquility in our 70-square-meter Charming Garden Cottage. This quaint retreat features traditional cottage architecture with flower-filled gardens, cozy interior design, and mountain views. The cottage includes a comfortable living area with vintage furnishings, fully equipped kitchenette, and a private garden terrace perfect for morning tea and peaceful evenings.',
    facilities: [
      { icon: 'wifi', name: 'Garden WiFi' },
      { icon: 'tv', name: 'Classic TV' },
      { icon: 'kitchen', name: 'Kitchenette' },
      { icon: 'garden', name: 'Private Garden' },
    ],
    amenities: [
      { icon: 'garden', name: 'Flower Garden' },
      { icon: 'terrace', name: 'Garden Terrace' },
      { icon: 'kitchen', name: 'Full Kitchenette' },
      { icon: 'reading', name: 'Reading Nook' },
      { icon: 'heating', name: 'Cozy Heating' },
      { icon: 'parking', name: 'Garden Parking' },
    ],
    capacity: {
      type: 'Garden Cottage',
      size: '70 sqm',
      floors: 1,
      bedrooms: 2,
      bathrooms: '1 + 1',
      guests: '4 + 1',
      extraBeds: 1,
    },
    bedArrangements: [
      { room: 'Master Bedroom', bedType: '1 Queen Bed', bedIcon: 'queen' },
      { room: 'Cozy Room', bedType: '2 Single Bed', bedIcon: 'single' },
    ],
    pricing: {
      startingPrice: 'IDR 650.000',
      unit: '/cottage/malam',
    },
  },
  {
    id: 2,
    name: 'Heritage Mountain Cottage',
    location: 'Heritage Hills',
    images: [
      '/api/placeholder/460/460',
      '/api/placeholder/222/222',
      '/api/placeholder/222/222',
      '/api/placeholder/222/222',
      '/api/placeholder/222/222',
    ],
    imageCount: 14,
    description:
      'Step back in time with our Heritage Mountain Cottage, a beautifully restored 100-square-meter traditional home. Featuring original wooden beams, antique furnishings, and panoramic mountain vistas. This premium cottage includes a spacious living room with stone fireplace, dining area, full kitchen, and wraparound veranda with rocking chairs for the ultimate relaxation experience.',
    facilities: [
      { icon: 'wifi', name: 'Heritage WiFi' },
      { icon: 'tv', name: 'Smart TV' },
      { icon: 'fireplace', name: 'Stone Fireplace' },
      { icon: 'kitchen', name: 'Full Kitchen' },
    ],
    amenities: [
      { icon: 'fireplace', name: 'Stone Fireplace' },
      { icon: 'veranda', name: 'Wraparound Veranda' },
      { icon: 'kitchen', name: 'Gourmet Kitchen' },
      { icon: 'antique', name: 'Antique Furnishings' },
      { icon: 'library', name: 'Book Library' },
      { icon: 'rocking', name: 'Rocking Chairs' },
    ],
    capacity: {
      type: 'Heritage Cottage',
      size: '100 sqm',
      floors: 2,
      bedrooms: 3,
      bathrooms: '2 + 1',
      guests: '6 + 2',
      extraBeds: 2,
    },
    bedArrangements: [
      { room: 'Heritage Suite', bedType: '1 King Bed', bedIcon: 'king' },
      { room: 'Mountain Room', bedType: '1 Queen Bed', bedIcon: 'queen' },
      { room: 'Loft Room', bedType: '2 Single Bed', bedIcon: 'single' },
    ],
    pricing: {
      startingPrice: 'IDR 1.100.000',
      unit: '/cottage/malam',
    },
  },
]

export default async function Cottage() {
  const cottagePage = (await getCachedGlobal('cottage-page', 1)()) as CottagePage

  return (
    <>
      <AccommodationHeroSection accommodationPage={cottagePage} />
      <ScrollIndicator />
      <AccommodationsDetail accommodations={accommodationsData} />
    </>
  )
}
