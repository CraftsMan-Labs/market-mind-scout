import { ResponsiveChoropleth } from '@nivo/geo'
import { features } from '../data/world-countries'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

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
]

export const WorldHeatmap = () => {
  return (
    <Card className="col-span-3 bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Global Prospect Interest Heatmap</CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ height: '500px', width: '100%' }}>
          <ResponsiveChoropleth
            data={mockData}
            features={features}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            colors="blues"
            domain={[0, 100]}
            unknownColor="#666666"
            label="properties.name"
            valueFormat=".2s"
            projectionScale={140}
            projectionTranslation={[0.5, 0.5]}
            projectionRotation={[0, 0, 0]}
            enableGraticule={true}
            graticuleLineColor="rgba(255, 255, 255, 0.2)"
            borderWidth={0.5}
            borderColor="#152538"
            theme={{
              text: {
                fill: '#ffffff'
              },
              tooltip: {
                container: {
                  background: '#1f2937',
                  color: '#ffffff',
                  fontSize: '12px',
                  borderRadius: '4px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  padding: '8px 12px'
                }
              }
            }}
            legends={[
              {
                anchor: 'bottom-left',
                direction: 'column',
                justify: true,
                translateX: 20,
                translateY: -20,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: 'left-to-right',
                itemTextColor: '#ffffff',
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemTextColor: '#ffffff',
                      itemOpacity: 1
                    }
                  }
                ]
              }
            ]}
          />
        </div>
      </CardContent>
    </Card>
  )
}