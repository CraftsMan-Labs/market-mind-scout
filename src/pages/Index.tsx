import { DashboardStats } from "@/components/DashboardStats";
import { ChatUI } from "@/components/ChatUI";
import { Hero } from "@/components/Hero";
import { useSessionContext } from "@supabase/auth-helpers-react";

const Index = () => {
  const { session } = useSessionContext();

  if (!session) {
    return <Hero />;
  }

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-white">Overview</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardStats />
      </div>
      <div className="mt-4">
        <ChatUI initialPrompt="" />
      </div>
    </div>
  );
};

export default Index;