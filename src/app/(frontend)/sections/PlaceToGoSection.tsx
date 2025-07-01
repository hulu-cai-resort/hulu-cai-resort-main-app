import { Button } from '@/components/ui/button'
import { MainPage } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import Image from 'next/image'

// TODO: Replace with actual data from CMS when database is populated
const dummyData = {
  sectionTitle: 'Place To Go',
  title: 'Why Nature Feels Better Here',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
  image: '/media/placeholder-nature.jpg',
  testimonials: [
    {
      id: '1',
      name: 'Melanie',
      message: 'Best Experience Ever !',
      avatar: '/media/avatar-melanie.jpg',
    },
    {
      id: '2',
      name: 'Carren J',
      message: "That's a Wonderfull view",
      avatar: '/media/avatar-carren.jpg',
    },
    {
      id: '3',
      name: 'Janice M',
      message: "That's a Wonderfull view",
      avatar: '/media/avatar-janice.jpg',
    },
  ],
  features: [
    {
      id: '1',
      number: '01',
      title: 'Lingkungan Alam & Suasana Asri',
      description:
        'Terletak di kaki Gunung Pangrango dengan udara sejuk dan panorama hijau, menciptakan suasana alami dan menyegarkan',
      highlighted: false,
    },
    {
      id: '2',
      number: '02',
      title: 'Ragam Aktivitas Outbound & Petualangan',
      description:
        'Terletak di kaki Gunung Pangrango dengan udara sejuk dan panorama hijau, menciptakan suasana alami dan menyegarkan',
      highlighted: true,
    },
    {
      id: '3',
      number: '03',
      title: 'Fasilitas Menginap & Event Lengkap',
      description:
        'Terletak di kaki Gunung Pangrango dengan udara sejuk dan panorama hijau, menciptakan suasana alami dan menyegarkan',
      highlighted: false,
    },
  ],
}

