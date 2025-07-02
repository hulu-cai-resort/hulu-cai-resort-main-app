'use client'

import React, { useState } from 'react'
import { MapPin, ChevronDown, Wifi, Tv, Wind, Car, Coffee, Waves } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// Custom styles for Swiper pagination
const swiperStyles = `
  .swiper-pagination-bullet {
    width: 8px !important;
    height: 8px !important;
    background: rgba(255, 255, 255, 0.5) !important;
    opacity: 1 !important;
  }
  .swiper-pagination-bullet-active {
    background: white !important;
  }
`

interface Facility {
  icon: string
  name: string
}

interface Capacity {
  type: string
  size: string
  floors: number
  bedrooms: number
  bathrooms: string
  guests: string
  extraBeds: number
}

interface BedArrangement {
  room: string
  bedType: string
  bedIcon: string
}

interface Pricing {
  startingPrice: string
  unit: string
}

interface Accommodation {
  id: number
  name: string
  location: string
  images: string[]
  imageCount: number
  description: string
  facilities: Facility[]
  amenities: Facility[]
  capacity: Capacity
  bedArrangements: BedArrangement[]
  pricing: Pricing
}

interface AccommodationsDetailProps {
  accommodations: Accommodation[]
}

function FacilityIcon({ iconName }: { iconName: string }) {
  const iconMap: { [key: string]: React.ReactNode } = {
    wifi: <Wifi className="h-4 w-4" />,
    tv: <Tv className="h-4 w-4" />,
    ac: <Wind className="h-4 w-4" />,
    parking: <Car className="h-4 w-4" />,
    coffee: <Coffee className="h-4 w-4" />,
    jacuzzi: <Waves className="h-4 w-4" />,
    smoking: <div className="h-4 w-4 rounded bg-green-600"></div>,
    toiletries: <div className="h-4 w-4 rounded bg-green-600"></div>,
    pool: <Waves className="h-4 w-4" />,
    kitchen: <div className="h-4 w-4 rounded bg-green-600"></div>,
  }

  return iconMap[iconName] || <div className="h-4 w-4 rounded bg-green-600"></div>
}

function BedIcon({ bedType }: { bedType: string }) {
  if (bedType === 'twin') {
    return (
      <div className="flex gap-2">
        <div className="h-6 w-6 rounded bg-gray-300"></div>
        <div className="h-6 w-6 rounded bg-gray-300"></div>
      </div>
    )
  }
  return <div className="h-12 w-12 rounded bg-gray-300"></div>
}

