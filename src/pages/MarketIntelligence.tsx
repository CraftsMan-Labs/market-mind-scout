import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart as BarChartIcon, Loader2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"

interface MarketAnalysisData {
  img?: string
  reason?: string
  insights?: string[]
  metadata?: {
    title?: string
    x_axis_label?: string
    y_axis_label?: string
    metrics?: string[]
    date_generated?: string
  }
  confidence_score?: number
  seasonality_factors?: string[]
  market_drivers?: Record<string, number>[]
}

const MarketIntelligence = () => {
  const [marketAnalysis, setMarketAnalysis] = useState<MarketAnalysisData | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const fetchMarketAnalysis = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('http://localhost:8000/market-analysis/visualize-trend', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: "Product Domain: SaaS Offerings: Market Intelligence Platform"
        })
      })

      if (!response.ok) {
        throw new Error('Failed to fetch market analysis')
      }

      const data: MarketAnalysisData = await response.json()
      setMarketAnalysis(data)
      
      toast({
        title: "Market Analysis Loaded",
        description: data.metadata?.title || "Insights retrieved successfully"
      })
    } catch (error) {
      console.error('Market Analysis Error:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not load market analysis"
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMarketAnalysis()
  }, [])

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <BarChartIcon className="h-8 w-8 text-gray-400" />
          <h1 className="text-3xl font-bold">Market Intelligence</h1>
        </div>
        <Button 
          onClick={fetchMarketAnalysis} 
          disabled={isLoading}
          variant="outline"
        >
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Refresh Analysis"}
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      ) : marketAnalysis ? (
        <div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <Card className="bg-card">
              <CardHeader>
                <CardTitle>Confidence Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {marketAnalysis.confidence_score?.toFixed(2) || 'N/A'}%
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
                  {marketAnalysis.insights?.slice(0, 2).map((insight, index) => (
                    <p key={index} className="mb-1">{insight}</p>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader>
                <CardTitle>Date Generated</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm font-bold">
                  {marketAnalysis.metadata?.date_generated || 'N/A'}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader>
                <CardTitle>Seasonality Factors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  {marketAnalysis.seasonality_factors?.slice(0, 2).map((factor, index) => (
                    <p key={index} className="mb-1">{factor}</p>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {marketAnalysis.img && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Market Trend Visualization</h2>
              <img 
                src={`data:image/png;base64,${marketAnalysis.img}`} 
                alt="Market Trend" 
                className="w-full max-h-[500px] object-contain"
              />
            </div>
          )}
        </div>
      ) : (
        <div className="text-center text-muted-foreground">
          No market analysis data available
        </div>
      )}
    </div>
  )
}

export default MarketIntelligence
