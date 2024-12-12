import { ResponsiveChoropleth } from '@nivo/geo'
import { features } from '../data/world-countries'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

// Mock data for prospect interest levels by country
const mockData = [
  { id: "USA", value: 85, label: "United States" },
  { id: "CHN", value: 75, label: "China" },
  { id: "IND", value: 70, label: "India" },
  { id: "GBR", value: 65, label: "United Kingdom" },
  { id: "DEU", value: 60, label: "Germany" },
  { id: "BRA", value: 55, label: "Brazil" },
  { id: "CAN", value: 50, label: "Canada" },
  { id: "AUS", value: 45, label: "Australia" },
  { id: "FRA", value: 40, label: "France" },
  { id: "JPN", value: 35, label: "Japan" },
]

export const WorldHeatmap = () => {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Global Prospect Interest Heatmap</CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ height: '500px' }}>
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