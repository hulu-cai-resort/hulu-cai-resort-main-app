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
import { useRouter } from 'next/navigation'

// Event categories data
const eventData = [
  {
    id: 1,
    title: 'Outdoor',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.',
    buttonText: 'Lihat semua Outdoor',
    link: '/events/outdoor',
    image: '/media/event-outdoor.jpg',
  },
  {
    id: 2,
    title: 'Indoor',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.',
    buttonText: 'Lihat semua Indoor',
    link: '/events/indoor',
    image: '/media/event-indoor.jpg',
  },
]

interface EventCard {
  id: number
  title: string
  description: string
  buttonText: string
  image: string
  link: string
}

export default function EventSection() {
  return (
    <motion.section
      className="bg-[#F5F7FA] py-10 lg:py-[64px]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={sectionContainerVariants}
      id="events"
    >
      <div className="mx-auto flex w-full justify-center">
        <div className="w-full px-5 pb-4 md:max-w-[1028px] md:px-8 lg:max-w-[1280px] lg:px-10 lg:pb-16 xl:px-0">
          {/* Header Section - Visible on mobile and desktop, added for tablet */}
          <motion.div className="mb-6 w-full text-center lg:mb-8" variants={headerTextVariants}>
            <h2 className="mb-3 text-[28px] font-semibold leading-[1.07] text-[#000000] lg:text-[36px] lg:leading-[1.28]">
              Meeting and Event Area
            </h2>
            <p className="text-[14px] leading-[1.43] text-[#4F4F53] lg:text-[16px] lg:leading-[1.75]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
          </motion.div>

          {/* Mobile Layout - Vertical Stack */}
          <motion.div className="flex flex-col gap-8 md:hidden" variants={gridContainerVariants}>
            {eventData.map((event, index) => (
              <motion.div key={event.id} className="w-full" variants={gridCardVariants}>
                <MobileEventCard event={event} />
                {index < eventData.length - 1 && (
                  <div className="mx-auto mt-8 h-0.5 w-full bg-[#CACCCF]" />
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Tablet Layout - Side by Side */}
          <motion.div
            className="hidden md:flex md:flex-col md:items-center md:justify-center md:gap-5 xl:hidden"
            variants={gridContainerVariants}
          >
            <div className="flex flex-wrap justify-center gap-5">
              {eventData.map((event, index) => (
                <motion.div key={event.id} className="w-full" variants={gridCardVariants}>
                  <TabletEventCard event={event} />
                  {index < eventData.length - 1 && (
                    <div className="mx-auto mt-5 h-0.5 w-full max-w-[928px] bg-[#CACCCF]" />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Desktop Layout - Vertical Stack */}
          <motion.div
            className="hidden xl:flex xl:flex-col xl:gap-8"
            variants={gridContainerVariants}
          >
            {eventData.map((event) => (
              <motion.div key={event.id} className="w-full" variants={gridCardVariants}>
                <DesktopEventCard event={event} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

// Mobile Card Component
function MobileEventCard({ event }: { event: EventCard }) {
  const router = useRouter()
  return (
    <div className="flex flex-col gap-3">
      {/* Image */}
      <div className="h-[218px] w-full overflow-hidden rounded-[20px] bg-gray-200">
        <Image
          src={event.image}
          alt={event.title}
          width={346}
          height={218}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <motion.div className="flex w-full flex-col gap-3" variants={cardContentVariants}>
        <h3 className="text-[18px] font-semibold leading-[1.33] text-[#1D1D1D]">{event.title}</h3>

        <p className="text-[14px] leading-[1.43] text-[#1D1D1D]">{event.description}</p>

        {/* Button */}
        <button
          onClick={() => router.push(event.link)}
          className="mt-2 rounded-lg bg-[#06763F] px-3 py-2 text-[12px] font-semibold leading-[1.33] text-white"
        >
          {event.buttonText}
        </button>
      </motion.div>
    </div>
  )
}

// Tablet Card Component
function TabletEventCard({ event }: { event: EventCard }) {
  const router = useRouter()
  return (
    <div className="flex h-[246px] w-full max-w-[928px] items-center gap-6 rounded-[20px] border-[0.5px] border-[#B5B5B5] bg-white p-0 pr-12 shadow-[4px_4px_20px_0px_rgba(245,247,253,1)]">
      {/* Image */}
      <div className="h-[246px] w-1/2 flex-shrink-0 overflow-hidden rounded-l-[20px] bg-gray-200">
        <Image
          src={event.image}
          alt={event.title}
          width={346}
          height={246}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <motion.div
        className="flex flex-1 flex-col justify-center gap-3"
        variants={cardContentVariants}
      >
        <h3 className="text-[36px] font-bold leading-[1.28] text-[#1D1D1D]">{event.title}</h3>

        <p className="line-clamp-3 text-sm leading-[1.75] text-[#1D1D1D]">{event.description}</p>

        {/* Button */}
        <button
          onClick={() => router.push(event.link)}
          className="mt-2 rounded-lg bg-[#06763F] px-4 py-2.5 text-[12px] leading-[1.33] text-white"
        >
          {event.buttonText}
        </button>
      </motion.div>
    </div>
  )
}

// Desktop Card Component
function DesktopEventCard({ event }: { event: EventCard }) {
  const router = useRouter()
  return (
    <div className="flex h-[332px] items-center gap-8 rounded-[20px] border-[0.5px] border-[#B5B5B5] bg-white p-0 pr-16 shadow-[4px_4px_20px_0px_rgba(245,247,253,1)]">
      {/* Image */}
      <div className="h-[332px] w-[564px] flex-shrink-0 overflow-hidden rounded-l-[20px] bg-gray-200">
        <Image
          src={event.image}
          alt={event.title}
          width={564}
          height={332}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <motion.div className="flex flex-1 flex-col gap-3" variants={cardContentVariants}>
        <h3 className="text-[36px] font-bold leading-[1.28] text-[#000000]">{event.title}</h3>

        <p className="text-[16px] leading-[1.75] text-[#000000]">{event.description}</p>

        {/* Button */}
        <button
          onClick={() => router.push(event.link)}
          className="mt-3 rounded-lg bg-[#06763F] px-5 py-3 text-[16px] font-semibold leading-[1.75] text-white"
        >
          {event.buttonText}
        </button>
      </motion.div>
    </div>
  )
}
