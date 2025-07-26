'use client'

import React, { useState, useEffect } from 'react'
import { ChevronDown, Dot, Eye } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { PaginatedDocs } from 'payload'
import { Accommodation, Media } from '@/payload-types'
import Link from 'next/link'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { getFacilityIcon, groupFacilities } from '@/utilities/getFacilityIcon'
import { getBedIcon, getBedLabel } from '@/utilities/getBedIcon'
import { getUnitTypeLabel, getUnitTypeIcon } from '@/utilities/getUnitType'
import FacilitiesModal from '@/components/FacilitiesModal'
import Image from 'next/image'
import ImageGalleryModal from '@/components/ImageGalleryModal'

// Custom styles for Swiper pagination and navigation
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
  .swiper-button-next,
  .swiper-button-prev {
    color: white !important;
    background: rgba(0, 0, 0, 0.5) !important;
    border-radius: 50% !important;
    width: 44px !important;
    height: 44px !important;
  }
  .swiper-button-next:after,
  .swiper-button-prev:after {
    font-size: 16px !important;
  }
`

export default function AccommodationsDetail({
  accommodations,
}: {
  accommodations: PaginatedDocs<Accommodation>
}) {
  const [modalOpen, setModalOpen] = useState<{ [key: number]: boolean }>({})
  const [imageModalOpen, setImageModalOpen] = useState<{ [key: number]: boolean }>({})

  const openModal = (accommodationId: number) => {
    setModalOpen((prev) => ({
      ...prev,
      [accommodationId]: true,
    }))
  }

  const closeModal = (accommodationId: number) => {
    setModalOpen((prev) => ({
      ...prev,
      [accommodationId]: false,
    }))
  }

  const openImageModal = (accommodationId: number) => {
    setImageModalOpen((prev) => ({
      ...prev,
      [accommodationId]: true,
    }))
  }

  const closeImageModal = (accommodationId: number) => {
    setImageModalOpen((prev) => ({
      ...prev,
      [accommodationId]: false,
    }))
  }

  // Handle keyboard events for closing modals
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        // Close any open image modals
        Object.keys(imageModalOpen).forEach((id) => {
          if (imageModalOpen[parseInt(id)]) {
            closeImageModal(parseInt(id))
          }
        })
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [imageModalOpen])

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 xl:px-0" id="accommodations">
      {/* Inject custom Swiper styles */}
      <style dangerouslySetInnerHTML={{ __html: swiperStyles }} />

      {accommodations.docs.map((accommodation, index) => (
        <div key={accommodation.id} id={`accommodation-${accommodation.id}`} className="w-full">
          {/* Mobile Layout */}
          <div className="block md:hidden">
            <div className="space-y-6">
              {/* Header */}
              <div className="space-y-3">
                <h1 className="font-raleway text-2xl font-bold text-gray-900 md:text-4xl">
                  {accommodation.title}
                </h1>
                <Link href={`/maps`} className="flex items-center justify-between">
                  <span className="text-sm text-green-600">Map Location</span>
                </Link>
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
                        <Image
                          src={getMediaUrl((image.image as Media)?.url ?? '')}
                          alt=""
                          width={500}
                          height={500}
                          className="h-64 w-full bg-blue-200 object-cover sm:h-80"
                        />
                        {idx === 0 && (
                          <div className="absolute right-4 top-4 rounded-full bg-black/50 px-3 py-1 text-sm text-white">
                            {accommodation.images.length} photos
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
                {groupFacilities(accommodation)
                  .slice(0, 2)
                  .map((group, groupIdx) => (
                    <div key={groupIdx} className="mb-6 last:mb-0">
                      <h3 className="mb-4 text-lg font-bold">{group.title}</h3>
                      <div className="space-y-4">
                        {group.facilities.map((facility, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            {getFacilityIcon(facility.key)}
                            <span className="font-medium text-gray-800">{facility.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                {accommodation.other && accommodation.other.length > 0 && (
                  <div className="mb-6">
                    <h3 className="mb-4 text-lg font-bold">Other</h3>
                    <div className="space-y-4">
                      {accommodation.other.slice(0, 3).map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <Dot size={18} />
                          <span className="font-medium text-gray-800">{item.amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={() => openModal(accommodation.id)}
                  className="mt-4 flex items-center gap-2 font-medium text-green-600"
                >
                  <span>Show all facilities</span>
                  <ChevronDown size={16} />
                </button>
              </div>

              {/* Pricing */}
              <div className="rounded-2xl bg-[hsl(var(--camp-green-medium))] p-6 text-white">
                <p className="mb-1 text-green-100">Mulai dari</p>
                <p className="mb-1 text-2xl font-semibold">
                  {new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(accommodation.priceStartingFrom || 0)}
                </p>
                <p className="text-sm text-green-100">{accommodation.priceUnit}</p>
              </div>

              {/* Unit & Capacity */}
              <div>
                <div className="mb-6 flex items-center gap-8">
                  <h3 className="text-lg font-bold">Unit & Kapasitas</h3>
                  <div className="h-px flex-1 bg-gray-300"></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg border border-gray-300 p-4 text-center">
                    <div className="mb-2 flex justify-center">
                      {getUnitTypeIcon(accommodation.unitType, 16)}
                    </div>
                    <p className="text-sm font-bold">{getUnitTypeLabel(accommodation.unitType)}</p>
                    <p className="text-xs text-gray-600">{accommodation.size} m²</p>
                  </div>
                  <div className="rounded-lg border border-gray-300 p-4 text-center">
                    <p className="font-medium">{accommodation.floors}</p>
                    <p className="text-sm text-gray-600">Lantai</p>
                  </div>
                  <div className="rounded-lg border border-gray-300 p-4 text-center">
                    <p className="font-medium">{accommodation.bedrooms}</p>
                    <p className="text-sm text-gray-600">Kamar Tidur</p>
                  </div>
                  <div className="rounded-lg border border-gray-300 p-4 text-center">
                    <p className="font-medium">{accommodation.bathrooms}</p>
                    <p className="text-sm text-gray-600">Kamar Mandi</p>
                  </div>
                  <div className="rounded-lg border border-gray-300 p-4 text-center">
                    <p className="font-medium">{accommodation.maxCapacity}</p>
                    <p className="text-sm text-gray-600">Orang</p>
                  </div>
                  <div className="rounded-lg border border-gray-300 p-4 text-center">
                    <p className="font-medium">{accommodation.extraBeds}</p>
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
                  {accommodation.bedConfiguration?.map((bed, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 rounded-lg border border-gray-300 p-4"
                    >
                      <div className="flex-shrink-0">{getBedIcon(bed.bedType, 48)}</div>
                      <div>
                        <p className="text-sm font-medium">{bed.bedCount}</p>
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
                  {accommodation.title}
                </h1>
                <div className="flex items-center justify-between">
                  <span className="text-green-600">Map Location</span>
                </div>
              </div>

              {/* Image Gallery */}
              <div className="flex h-full items-center justify-center gap-4">
                <div className="w-1/2 flex-shrink-0">
                  <Image
                    src={getMediaUrl((accommodation.images[0]?.image as Media)?.url ?? '')}
                    alt={accommodation.title}
                    width={500}
                    height={500}
                    className="h-96 w-full rounded-2xl bg-blue-300 object-cover"
                  />
                </div>
                <div className="grid h-96 w-1/2 grid-cols-2 gap-4">
                  <Image
                    src={getMediaUrl((accommodation.images[1]?.image as Media)?.url ?? '')}
                    alt={`${accommodation.title} 1`}
                    width={500}
                    height={500}
                    className="h-44 w-full rounded-2xl bg-green-300 object-cover"
                  />
                  <Image
                    src={getMediaUrl((accommodation.images[2]?.image as Media)?.url ?? '')}
                    alt={`${accommodation.title} 2`}
                    width={500}
                    height={500}
                    className="h-44 w-full rounded-2xl bg-yellow-300 object-cover"
                  />

                  <Image
                    src={getMediaUrl((accommodation.images[3]?.image as Media)?.url ?? '')}
                    alt={`${accommodation.title} 3`}
                    width={500}
                    height={500}
                    className="h-44 w-full rounded-2xl bg-red-300 object-cover"
                  />
                  <div className="relative">
                    <Image
                      src={getMediaUrl((accommodation.images[4]?.image as Media)?.url ?? '')}
                      alt={`${accommodation.title} 4`}
                      width={500}
                      height={500}
                      className="h-44 w-full rounded-2xl bg-purple-300 object-cover"
                    />
                    {accommodation.images.length > 5 && (
                      <button
                        onClick={() => openImageModal(accommodation.id)}
                        className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/50 text-white transition-opacity hover:bg-black/60"
                      >
                        <div className="flex flex-col items-center gap-2">
                          <div className="flex items-center justify-center gap-2">
                            <span className="text-sm font-medium">Full Image</span>
                            <Eye size={24} />
                          </div>
                          <span className="text-sm font-medium">
                            +{accommodation.images.length - 5} photos
                          </span>
                        </div>
                      </button>
                    )}
                    {accommodation.images.length <= 5 && (
                      <button
                        onClick={() => openImageModal(accommodation.id)}
                        className="absolute bottom-3 right-3 rounded-full bg-black/50 p-2 text-white transition-opacity hover:bg-black/60"
                      >
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-sm font-medium">Full Image</span>
                          <Eye size={24} />
                        </div>
                      </button>
                    )}
                  </div>
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
                    <div className="grid grid-cols-3 gap-4">
                      <div className="min-w-[130px] rounded-lg border border-gray-300 p-4 text-center">
                        <div className="mb-2 flex justify-center">
                          {getUnitTypeIcon(accommodation.unitType, 20)}
                        </div>
                        <p className="font-medium">{getUnitTypeLabel(accommodation.unitType)}</p>
                        <p className="text-xs text-gray-600">{accommodation.size} m²</p>
                      </div>
                      <div className="flex h-full min-w-[130px] flex-col items-center justify-center rounded-lg border border-gray-300 p-4 text-center">
                        <p className="font-medium">{accommodation.floors}</p>
                        <p className="text-sm text-gray-600">Lantai</p>
                      </div>
                      <div className="flex h-full min-w-[130px] flex-col items-center justify-center rounded-lg border border-gray-300 p-4 text-center">
                        <p className="font-medium">{accommodation.bedrooms}</p>
                        <p className="text-sm text-gray-600">Kamar Tidur</p>
                      </div>
                      <div className="flex h-full min-w-[130px] flex-col items-center justify-center rounded-lg border border-gray-300 p-4 text-center">
                        <p className="font-medium">{accommodation.bathrooms}</p>
                        <p className="text-sm text-gray-600">Kamar Mandi</p>
                      </div>
                      <div className="flex h-full min-w-[130px] flex-col items-center justify-center rounded-lg border border-gray-300 p-4 text-center">
                        <p className="font-medium">{accommodation.maxCapacity}</p>
                        <p className="text-sm text-gray-600">Orang</p>
                      </div>
                      <div className="flex h-full min-w-[130px] flex-col items-center justify-center rounded-lg border border-gray-300 p-4 text-center">
                        <p className="font-medium">{accommodation.extraBeds}</p>
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
                    <div className="grid grid-cols-3 gap-4">
                      {accommodation.bedConfiguration?.map((bed, idx) => (
                        <div
                          key={idx}
                          className="flex flex-col items-center gap-3 rounded-lg border border-gray-300 p-4"
                        >
                          {getBedIcon(bed.bedType, 56)}
                          <div className="text-center">
                            <p className="font-medium">{bed.roomName}</p>
                            <p className="text-sm text-gray-600">
                              {bed.bedCount} {getBedLabel(bed.bedType)}
                            </p>
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
                          {groupFacilities(accommodation)
                            .slice(0, 2)
                            .map((group, groupIdx) => (
                              <div key={groupIdx}>
                                <h4 className="mb-4 text-lg font-bold">{group.title}</h4>
                                <div className="grid grid-cols-2 gap-x-2 gap-y-3">
                                  {group.facilities.slice(0, 6).map((facility, idx) => (
                                    <div key={idx} className="flex items-center gap-2">
                                      {getFacilityIcon(facility.key, 16)}
                                      <span className="text-xs font-medium text-gray-800">
                                        {facility.label}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}

                          {accommodation.other && accommodation.other.length > 0 && (
                            <div>
                              <h4 className="mb-4 text-lg font-bold">Other</h4>
                              <div className="grid grid-cols-2 gap-x-2 gap-y-3">
                                {accommodation.other.slice(0, 4).map((item, idx) => (
                                  <div key={idx} className="flex items-center gap-2">
                                    <Dot size={16} />
                                    <span className="text-xs font-medium text-gray-800">
                                      {item.amenity}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => openModal(accommodation.id)}
                        className="mt-4 flex items-center gap-2 font-medium text-green-600"
                      >
                        <span className="text-sm">Show all facilities</span>
                        <ChevronDown size={16} />
                      </button>
                    </div>

                    {/* Pricing Section */}
                    <div className="bg-[hsl(var(--camp-green-medium))] p-6 text-white">
                      <p className="mb-1 text-green-100">Mulai dari</p>
                      <p className="mb-1 text-2xl font-semibold">
                        {new Intl.NumberFormat('id-ID', {
                          style: 'currency',
                          currency: 'IDR',
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        }).format(accommodation.priceStartingFrom || 0)}
                      </p>
                      <p className="text-sm text-green-100">{accommodation.priceUnit}</p>
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
                    {accommodation.title}
                  </h1>
                  <div className="flex items-center justify-end">
                    <Link href={`/maps`} className="flex items-center justify-between">
                      <span className="text-sm text-green-600">Map Location</span>
                    </Link>
                  </div>
                </div>

                {/* Image Gallery */}
                <div className="flex items-center gap-4">
                  <div className="w-1/2 flex-1">
                    <Image
                      src={getMediaUrl((accommodation.images[0]?.image as Media)?.url ?? '')}
                      alt={accommodation.title}
                      width={500}
                      height={500}
                      className="h-96 w-full rounded-2xl bg-blue-400 object-cover"
                    />
                  </div>
                  <div className="grid w-1/2 grid-cols-2 gap-4">
                    {accommodation.images.slice(1, 5).map((image, idx) => (
                      <div key={idx} className="relative">
                        <Image
                          src={getMediaUrl((image.image as Media)?.url ?? '')}
                          alt={`${accommodation.title} ${idx + 1}`}
                          width={500}
                          height={500}
                          className="h-44 w-full rounded-xl bg-gradient-to-br from-green-400 to-green-500 object-cover"
                        />
                        {idx === 3 && accommodation.images.length > 5 && (
                          <button
                            onClick={() => openImageModal(accommodation.id)}
                            className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/50 text-white transition-opacity hover:bg-black/60"
                          >
                            <div className="flex flex-col items-center gap-2">
                              <div className="flex items-center justify-center gap-2">
                                <span className="text-sm font-medium">Full Image</span>
                                <Eye size={24} />
                              </div>
                              <span className="text-lg font-medium">
                                +{accommodation.images.length - 5} photos
                              </span>
                            </div>
                          </button>
                        )}
                        {idx === 3 && accommodation.images.length <= 5 && (
                          <button
                            onClick={() => openImageModal(accommodation.id)}
                            className="absolute bottom-4 right-4 rounded-full bg-black/50 p-3 text-white transition-opacity hover:bg-black/60"
                          >
                            <div className="flex items-center justify-center gap-2">
                              <span className="text-sm font-medium">Full Image</span>
                              <Eye size={24} />
                            </div>
                          </button>
                        )}
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
                      <div className="mb-2 flex justify-center">
                        {getUnitTypeIcon(accommodation.unitType, 24)}
                      </div>
                      <p className="text-lg font-bold">
                        {getUnitTypeLabel(accommodation.unitType)}
                      </p>
                      <p className="text-gray-600">{accommodation.size} m²</p>
                    </div>
                    <div className="flex flex-col items-center justify-center rounded-xl border border-gray-300 p-4 text-center">
                      {accommodation.type === 'cottage' ? (
                        <>
                          <p className="text-gray-600">Lantai</p>
                          <p className="text-2xl">{accommodation.floorLocation}</p>
                        </>
                      ) : (
                        <>
                          <p className="text-2xl font-bold">{accommodation.floors ?? '-'}</p>
                          <p className="text-gray-600">Lantai</p>
                        </>
                      )}
                    </div>
                    <div className="flex flex-col items-center justify-center rounded-xl border border-gray-300 p-4 text-center">
                      <p className="text-2xl font-bold">{accommodation.bedrooms ?? '-'}</p>
                      <p className="text-gray-600">Kamar Tidur</p>
                    </div>
                    <div className="flex flex-col items-center justify-center rounded-xl border border-gray-300 p-4 text-center">
                      <p className="text-2xl font-bold">{accommodation.bathrooms ?? '-'}</p>
                      <p className="text-gray-600">Kamar Mandi</p>
                    </div>
                    <div className="flex flex-col items-center justify-center rounded-xl border border-gray-300 p-4 text-center">
                      <p className="text-2xl font-bold">{accommodation.maxCapacity ?? '-'}</p>
                      <p className="text-gray-600">Orang</p>
                    </div>
                    <div className="flex flex-col items-center justify-center rounded-xl border border-gray-300 p-4 text-center">
                      <p className="text-2xl font-bold">{accommodation.extraBeds ?? '-'}</p>
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
                  <div className="grid grid-cols-6 gap-4">
                    {accommodation.bedConfiguration?.map((bed, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col gap-2 rounded-xl border border-gray-300 p-4"
                      >
                        <div className="flex-shrink-0">{getBedIcon(bed.bedType, 64)}</div>

                        <p className="text-lg font-medium">{bed.roomName}</p>
                        <p className="text-gray-600">
                          {bed.bedCount} {getBedLabel(bed.bedType)}
                        </p>
                      </div>
                    ))}
                    {accommodation.type === 'camping_ground' &&
                      accommodation.tentConfiguration?.map((tent, idx) => (
                        <div
                          key={idx}
                          className="flex flex-col gap-2 rounded-xl border border-gray-300 p-4"
                        >
                          <p className="text-lg font-medium">{tent.tentType}</p>
                          <p className="text-gray-600">{tent.numberOfTents} Tenda</p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="w-80 space-y-6">
                {/* Facilities */}
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  {groupFacilities(accommodation)
                    .slice(0, 3)
                    .map((group, groupIdx) => (
                      <div key={groupIdx} className="mb-6 last:mb-6">
                        <h3 className="mb-6 text-xl font-bold">{group.title}</h3>
                        <div className="mb-6 space-y-4">
                          {group.facilities.map((facility, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                              {getFacilityIcon(facility.key)}
                              <span className="font-medium text-gray-800">{facility.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}

                  {accommodation.other && accommodation.other.length > 0 && (
                    <div className="mb-6">
                      <h3 className="mb-6 text-xl font-bold">Other</h3>
                      <div className="mb-6 space-y-4">
                        {accommodation.other.slice(0, 5).map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <Dot size={18} />
                            <span className="font-medium text-gray-800">{item.amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => openModal(accommodation.id)}
                    className="flex items-center gap-2 font-medium text-green-600"
                  >
                    <span>Show all facilities</span>
                    <ChevronDown size={18} />
                  </button>
                </div>

                {/* Pricing */}
                <div className="rounded-2xl bg-[hsl(var(--camp-green-medium))] p-6 text-white">
                  <p className="mb-2 text-green-100">Mulai dari</p>
                  <p className="mb-2 text-3xl font-bold">
                    {new Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(accommodation.priceStartingFrom || 0)}
                  </p>
                  <p className="text-green-100">{accommodation.priceUnit}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Divider between accommodations */}
          {index < accommodations.docs.length - 1 && (
            <div className="my-12 border-t border-gray-200"></div>
          )}

          {/* Facilities Modal */}
          <FacilitiesModal
            isOpen={modalOpen[accommodation.id] || false}
            onClose={() => closeModal(accommodation.id)}
            accommodation={accommodation}
          />

          {/* Image Gallery Modal */}
          {imageModalOpen[accommodation.id] && (
            <ImageGalleryModal
              isOpen={imageModalOpen[accommodation.id] || false}
              onClose={() => closeImageModal(accommodation.id)}
              accommodation={accommodation}
            />
          )}
        </div>
      ))}
    </div>
  )
}
