'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { Map, APIProvider, useMap } from '@vis.gl/react-google-maps'
import { MapControls } from './components/MapControls'
import { MapLegend } from './components/MapLegend'
import { markers } from './components/data'
import { MapPage } from '@/payload-types'
import Wrapper from '@/components/Wrapper'

const CAMP_HULU_CAI_CENTER = {
  lat: -6.701885, // Approximate coordinates for Mount Pangrango area
  lng: 106.887461,
}

const DEFAULT_ZOOM = 18

// Custom map styles for dark theme
const MAP_STYLES = [
  {
    featureType: 'road',
    elementType: 'geometry.fill',
    stylers: [
      {
        lightness: -100,
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [
      {
        lightness: -100,
      },
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      {
        lightness: 100,
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'water',
    stylers: [
      {
        visibility: 'on',
      },
      {
        saturation: 100,
      },
      {
        hue: '#006eff',
      },
      {
        lightness: -19,
      },
    ],
  },
  {
    featureType: 'landscape',
    elementType: 'geometry.fill',
    stylers: [
      {
        saturation: -100,
      },
      {
        lightness: -16,
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'geometry.fill',
    stylers: [
      {
        hue: '#2bff00',
      },
      {
        lightness: -39,
      },
      {
        saturation: 8,
      },
    ],
  },
  {
    featureType: 'poi.attraction',
    elementType: 'geometry.fill',
    stylers: [
      {
        lightness: 100,
      },
      {
        saturation: -100,
      },
    ],
  },
  {
    featureType: 'poi.business',
    elementType: 'geometry.fill',
    stylers: [
      {
        saturation: -100,
      },
      {
        lightness: 100,
      },
    ],
  },
  {
    featureType: 'poi.government',
    elementType: 'geometry.fill',
    stylers: [
      {
        lightness: 100,
      },
      {
        saturation: -100,
      },
    ],
  },
  {
    featureType: 'poi.medical',
    elementType: 'geometry.fill',
    stylers: [
      {
        lightness: 100,
      },
      {
        saturation: -100,
      },
    ],
  },
  {
    featureType: 'poi.place_of_worship',
    elementType: 'geometry.fill',
    stylers: [
      {
        lightness: 100,
      },
      {
        saturation: -100,
      },
    ],
  },
  {
    featureType: 'poi.school',
    elementType: 'geometry.fill',
    stylers: [
      {
        lightness: 100,
      },
      {
        saturation: -100,
      },
    ],
  },
  {
    featureType: 'poi.sports_complex',
    elementType: 'geometry.fill',
    stylers: [
      {
        lightness: 100,
      },
      {
        saturation: -100,
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [
      {
        lightness: -28,
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      {
        lightness: -82,
      },
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [
      {
        lightness: 100,
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'geometry.fill',
    stylers: [
      {
        lightness: 100,
      },
      {
        saturation: -100,
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'geometry.stroke',
    stylers: [
      {
        lightness: 100,
      },
      {
        saturation: -100,
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'labels.text.fill',
    stylers: [
      {
        lightness: 100,
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
]

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

function getCategoryColor(category: MapFilter): string {
  const colors = {
    villa: '#10b981', // emerald-500
    room: '#3b82f6', // blue-500
    cabin: '#d97706', // amber-600
    'meeting-room': '#8b5cf6', // purple-500
    'camping-ground': '#16a34a', // green-600
    'dining-area': '#f97316', // orange-500
    'public-toilet-shower': '#06b6d4', // cyan-500
    'masjid-musholla': '#6366f1', // indigo-500
    'parking-area': '#4b5563', // gray-600
    'attractions-facilities': '#ec4899', // pink-500
    'no-filter': '#6b7280', // gray-500
    all: '#6b7280', // gray-500
  }
  return colors[category] || '#6b7280'
}

function getCategoryIcon(category: MapFilter): string {
  const icons = {
    villa: '🏡',
    room: '🛏️',
    cabin: '🏘️',
    'meeting-room': '🏢',
    'camping-ground': '⛺',
    'dining-area': '🍽️',
    'public-toilet-shower': '🚻',
    'masjid-musholla': '🕌',
    'parking-area': '🅿️',
    'attractions-facilities': '⭐',
    all: '📍',
    'no-filter': '📍',
  }
  return icons[category] || '📍'
}

// Function to create custom marker icons
function createMarkerIcon(category: MapFilter): string {
  const emoji = getCategoryIcon(category)
  const color = getCategoryColor(category)

  // Create SVG with emoji and background
  const svg = `
    <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="18" fill="${color}" stroke="white" stroke-width="2"/>
      <text x="20" y="26" text-anchor="middle" font-size="16" fill="white">${emoji}</text>
    </svg>
  `

  return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg)
}

// Component to render static markers from data.ts
function StaticMarkersRenderer({
  map,
  activeFilter,
}: {
  map: google.maps.Map
  activeFilter: MapFilter
}) {
  const [mapMarkers, setMapMarkers] = useState<google.maps.Marker[]>([])
  const [infoWindows, setInfoWindows] = useState<google.maps.InfoWindow[]>([])

  useEffect(() => {
    // Clear existing markers and info windows first
    mapMarkers.forEach((marker) => marker.setMap(null))
    infoWindows.forEach((infoWindow) => infoWindow.close())
    setMapMarkers([])
    setInfoWindows([])

    if (!map) return

    const newMarkers: google.maps.Marker[] = []
    const newInfoWindows: google.maps.InfoWindow[] = []

    // Filter markers based on active filter - only show selected category
    const filteredMarkers =
      activeFilter === 'all'
        ? markers
        : markers.filter((markerGroup) => markerGroup.title === activeFilter)

    // Debug: Show filtering results in development
    if (process.env.NODE_ENV === 'development') {
      console.log(
        `🔄 Filter: "${activeFilter}" | Showing ${filteredMarkers.length}/${markers.length} groups`,
      )
    }

    filteredMarkers.forEach((markerGroup) => {
      const category = markerGroup.title as MapFilter

      console.log(markerGroup.points)

      markerGroup.points.forEach((point) => {
        const marker = new google.maps.Marker({
          position: { lat: point.lat, lng: point.lng },
          map: map,
          title: point.text,
          icon: {
            url: createMarkerIcon(category),
            scaledSize: new google.maps.Size(40, 40),
            anchor: new google.maps.Point(20, 20),
          },
        })

        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div class="p-3 max-w-xs">
              <div class="flex items-center gap-2 mb-2">
                <span class="text-lg">${getCategoryIcon(category)}</span>
                <h3 class="font-bold text-gray-900 text-sm">${point.text}</h3>
              </div>
              <div class="text-xs text-gray-600 mb-2">
                <span class="inline-block px-2 py-1 rounded-full text-xs font-medium text-white" style="background-color: ${getCategoryColor(category)}">
                  ${markerGroup.label}
                </span>
              </div>
            </div>
          `,
        })

        marker.addListener('click', () => {
          // Close all other info windows
          newInfoWindows.forEach((iw) => iw.close())
          infoWindow.open(map, marker)
        })

        newMarkers.push(marker)
        newInfoWindows.push(infoWindow)
      })
    })

    setMapMarkers(newMarkers)
    setInfoWindows(newInfoWindows)

    // Auto-fit map to show all filtered markers
    if (newMarkers.length > 0) {
      const bounds = new google.maps.LatLngBounds()
      newMarkers.forEach((marker) => {
        const position = marker.getPosition()
        if (position) bounds.extend(position)
      })

      if (newMarkers.length === 1) {
        const position = newMarkers[0]?.getPosition()
        if (position) {
          map.setCenter(position)
          map.setZoom(19)
        }
      } else {
        map.fitBounds(bounds)
        const listener = google.maps.event.addListener(map, 'bounds_changed', () => {
          const currentZoom = map.getZoom()
          if (currentZoom !== undefined && currentZoom > 19) map.setZoom(19)
          google.maps.event.removeListener(listener)
        })
      }
    }

    return () => {
      newMarkers.forEach((marker) => {
        marker.setMap(null)
      })
      newInfoWindows.forEach((infoWindow) => {
        infoWindow.close()
      })
    }
  }, [map, activeFilter])

  return null
}

function MapContent({
  activeFilter,
  onFilterChange,
}: {
  activeFilter: MapFilter
  onFilterChange: (filter: MapFilter) => void
}) {
  const map = useMap()
  const [zoom, setZoom] = useState(DEFAULT_ZOOM)

  const handleZoomIn = useCallback(() => {
    if (map) {
      const currentZoom = map.getZoom() || DEFAULT_ZOOM
      map.setZoom(currentZoom + 1)
    }
  }, [map])

  const handleZoomOut = useCallback(() => {
    if (map) {
      const currentZoom = map.getZoom() || DEFAULT_ZOOM
      map.setZoom(currentZoom - 1)
    }
  }, [map])

  return (
    <>
      {map && <StaticMarkersRenderer map={map} activeFilter={activeFilter} />}

      <div className="absolute -right-48 top-1/2 -translate-y-1/2 overflow-x-hidden">
        <MapControls onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} zoom={zoom} />
      </div>
    </>
  )
}

export default function MapsPageClient({ mapPage }: { mapPage: MapPage }) {
  const [activeFilter, setActiveFilter] = useState<MapFilter>('all')

  const handleFilterChange = useCallback((filter: MapFilter) => {
    setActiveFilter(filter)
  }, [])

  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <h2 className="mb-4 text-xl font-bold text-red-600">Configuration Error</h2>
          <p className="text-gray-700">
            Google Maps API key is not configured. Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to
            your environment variables.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full space-y-6 overflow-x-hidden">
      <div className="h-screen w-full">
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
          <div className="h-full w-full">
            <Map
              id="camp-hulu-cai-map"
              mapId="camp-hulu-cai"
              defaultCenter={CAMP_HULU_CAI_CENTER}
              defaultZoom={DEFAULT_ZOOM}
              styles={MAP_STYLES}
              gestureHandling="cooperative"
              minZoom={17}
              maxZoom={20}
              disableDefaultUI={true}
              mapTypeControl={true}
            >
              <MapContent activeFilter={activeFilter} onFilterChange={handleFilterChange} />
            </Map>
          </div>
        </APIProvider>
      </div>

      <Wrapper>
        <MapLegend activeFilter={activeFilter} onFilterChange={handleFilterChange} />

        {/* Map Footer Section - Based on Figma Design */}
        <div className="bg-white py-8">
          <div className="mx-auto max-w-7xl">
            {/* Header with Title and Download Button */}
            <div className="mb-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <h1 className="font-['Raleway'] text-3xl font-bold leading-tight text-black md:text-5xl lg:text-6xl">
                {mapPage.title}
              </h1>
            </div>

            {/* Map Legend in Footer */}

            {/* About Section */}
            <div className="max-w-full">
              <div className="text-justify font-['Raleway'] text-lg leading-relaxed text-black md:text-xl">
                {mapPage.description}
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  )
}
