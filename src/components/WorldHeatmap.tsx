import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

// Helper function to generate mock data
const generateMockData = () => {
  const points = [];
  for (let i = 0; i < 50; i++) {
    points.push({
      coordinates: [
        Math.random() * 360 - 180, // longitude
        Math.random() * 170 - 85   // latitude
      ],
      value: Math.random() * 1000
    });
  }
  return points;
};

const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

export const WorldHeatmap = () => {
  const data = generateMockData();

  return (
    <Card className="col-span-3 bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Global Prospect Interest Heatmap</CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ height: '500px', width: '100%' }} className="rounded-lg overflow-hidden">
          <ComposableMap
            projectionConfig={{
              scale: 147,
            }}
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#2C3440"
                    stroke="#1F2937"
                    strokeWidth={0.5}
                  />
                ))
              }
            </Geographies>
            {data.map((point, index) => (
              <Marker key={index} coordinates={point.coordinates as [number, number]}>
                <circle
                  r={Math.sqrt(point.value) / 10}
                  fill="#F87171"
                  fillOpacity={0.6}
                  stroke="none"
                />
              </Marker>
            ))}
          </ComposableMap>
        </div>
      </CardContent>
    </Card>
  );
};