import { useState } from "react";
import { DashboardNav } from "@/components/DashboardNav";
import { DashboardStats } from "@/components/DashboardStats";
import { AppSidebar } from "@/components/AppSidebar";
import { ChatUI } from "@/components/ChatUI";
import { SidebarProvider } from "@/components/ui/sidebar";

const Index = () => {
  const [currentPrompt, setCurrentPrompt] = useState<string>("");

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <DashboardNav />
        <div className="flex">
          <AppSidebar onReportSelect={setCurrentPrompt} />
          <main className="flex-1 p-8">
            <div className="flex items-center justify-between space-y-2 mb-8">
              <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            </div>
            <div className="grid gap-8 grid-cols-1">
              <DashboardStats />
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">AI Report Generator</h3>
                <ChatUI initialPrompt={currentPrompt} />
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;