export default function AccommodationsDetail({ accommodations }: AccommodationsDetailProps) {
  const [showAllFacilities, setShowAllFacilities] = useState<{ [key: number]: boolean }>({})

  const toggleFacilities = (accommodationId: number) => {
    setShowAllFacilities((prev) => ({
      ...prev,
      [accommodationId]: !prev[accommodationId],
    }))
  }

  const getFacilityIcon = (iconName: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      wifi: <Wifi size={18} className="text-green-600" />,
      tv: <Tv size={18} className="text-green-600" />,
      ac: <Wind size={18} className="text-green-600" />,
      parking: <Car size={18} className="text-green-600" />,
      coffee: <Coffee size={18} className="text-green-600" />,
      jacuzzi: <Waves size={18} className="text-green-600" />,
    }
    return iconMap[iconName] || <div className="h-[18px] w-[18px] rounded-sm bg-green-600" />
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 xl:px-0">
      {/* Inject custom Swiper styles */}
      <style dangerouslySetInnerHTML={{ __html: swiperStyles }} />

      {accommodations.map((accommodation, index) => (
        <div key={accommodation.id} className="w-full">
          {/* Mobile Layout */}
          <div className="block md:hidden">
            <div className="space-y-6">
              {/* Header */}
              <div className="space-y-3">
                <h1 className="font-raleway text-2xl font-bold text-gray-900 md:text-4xl">
                  {accommodation.name}
                </h1>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-gray-600" />
                    <span className="text-gray-600">{accommodation.location}</span>
                  </div>
                  <span className="text-sm text-green-600">Map Location</span>
                </div>
              </div>

              {/* Image Swiper */}
              <div className="relative">
                <Swiper
                  modules={[Pagination]}
                  spaceBetween={0}
                  slidesPerView={1}
                  pagination={{
                    clickable: true,
                  }}
                  className="rounded-2xl"
                  style={
                    {
                      '--swiper-pagination-bottom': '16px',
                    } as React.CSSProperties
                  }
                >
                  {accommodation.images.map((image, idx) => (
                    <SwiperSlide key={idx}>
                      <div className="relative">
                        <img
                          src={image}
                          alt={`${accommodation.name} ${idx + 1}`}
                          className="h-64 w-full bg-blue-200 object-cover sm:h-80"
                        />
                        {idx === 0 && (
                          <div className="absolute right-4 top-4 rounded-full bg-black/50 px-3 py-1 text-sm text-white">
                            {accommodation.imageCount} photos
                          </div>
                        )}
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Description */}
              <div>
                <p className="text-justify leading-relaxed text-gray-600">
                  {accommodation.description}
                </p>
              </div>

              {/* Facilities */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <h3 className="mb-4 text-lg font-bold">General Facilities</h3>
                <div className="space-y-4">
                  {accommodation.facilities
                    .slice(0, showAllFacilities[accommodation.id] ? undefined : 4)
                    .map((facility, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        {getFacilityIcon(facility.icon)}
                        <span className="font-medium text-gray-800">{facility.name}</span>
                      </div>
                    ))}
                </div>

                <h3 className="mb-4 mt-6 text-lg font-bold">Amenities</h3>
                <div className="space-y-4">
                  {accommodation.amenities
                    .slice(0, showAllFacilities[accommodation.id] ? undefined : 4)
                    .map((amenity, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        {getFacilityIcon(amenity.icon)}
                        <span className="font-medium text-gray-800">{amenity.name}</span>
                      </div>
                    ))}
                </div>

                <button
                  onClick={() => toggleFacilities(accommodation.id)}
                  className="mt-4 flex items-center gap-2 font-medium text-green-600"
                >
                  <span>Show all facilities</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${showAllFacilities[accommodation.id] ? 'rotate-180' : ''}`}
                  />
                </button>
              </div>

              {/* Pricing */}
              <div className="rounded-2xl bg-green-600 p-6 text-white">
                <p className="mb-1 text-green-100">Mulai dari</p>
                <p className="mb-1 text-2xl font-semibold">{accommodation.pricing.startingPrice}</p>
                <p className="text-sm text-green-100">{accommodation.pricing.unit}</p>
              </div>

              {/* Unit & Capacity */}
              <div>
                <div className="mb-6 flex items-center gap-8">
                  <h3 className="text-lg font-bold">Unit & Kapasitas</h3>
                  <div className="h-px flex-1 bg-gray-300"></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg border border-gray-300 p-4 text-center">
                    <p className="text-sm font-medium">{accommodation.capacity.type}</p>
                    <p className="text-sm font-medium">{accommodation.capacity.size}</p>
                  </div>
                  <div className="rounded-lg border border-gray-300 p-4 text-center">
                    <p className="font-medium">{accommodation.capacity.floors}</p>
                    <p className="text-sm text-gray-600">Lantai</p>
                  </div>
                  <div className="rounded-lg border border-gray-300 p-4 text-center">
                    <p className="font-medium">{accommodation.capacity.bedrooms}</p>
                    <p className="text-sm text-gray-600">Kamar Tidur</p>
                  </div>
                  <div className="rounded-lg border border-gray-300 p-4 text-center">
                    <p className="font-medium">{accommodation.capacity.bathrooms}</p>
                    <p className="text-sm text-gray-600">Kamar Mandi</p>
                  </div>
                  <div className="rounded-lg border border-gray-300 p-4 text-center">
                    <p className="font-medium">{accommodation.capacity.guests}</p>
                    <p className="text-sm text-gray-600">Orang</p>
                  </div>
                  <div className="rounded-lg border border-gray-300 p-4 text-center">
                    <p className="font-medium">{accommodation.capacity.extraBeds}</p>
                    <p className="text-sm text-gray-600">Kasur Ekstra</p>
                  </div>
                </div>
              </div>

              {/* Bed Arrangements */}
              <div>
                <div className="mb-6 flex items-center gap-8">
                  <h3 className="text-lg font-bold">Pengaturan Kasur</h3>
                  <div className="h-px flex-1 bg-gray-300"></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {accommodation.bedArrangements.map((bed, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 rounded-lg border border-gray-300 p-4"
                    >
                      <div className="h-12 w-12 flex-shrink-0 rounded bg-gray-200"></div>
                      <div>
                        <p className="text-sm font-medium">{bed.room}</p>
                        <p className="text-sm text-gray-600">{bed.bedType}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tablet Layout */}
          <div className="hidden md:block xl:hidden">
            <div className="space-y-6">
              {/* Header */}
              <div className="space-y-3">
                <h1 className="font-raleway text-4xl font-bold text-gray-900">
                  {accommodation.name}
                </h1>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-gray-600" />
                    <span className="text-gray-600">{accommodation.location}</span>
                  </div>
                  <span className="text-green-600">Map Location</span>
                </div>
              </div>

              {/* Image Gallery */}
              <div className="flex gap-3">
                <div className="w-1/2 flex-shrink-0">
                  <img
                    src={accommodation.images[0]}
                    alt={accommodation.name}
                    className="h-96 w-full rounded-2xl bg-blue-300 object-cover"
                  />
                </div>
                <div className="grid w-1/2 grid-cols-2 gap-3">
                  <img
                    src={accommodation.images[1]}
                    alt={`${accommodation.name} 1`}
                    className="h-full w-full rounded-2xl bg-green-300 object-cover"
                  />
                  <img
                    src={accommodation.images[2]}
                    alt={`${accommodation.name} 2`}
                    className="h-full w-full rounded-2xl bg-yellow-300 object-cover"
                  />

                  <img
                    src={accommodation.images[3]}
                    alt={`${accommodation.name} 3`}
                    className="h-full w-full rounded-2xl bg-red-300 object-cover"
                  />
                  <img
                    src={accommodation.images[4]}
                    alt={`${accommodation.name} 4`}
                    className="h-full w-full rounded-2xl bg-purple-300 object-cover"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <p className="text-justify leading-relaxed text-gray-600">
                  {accommodation.description}
                </p>
              </div>

              {/* Main Content with Sidebar */}
              <div className="flex gap-10">
                {/* Left Content */}
                <div className="flex-1 space-y-8">
                  {/* Unit & Capacity */}
                  <div>
                    <div className="mb-6 flex items-center gap-8">
                      <h3 className="text-lg font-bold">Unit & Kapasitas</h3>
                      <div className="h-px flex-1 bg-gray-300"></div>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <div className="min-w-[130px] rounded-lg border border-gray-300 p-4 text-center">
                        <p className="font-medium">{accommodation.capacity.type}</p>
                        <p className="font-medium">{accommodation.capacity.size}</p>
                      </div>
                      <div className="min-w-[130px] rounded-lg border border-gray-300 p-4 text-center">
                        <p className="font-medium">{accommodation.capacity.floors}</p>
                        <p className="text-sm text-gray-600">Lantai</p>
                      </div>
                      <div className="min-w-[130px] rounded-lg border border-gray-300 p-4 text-center">
                        <p className="font-medium">{accommodation.capacity.bedrooms}</p>
                        <p className="text-sm text-gray-600">Kamar Tidur</p>
                      </div>
                      <div className="min-w-[130px] rounded-lg border border-gray-300 p-4 text-center">
                        <p className="font-medium">{accommodation.capacity.bathrooms}</p>
                        <p className="text-sm text-gray-600">Kamar Mandi</p>
                      </div>
                      <div className="min-w-[130px] rounded-lg border border-gray-300 p-4 text-center">
                        <p className="font-medium">{accommodation.capacity.guests}</p>
                        <p className="text-sm text-gray-600">Orang</p>
                      </div>
                      <div className="min-w-[130px] rounded-lg border border-gray-300 p-4 text-center">
                        <p className="font-medium">{accommodation.capacity.extraBeds}</p>
                        <p className="text-sm text-gray-600">Kasur Ekstra</p>
                      </div>
                    </div>
                  </div>

                  {/* Bed Arrangements */}
                  <div>
                    <div className="mb-6 flex items-center gap-8">
                      <h3 className="text-lg font-bold">Pengaturan Kasur</h3>
                      <div className="h-px flex-1 bg-gray-300"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {accommodation.bedArrangements.map((bed, idx) => (
                        <div
                          key={idx}
                          className="flex flex-col items-center gap-3 rounded-lg border border-gray-300 p-4"
                        >
                          <div className="h-14 w-14 rounded bg-gray-200"></div>
                          <div className="text-center">
                            <p className="font-medium">{bed.room}</p>
                            <p className="text-sm text-gray-600">{bed.bedType}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sidebar Card */}
                <div className="w-[280px] flex-shrink-0">
                  <div className="overflow-hidden rounded-2xl border border-gray-200">
                    {/* Facilities Section */}
                    <div className="border-b border-gray-200 p-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-5">
                          {/* General Facilities */}
                          <div>
                            <h4 className="mb-4 text-lg font-bold">General Facilities</h4>
                            <div className="space-y-3">
                              {accommodation.facilities.slice(0, 4).map((facility, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                  {getFacilityIcon(facility.icon)}
                                  <span className="text-sm font-medium text-gray-800">
                                    {facility.name}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Amenities */}
                          <div>
                            <h4 className="mb-4 text-lg font-bold">Amenities</h4>
                            <div className="grid grid-cols-2 gap-x-2 gap-y-3">
                              {accommodation.amenities.slice(0, 8).map((amenity, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                  {getFacilityIcon(amenity.icon)}
                                  <span className="text-xs font-medium text-gray-800">
                                    {amenity.name}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => toggleFacilities(accommodation.id)}
                        className="mt-4 flex items-center gap-2 font-medium text-green-600"
                      >
                        <span className="text-sm">Show all facilities</span>
                        <ChevronDown
                          size={16}
                          className={`transition-transform ${showAllFacilities[accommodation.id] ? 'rotate-180' : ''}`}
                        />
                      </button>
                    </div>

                    {/* Pricing Section */}
                    <div className="bg-green-600 p-6 text-white">
                      <p className="mb-1 text-green-100">Mulai dari</p>
                      <p className="mb-1 text-2xl font-semibold">
                        {accommodation.pricing.startingPrice}
                      </p>
                      <p className="text-sm text-green-100">{accommodation.pricing.unit}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden xl:block">
            <div className="flex gap-12">
              {/* Main Content */}
              <div className="max-w-4xl flex-1 space-y-8">
                {/* Header */}
                <div className="space-y-3">
                  <h1 className="font-raleway text-4xl font-bold text-gray-900">
                    {accommodation.name}
                  </h1>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-gray-600" />
                      <span className="text-gray-600">{accommodation.location}</span>
                    </div>
                    <span className="text-green-600">Map Location</span>
                  </div>
                </div>

                {/* Image Gallery */}
                <div className="flex gap-4">
                  <div className="w-1/2 flex-1">
                    <img
                      src={accommodation.images[0]}
                      alt={accommodation.name}
                      className="h-96 w-full rounded-2xl bg-blue-400 object-cover"
                    />
                  </div>
                  <div className="grid w-1/2 grid-cols-2 gap-4">
                    {accommodation.images.slice(1, 5).map((image, idx) => (
                      <div key={idx} className="relative">
                        <img
                          src={image}
                          alt={`${accommodation.name} ${idx + 1}`}
                          className="h-full w-full rounded-xl bg-gradient-to-br from-green-400 to-green-500 object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <p className="text-justify leading-relaxed text-gray-600">
                    {accommodation.description}
                  </p>
                </div>

                {/* Unit & Capacity */}
                <div>
                  <div className="mb-6 flex items-center gap-8">
                    <h3 className="text-xl font-bold">Unit & Kapasitas</h3>
                    <div className="h-px flex-1 bg-gray-300"></div>
                  </div>
                  <div className="grid grid-cols-6 gap-4">
                    <div className="rounded-xl border border-gray-300 p-6 text-center">
                      <p className="text-lg font-medium">{accommodation.capacity.type}</p>
                      <p className="text-lg font-medium">{accommodation.capacity.size}</p>
                    </div>
                    <div className="rounded-xl border border-gray-300 p-6 text-center">
                      <p className="text-2xl font-bold">{accommodation.capacity.floors}</p>
                      <p className="text-gray-600">Lantai</p>
                    </div>
                    <div className="rounded-xl border border-gray-300 p-6 text-center">
                      <p className="text-2xl font-bold">{accommodation.capacity.bedrooms}</p>
                      <p className="text-gray-600">Kamar Tidur</p>
                    </div>
                    <div className="rounded-xl border border-gray-300 p-6 text-center">
                      <p className="text-2xl font-bold">{accommodation.capacity.bathrooms}</p>
                      <p className="text-gray-600">Kamar Mandi</p>
                    </div>
                    <div className="rounded-xl border border-gray-300 p-6 text-center">
                      <p className="text-2xl font-bold">{accommodation.capacity.guests}</p>
                      <p className="text-gray-600">Orang</p>
                    </div>
                    <div className="rounded-xl border border-gray-300 p-6 text-center">
                      <p className="text-2xl font-bold">{accommodation.capacity.extraBeds}</p>
                      <p className="text-gray-600">Kasur Ekstra</p>
                    </div>
                  </div>
                </div>

                {/* Bed Arrangements */}
                <div>
                  <div className="mb-6 flex items-center gap-8">
                    <h3 className="text-xl font-bold">Pengaturan Kasur</h3>
                    <div className="h-px flex-1 bg-gray-300"></div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {accommodation.bedArrangements.map((bed, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-4 rounded-xl border border-gray-300 p-6"
                      >
                        <div className="h-16 w-16 flex-shrink-0 rounded bg-gray-200"></div>
                        <div>
                          <p className="text-lg font-medium">{bed.room}</p>
                          <p className="text-gray-600">{bed.bedType}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="w-80 space-y-6">
                {/* Facilities */}
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <h3 className="mb-6 text-xl font-bold">General Facilities</h3>
                  <div className="mb-6 space-y-4">
                    {accommodation.facilities
                      .slice(0, showAllFacilities[accommodation.id] ? undefined : 4)
                      .map((facility, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          {getFacilityIcon(facility.icon)}
                          <span className="font-medium text-gray-800">{facility.name}</span>
                        </div>
                      ))}
                  </div>

                  <h3 className="mb-6 text-xl font-bold">Amenities</h3>
                  <div className="mb-6 space-y-4">
                    {accommodation.amenities
                      .slice(0, showAllFacilities[accommodation.id] ? undefined : 6)
                      .map((amenity, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          {getFacilityIcon(amenity.icon)}
                          <span className="font-medium text-gray-800">{amenity.name}</span>
                        </div>
                      ))}
                  </div>

                  <button
                    onClick={() => toggleFacilities(accommodation.id)}
                    className="flex items-center gap-2 font-medium text-green-600"
                  >
                    <span>Show all facilities</span>
                    <ChevronDown
                      size={18}
                      className={`transition-transform ${showAllFacilities[accommodation.id] ? 'rotate-180' : ''}`}
                    />
                  </button>
                </div>

                {/* Pricing */}
                <div className="rounded-2xl bg-green-600 p-6 text-white">
                  <p className="mb-2 text-green-100">Mulai dari</p>
                  <p className="mb-2 text-3xl font-bold">{accommodation.pricing.startingPrice}</p>
                  <p className="text-green-100">{accommodation.pricing.unit}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Divider between accommodations */}
          {index < accommodations.length - 1 && (
            <div className="my-12 border-t border-gray-200"></div>
          )}
        </div>
      ))}
    </div>
  )
}
