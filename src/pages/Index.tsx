import { DashboardNav } from "@/components/DashboardNav";
import { DashboardStats } from "@/components/DashboardStats";
import { AppSidebar } from "@/components/AppSidebar";
import { ChatUI } from "@/components/ChatUI";
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";

const Index = () => {
  const [currentPrompt, setCurrentPrompt] = useState<string>("");

  return (
    <div className="min-h-screen bg-black text-white">
      <DashboardNav />
      <SidebarProvider>
        <div className="flex w-full">
          <AppSidebar onReportSelect={setCurrentPrompt} />
          <main className="flex-1 p-8">
            <div className="flex items-center justify-between space-y-2 mb-8">
              <h2 className="text-3xl font-bold tracking-tight text-white">Overview</h2>
            </div>
            <div className="grid gap-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <DashboardStats />
              </div>
              <div className="mt-4">
                <ChatUI initialPrompt={currentPrompt} />
              </div>
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Index;