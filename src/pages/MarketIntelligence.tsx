import React, { useState, useEffect } from "react"
import { BarChart as BarChartIcon, Loader2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import ReactMarkdown from 'react-markdown'
import { Button } from "@/components/ui/button"
import { supabase } from "@/integrations/supabase/client"
import { useSessionContext } from "@supabase/auth-helpers-react"
import { MarketStats } from "@/components/market-intelligence/MarketStats"
import { MarketVisualization } from "@/components/market-intelligence/MarketVisualization"
import type { MarketAnalysisData, MarketVisualizationResponse } from "@/types/market-intelligence"

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
        .maybeSingle(); // Changed from single() to maybeSingle()

      if (error) {
        console.error('Error fetching market analysis:', error);
        return null;
      }

      return data as MarketAnalysisData;
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
        .maybeSingle(); // Changed from single() to maybeSingle()

      if (error) return null;
      return data;
    } catch (error) {
      console.error('Error fetching startup data:', error);
      return null;
    }
  }

  const generateMarketVisualization = async (domain: string, offerings: string) => {
    try {
      const queryParams = new URLSearchParams({
        query: `${domain} and ${offerings}`
      });

      const response = await fetch(`http://localhost:8000/market-analysis/visualize-trend?${queryParams.toString()}`, {
        method: 'POST',
        headers: {
          'accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to generate market visualization');
      }

      const visualizationData: MarketVisualizationResponse = await response.json();

      if (marketAnalysis && session?.user?.id) {
        const updatedMarketAnalysis: MarketAnalysisData = {
          ...marketAnalysis,
          visualization_data: JSON.stringify({
            trend_breakdown: visualizationData.trend_breakdown,
            metadata: visualizationData.metadata
          }),
          metadata: {
            ...marketAnalysis.metadata,
            ...visualizationData.metadata,
            domain,
            offerings
          },
          img: visualizationData.img,
          confidence_score: visualizationData.confidence_score,
          insights: visualizationData.insights,
          seasonality_factors: visualizationData.seasonality_factors || [],
          market_drivers: visualizationData.market_drivers || [],
          user_id: session.user.id
        };

        const { error, data } = await supabase
          .from('market_intelligence_reports')
          .upsert(updatedMarketAnalysis)
          .select();

        if (error) throw error;

        // If upsert was successful and returned data
        if (data && data.length > 0) {
          setMarketAnalysis(data[0]);

          toast({
            title: "Market Visualization Generated",
            description: "New market trend visualization created"
          });
        }
      }
    } catch (error) {
      console.error('Market Visualization Generation Error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not generate market visualization"
      });
    }
  }

  const generateMarketAnalysis = async (startupData: any) => {
    setIsLoading(true);
    try {
      const querystring = `query=Product Domain: ${startupData.target_customer || ''} Offerings: ${startupData.business_model || ''}`;
      const response = await fetch(`http://localhost:8000/market-analysis/analyze?${querystring}`, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(startupData)
      });

      if (!response.ok) {
        throw new Error('Failed to generate market analysis');
      }

      const rawData = await response.json();
      
      if (!session?.user?.id) throw new Error('No user ID found');

      // Ensure the data matches our MarketAnalysisData type
      const data: MarketAnalysisData = {
        comprehensive_report: rawData.comprehensive_report,
        original_query: rawData.original_query,
        problem_breakdown: rawData.problem_breakdown,
        search_results: rawData.search_results,
        insights: rawData.problem_breakdown?.questions || [],
        metadata: {
          title: `Market Analysis: ${startupData.target_customer || 'Unknown Domain'}`,
          date_generated: new Date().toISOString(),
          domain: startupData.target_customer,
          offerings: startupData.business_model,
          x_axis_label: 'Year',
          y_axis_label: 'Market Impact',
          metrics: ['Growth', 'Innovation', 'Adoption']
        },
        // Removed confidence score
        startup_data: startupData,
        user_id: session.user.id,
        market_drivers: rawData.search_results?.yearly_insights?.map(insight => ({
          year: insight.year,
          impact: insight.analysis ? insight.analysis.length : 0
        })),
        seasonality_factors: rawData.problem_breakdown?.questions?.slice(0, 3),
        visualization_data: JSON.stringify(rawData.search_results?.yearly_insights || [])
      };

      const { error: saveError } = await supabase
        .from('market_intelligence_reports')
        .upsert(data);

      if (saveError) throw saveError;

      setMarketAnalysis(data);
      
      if (startupData?.target_customer && startupData?.business_model) {
        await generateMarketVisualization(
          startupData.target_customer, 
          startupData.business_model
        );
      }

      toast({
        title: "Market Analysis Generated",
        description: "New insights generated successfully"
      });
    } catch (error) {
      console.error('Market Analysis Generation Error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not generate market analysis"
      });
    } finally {
      setIsLoading(false);
    }
  }

  const fetchMarketAnalysis = async () => {
    setIsLoading(true);
    try {
      const existingReport = await fetchExistingMarketAnalysis();
      
      if (existingReport) {
        setMarketAnalysis(existingReport);
        toast({
          title: "Market Analysis Loaded",
          description: "Existing report retrieved"
        });
      } else {
        const startupData = await fetchStartupData();
        if (startupData) {
          await generateMarketAnalysis(startupData);
        } else {
          toast({
            variant: "default",
            title: "No Data",
            description: "Please complete the Customer Onboarding first"
          });
        }
      }
    } catch (error) {
      console.error('Market Analysis Fetch Error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not load market analysis"
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMarketAnalysis();
  }, [session?.user?.id]);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <BarChartIcon className="h-8 w-8 text-gray-400" />
          <h1 className="text-3xl font-bold">Market Intelligence</h1>
          <br />
          <h1 className="text-xl text-muted-foreground">Strategic Insights Dashboard</h1>
        </div>
        <div className="flex space-x-2">
          <Button 
            onClick={fetchMarketAnalysis} 
            disabled={isLoading}
            className="bg-primary text-white hover:bg-primary/90"
          >
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Generate/Refresh Analysis"}
          </Button>
          <Button 
            onClick={() => {
              if (marketAnalysis?.startup_data) {
                generateMarketAnalysis(marketAnalysis.startup_data);
              }
            }} 
            disabled={isLoading || !marketAnalysis?.startup_data}
            variant="secondary"
            className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
          >
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Regenerate Analysis"}
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      ) : marketAnalysis ? (
        <div className="space-y-6">
          <MarketStats 
            insights={marketAnalysis.insights}
            dateGenerated={marketAnalysis.metadata?.date_generated}
            seasonalityFactors={marketAnalysis.seasonality_factors}
          />
          <MarketVisualization 
            img={marketAnalysis.img}
            visualizationData={marketAnalysis.visualization_data}
          />
          <div className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-4">Comprehensive Market Analysis</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-200">Comprehensive Report</h3>
                <div className="text-gray-300 prose prose-invert">
                  <ReactMarkdown>{marketAnalysis.comprehensive_report || 'No detailed report available'}</ReactMarkdown>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-200">Original Query</h3>
                <p className="text-gray-300">{marketAnalysis.original_query || 'No query information'}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-200">Problem Breakdown</h3>
                <div className="text-gray-300 prose prose-invert">
                  {marketAnalysis.problem_breakdown?.questions ? (
                    <ReactMarkdown>
                      {`### Problem Breakdown\n\n${marketAnalysis.problem_breakdown.questions.map((q, index) => `${index + 1}. ${q}`).join('\n')}`}
                    </ReactMarkdown>
                  ) : (
                    'No problem breakdown available'
                  )}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-200">Market Drivers</h3>
                <pre className="text-gray-300 bg-gray-800 p-3 rounded">
                  {JSON.stringify(marketAnalysis.market_drivers, null, 2) || 'No market drivers identified'}
                </pre>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <p className="text-muted-foreground text-lg">No market analysis reports available</p>
          <Button 
            onClick={fetchMarketAnalysis} 
            disabled={isLoading}
            className="bg-primary text-white hover:bg-primary/90"
          >
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Generate First Report"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default MarketIntelligence;
