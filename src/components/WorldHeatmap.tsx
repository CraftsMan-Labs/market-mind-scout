import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { scaleLinear } from "d3-scale";
import { features } from "../data/world-countries";

// Enhanced mock data for prospect interest levels by country
const mockData = [
  { id: "USA", value: 85, label: "United States" },
  { id: "CHN", value: 78, label: "China" },
  { id: "IND", value: 72, label: "India" },
  { id: "BRA", value: 65, label: "Brazil" },
  { id: "GBR", value: 60, label: "United Kingdom" },
  { id: "DEU", value: 58, label: "Germany" },
  { id: "JPN", value: 55, label: "Japan" },
  { id: "CAN", value: 52, label: "Canada" },
  { id: "AUS", value: 48, label: "Australia" },
  { id: "FRA", value: 45, label: "France" },
  { id: "KOR", value: 42, label: "South Korea" },
  { id: "MEX", value: 40, label: "Mexico" },
  { id: "IDN", value: 38, label: "Indonesia" },
  { id: "RUS", value: 35, label: "Russia" },
  { id: "ZAF", value: 32, label: "South Africa" },
  { id: "SGP", value: 30, label: "Singapore" },
  { id: "ARE", value: 28, label: "UAE" },
  { id: "NGA", value: 25, label: "Nigeria" },
  { id: "SAU", value: 22, label: "Saudi Arabia" },
  { id: "TUR", value: 20, label: "Turkey" },
];

const colorScale = scaleLinear<string>()
  .domain([0, 100])
  .range(["#C6DBEF", "#084B8A"]);

export const WorldHeatmap = () => {
  return (
    <Card className="col-span-3 bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Global Prospect Interest Heatmap</CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ height: '500px', width: '100%' }} className="relative">
          <ComposableMap
            projectionConfig={{
              rotate: [-10, 0, 0],
              scale: 147
            }}
          >
            <ZoomableGroup>
              <Geographies geography={features}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const d = mockData.find((s) => s.id === geo.id);
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={d ? colorScale(d.value) : "#2C3440"}
                        stroke="#152538"
                        strokeWidth={0.5}
                        style={{
                          default: {
                            outline: "none"
                          },
                          hover: {
                            fill: "#1E293B",
                            outline: "none",
                            transition: "all 250ms"
                          },
                          pressed: {
                            outline: "none"
                          }
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
          
          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-gray-800 p-3 rounded-lg">
            <div className="text-white text-sm mb-2">Interest Level</div>
            <div className="flex items-center gap-2">
              <div className="w-24 h-3 bg-gradient-to-r from-[#C6DBEF] to-[#084B8A]" />
              <div className="flex justify-between w-full text-xs text-white">
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};