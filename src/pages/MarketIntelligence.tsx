import React, { useState, useEffect } from "react"
import { BarChart as BarChartIcon, Loader2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
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

  const generateMarketVisualization = async (domain: string, offerings: string) => {
    try {
      const queryParams = new URLSearchParams({
        query: `Product Domain: ${domain} Offerings: ${offerings}`
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
          visualization_data: JSON.stringify(visualizationData),
          metadata: {
            ...marketAnalysis.metadata,
            ...visualizationData.metadata,
            domain,
            offerings
          },
          img: visualizationData.img,
          confidence_score: visualizationData.confidence_score,
          insights: visualizationData.insights,
          seasonality_factors: visualizationData.seasonality_factors,
          market_drivers: visualizationData.market_drivers,
          user_id: session.user.id
        };

        const { error } = await supabase
          .from('market_intelligence_reports')
          .upsert(updatedMarketAnalysis);

        if (error) throw error;

        setMarketAnalysis(updatedMarketAnalysis);

        toast({
          title: "Market Visualization Generated",
          description: "New market trend visualization created"
        });
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
    setIsLoading(true)
    try {
      const response = await fetch('http://localhost:8000/market-analysis/analyze', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: `Product Domain: ${startupData.target_customer} Offerings: ${startupData.business_model}`,
          startup_data: startupData
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate market analysis');
      }

      const rawData = await response.json();
      
      if (!session?.user?.id) throw new Error('No user ID found');

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
          offerings: startupData.business_model
        },
        confidence_score: Math.random() * 100,
        startup_data: startupData,
        user_id: session.user.id,
        id: '', // Will be generated by Supabase
        created_at: null,
        updated_at: null,
        status: 'completed',
        market_drivers: null,
        seasonality_factors: null,
        visualization_data: null
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
          <MarketStats 
            confidenceScore={marketAnalysis.confidence_score}
            insights={marketAnalysis.insights}
            dateGenerated={marketAnalysis.metadata?.date_generated}
            seasonalityFactors={marketAnalysis.seasonality_factors}
          />
          <MarketVisualization 
            img={marketAnalysis.img}
            visualizationData={marketAnalysis.visualization_data}
          />
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
  );
};

export default MarketIntelligence;