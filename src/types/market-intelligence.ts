export interface MarketVisualizationResponse {
  img: string;
  reason: string;
  insights: string[];
  metadata: {
    title: string;
    x_axis_label: string;
    y_axis_label: string;
    metrics: string[];
    date_generated: string;
  };
  confidence_score: number;
  trend_breakdown: Record<string, number[]>;
  seasonality_factors: string[];
  market_drivers: Array<Record<string, number>>;
  prediction_intervals: Record<string, number[]>;
}

export interface MarketAnalysisData {
  comprehensive_report: string | null;
  confidence_score: number | null;
  created_at: string | null;
  id: string;
  insights: string[] | null;
  market_drivers: any | null;
  metadata: any | null;
  original_query: string | null;
  problem_breakdown: any | null;
  search_results: any | null;
  seasonality_factors: string[] | null;
  startup_data: any | null;
  status: 'not_started' | 'in_progress' | 'completed' | null;
  updated_at: string | null;
  user_id: string;
  visualization_data: string | null;
  img?: string | null;
}