'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, X } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

const faqData = [
  {
    question: 'Bagaimana Cara Booking Camp HuluCai?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor iis nisi ut aliquip ex e',
  },
  {
    question: 'Apa saja fasilitas yang tersedia?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor iis nisi ut aliquip ex e',
  },
  {
    question: 'Berapa lama waktu maksimal menginap?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor iis nisi ut aliquip ex e',
  },
  {
    question: 'Apakah ada batasan usia untuk pengunjung?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor iis nisi ut aliquip ex e',
  },
  {
    question: 'Bagaimana kebijakan pembatalan?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor iis nisi ut aliquip ex e',
  },
  {
    question: 'Apakah tersedia layanan transportasi?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor iis nisi ut aliquip ex e',
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const [questionText, setQuestionText] = useState('')

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Question submitted:', questionText)
    setQuestionText('')
  }

  return (
    <section className="mx-auto bg-white px-4 py-16 sm:px-8 md:py-24 xl:px-0">
      <div className="container mx-auto w-full px-4">
        {/* Title - Only shown on tablet and desktop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 text-center md:mb-16"
        >
          <h2 className="text-2xl font-semibold text-gray-800 md:text-3xl lg:text-4xl">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-8 md:gap-16 lg:flex-row lg:justify-center"
        >
          {/* Question Form - Mobile: top, Tablet: left, Desktop: right */}
          <motion.div
            variants={itemVariants}
            className="order-1 md:order-1 lg:order-2 lg:w-[476px] lg:flex-shrink-0"
          >
            <div className="mx-auto max-w-sm md:max-w-none">
              {/* Decorative Images */}
              <div className="relative mb-8 flex items-center justify-center">
                <div className="mx-auto grid h-[296px] w-[338px]">
                  {/* Image positioning based on Figma design */}
                  <div className="relative">
                    <div className="absolute left-0 top-[42px] h-[102px] w-[169px] rounded-br-[20px] bg-gradient-to-br from-gray-300 to-gray-400 bg-cover bg-center"></div>
                    <div className="absolute right-0 top-[152px] h-[99px] w-[169px] rounded-br-[20px] bg-gradient-to-br from-gray-300 to-gray-400 bg-cover bg-center"></div>
                    <div className="absolute left-[41px] top-[152px] h-[144px] w-[118px] rounded-l-[30px] rounded-r-[30px] bg-gradient-to-br from-gray-300 to-gray-400 bg-cover bg-center"></div>
                    <div className="absolute right-[41px] top-0 h-[144px] w-[118px] rounded-l-[30px] rounded-r-[30px] bg-gradient-to-br from-gray-300 to-gray-400 bg-cover bg-center"></div>
                  </div>
                </div>
              </div>

              <div className="mb-8 text-center">
                <h3 className="mb-2 text-lg font-semibold text-gray-800 md:text-xl lg:text-2xl">
                  Ada Pertanyaan?
                </h3>
                <p className="text-sm text-gray-600 md:text-base">
                  Kamu bisa menambahkan pertanyaanmu pada kolom berikut :
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    placeholder="Tulis disini"
                    className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-base transition-colors duration-200 focus:border-[#D16E2B] focus:outline-none"
                  />
                  {questionText && (
                    <button
                      type="button"
                      onClick={() => setQuestionText('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  )}
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-[156px] rounded-lg bg-[#06763F] px-4 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#055530] md:mx-auto md:block lg:mx-0"
                >
                  Submit
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* FAQ List - Mobile: bottom, Tablet: right, Desktop: left */}
          <motion.div
            variants={itemVariants}
            className="order-2 flex-1 md:order-2 lg:order-1 lg:max-w-[600px]"
          >
            <div className="space-y-6">
              {faqData.map((faq, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`overflow-hidden rounded-lg border-0 bg-white shadow-lg transition-all duration-200 ${
                    openIndex === index ? 'h-auto' : 'h-16 md:h-[64px]'
                  }`}
                  style={{ boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="flex w-full items-center justify-between p-4 text-left transition-colors duration-200 hover:bg-gray-50 md:p-3"
                  >
                    <h3 className="pr-4 text-base font-semibold text-gray-800 md:text-lg lg:text-xl">
                      {faq.question}
                    </h3>
                    <ChevronDown
                      className={`h-6 w-6 flex-shrink-0 text-gray-500 transition-transform duration-200 md:h-8 md:w-8 lg:h-10 lg:w-10 ${
                        openIndex === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-4 pb-4 md:px-3 md:pb-3"
                    >
                      <p className="text-sm text-gray-600 md:text-base">{faq.answer}</p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
