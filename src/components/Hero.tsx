import { ArrowRight, BarChart2, Globe, Lightbulb, ChartBar, Target, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-[#1A1F2C]">
      <div className="absolute inset-0 bg-grid-white/10" />
      
      {/* Hero Section */}
      <div className="relative">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center space-y-8 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#9b87f5] to-[#7E69AB]">
              Market Edge Data Research Agent
            </h1>
            
            <p className="text-xl md:text-2xl text-[#C8C8C9] max-w-3xl mx-auto">
              Transform your market research with AI-powered insights and real-time data analytics
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white" 
                onClick={() => navigate('/login')}
              >
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-[#7E69AB] text-[#7E69AB] hover:bg-[#7E69AB]/10"
              >
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-lg bg-[#F1F0FB]/5 backdrop-blur-sm border border-[#7E69AB]/20">
            <ChartBar className="h-10 w-10 text-[#9b87f5] mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-white">Real-time Analytics</h3>
            <p className="text-[#8E9196]">Track market trends and competitor movements with live data updates</p>
          </div>
          
          <div className="p-6 rounded-lg bg-[#F1F0FB]/5 backdrop-blur-sm border border-[#7E69AB]/20">
            <Target className="h-10 w-10 text-[#9b87f5] mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-white">Audience Insights</h3>
            <p className="text-[#8E9196]">Understand your target market with detailed demographic analysis</p>
          </div>
          
          <div className="p-6 rounded-lg bg-[#F1F0FB]/5 backdrop-blur-sm border border-[#7E69AB]/20">
            <Zap className="h-10 w-10 text-[#9b87f5] mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-white">AI-Powered Reports</h3>
            <p className="text-[#8E9196]">Generate comprehensive market reports with one click</p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div className="p-6">
            <div className="text-4xl font-bold text-[#9b87f5] mb-2">500+</div>
            <div className="text-[#8E9196]">Active Users</div>
          </div>
          <div className="p-6">
            <div className="text-4xl font-bold text-[#9b87f5] mb-2">10k+</div>
            <div className="text-[#8E9196]">Reports Generated</div>
          </div>
          <div className="p-6">
            <div className="text-4xl font-bold text-[#9b87f5] mb-2">98%</div>
            <div className="text-[#8E9196]">Accuracy Rate</div>
          </div>
          <div className="p-6">
            <div className="text-4xl font-bold text-[#9b87f5] mb-2">24/7</div>
            <div className="text-[#8E9196]">Support Available</div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Ready to transform your market research?</h2>
          <p className="text-xl text-[#8E9196] max-w-2xl mx-auto">
            Join hundreds of businesses making data-driven decisions with our platform
          </p>
          <Button 
            size="lg" 
            className="bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white"
            onClick={() => navigate('/login')}
          >
            Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};