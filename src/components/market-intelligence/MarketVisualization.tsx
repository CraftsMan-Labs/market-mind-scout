interface MarketVisualizationProps {
  img?: string | null;
  visualizationData?: string | null;
}

export const MarketVisualization = ({ img, visualizationData }: MarketVisualizationProps) => {
  if (!img && !visualizationData) return null;

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4">Market Trend Visualization</h2>
      {img && (
        <img 
          src={`data:image/png;base64,${img}`} 
          alt="Market Trend" 
          className="w-full max-h-[500px] object-contain"
        />
      )}
      {visualizationData && (
        <div 
          dangerouslySetInnerHTML={{ __html: visualizationData }} 
          className="w-full max-h-[500px] overflow-auto"
        />
      )}
    </div>
  );
};