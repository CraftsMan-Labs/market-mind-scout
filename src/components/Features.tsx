import { Bot, PieChart, Trophy, Users } from "lucide-react";

export const Features = () => {
  const features = [
    {
      icon: Bot,
      title: "AI Chat Interface",
      description: "Interact naturally with our AI to gather market insights",
    },
    {
      icon: PieChart,
      title: "Advanced Analytics",
      description: "Comprehensive data analysis and visualization tools",
    },
    {
      icon: Trophy,
      title: "Gamified Reports",
      description: "Earn achievements and collect report cards",
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Share insights and work together with your team",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-[#1A1F2C] to-[#0f1218]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">
          Powerful Features for Market Research
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-6 rounded-xl bg-black/20 backdrop-blur-sm border border-white/10 hover:border-primary/50 transition-colors"
            >
              <feature.icon className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};