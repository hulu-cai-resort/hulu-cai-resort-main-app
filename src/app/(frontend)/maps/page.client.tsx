'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { Map, APIProvider, useMap } from '@vis.gl/react-google-maps'
import { MapControls } from './components/MapControls'
import { MapLegend } from './components/MapLegend'
import { MapMarker, MapPage } from '@/payload-types'
import Wrapper from '@/components/Wrapper'
import { PaginatedDocs } from 'payload'

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
  | 'cottage'
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
    cottage: '#3b82f6', // blue-500
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
    cottage: '🛏️',
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

// Component to render markers from collection
function StaticMarkersRenderer({
  map,
  activeFilter,
  mapMarkers,
}: {
  map: google.maps.Map
  activeFilter: MapFilter
  mapMarkers: PaginatedDocs<MapMarker>
}) {
  const [googleMarkers, setGoogleMarkers] = useState<google.maps.Marker[]>([])
  const [infoWindows, setInfoWindows] = useState<google.maps.InfoWindow[]>([])

  useEffect(() => {
    // Clear existing markers and info windows first
    googleMarkers.forEach((marker) => marker.setMap(null))
    infoWindows.forEach((infoWindow) => infoWindow.close())
    setGoogleMarkers([])
    setInfoWindows([])

    if (!map) return

    const newMarkers: google.maps.Marker[] = []
    const newInfoWindows: google.maps.InfoWindow[] = []

    // Filter markers based on active filter - only show selected category
    const filteredMarkers =
      activeFilter === 'all'
        ? mapMarkers.docs
        : mapMarkers.docs.filter((markerGroup) => markerGroup.title === activeFilter)

    // Debug: Show filtering results in development
    if (process.env.NODE_ENV === 'development') {
      console.log(
        `🔄 Filter: "${activeFilter}" | Showing ${filteredMarkers.length}/${mapMarkers.docs.length} groups`,
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

        // Determine redirect URL based on relations
        const getRedirectInfo = () => {
          if (point.relatedAccommodation) {
            const accommodation = point.relatedAccommodation
            if (typeof accommodation === 'object' && accommodation.type) {
              switch (accommodation.type) {
                case 'villa':
                  return {
                    url: `/accommodations/villa#accommodation-${accommodation.id}`,
                    label: 'View Villa Details',
                  }
                case 'cottage':
                  return {
                    url: `/accommodations/cottage#accommodation-${accommodation.id}`,
                    label: 'View Cottage Details',
                  }
                case 'cabin':
                  return {
                    url: `/accommodations/cabin#accommodation-${accommodation.id}`,
                    label: 'View Cabin Details',
                  }
                case 'camping_ground':
                  return {
                    url: `/accommodations/camping-ground#accommodation-${accommodation.id}`,
                    label: 'View Camping Details',
                  }
              }
            }
          }

          if (point.relatedDiningArea) {
            const diningArea = point.relatedDiningArea
            if (typeof diningArea === 'object' && diningArea.id) {
              return {
                url: `/dining#dining-${diningArea.id}`,
                label: 'View Dining Area Details',
              }
            }
          }
          if (point.relatedMeetingEventArea) {
            const meetingEventArea = point.relatedMeetingEventArea
            if (typeof meetingEventArea === 'object' && meetingEventArea.areaType) {
              switch (meetingEventArea.areaType) {
                case 'indoor':
                  return {
                    url: `/events/indoor#indoor-${meetingEventArea.id}`,
                    label: 'View Indoor Event Details',
                  }
                case 'outdoor':
                  return {
                    url: `/events/outdoor#outdoor-${meetingEventArea.id}`,
                    label: 'View Outdoor Event Details',
                  }
              }
            }
          }
          if (point.relatedAttraction || point.relatedAmenity) {
            const attraction = point.relatedAttraction
            const amenity = point.relatedAmenity
            if (attraction && typeof attraction === 'object' && attraction.id) {
              return {
                url: `/attractions-amenities#attraction-${attraction.id}`,
                label: 'View Attraction Details',
              }
            }
            if (amenity && typeof amenity === 'object' && amenity.id) {
              return {
                url: `/attractions-amenities#amenity-${amenity.id}`,
                label: 'View Amenity Details',
              }
            }
          }
          return null
        }

        const redirectInfo = getRedirectInfo()
        const buttonHtml = redirectInfo
          ? `
            <div class="mt-3 pt-2 border-t border-gray-200">
              <button 
                onclick="window.open('${redirectInfo.url}', '_blank')" 
                class="w-full bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md text-xs font-medium transition-colors duration-200 flex items-center justify-center gap-1"
              >
                <span>${redirectInfo.label}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17"/>
                </svg>
              </button>
            </div>
          `
          : ''

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
                ${buttonHtml}
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

    setGoogleMarkers(newMarkers)
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
          map.setZoom(20)
        }
      } else {
        map.fitBounds(bounds)
        const listener = google.maps.event.addListener(map, 'bounds_changed', () => {
          const currentZoom = map.getZoom()
          if (currentZoom !== undefined && currentZoom > 20) map.setZoom(20)
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

const CustomOverlay = () => {
  const map = useMap()

  useEffect(() => {
    if (!map) return

    class MyOverlay extends google.maps.OverlayView {
      private bounds: google.maps.LatLngBounds
      private image: string
      private div?: HTMLElement
      private imageAspectRatio: number

      constructor(bounds: google.maps.LatLngBounds, image: string) {
        super()
        this.bounds = bounds
        this.image = image
        // Your image dimensions: 8192x5788
        this.imageAspectRatio = 8192 / 5788 // ≈ 1.415
      }

      override onAdd() {
        this.div = document.createElement('div')
        this.div.style.borderStyle = 'none'
        this.div.style.borderWidth = '0px'
        this.div.style.position = 'absolute'
        this.div.style.overflow = 'hidden' // Prevent image from overflowing

        const img = document.createElement('img')
        img.src = this.image
        img.style.width = '100%'
        img.style.height = '100%'
        img.style.position = 'absolute'
        img.style.objectFit = 'contain' // Changed from 'cover' to 'contain'
        img.style.objectPosition = 'center' // Center the image within bounds

        this.div.appendChild(img)

        const panes = this.getPanes()
        panes?.overlayLayer.appendChild(this.div)
      }

      override draw() {
        const overlayProjection = this.getProjection()
        const sw = overlayProjection.fromLatLngToDivPixel(this.bounds.getSouthWest())!
        const ne = overlayProjection.fromLatLngToDivPixel(this.bounds.getNorthEast())!

        if (this.div) {
          // Calculate the bounds dimensions
          const boundsWidth = ne.x - sw.x
          const boundsHeight = sw.y - ne.y
          const boundsAspectRatio = boundsWidth / boundsHeight

          let finalWidth = boundsWidth
          let finalHeight = boundsHeight
          let offsetX = 0
          let offsetY = 0

          // Adjust dimensions to maintain image aspect ratio
          if (boundsAspectRatio > this.imageAspectRatio) {
            // Bounds are wider than image ratio - fit to height
            finalWidth = boundsHeight * this.imageAspectRatio
            offsetX = (boundsWidth - finalWidth) / 2
          } else {
            // Bounds are taller than image ratio - fit to width
            finalHeight = boundsWidth / this.imageAspectRatio
            offsetY = (boundsHeight - finalHeight) / 2
          }

          this.div.style.left = sw.x + offsetX + 'px'
          this.div.style.top = ne.y + offsetY + 'px'
          this.div.style.width = finalWidth + 'px'
          this.div.style.height = finalHeight + 'px'
        }
      }

      override onRemove() {
        if (this.div) {
          ;(this.div.parentNode as HTMLElement).removeChild(this.div)
          delete this.div
        }
      }
    }

    // Configuration - easier to adjust
    const centerLat = -6.70201
    const centerLng = 106.887665

    // Method 1: Using center point and spans (your current approach)
    const latSpan = 0.00562
    const lngSpan = 0.0079

    const bounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(centerLat - latSpan / 2, centerLng - lngSpan / 2),
      new google.maps.LatLng(centerLat + latSpan / 2, centerLng + lngSpan / 2),
    )

    //Method 2: Direct corner specification (alternative)
    // const bounds = new google.maps.LatLngBounds(
    //   new google.maps.LatLng(-6.704766, 106.8837), // SW corner
    //   new google.maps.LatLng(-6.699146, 106.8916), // NE corner
    // )

    const overlay = new MyOverlay(bounds, '/maps/Map.png')
    overlay.setMap(map)

    return () => {
      overlay.setMap(null)
    }
  }, [map])

  return null
}

function MapContent({
  activeFilter,
  onFilterChange,
  mapMarkers,
}: {
  activeFilter: MapFilter
  onFilterChange: (filter: MapFilter) => void
  mapMarkers: PaginatedDocs<MapMarker>
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
      {map && (
        <StaticMarkersRenderer map={map} activeFilter={activeFilter} mapMarkers={mapMarkers} />
      )}
      <CustomOverlay />
      <div className="absolute -right-48 top-1/2 -translate-y-1/2 overflow-x-hidden">
        <MapControls onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} zoom={zoom} />
      </div>
    </>
  )
}

export default function MapsPageClient({
  mapPage,
  mapMarkers,
}: {
  mapPage: MapPage
  mapMarkers: PaginatedDocs<MapMarker>
}) {
  const [activeFilter, setActiveFilter] = useState<MapFilter>('all')
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

  const handleFilterChange = useCallback((filter: MapFilter) => {
    setActiveFilter(filter)
  }, [])

  if (!googleMapsApiKey) {
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
        <APIProvider apiKey={googleMapsApiKey}>
          <div className="h-full w-full">
            <Map
              id="camp-hulu-cai-map"
              mapId="camp-h-cai"
              defaultCenter={CAMP_HULU_CAI_CENTER}
              defaultZoom={DEFAULT_ZOOM}
              styles={MAP_STYLES}
              gestureHandling="cooperative"
              minZoom={18.5}
              maxZoom={21}
              disableDefaultUI={true}
              mapTypeId={'roadmap'}
            >
              <MapContent
                activeFilter={activeFilter}
                onFilterChange={handleFilterChange}
                mapMarkers={mapMarkers}
              />
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
