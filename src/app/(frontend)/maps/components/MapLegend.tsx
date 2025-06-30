'use client'

import { Button } from '@/components/ui/button'
import React from 'react'

type MapFilter =
  | 'no-filter'
  | 'all'
  | 'villa'
  | 'room'
  | 'cabin'
  | 'meeting-room'
  | 'camping-ground'
  | 'dining-area'
  | 'public-toilet-shower'
  | 'masjid-musholla'
  | 'parking-area'
  | 'attractions-facilities'

type Props = {
  activeFilter: MapFilter
  onFilterChange: (filter: MapFilter) => void
}

const filterOptions = [
  {
    id: 'no-filter' as const,
    label: 'No Filter',
    color: 'bg-gray-500',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    id: 'villa' as const,
    label: 'Villa',
    color: 'bg-emerald-500',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </svg>
    ),
  },
  {
    id: 'room' as const,
    label: 'Room',
    color: 'bg-blue-500',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M7 14c1.66 0 3-1.34 3-3S8.66 8 7 8s-3 1.34-3 3 1.34 3 3 3zm0-4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM19 7h-8v7H3V6H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z" />
      </svg>
    ),
  },
  {
    id: 'cabin' as const,
    label: 'Cabin',
    color: 'bg-amber-600',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3zm5 15h-2v-6H9v6H7v-6.81l5-4.5 5 4.5V18z" />
      </svg>
    ),
  },
  {
    id: 'meeting-room' as const,
    label: 'Meeting Room',
    color: 'bg-purple-500',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
      </svg>
    ),
  },
  {
    id: 'camping-ground' as const,
    label: 'Camping/Games Ground',
    color: 'bg-green-600',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M5 21v-2h14v2H5zm7-18L2.25 19h19.5L12 3zm0 3.8L16.75 17H7.25L12 6.8z" />
      </svg>
    ),
  },
  {
    id: 'dining-area' as const,
    label: 'Dining Area',
    color: 'bg-orange-500',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.20-1.10-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z" />
      </svg>
    ),
  },
  {
    id: 'public-toilet-shower' as const,
    label: 'Public Toilet & Shower',
    color: 'bg-cyan-500',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M5.5 22v-7.5H4V9c0-1.1.9-2 2-2h3c1.1 0 2 .9 2 2v5.5H9.5V22h-4zM18 22v-6h1.5l-2.54-7.63A1.5 1.5 0 0 0 15.5 7.5h-3c-.68 0-1.28.42-1.46 1.37L8.5 16H10v6h8zM7.5 6A1.5 1.5 0 1 0 6 4.5 1.5 1.5 0 0 0 7.5 6zm9 0A1.5 1.5 0 1 0 15 4.5 1.5 1.5 0 0 0 16.5 6z" />
      </svg>
    ),
  },
  {
    id: 'masjid-musholla' as const,
    label: 'Masjid/Musholla',
    color: 'bg-indigo-500',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M6 16v6h12v-6c0-1.1-.9-2-2-2h-8c-1.1 0-2 .9-2 2zm2-1h8c.55 0 1 .45 1 1v5H7v-5c0-.55.45-1 1-1z" />
        <circle cx="12" cy="4" r="2" />
        <path d="M12 6c-1.1 0-2 .9-2 2v4h4V8c0-1.1-.9-2-2-2z" />
      </svg>
    ),
  },
  {
    id: 'parking-area' as const,
    label: 'Parking Area',
    color: 'bg-gray-600',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M6 3v18h4v-7h4c3.31 0 6-2.69 6-6s-2.69-6-6-6H6zm4 4h4c1.1 0 2 .9 2 2s-.9 2-2 2h-4V7z" />
      </svg>
    ),
  },
  {
    id: 'attractions-facilities' as const,
    label: 'Atraksi & Fasilitas',
    color: 'bg-pink-500',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
]

export function MapLegend({ activeFilter, onFilterChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2 py-4">
      {/* Show All Filter */}
      {/* <button
        onClick={() => onFilterChange('all')}
        className={`flex items-center gap-3 rounded-lg border-2 p-3 text-sm transition-all ${
          activeFilter === 'all'
            ? 'border-green-600 bg-green-50 shadow-md'
            : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'
        }`}
      >
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-green-400 to-blue-500">
          <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
        <span className="font-semibold text-gray-900">Show All Locations</span>
      </button> */}

      {/* Individual Category Filters */}
      {filterOptions
        .filter((option) => option.id !== 'no-filter')
        .map((option) => (
          <Button
            key={option.id}
            onClick={() => onFilterChange(option.id)}
            variant={activeFilter === option.id ? 'default' : 'outline'}
            className={`flex items-center gap-3 rounded-lg border-2 p-3 text-sm transition-all`}
          >
            <div
              className={`h-5 w-5 ${option.color} flex items-center justify-center rounded-full text-white`}
            >
              {option.icon}
            </div>
            <span className="font-semibold text-gray-900">{option.label}</span>
          </Button>
        ))}
    </div>
  )
}
