'use client'

import React from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper/modules'
import Image from 'next/image'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { Accommodation, Media } from '@/payload-types'
import { cn } from '@/utilities/ui'

interface ImageGalleryModalProps {
  isOpen: boolean
  onClose: () => void
  accommodation: Accommodation
  className?: string
}

// Custom styles for Swiper in modal
const modalSwiperStyles = `
  .image-modal-swiper .swiper-pagination-bullet {
    width: 12px !important;
    height: 12px !important;
    background: rgba(255, 255, 255, 0.6) !important;
    opacity: 1 !important;
  }
  .image-modal-swiper .swiper-pagination-bullet-active {
    background: white !important;
  }
`

export default function ImageGalleryModal({
  isOpen,
  onClose,
  accommodation,
  className,
}: ImageGalleryModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      onClick={() => onClose()}
    >
      <div className="relative h-full w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button
          onClick={() => onClose()}
          className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white transition-opacity hover:bg-black/60"
        >
          <X size={24} />
        </button>

        {/* Swiper Gallery */}
        <Swiper
          modules={[Pagination, Navigation]}
          spaceBetween={0}
          slidesPerView={1}
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          pagination={{
            clickable: true,
          }}
          className="h-full w-full"
        >
          {accommodation.images.map((image, idx) => (
            <SwiperSlide key={idx} className="flex min-h-screen items-center justify-center">
              <Image
                src={getMediaUrl((image.image as Media)?.url ?? '')}
                alt={`${accommodation.title} ${idx + 1}`}
                width={1200}
                height={800}
                className="flex h-full max-w-full items-center justify-center object-contain"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <button className="swiper-button-prev-custom absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white transition-opacity hover:bg-black/60">
          <ChevronLeft size={24} />
        </button>
        <button className="swiper-button-next-custom absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white transition-opacity hover:bg-black/60">
          <ChevronRight size={24} />
        </button>

        {/* Image counter */}
        <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-white">
          <span className="text-sm">{accommodation.images.length} photos</span>
        </div>
      </div>
    </div>
  )
}
