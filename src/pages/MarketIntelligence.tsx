import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart as BarChartIcon, Loader2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { supabase } from "@/integrations/supabase/client"
import { useSessionContext } from "@supabase/auth-helpers-react"

interface MarketAnalysisData {
  id?: string
  user_id?: string
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
  startup_data?: any
}

const MarketIntelligence = () => {
  const [marketAnalysis, setMarketAnalysis] = useState<MarketAnalysisData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { session } = useSessionContext()

  const fetchExistingMarketAnalysis = async () => {
    if (!session?.user?.id) return null;

    try {
      const { data, error } = await supabase
        .from('market_intelligence_reports')
        .select('*')
        .eq('user_id', session.user.id)
        .single();

      if (error) return null;
      return data;
    } catch (error) {
      console.error('Error fetching existing market analysis:', error);
      return null;
    }
  }

  const fetchStartupData = async () => {
    if (!session?.user?.id) return null;

    try {
      const { data, error } = await supabase
        .from('startup_evaluations')
        .select('*')
        .eq('user_id', session.user.id)
        .single();

      if (error) return null;
      return data;
    } catch (error) {
      console.error('Error fetching startup data:', error);
      return null;
    }
  }

  const generateMarketAnalysis = async (startupData: any) => {
    setIsLoading(true)
    try {
      const response = await fetch('http://localhost:8000/market-analysis/generate', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          startup_data: startupData
        })
      })

      if (!response.ok) {
        throw new Error('Failed to generate market analysis')
      }

      const data: MarketAnalysisData = await response.json()
      
      // Save the generated report to the database
      await supabase
        .from('market_intelligence_reports')
        .upsert({
          ...data,
          user_id: session?.user?.id,
          startup_data: startupData
        });

      setMarketAnalysis(data)
      
      toast({
        title: "Market Analysis Generated",
        description: data.metadata?.title || "New insights generated successfully"
      })
    } catch (error) {
      console.error('Market Analysis Generation Error:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not generate market analysis"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const fetchMarketAnalysis = async () => {
    setIsLoading(true)
    try {
      // First, try to fetch an existing report
      const existingReport = await fetchExistingMarketAnalysis()
      
      if (existingReport) {
        setMarketAnalysis(existingReport)
        toast({
          title: "Market Analysis Loaded",
          description: existingReport.metadata?.title || "Existing report retrieved"
        })
      } else {
        // If no existing report, fetch startup data and generate a new one
        const startupData = await fetchStartupData()
        if (startupData) {
          await generateMarketAnalysis(startupData)
        } else {
          toast({
            variant: "warning",
            title: "No Data",
            description: "Please complete the Customer Onboarding first"
          })
        }
      }
    } catch (error) {
      console.error('Market Analysis Fetch Error:', error)
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
  }, [session?.user?.id])

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
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Generate/Refresh Analysis"}
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
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <p className="text-muted-foreground text-lg">No market analysis reports available</p>
          <Button 
            onClick={fetchMarketAnalysis} 
            disabled={isLoading}
            className="bg-primary hover:bg-primary/90"
          >
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Generate First Report"}
          </Button>
        </div>
      )}
    </div>
  )
}

export default MarketIntelligence