export default function PlaceToGoSection({ mainPage }: { mainPage: MainPage }) {
  // TODO: Use mainPage data when database is populated
  const data = dummyData

  return (
    <section className="bg-white px-8 py-10 lg:py-[64px]">
      <div className="flex justify-center">
        <div className="w-full md:max-w-[720px] lg:max-w-7xl">
          {/* Header Section */}
          <div className="mb-6 space-y-2 text-wrap text-center md:mb-6 lg:mb-[24px] lg:space-y-4">
            <p className="font-raleway text-lg font-semibold leading-[1.33] text-[#D16E2B] md:text-[20px] md:leading-[1.2] lg:text-[20px] lg:leading-[1.2]">
              {data.sectionTitle}
            </p>
            <h2 className="font-raleway text-[28px] font-bold leading-[1.07] text-[#1D1D1D] md:mx-auto md:w-[666px] md:text-[36px] md:font-bold md:leading-[1.28] lg:mx-auto lg:w-[510px] lg:text-[36px] lg:leading-[1.28]">
              {data.title}
            </h2>
            <p className="font-raleway w-full text-sm leading-[1.43] text-[#1D1D1D] md:mx-auto md:text-[16px] md:leading-[1.75] lg:mx-auto lg:text-[16px] lg:leading-[1.75]">
              {data.description}
            </p>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden">
            <div className="space-y-6">
              {/* Image with testimonials */}
              <div className="relative mx-auto w-[320px]">
                <div className="ml-[31px] h-[386px] w-[258px] overflow-hidden rounded-[20px] bg-gray-200">
                  <div className="h-full w-full rounded-[20px] bg-gray-300" />
                </div>

                {/* Floating testimonial cards */}
                <div className="absolute left-[-31px] top-[106px] w-[180px] rounded-[10px] bg-white p-2.5 shadow-[0px_4px_8px_0px_rgba(0,0,0,0.25)]">
                  <div className="flex items-center gap-2">
                    <div className="h-[42px] w-[42px] rounded-full bg-gray-200" />
                    <div className="w-[124px]">
                      <p className="font-raleway text-xs font-semibold leading-[1.33] text-[#1D1D1D]">
                        {data.testimonials[0]?.name || 'Melanie'}
                      </p>
                      <p className="font-raleway text-xs leading-[1.33] text-[#1D1D1D]">
                        {data.testimonials[0]?.message || 'Best Experience Ever !'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="absolute left-[114px] top-[203px] w-[198px] rounded-[10px] bg-white p-2.5 shadow-[0px_4px_8px_0px_rgba(0,0,0,0.25)]">
                  <div className="flex items-center gap-2">
                    <div className="h-[42px] w-[42px] rounded-full bg-gray-200" />
                    <div className="w-[135px]">
                      <p className="font-raleway text-xs font-semibold leading-[1.33] text-[#1D1D1D]">
                        {data.testimonials[1]?.name || 'Carren J'}
                      </p>
                      <p className="font-raleway text-center text-xs leading-[1.33] text-[#1D1D1D]">
                        {data.testimonials[1]?.message || "That's a Wonderfull view"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="absolute left-[-36px] top-[294px] w-[198px] rounded-[10px] bg-white p-2.5 shadow-[0px_4px_8px_0px_rgba(0,0,0,0.25)]">
                  <div className="flex items-center gap-2">
                    <div className="h-[42px] w-[42px] rounded-full bg-gray-200" />
                    <div className="w-[135px]">
                      <p className="font-raleway text-xs font-semibold leading-[1.33] text-[#1D1D1D]">
                        {data.testimonials[2]?.name || 'Janice M'}
                      </p>
                      <p className="font-raleway text-center text-xs leading-[1.33] text-[#1D1D1D]">
                        {data.testimonials[2]?.message || "That's a Wonderfull view"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-6">
                {data.features.map((feature, index) => (
                  <div key={feature.id} className="space-y-3">
                    <div
                      className={`flex h-6 w-10 items-center justify-center rounded-[10px] ${
                        feature.highlighted ? 'bg-[#D16E2B]' : 'bg-[#092B1A]'
                      }`}
                    >
                      <span className="font-raleway text-base font-normal leading-[1.5] text-white">
                        {feature.number}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-raleway mb-2 text-lg font-semibold leading-[1.33] text-[#1D1D1D]">
                        {feature.title}
                      </h3>
                      <p className="font-raleway text-sm leading-[1.43] text-[#1D1D1D]">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}

                <div className="pt-2">
                  <Button className="font-rethink h-[46px] w-full rounded-[8px] bg-[#06763F] text-xs font-semibold leading-[1.33] text-white">
                    Mulai Jelajahi
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Tablet Layout */}
          <div className="hidden md:block xl:hidden">
            <div className="flex flex-wrap items-center justify-center gap-16 sm:px-10 xl:px-0">
              {/* Image with testimonials */}
              <div className="relative w-[502px]">
                <div className="ml-[84px] h-[577px] w-[385px] overflow-hidden rounded-[20px] bg-gray-200">
                  <div className="h-full w-full rounded-[20px] bg-gray-300" />
                </div>

                {/* Floating testimonial cards */}
                <div className="absolute left-0 top-[462px] w-[198px] rounded-[10px] bg-white p-2.5 shadow-[0px_4px_8px_0px_rgba(0,0,0,0.25)]">
                  <div className="flex items-center gap-2">
                    <div className="h-[42px] w-[42px] rounded-full bg-gray-200" />
                    <div className="w-[135px]">
                      <p className="font-raleway text-xs font-semibold leading-[1.33] text-[#1D1D1D]">
                        {data.testimonials[2]?.name || 'Janice M'}
                      </p>
                      <p className="font-raleway text-center text-xs leading-[1.33] text-[#1D1D1D]">
                        {data.testimonials[2]?.message || "That's a Wonderfull view"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="absolute left-[304px] top-[322px] w-[198px] rounded-[10px] bg-white p-2.5 shadow-[0px_4px_8px_0px_rgba(0,0,0,0.25)]">
                  <div className="flex items-center gap-2">
                    <div className="h-[42px] w-[42px] rounded-full bg-gray-200" />
                    <div className="w-[135px]">
                      <p className="font-raleway text-xs font-semibold leading-[1.33] text-[#1D1D1D]">
                        {data.testimonials[1]?.name || 'Carren J'}
                      </p>
                      <p className="font-raleway text-center text-xs leading-[1.33] text-[#1D1D1D]">
                        {data.testimonials[1]?.message || "That's a Wonderfull view"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="absolute left-[33px] top-[116px] w-[180px] rounded-[10px] bg-white p-2.5 shadow-[0px_4px_8px_0px_rgba(0,0,0,0.25)]">
                  <div className="flex items-center gap-2">
                    <div className="h-[42px] w-[42px] rounded-full bg-gray-200" />
                    <div className="w-[124px]">
                      <p className="font-raleway text-xs font-semibold leading-[1.33] text-[#1D1D1D]">
                        {data.testimonials[0]?.name || 'Melanie'}
                      </p>
                      <p className="font-raleway text-xs leading-[1.33] text-[#1D1D1D]">
                        {data.testimonials[0]?.message || 'Best Experience Ever !'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="w-[720px] space-y-5">
                {data.features.map((feature, index) => (
                  <div key={feature.id} className="space-y-3">
                    <div
                      className={`flex h-6 w-10 items-center justify-center rounded-[10px] ${
                        feature.highlighted ? 'bg-[#D16E2B]' : 'bg-[#092B1A]'
                      }`}
                    >
                      <span className="font-raleway text-base font-bold leading-[1.88] text-white">
                        {feature.number}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-raleway mb-3 text-xl font-semibold leading-[1.2] text-[#1D1D1D]">
                        {feature.title}
                      </h3>
                      <p className="font-raleway text-base leading-[1.75] text-[#1D1D1D]">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}

                <div className="pt-2">
                  <Button className="font-rethink h-[46px] w-[156px] rounded-[10px] bg-[#06763F] text-sm font-semibold leading-[1.43] text-white">
                    Mulai Jelajahi
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden xl:block">
            <div className="flex flex-wrap items-center justify-center gap-16 sm:px-10 xl:px-0">
              {/* Features */}
              <div className="w-[616px] space-y-8">
                {data.features.map((feature, index) => (
                  <div key={feature.id} className="flex gap-4">
                    <div
                      className={`flex h-6 w-10 items-center justify-center rounded-[10px] ${
                        feature.highlighted ? 'bg-[#D16E2B]' : 'bg-[#092B1A]'
                      }`}
                    >
                      <span className="font-raleway text-base font-bold leading-[1.88] text-white">
                        {feature.number}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-raleway mb-3 text-xl font-semibold leading-[1.2] text-[#1D1D1D]">
                        {feature.title}
                      </h3>
                      <p className="font-raleway text-base leading-[1.75] text-[#1D1D1D]">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}

                <div className="pt-2">
                  <Button className="font-raleway h-[48px] w-[138px] rounded-[8px] bg-[#06763F] text-base font-semibold leading-[1.75] text-white">
                    Mulai Jelajahi
                  </Button>
                </div>
              </div>

              {/* Image with testimonials */}
              <div className="relative w-[502px]">
                <div className="ml-[84px] h-[577px] w-[385px] overflow-hidden rounded-[20px] bg-gray-200">
                  <div className="h-full w-full rounded-[20px] bg-gray-300" />
                </div>

                {/* Floating testimonial cards */}
                <div className="absolute left-0 top-[462px] w-[198px] rounded-[10px] bg-white p-2.5 shadow-[0px_4px_8px_0px_rgba(0,0,0,0.25)]">
                  <div className="flex items-center gap-2">
                    <div className="h-[42px] w-[42px] rounded-full bg-gray-200" />
                    <div className="w-[135px]">
                      <p className="font-raleway text-xs font-semibold leading-[1.33] text-[#1D1D1D]">
                        {data.testimonials[2]?.name || 'Janice M'}
                      </p>
                      <p className="font-raleway text-center text-xs leading-[1.33] text-[#1D1D1D]">
                        {data.testimonials[2]?.message || "That's a Wonderfull view"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="absolute left-[304px] top-[322px] w-[198px] rounded-[10px] bg-white p-2.5 shadow-[0px_4px_8px_0px_rgba(0,0,0,0.25)]">
                  <div className="flex items-center gap-2">
                    <div className="h-[42px] w-[42px] rounded-full bg-gray-200" />
                    <div className="w-[135px]">
                      <p className="font-raleway text-xs font-semibold leading-[1.33] text-[#1D1D1D]">
                        {data.testimonials[1]?.name || 'Carren J'}
                      </p>
                      <p className="font-raleway text-center text-xs leading-[1.33] text-[#1D1D1D]">
                        {data.testimonials[1]?.message || "That's a Wonderfull view"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="absolute left-[33px] top-[116px] w-[180px] rounded-[10px] bg-white p-2.5 shadow-[0px_4px_8px_0px_rgba(0,0,0,0.25)]">
                  <div className="flex items-center gap-2">
                    <div className="h-[42px] w-[42px] rounded-full bg-gray-200" />
                    <div className="w-[124px]">
                      <p className="font-raleway text-xs font-semibold leading-[1.33] text-[#1D1D1D]">
                        {data.testimonials[0]?.name || 'Melanie'}
                      </p>
                      <p className="font-raleway text-xs leading-[1.33] text-[#1D1D1D]">
                        {data.testimonials[0]?.message || 'Best Experience Ever !'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
