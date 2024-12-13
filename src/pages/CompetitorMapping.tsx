import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"

const CompetitorMapping = () => {
  const competitors = [
    {
      name: "Company A",
      marketShare: "35%",
      strength: "Product Innovation",
      weakness: "Customer Service"
    },
    {
      name: "Company B",
      marketShare: "28%",
      strength: "Brand Recognition",
      weakness: "Pricing"
    },
    {
      name: "Company C",
      marketShare: "20%",
      strength: "Distribution Network",
      weakness: "Technology"
    },
    {
      name: "Company D",
      marketShare: "17%",
      strength: "Customer Service",
      weakness: "Product Range"
    }
  ]

  return (
    <div className="p-8">
      <div className="flex items-center gap-2 mb-8">
        <TrendingUp className="h-8 w-8 text-gray-400" />
        <h1 className="text-3xl font-bold">Competitor Mapping</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {competitors.map((competitor) => (
          <Card key={competitor.name} className="bg-card">
            <CardHeader>
              <CardTitle>{competitor.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Market Share</dt>
                  <dd className="font-medium">{competitor.marketShare}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Key Strength</dt>
                  <dd className="font-medium">{competitor.strength}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Key Weakness</dt>
                  <dd className="font-medium">{competitor.weakness}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default CompetitorMapping