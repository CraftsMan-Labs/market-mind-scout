import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

// Helper function to generate mock data
const generateMockData = () => {
  const features = [];
  for (let i = 0; i < 1000; i++) {
    features.push({
      type: 'Feature',
      properties: {
        value: Math.random() * 1000
      },
      geometry: {
        type: 'Point',
        coordinates: [
          Math.random() * 360 - 180, // longitude
          Math.random() * 170 - 85   // latitude
        ]
      }
    });
  }
  return features;
};

export const WorldHeatmap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize the map
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://api.maptiler.com/maps/basic-v2/style.json?key=3CVJZZkxVQc2qVqmWYGg',
      center: [0, 20],
      zoom: 2
    });

    // Add heatmap data when map loads
    map.current.on('load', () => {
      if (!map.current) return;

      map.current.addSource('world-data', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: generateMockData()
        }
      });

      map.current.addLayer({
        id: 'world-heat',
        type: 'heatmap',
        source: 'world-data',
        maxzoom: 9,
        paint: {
          'heatmap-weight': [
            'interpolate', ['linear'],
            ['get', 'value'],
            0, 0,
            1000, 1
          ],
          'heatmap-intensity': [
            'interpolate', ['linear'],
            ['zoom'],
            0, 1,
            9, 3
          ],
          'heatmap-color': [
            'interpolate', ['linear'],
            ['heatmap-density'],
            0, 'rgba(33,102,172,0)',
            0.2, 'rgb(103,169,207)',
            0.4, 'rgb(209,229,240)',
            0.6, 'rgb(253,219,199)',
            0.8, 'rgb(239,138,98)',
            1, 'rgb(178,24,43)'
          ],
          'heatmap-radius': [
            'interpolate', ['linear'],
            ['zoom'],
            0, 2,
            9, 20
          ],
          'heatmap-opacity': 0.8
        }
      });
    });

    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  return (
    <Card className="col-span-3 bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Global Prospect Interest Heatmap</CardTitle>
      </CardHeader>
      <CardContent>
        <div 
          ref={mapContainer} 
          style={{ height: '500px', width: '100%' }} 
          className="rounded-lg overflow-hidden"
        />
      </CardContent>
    </Card>
  );
};