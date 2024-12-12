import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { scaleLinear } from "d3-scale";
import { features } from "../data/world-countries";

// Comprehensive mock data for global market interest levels
const mockData = [
  // North America
  { id: "USA", value: 85, label: "United States", region: "North America" },
  { id: "CAN", value: 72, label: "Canada", region: "North America" },
  { id: "MEX", value: 58, label: "Mexico", region: "North America" },

  // Europe
  { id: "GBR", value: 78, label: "United Kingdom", region: "Europe" },
  { id: "DEU", value: 76, label: "Germany", region: "Europe" },
  { id: "FRA", value: 71, label: "France", region: "Europe" },
  { id: "ITA", value: 65, label: "Italy", region: "Europe" },
  { id: "ESP", value: 62, label: "Spain", region: "Europe" },
  { id: "NLD", value: 69, label: "Netherlands", region: "Europe" },
  { id: "CHE", value: 73, label: "Switzerland", region: "Europe" },
  { id: "SWE", value: 67, label: "Sweden", region: "Europe" },

  // Asia Pacific
  { id: "CHN", value: 82, label: "China", region: "Asia Pacific" },
  { id: "JPN", value: 77, label: "Japan", region: "Asia Pacific" },
  { id: "KOR", value: 70, label: "South Korea", region: "Asia Pacific" },
  { id: "IND", value: 75, label: "India", region: "Asia Pacific" },
  { id: "SGP", value: 68, label: "Singapore", region: "Asia Pacific" },
  { id: "AUS", value: 66, label: "Australia", region: "Asia Pacific" },
  { id: "IDN", value: 55, label: "Indonesia", region: "Asia Pacific" },
  { id: "MYS", value: 52, label: "Malaysia", region: "Asia Pacific" },

  // Middle East & Africa
  { id: "ARE", value: 64, label: "UAE", region: "Middle East" },
  { id: "SAU", value: 59, label: "Saudi Arabia", region: "Middle East" },
  { id: "ISR", value: 63, label: "Israel", region: "Middle East" },
  { id: "ZAF", value: 48, label: "South Africa", region: "Africa" },
  { id: "EGY", value: 45, label: "Egypt", region: "Africa" },
  { id: "NGA", value: 42, label: "Nigeria", region: "Africa" },

  // Latin America
  { id: "BRA", value: 61, label: "Brazil", region: "Latin America" },
  { id: "ARG", value: 54, label: "Argentina", region: "Latin America" },
  { id: "CHL", value: 53, label: "Chile", region: "Latin America" },
  { id: "COL", value: 49, label: "Colombia", region: "Latin America" },
  { id: "PER", value: 47, label: "Peru", region: "Latin America" }
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