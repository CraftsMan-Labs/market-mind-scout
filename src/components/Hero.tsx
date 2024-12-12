import { ArrowRight, BarChart2, Globe, Lightbulb } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10" />
      </div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="text-center space-y-8 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Market Edge Data Research Agent
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Empower your business decisions with AI-driven insights and gamified market research
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center items-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90" onClick={() => navigate('/login')}>
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline">
              Watch Demo
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {[
              {
                icon: Lightbulb,
                title: "AI-Powered Insights",
                description: "Get intelligent market analysis and recommendations",
              },
              {
                icon: BarChart2,
                title: "Data Visualization",
                description: "Interactive charts and reports for clear understanding",
              },
              {
                icon: Globe,
                title: "Global Coverage",
                description: "Access market data from around the world",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 animate-slide-in"
              >
                <feature.icon className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};