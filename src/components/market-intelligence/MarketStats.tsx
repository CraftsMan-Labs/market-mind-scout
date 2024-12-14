import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MarketStatsProps {
  confidenceScore: number | null;
  insights: string[] | null;
  dateGenerated: string | null;
  seasonalityFactors: string[] | null;
}

export const MarketStats = ({ 
  confidenceScore, 
  insights, 
  dateGenerated, 
  seasonalityFactors 
}: MarketStatsProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
      <Card className="bg-card">
        <CardHeader>
          <CardTitle>Confidence Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {confidenceScore ? `${confidenceScore.toFixed(2)}%` : 'N/A'}
          </div>
          <p className="text-xs text-muted-foreground">Analysis Reliability</p>
        </CardContent>
      </Card>

      <Card className="bg-card">
        <CardHeader>
          <CardTitle>Key Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm">
            {insights?.slice(0, 2).map((insight, index) => (
              <p key={index} className="mb-1">{insight}</p>
            )) || <p>No insights available</p>}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card">
        <CardHeader>
          <CardTitle>Date Generated</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm font-bold">
            {dateGenerated || 'N/A'}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card">
        <CardHeader>
          <CardTitle>Seasonality Factors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm">
            {seasonalityFactors?.slice(0, 2).map((factor, index) => (
              <p key={index} className="mb-1">{factor}</p>
            )) || <p>No seasonality factors available</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};