'use client'

import React from 'react'
import { X, Dot } from 'lucide-react'
import { Accommodation } from '@/payload-types'
import { getFacilityIcon, groupFacilities } from '@/utilities/getFacilityIcon'

interface FacilitiesModalProps {
  isOpen: boolean
  onClose: () => void
  accommodation: Accommodation
}

export default function FacilitiesModal({ isOpen, onClose, accommodation }: FacilitiesModalProps) {
  if (!isOpen) return null

  const facilityGroups = groupFacilities(accommodation)
  const otherAmenities = accommodation.other || []

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">Amenities</h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Desktop Layout (xl screens and up) */}
          <div className="hidden xl:block">
            <div className="grid grid-cols-2 gap-x-8 gap-y-8">
              {facilityGroups.map((group, index) => (
                <CategorySection key={group.title} group={group} />
              ))}

              {otherAmenities.length > 0 && (
                <CategorySection
                  group={{
                    title: 'Others',
                    facilities: otherAmenities.map((item) => ({
                      key: 'other',
                      label: item.amenity,
                    })),
                  }}
                />
              )}
            </div>
          </div>

          {/* Tablet Layout (md to lg screens) */}
          <div className="hidden md:block xl:hidden">
            <div className="grid grid-cols-2 gap-x-6 gap-y-6">
              {facilityGroups.map((group, index) => (
                <CategorySection key={group.title} group={group} />
              ))}

              {otherAmenities.length > 0 && (
                <CategorySection
                  group={{
                    title: 'Others',
                    facilities: otherAmenities.map((item) => ({
                      key: 'other',
                      label: item.amenity,
                    })),
                  }}
                />
              )}
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden">
            <div className="space-y-6">
              {facilityGroups.map((group, index) => (
                <CategorySection key={group.title} group={group} />
              ))}

              {otherAmenities.length > 0 && (
                <CategorySection
                  group={{
                    title: 'Others',
                    facilities: otherAmenities.map((item) => ({
                      key: 'other',
                      label: item.amenity,
                    })),
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function CategorySection({
  group,
}: {
  group: { title: string; facilities: { key: string; label: string }[] }
}) {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-bold uppercase tracking-wide text-gray-900">{group.title}</h3>
      <div className="space-y-2">
        {group.facilities.map((facility, index) => (
          <div key={`${facility.key}-${index}`} className="flex items-center gap-2.5">
            {facility.key === 'other' ? (
              <Dot size={14} className="text-gray-900" />
            ) : (
              getFacilityIcon(facility.key, 14)
            )}
            <span className="text-sm text-gray-700">{facility.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
