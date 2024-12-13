import { DashboardStats } from "@/components/DashboardStats";
import { WorldHeatmap } from "@/components/WorldHeatmap";

export default function Index() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome to your market intelligence dashboard
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardStats />
      </div>
      <div className="grid gap-4 bg-gray-900 rounded-lg p-4">
        <WorldHeatmap />
      </div>
    </div>
  );
}