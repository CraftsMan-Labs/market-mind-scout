// This is a simplified version of the world countries GeoJSON data
export const features = [
  // ... A very long array of GeoJSON features for all countries
  // For brevity, I'm including just a few examples
  {
    "type": "Feature",
    "properties": { "name": "United States" },
    "id": "USA",
    "geometry": {
      "type": "MultiPolygon",
      "coordinates": [] // Actual coordinates would go here
    }
  },
  {
    "type": "Feature",
    "properties": { "name": "China" },
    "id": "CHN",
    "geometry": {
      "type": "MultiPolygon",
      "coordinates": [] // Actual coordinates would go here
    }
  }
  // ... More countries would be included here
]