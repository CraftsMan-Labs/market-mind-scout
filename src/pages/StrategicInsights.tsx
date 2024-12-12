import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart } from "lucide-react"

const StrategicInsights = () => {
  const insights = [
    {
      category: "Growth Opportunities",
      insights: [
        "Expansion into APAC region",
        "New product line development",
        "Strategic partnerships"
      ]
    },
    {
      category: "Market Trends",
      insights: [
        "Shift to digital solutions",
        "Increased focus on sustainability",
        "Remote work adoption"
      ]
    },
    {
      category: "Risk Factors",
      insights: [
        "Regulatory changes",
        "New market entrants",
        "Technology disruption"
      ]
    },
    {
      category: "Recommendations",
      insights: [
        "Invest in R&D",
        "Build strategic partnerships",
        "Enhance digital presence"
      ]
    }
  ]

  return (
    <div className="p-8">
      <div className="flex items-center gap-2 mb-8">
        <PieChart className="h-8 w-8 text-gray-400" />
        <h1 className="text-3xl font-bold">Strategic Insights</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {insights.map((item) => (
          <Card key={item.category} className="bg-card">
            <CardHeader>
              <CardTitle>{item.category}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                {item.insights.map((insight, index) => (
                  <li key={index} className="text-muted-foreground">
                    {insight}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default StrategicInsights