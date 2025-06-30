const fs = require('fs')
const { DOMParser } = require('xmldom')

// Read the KML file
const kmlContent = fs.readFileSync('./public/maps/chc-map.kml', 'utf8')

// Parse the XML
const parser = new DOMParser()
const xmlDoc = parser.parseFromString(kmlContent, 'text/xml')

// Function to categorize locations
function categorizeLocation(name, folderName) {
  const lowerName = name.toLowerCase()
  const lowerFolder = folderName.toLowerCase()

  // Categorize based on KML folder structure
  if (lowerFolder.includes('villa')) return 'villa'
  if (lowerFolder.includes('room')) return 'room'
  if (lowerFolder.includes('cabin')) return 'cabin'
  if (lowerFolder.includes('meeting')) return 'meeting-room'
  if (lowerFolder.includes('ground') || lowerFolder.includes('camping')) return 'camping-ground'
  if (lowerFolder.includes('dining')) return 'dining-area'
  if (lowerFolder.includes('toilet')) return 'public-toilet'
  if (lowerFolder.includes('musholla') || lowerFolder.includes('masjid')) return 'masjid'
  if (lowerFolder.includes('parking')) return 'parking-area'
  if (lowerFolder.includes('atraksi') || lowerFolder.includes('fasilitas')) return 'attractions'

  // Fallback categorization based on individual names
  if (lowerName.includes('villa')) return 'villa'
  if (
    lowerName.includes('room') ||
    lowerName.includes('gandaria') ||
    lowerName.includes('pakis') ||
    lowerName.includes('palem') ||
    lowerName.includes('sawo')
  )
    return 'room'
  if (lowerName.includes('cabin')) return 'cabin'
  if (lowerName.includes('bale') || lowerName.includes('amphy') || lowerName.includes('mahabbah'))
    return 'meeting-room'
  if (lowerName.includes('ground') || lowerName.includes('colobium')) return 'camping-ground'
  if (
    lowerName.includes('cafe') ||
    lowerName.includes('saung') ||
    lowerName.includes('beranda') ||
    lowerName.includes('kuliner')
  )
    return 'dining-area'
  if (/^\d+$/.test(lowerName) && lowerFolder.includes('toilet')) return 'public-toilet'
  if (lowerName.includes('musholla')) return 'masjid'
  if (/^\d+$/.test(lowerName) && lowerFolder.includes('parking')) return 'parking-area'

  // Default attractions for entertainment facilities
  return 'attractions'
}

// Extract all folders and their placemarks
const folders = xmlDoc.querySelectorAll('Folder')
const locations = []

folders.forEach((folder, folderIndex) => {
  const folderNameElement = folder.querySelector('n')
  const folderName = folderNameElement?.textContent || `Folder ${folderIndex + 1}`

  console.log(`Processing folder: ${folderName}`)

  const placemarks = folder.querySelectorAll('Placemark')

  placemarks.forEach((placemark, index) => {
    const nameElement = placemark.querySelector('n')
    const descElement = placemark.querySelector('description')
    const coordElement = placemark.querySelector('coordinates')

    if (nameElement && coordElement) {
      const name = nameElement.textContent || `Location ${index + 1}`
      const description = descElement?.textContent || ''
      const coordText = coordElement.textContent?.trim() || ''

      const coords = coordText.split(',').map(Number)
      const lng = coords[0]
      const lat = coords[1]

      if (lng !== undefined && lat !== undefined && !isNaN(lat) && !isNaN(lng)) {
        const category = categorizeLocation(name, folderName)

        locations.push({
          id: `${folderName.replace(/\s+/g, '-').toLowerCase()}-${index}`,
          name,
          description: description.replace(/<[^>]*>/g, ''), // Remove HTML tags
          coordinates: { lat, lng },
          category,
          folderName,
        })
      }
    }
  })
})

console.log(`\nExtracted ${locations.length} locations total`)

// Group by category for summary
const categorySummary = {}
locations.forEach((loc) => {
  categorySummary[loc.category] = (categorySummary[loc.category] || 0) + 1
})

console.log('\nCategory Summary:')
Object.entries(categorySummary).forEach(([category, count]) => {
  console.log(`${category}: ${count} locations`)
})

// Generate TypeScript file content
const tsContent = `// Auto-generated from chc-map.kml
// Camp Hulu Cai Resort Map Data

export type MapFilter = 'all' | 'villa' | 'room' | 'cabin' | 'meeting-room' | 'camping-ground' | 'dining-area' | 'public-toilet' | 'masjid' | 'parking-area' | 'attractions'

export interface Location {
  id: string
  name: string
  description: string
  coordinates: { lat: number; lng: number }
  category: MapFilter
  folderName: string
}

export const CAMP_HULU_CAI_LOCATIONS: Location[] = ${JSON.stringify(locations, null, 2)}

export const CATEGORY_COUNTS = ${JSON.stringify(categorySummary, null, 2)}
`

// Write the TypeScript file
fs.writeFileSync('./src/components/data.ts', tsContent)

console.log('\n✅ Successfully generated ./src/components/data.ts')
console.log('📊 File contains all location data ready for use in your React components!')
