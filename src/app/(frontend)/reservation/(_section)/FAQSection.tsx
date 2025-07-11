'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ReservationFaqPage } from '@/payload-types'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'

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

export default function FAQSection({
  faqSection,
}: {
  faqSection: ReservationFaqPage['faqSection']
}) {
  // No local state needed – handled by Radix accordion

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
            {faqSection?.title}
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col gap-8 md:gap-16 lg:flex-row lg:justify-center"
        >
          {/* FAQ List */}
          <motion.div
            variants={itemVariants}
            className="order-2 flex-1 md:order-2 lg:order-1 lg:max-w-5xl"
          >
            <Accordion type="multiple" className="space-y-6">
              {faqSection?.faqs?.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`${index}`}
                  className="rounded-lg bg-white shadow-lg"
                >
                  <AccordionTrigger className="px-4 text-base font-semibold text-gray-800 md:text-lg lg:text-xl">
                    {faq?.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 text-sm text-gray-600 md:text-base">
                    {faq?.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
