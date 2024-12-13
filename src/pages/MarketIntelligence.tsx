import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart as BarChartIcon } from "lucide-react"

const MarketIntelligence = () => {
  const marketData = [
    {
      title: "Market Size",
      value: "$2.5B",
      description: "Total addressable market in 2024"
    },
    {
      title: "Growth Rate",
      value: "12.5%",
      description: "Year over year market growth"
    },
    {
      title: "Key Players",
      value: "15",
      description: "Major companies in the space"
    },
    {
      title: "Market Share",
      value: "23%",
      description: "Our current market position"
    }
  ]

  return (
    <div className="p-8">
      <div className="flex items-center gap-2 mb-8">
        <BarChartIcon className="h-8 w-8 text-gray-400" />
        <h1 className="text-3xl font-bold">Market Intelligence</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {marketData.map((item) => (
          <Card key={item.title} className="bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {item.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              <p className="text-xs text-muted-foreground">
                {item.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default MarketIntelligence