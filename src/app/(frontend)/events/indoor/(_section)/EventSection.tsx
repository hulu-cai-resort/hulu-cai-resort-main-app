'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  sectionContainerVariants,
  headerTextVariants,
  gridContainerVariants,
  gridCardVariants,
  cardContentVariants,
} from '@/utilities/variants'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { EventsIndoorPage, MeetingEventArea, Media, Accommodation } from '@/payload-types'
import { PaginatedDocs } from 'payload'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import ImageGalleryModal from '@/components/ImageGalleryModal'
import { Eye } from 'lucide-react'
import { useState, useEffect } from 'react'

// UI-friendly interface reused from outdoor
interface VenueUI extends MeetingEventArea {
  mainImage: string
  galleryImages: string[]
  type: string
  area: string
  dimensions: string
  capacity?: number | null
  minCapacity?: number | null
  maxCapacity?: number | null
  price: string
  duration: string
}

export default function EventSection({
  indoorAreas,
  eventsIndoorPage,
}: {
  indoorAreas: PaginatedDocs<MeetingEventArea>
  eventsIndoorPage: EventsIndoorPage
}) {
  const [imageModalOpen, setImageModalOpen] = useState<{ [key: number]: boolean }>({})

  const openImageModal = (id: number) => setImageModalOpen((prev) => ({ ...prev, [id]: true }))
  const closeImageModal = (id: number) => setImageModalOpen((prev) => ({ ...prev, [id]: false }))

  // Escape key listener
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        Object.keys(imageModalOpen).forEach((key) => {
          if (imageModalOpen[parseInt(key)]) closeImageModal(parseInt(key))
        })
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [imageModalOpen])

  // transform indoorAreas
  const indoorEventData: VenueUI[] = indoorAreas.docs.map((area) => {
    const main = getMediaUrl(((area.images?.[0]?.image ?? {}) as Media)?.url ?? '')
    const gallery = area.images
      .slice(1)
      .map((img) => getMediaUrl(((img.image ?? {}) as Media)?.url ?? ''))
    const width = area.dimensions?.width
    const length = area.dimensions?.length
    const dims =
      width && length ? `${width}m x ${length}m` : width ? `${width}m` : length ? `${length}m` : ''
    return {
      ...area,
      mainImage: main,
      galleryImages: gallery,
      type: area.buildingType ?? '',
      area: area.size ? `${area.size} m²` : '',
      dimensions: dims,
      capacity: area.groupSize?.maximum ?? null,
      minCapacity: area.groupSize?.minimum ?? null,
      maxCapacity: area.groupSize?.maximum ?? null,
      price: new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(area.priceStartingFrom ?? 0),
      duration: area.priceUnit ?? '',
    }
  })

  return (
    <motion.section
      className="bg-[#F5F7FA] py-10 lg:py-[64px]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={sectionContainerVariants}
      id="events-indoor"
    >
      <div className="mx-auto flex w-full justify-center">
        <div className="w-full px-5 pb-4 md:max-w-[1028px] md:px-8 lg:max-w-[1280px] lg:px-10 lg:pb-16 xl:px-0">
          {/* Section Title and Description for all devices */}
          <motion.div className="mb-6 w-full text-center lg:mb-8" variants={headerTextVariants}>
            <h2 className="mb-3 text-[28px] font-semibold leading-[1.28] text-[#1D1D1D] lg:text-[36px] lg:leading-[1.28]">
              {eventsIndoorPage.eventsTitle}
            </h2>
            <p className="text-[14px] leading-[1.75] text-[#1D1D1D] lg:text-[16px] lg:leading-[1.75]">
              {eventsIndoorPage.eventsDescription}
            </p>
          </motion.div>

          <div className="w-full space-y-20">
            {indoorEventData.map((venue, index) => (
              <div key={venue.id} className="w-full scroll-mt-24" id={`indoor-${venue.id}`}>
                {/* 2) Mobile: Same card structure but with Swiper on images */}
                <motion.div
                  className="flex flex-col gap-8 md:hidden"
                  variants={gridContainerVariants}
                >
                  <motion.div variants={gridCardVariants}>
                    <MobileEventCard venue={venue} />
                  </motion.div>
                </motion.div>

                {/* 3) Tablet: Grid layout with image galleries */}
                <motion.div
                  className="hidden gap-6 md:grid xl:hidden"
                  variants={gridContainerVariants}
                >
                  <motion.div variants={gridCardVariants}>
                    <TabletEventCard venue={venue} openImageModal={openImageModal} />
                  </motion.div>
                </motion.div>

                {/* 4) Desktop: Detailed layout with image galleries */}
                <motion.div className="hidden xl:block" variants={gridContainerVariants}>
                  <motion.div variants={gridCardVariants}>
                    <DesktopEventCard venue={venue} openImageModal={openImageModal} />
                  </motion.div>
                  {/* preserve your hr logic */}
                  {index < 1 && <hr className="my-16 border-[#CACCCF]" />}
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Image modals */}
      {indoorEventData.map((venue) =>
        imageModalOpen[venue.id] ? (
          <ImageGalleryModal
            key={`indoor-modal-${venue.id}`}
            isOpen={!!imageModalOpen[venue.id]}
            onClose={() => closeImageModal(venue.id)}
            accommodation={venue as unknown as Accommodation}
          />
        ) : null,
      )}
    </motion.section>
  )
}

function MobileEventCard({ venue }: { venue: VenueUI }) {
  return (
    <motion.div className="flex flex-col gap-5" variants={cardContentVariants}>
      {/* Title and Location */}
      <div className="flex flex-col gap-3">
        <h3 className="text-[36px] font-bold leading-[1.28] text-[#1D1D1D]">{venue.title}</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-4 w-4 items-center justify-center">
              <svg width="11" height="14" viewBox="0 0 11 14" fill="none">
                <path
                  d="M5.5 0C2.46243 0 0 2.46243 0 5.5C0 9.625 5.5 14 5.5 14C5.5 14 11 9.625 11 5.5C11 2.46243 8.53757 0 5.5 0Z"
                  fill="#1D1D1D"
                />
              </svg>
            </div>
            <span className="text-[16px] leading-[1.75] text-[#495560]">{venue.location}</span>
          </div>
          <span className="text-[16px] leading-[1.75] text-[#495560]">Map Location</span>
        </div>
      </div>

      {/* Image Gallery with Swiper */}
      <div className="w-full">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          pagination={{ clickable: true }}
          modules={[Pagination]}
          className="w-full overflow-hidden rounded-[14px]"
        >
          {/* Main Image */}
          <SwiperSlide>
            <div className="h-[250px] w-full bg-gray-200">
              <Image
                src={venue.mainImage}
                alt={venue.title}
                width={400}
                height={250}
                className="h-full w-full object-cover"
              />
            </div>
          </SwiperSlide>

          {/* Gallery Images */}
          {venue.galleryImages.map((image: string, index: number) => (
            <SwiperSlide key={index}>
              <div className="h-[250px] w-full bg-gray-200">
                <Image
                  src={image}
                  alt={`${venue.title} gallery ${index + 1}`}
                  width={400}
                  height={250}
                  className="h-full w-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Description */}
      <p className="text-justify text-[16px] leading-[1.75] text-[#495560]">{venue.description}</p>

      {/* Specifications and Price */}
      <div className="flex flex-col gap-6">
        {/* Specifications */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-8">
            <span className="text-[18px] font-bold leading-[1.67] text-[#000000]">
              Unit & Kapasitas
            </span>
            <hr className="flex-1 border-[#CACCCF]" />
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex h-[96px] flex-col items-center justify-center gap-2 rounded-[7px] border border-[#CACCCF] p-3">
              <div className="flex items-center gap-2">
                <span className="text-[18px] font-semibold text-[#000000]">{venue.type}</span>
                <div className="h-4 w-px bg-[#CACCCF]"></div>
                <span className="text-[18px] font-semibold text-[#000000]">{venue.area}</span>
              </div>
            </div>
            <div className="flex h-[96px] items-center justify-center rounded-[7px] border border-[#CACCCF] p-3">
              <div className="text-center">
                <div className="text-[18px] leading-[1.67] text-[#000000]">
                  {venue.dimensions.split(' x ')[0]?.replace('m', '')} x{' '}
                  {venue.dimensions.split(' x ')[1]?.replace('m', '')}
                </div>
                <div className="text-[18px] leading-[1.67] text-[#000000]">Dimensi (m)</div>
              </div>
            </div>
            <div className="flex h-[96px] items-center justify-center rounded-[7px] border border-[#CACCCF] p-3">
              <div className="text-center">
                <div className="text-[18px] leading-[1.67] text-[#000000]">
                  {venue.minCapacity} - {venue.maxCapacity}
                </div>
                <div className="text-[18px] leading-[1.67] text-[#000000]">Orang</div>
              </div>
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="w-full rounded-[20px] border border-[#CACCCF] bg-[#416340] p-6">
          <div className="flex flex-col gap-2">
            <span className="text-[16px] leading-[1.75] text-white">Mulai dari</span>
            <span className="text-[24px] font-semibold leading-[1.42] text-white">
              {venue.price}
            </span>
            <span className="text-[12px] leading-[2] text-white">{venue.duration}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function TabletEventCard({
  venue,
  openImageModal,
}: {
  venue: VenueUI
  openImageModal: (id: number) => void
}) {
  return (
    <motion.div className="flex flex-col gap-5" variants={cardContentVariants}>
      {/* Title and Location */}
      <div className="flex flex-col gap-3">
        <h3 className="text-[36px] font-bold leading-[1.28] text-[#1D1D1D]">{venue.title}</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-4 w-4 items-center justify-center">
              <svg width="11" height="14" viewBox="0 0 11 14" fill="none">
                <path
                  d="M5.5 0C2.46243 0 0 2.46243 0 5.5C0 9.625 5.5 14 5.5 14C5.5 14 11 9.625 11 5.5C11 2.46243 8.53757 0 5.5 0Z"
                  fill="#1D1D1D"
                />
              </svg>
            </div>
            <span className="text-[16px] leading-[1.75] text-[#495560]">{venue.location}</span>
          </div>
          <span className="text-[16px] leading-[1.75] text-[#495560]">Map Location</span>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="flex gap-3">
        {/* Main Image */}
        <div className="w-1/2 flex-1">
          <div className="h-[300px] w-full overflow-hidden rounded-[14px] bg-gray-200">
            <Image
              src={venue.mainImage}
              alt={venue.title}
              width={457}
              height={300}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Gallery Images */}
        <div className="flex w-1/2 flex-col gap-3">
          <div className="flex gap-3">
            {venue.galleryImages.slice(0, 2).map((image: string, index: number) => (
              <div
                key={index}
                className="h-[143px] w-full overflow-hidden rounded-[14px] bg-gray-200"
              >
                <Image
                  src={image}
                  alt={`${venue.title} gallery ${index + 1}`}
                  width={107}
                  height={143}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            {venue.galleryImages.slice(2, 4).map((image: string, index: number) => {
              const globalIndex = index + 2
              const isLast = globalIndex === 3
              return (
                <div
                  key={globalIndex}
                  className="relative h-[143px] w-full overflow-hidden rounded-[14px] bg-gray-200"
                >
                  <Image
                    src={image}
                    alt={`${venue.title} gallery ${globalIndex + 1}`}
                    width={107}
                    height={143}
                    className="h-full w-full object-cover"
                  />
                  {isLast && (
                    <button
                      onClick={() => openImageModal(venue.id)}
                      className="absolute inset-0 flex items-center justify-center rounded-[14px] bg-black/50 text-white transition-opacity hover:bg-black/60"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Full Image</span>
                        <Eye size={20} />
                      </div>
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-justify text-[16px] leading-[1.75] text-[#495560]">{venue.description}</p>

      {/* Specifications and Price */}
      <div className="flex items-center gap-6">
        {/* Specifications */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-8">
            <span className="text-[18px] font-bold leading-[1.67] text-[#000000]">
              Unit & Kapasitas
            </span>
            <hr className="flex-1 border-[#CACCCF]" />
          </div>
          <div className="flex items-center gap-5">
            <div className="flex h-[96px] min-w-[115px] flex-col items-center justify-center gap-2 rounded-[7px] border border-[#CACCCF] p-3">
              <div className="flex items-center gap-2">
                <span className="text-[18px] font-semibold text-[#000000]">{venue.type}</span>
                <div className="h-4 w-px bg-[#CACCCF]"></div>
                <span className="text-[18px] font-semibold text-[#000000]">{venue.area}</span>
              </div>
            </div>
            <div className="flex h-[96px] min-w-[115px] items-center justify-center rounded-[7px] border border-[#CACCCF] p-3">
              <div className="text-center">
                <div className="text-[18px] leading-[1.67] text-[#000000]">
                  {venue.dimensions.split(' x ')[0]?.replace('m', '')} x{' '}
                  {venue.dimensions.split(' x ')[1]?.replace('m', '')}
                </div>
                <div className="text-[18px] leading-[1.67] text-[#000000]">Dimensi (m)</div>
              </div>
            </div>
            <div className="flex h-[96px] min-w-[115px] items-center justify-center rounded-[7px] border border-[#CACCCF] p-3">
              <div className="text-center">
                <div className="text-[18px] leading-[1.67] text-[#000000]">
                  {venue.minCapacity} - {venue.maxCapacity}
                </div>
                <div className="text-[18px] leading-[1.67] text-[#000000]">Orang</div>
              </div>
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="min-w-[241px] rounded-[20px] border border-[#CACCCF] bg-[#416340] p-9">
          <div className="flex flex-col gap-2">
            <span className="text-[16px] leading-[1.75] text-white">Mulai dari</span>
            <span className="text-[24px] font-semibold leading-[1.42] text-white">
              {venue.price}
            </span>
            <span className="text-[12px] leading-[2] text-white">{venue.duration}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function DesktopEventCard({
  venue,
  openImageModal,
}: {
  venue: VenueUI
  openImageModal: (id: number) => void
}) {
  return (
    <motion.div className="flex flex-col gap-5" variants={cardContentVariants}>
      {/* Title and Location */}
      <div className="flex flex-col gap-3">
        <h3 className="text-[36px] font-bold leading-[1.28] text-[#1D1D1D]">{venue.title}</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-4 w-4 items-center justify-center">
              <svg width="11" height="14" viewBox="0 0 11 14" fill="none">
                <path
                  d="M5.5 0C2.46243 0 0 2.46243 0 5.5C0 9.625 5.5 14 5.5 14C5.5 14 11 9.625 11 5.5C11 2.46243 8.53757 0 5.5 0Z"
                  fill="#1D1D1D"
                />
              </svg>
            </div>
            <span className="text-[16px] leading-[1.75] text-[#495560]">{venue.location}</span>
          </div>
          <span className="text-[16px] leading-[1.75] text-[#495560]">Map Location</span>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="flex gap-4">
        {/* Main Image */}
        <div className="w-[631px]">
          <div className="h-[400px] w-full overflow-hidden rounded-[19px] bg-gray-200">
            <Image
              src={venue.mainImage}
              alt={venue.title}
              width={631}
              height={400}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Gallery Images */}
        <div className="flex w-[631px] flex-col gap-4">
          <div className="flex gap-4">
            {venue.galleryImages.slice(0, 2).map((image: string, index: number) => (
              <div
                key={index}
                className="h-[192px] w-[307px] overflow-hidden rounded-[19px] bg-gray-200"
              >
                <Image
                  src={image}
                  alt={`${venue.title} gallery ${index + 1}`}
                  width={307}
                  height={192}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
          <div className="flex gap-4">
            {venue.galleryImages.slice(2, 4).map((image: string, index: number) => {
              const globalIndex = index + 2
              const isLast = globalIndex === 3
              return (
                <div
                  key={globalIndex}
                  className="relative h-[192px] w-[307px] overflow-hidden rounded-[19px] bg-gray-200"
                >
                  <Image
                    src={image}
                    alt={`${venue.title} gallery ${globalIndex + 1}`}
                    width={307}
                    height={192}
                    className="h-full w-full object-cover"
                  />
                  {isLast && (
                    <button
                      onClick={() => openImageModal(venue.id)}
                      className="absolute inset-0 flex items-center justify-center rounded-[19px] bg-black/50 text-white transition-opacity hover:bg-black/60"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Full Image</span>
                        <Eye size={24} />
                      </div>
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-justify text-[16px] leading-[1.75] text-[#495560]">{venue.description}</p>

      {/* Specifications and Price */}
      <div className="flex items-end gap-16">
        {/* Specifications */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-8">
            <span className="text-[18px] font-bold leading-[1.67] text-[#000000]">
              Spesifikasi Meeting Area
            </span>
            <hr className="flex-1 border-[#CACCCF]" />
          </div>
          <div className="flex items-center gap-5">
            <div className="flex h-[96px] min-w-[115px] flex-col items-center justify-center gap-2 rounded-[7px] border border-[#CACCCF] p-3">
              <div className="flex items-center gap-2">
                <span className="text-[18px] font-semibold text-[#000000]">{venue.type}</span>
                <div className="h-4 w-px bg-[#CACCCF]"></div>
                <span className="text-[18px] font-semibold text-[#000000]">{venue.area}</span>
              </div>
            </div>
            <div className="flex h-[96px] min-w-[115px] items-center justify-center rounded-[7px] border border-[#CACCCF] p-3">
              <div className="text-center">
                <div className="text-[18px] leading-[1.67] text-[#000000]">Indoor</div>
                <div className="text-[18px] leading-[1.67] text-[#000000]">Tipe Area</div>
              </div>
            </div>
            <div className="flex h-[96px] min-w-[115px] items-center justify-center rounded-[7px] border border-[#CACCCF] p-3">
              <div className="text-center">
                <div className="text-[18px] leading-[1.67] text-[#000000]">
                  {venue.dimensions.split(' x ')[0]?.replace('m', '')}
                </div>
                <div className="text-[18px] leading-[1.67] text-[#000000]">Panjang</div>
              </div>
            </div>
            <div className="flex h-[96px] min-w-[115px] items-center justify-center rounded-[7px] border border-[#CACCCF] p-3">
              <div className="text-center">
                <div className="text-[18px] leading-[1.67] text-[#000000]">
                  {venue.dimensions.split(' x ')[1]?.replace('m', '')}
                </div>
                <div className="text-[18px] leading-[1.67] text-[#000000]">Lebar</div>
              </div>
            </div>
            <div className="flex h-[96px] min-w-[115px] items-center justify-center rounded-[7px] border border-[#CACCCF] p-3">
              <div className="text-center">
                <div className="text-[18px] leading-[1.67] text-[#000000]">
                  {venue.minCapacity} orang
                </div>
                <div className="text-[18px] leading-[1.67] text-[#000000]">Minimum</div>
              </div>
            </div>
            <div className="flex h-[96px] min-w-[115px] items-center justify-center rounded-[7px] border border-[#CACCCF] p-3">
              <div className="text-center">
                <div className="text-[18px] leading-[1.67] text-[#000000]">
                  {venue.maxCapacity} orang
                </div>
                <div className="text-[18px] leading-[1.67] text-[#000000]">Maksimum</div>
              </div>
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="w-full rounded-[20px] border border-[#CACCCF] bg-[#416340] p-9">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-[16px] leading-[1.75] text-white">Mulai dari</span>
              <span className="text-[36px] font-semibold leading-[1.28] text-white">
                {venue.price}
              </span>
              <span className="text-[12px] leading-[2] text-white">/per 8 jam</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
