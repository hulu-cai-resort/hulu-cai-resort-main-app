'use client'

import { Button } from '@/components/ui/button'
import { MainPage, Media } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { motion } from 'framer-motion'
import {
  headerTextVariants,
  mainImageVariants,
  testimonialsContainerVariants,
  floatingTestimonialVariants,
  floatingAnimation,
  featuresContainerVariants,
  featureVariants,
  buttonVariants,
} from '@/utilities/variants'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function PlaceToGoSection({ mainPage }: { mainPage: MainPage }) {
  const router = useRouter()
  return (
    <motion.section
      className="bg-white px-8 py-10 lg:py-[64px]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={headerTextVariants}
    >
      <div className="flex justify-center">
        <div className="w-full md:max-w-[720px] lg:max-w-7xl">
          {/* Header Section */}
          <motion.div
            className="mb-6 space-y-2 text-wrap text-center md:mb-6 lg:mb-[24px] lg:space-y-4"
            variants={headerTextVariants}
          >
            <motion.p
              className="font-raleway text-lg font-semibold leading-[1.33] text-[#D16E2B] md:text-[20px] md:leading-[1.2] lg:text-[20px] lg:leading-[1.2]"
              variants={headerTextVariants}
            >
              {mainPage.aboutSectionTitle}
            </motion.p>
            <motion.h2
              className="font-raleway text-[28px] font-bold leading-[1.07] text-[#1D1D1D] md:mx-auto md:w-[666px] md:text-[36px] md:font-bold md:leading-[1.28] lg:mx-auto lg:w-[510px] lg:text-[36px] lg:leading-[1.28]"
              variants={headerTextVariants}
            >
              {mainPage.aboutTitle}
            </motion.h2>
            <motion.p
              className="font-raleway w-full text-sm leading-[1.43] text-[#1D1D1D] md:mx-auto md:text-[16px] md:leading-[1.75] lg:mx-auto lg:text-[16px] lg:leading-[1.75]"
              variants={headerTextVariants}
            >
              {mainPage.aboutDescription}
            </motion.p>
          </motion.div>

          {/* Mobile Layout */}
          <div className="md:hidden">
            <div className="space-y-6">
              {/* Image with testimonials */}
              <motion.div
                className="relative mx-auto w-[320px]"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <motion.div
                  className="ml-[31px] h-[386px] w-[258px] overflow-hidden rounded-[20px] bg-gray-200"
                  variants={mainImageVariants}
                >
                  <Image
                    src={getMediaUrl((mainPage.aboutImage as Media)?.url ?? '')}
                    alt=""
                    width={500}
                    height={500}
                    className="h-full w-full object-cover"
                  />
                </motion.div>

                {/* Floating testimonial cards */}
                <motion.div
                  variants={testimonialsContainerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <motion.div
                    className="absolute left-[-31px] top-[106px] w-[180px] rounded-[10px] bg-white p-2.5 shadow-[0px_4px_8px_0px_rgba(0,0,0,0.25)]"
                    variants={floatingTestimonialVariants}
                    animate={floatingAnimation}
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-[42px] w-[42px] overflow-hidden rounded-full bg-gray-200">
                        <Image
                          src={getMediaUrl((mainPage.testimonials?.[0]?.image as Media)?.url ?? '')}
                          alt=""
                          width={200}
                          height={200}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="w-[124px]">
                        <p className="font-raleway text-xs font-semibold leading-[1.33] text-[#1D1D1D]">
                          {mainPage.testimonials?.[0]?.name || 'Melanie'}
                        </p>
                        <p className="font-raleway text-xs leading-[1.33] text-[#1D1D1D]">
                          {mainPage.testimonials?.[0]?.message || 'Best Experience Ever !'}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="absolute left-[114px] top-[203px] w-[198px] rounded-[10px] bg-white p-2.5 shadow-[0px_4px_8px_0px_rgba(0,0,0,0.25)]"
                    variants={floatingTestimonialVariants}
                    animate={{
                      ...floatingAnimation,
                      transition: {
                        ...floatingAnimation.transition,
                        delay: 1,
                      },
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-[42px] w-[42px] overflow-hidden rounded-full bg-gray-200">
                        <Image
                          src={getMediaUrl((mainPage.testimonials?.[1]?.image as Media)?.url ?? '')}
                          alt=""
                          width={200}
                          height={200}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="w-[135px]">
                        <p className="font-raleway text-xs font-semibold leading-[1.33] text-[#1D1D1D]">
                          {mainPage.testimonials?.[1]?.name || 'Carren J'}
                        </p>
                        <p className="font-raleway text-xs leading-[1.33] text-[#1D1D1D]">
                          {mainPage.testimonials?.[1]?.message || "That's a Wonderfull view"}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="absolute left-[-36px] top-[294px] w-[198px] rounded-[10px] bg-white p-2.5 shadow-[0px_4px_8px_0px_rgba(0,0,0,0.25)]"
                    variants={floatingTestimonialVariants}
                    animate={{
                      ...floatingAnimation,
                      transition: {
                        ...floatingAnimation.transition,
                        delay: 2,
                      },
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-[42px] w-[42px] overflow-hidden rounded-full bg-gray-200">
                        <Image
                          src={getMediaUrl((mainPage.testimonials?.[2]?.image as Media)?.url ?? '')}
                          alt=""
                          width={200}
                          height={200}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="w-[135px]">
                        <p className="font-raleway text-xs font-semibold leading-[1.33] text-[#1D1D1D]">
                          {mainPage.testimonials?.[2]?.name || 'Janice M'}
                        </p>
                        <p className="font-raleway text-xs leading-[1.33] text-[#1D1D1D]">
                          {mainPage.testimonials?.[2]?.message || "That's a Wonderfull view"}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Features */}
              <motion.div
                className="space-y-6"
                variants={featuresContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                {mainPage.features?.map((feature, index) => (
                  <motion.div key={feature.id} className="space-y-3" variants={featureVariants}>
                    <div
                      className={`flex h-6 w-10 items-center justify-center rounded-[10px] ${
                        index === 1 ? 'bg-[#D16E2B]' : 'bg-[#092B1A]'
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
                  </motion.div>
                ))}

                <motion.div className="pt-2" variants={buttonVariants}>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={() => router.push('/activities')}
                      className="font-rethink h-[46px] w-full rounded-[8px] bg-[#06763F] text-xs font-semibold leading-[1.33] text-white"
                    >
                      Mulai Jelajahi
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Tablet Layout */}
          <div className="hidden md:block xl:hidden">
            <div className="flex flex-wrap items-center justify-center gap-16 sm:px-10 xl:px-0">
              {/* Image with testimonials */}
              <motion.div
                className="relative w-[502px]"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <motion.div
                  className="ml-[84px] h-[577px] w-[385px] overflow-hidden rounded-[20px] bg-gray-200"
                  variants={mainImageVariants}
                >
                  <Image
                    src={getMediaUrl((mainPage.aboutImage as Media)?.url ?? '')}
                    alt=""
                    width={500}
                    height={500}
                    className="h-full w-full object-cover"
                  />
                </motion.div>

                {/* Floating testimonial cards */}
                <motion.div
                  variants={testimonialsContainerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <motion.div
                    className="absolute left-0 top-[462px] w-[198px] rounded-[10px] bg-white p-2.5 shadow-[0px_4px_8px_0px_rgba(0,0,0,0.25)]"
                    variants={floatingTestimonialVariants}
                    animate={floatingAnimation}
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-[42px] w-[42px] overflow-hidden rounded-full bg-gray-200">
                        <Image
                          src={getMediaUrl((mainPage.testimonials?.[0]?.image as Media)?.url ?? '')}
                          alt=""
                          width={200}
                          height={200}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="w-[135px]">
                        <p className="font-raleway text-xs font-semibold leading-[1.33] text-[#1D1D1D]">
                          {mainPage.testimonials?.[2]?.name || 'Janice M'}
                        </p>
                        <p className="font-raleway text-xs leading-[1.33] text-[#1D1D1D]">
                          {mainPage.testimonials?.[2]?.message || "That's a Wonderfull view"}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="absolute left-[304px] top-[322px] w-[198px] rounded-[10px] bg-white p-2.5 shadow-[0px_4px_8px_0px_rgba(0,0,0,0.25)]"
                    variants={floatingTestimonialVariants}
                    animate={{
                      ...floatingAnimation,
                      transition: {
                        ...floatingAnimation.transition,
                        delay: 1,
                      },
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-[42px] w-[42px] overflow-hidden rounded-full bg-gray-200">
                        <Image
                          src={getMediaUrl((mainPage.testimonials?.[1]?.image as Media)?.url ?? '')}
                          alt=""
                          width={200}
                          height={200}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="w-[135px]">
                        <p className="font-raleway text-xs font-semibold leading-[1.33] text-[#1D1D1D]">
                          {mainPage.testimonials?.[1]?.name || 'Carren J'}
                        </p>
                        <p className="font-raleway text-xs leading-[1.33] text-[#1D1D1D]">
                          {mainPage.testimonials?.[1]?.message || "That's a Wonderfull view"}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="absolute left-[33px] top-[116px] w-[180px] rounded-[10px] bg-white p-2.5 shadow-[0px_4px_8px_0px_rgba(0,0,0,0.25)]"
                    variants={floatingTestimonialVariants}
                    animate={{
                      ...floatingAnimation,
                      transition: {
                        ...floatingAnimation.transition,
                        delay: 2,
                      },
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-[42px] w-[42px] overflow-hidden rounded-full bg-gray-200">
                        <Image
                          src={getMediaUrl((mainPage.testimonials?.[2]?.image as Media)?.url ?? '')}
                          alt=""
                          width={200}
                          height={200}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="w-[124px]">
                        <p className="font-raleway text-xs font-semibold leading-[1.33] text-[#1D1D1D]">
                          {mainPage.testimonials?.[0]?.name || 'Melanie'}
                        </p>
                        <p className="font-raleway text-xs leading-[1.33] text-[#1D1D1D]">
                          {mainPage.testimonials?.[0]?.message || 'Best Experience Ever !'}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Features */}
              <motion.div
                className="w-[720px] space-y-5"
                variants={featuresContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                {mainPage.features?.map((feature, index) => (
                  <motion.div key={feature.id} className="space-y-3" variants={featureVariants}>
                    <div
                      className={`flex h-6 w-10 items-center justify-center rounded-[10px] ${
                        index === 1 ? 'bg-[#D16E2B]' : 'bg-[#092B1A]'
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
                  </motion.div>
                ))}

                <motion.div className="pt-2" variants={buttonVariants}>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={() => router.push('/activities')}
                      className="font-rethink h-[46px] w-[156px] rounded-[10px] bg-[#06763F] text-sm font-semibold leading-[1.43] text-white"
                    >
                      Mulai Jelajahi
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden xl:block">
            <div className="flex flex-wrap items-center justify-center gap-16 sm:px-10 xl:px-0">
              {/* Features */}
              <motion.div
                className="w-[616px] space-y-8"
                variants={featuresContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                {mainPage.features?.map((feature, index) => (
                  <motion.div key={feature.id} className="flex gap-4" variants={featureVariants}>
                    <div
                      className={`flex h-6 w-10 items-center justify-center rounded-[10px] ${
                        index === 1 ? 'bg-[#D16E2B]' : 'bg-[#092B1A]'
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
                  </motion.div>
                ))}

                <motion.div className="pt-2" variants={buttonVariants}>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={() => router.push('/activities')}
                      className="font-raleway h-[48px] w-[138px] rounded-[8px] bg-[#06763F] text-base font-semibold leading-[1.75] text-white"
                    >
                      Mulai Jelajahi
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Image with testimonials */}
              <motion.div
                className="relative w-[502px]"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <motion.div
                  className="ml-[84px] h-[577px] w-[385px] overflow-hidden rounded-[20px] bg-gray-200"
                  variants={mainImageVariants}
                >
                  <Image
                    src={getMediaUrl((mainPage.aboutImage as Media)?.url ?? '')}
                    alt=""
                    width={500}
                    height={500}
                    className="h-full w-full object-cover"
                  />
                </motion.div>

                {/* Floating testimonial cards */}
                <motion.div
                  variants={testimonialsContainerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <motion.div
                    className="absolute left-0 top-[462px] w-[198px] rounded-[10px] bg-white p-2.5 shadow-[0px_4px_8px_0px_rgba(0,0,0,0.25)]"
                    variants={floatingTestimonialVariants}
                    animate={floatingAnimation}
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-[42px] w-[42px] overflow-hidden rounded-full bg-gray-200">
                        <Image
                          src={getMediaUrl((mainPage.testimonials?.[0]?.image as Media)?.url ?? '')}
                          alt=""
                          width={200}
                          height={200}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="w-[135px]">
                        <p className="font-raleway text-xs font-semibold leading-[1.33] text-[#1D1D1D]">
                          {mainPage.testimonials?.[2]?.name || 'Janice M'}
                        </p>
                        <p className="font-raleway text-xs leading-[1.33] text-[#1D1D1D]">
                          {mainPage.testimonials?.[2]?.message || "That's a Wonderfull view"}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="absolute left-[304px] top-[322px] w-[198px] rounded-[10px] bg-white p-2.5 shadow-[0px_4px_8px_0px_rgba(0,0,0,0.25)]"
                    variants={floatingTestimonialVariants}
                    animate={{
                      ...floatingAnimation,
                      transition: {
                        ...floatingAnimation.transition,
                        delay: 1,
                      },
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-[42px] w-[42px] overflow-hidden rounded-full bg-gray-200">
                        <Image
                          src={getMediaUrl((mainPage.testimonials?.[1]?.image as Media)?.url ?? '')}
                          alt=""
                          width={200}
                          height={200}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="w-[135px]">
                        <p className="font-raleway text-xs font-semibold leading-[1.33] text-[#1D1D1D]">
                          {mainPage.testimonials?.[1]?.name || 'Carren J'}
                        </p>
                        <p className="font-raleway text-xs leading-[1.33] text-[#1D1D1D]">
                          {mainPage.testimonials?.[1]?.message || "That's a Wonderfull view"}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="absolute left-[33px] top-[116px] w-[180px] rounded-[10px] bg-white p-2.5 shadow-[0px_4px_8px_0px_rgba(0,0,0,0.25)]"
                    variants={floatingTestimonialVariants}
                    animate={{
                      ...floatingAnimation,
                      transition: {
                        ...floatingAnimation.transition,
                        delay: 2,
                      },
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-[42px] w-[42px] overflow-hidden rounded-full bg-gray-200">
                        <Image
                          src={getMediaUrl((mainPage.testimonials?.[2]?.image as Media)?.url ?? '')}
                          alt=""
                          width={200}
                          height={200}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="w-[124px]">
                        <p className="font-raleway text-xs font-semibold leading-[1.33] text-[#1D1D1D]">
                          {mainPage.testimonials?.[0]?.name || 'Melanie'}
                        </p>
                        <p className="font-raleway text-xs leading-[1.33] text-[#1D1D1D]">
                          {mainPage.testimonials?.[0]?.message || 'Best Experience Ever !'}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
