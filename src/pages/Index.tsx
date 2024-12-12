import { DashboardNav } from "@/components/DashboardNav";
import { DashboardStats } from "@/components/DashboardStats";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      <main className="p-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>
        <div className="mt-8">
          <DashboardStats />
        </div>
      </main>
    </div>
  );
};

export default Index;