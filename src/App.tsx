import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardNav } from "@/components/DashboardNav";
import Index from "./pages/Index";
import Login from "./pages/Login";
import MarketIntelligence from "./pages/MarketIntelligence";
import CompetitorMapping from "./pages/CompetitorMapping";
import StrategicInsights from "./pages/StrategicInsights";
import AudienceInsights from "./pages/AudienceInsights";
import DataAnalytics from "./pages/DataAnalytics";
import CustomReport from "./pages/CustomReport";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <DashboardNav />
      <SidebarProvider defaultOpen>
        <div className="flex w-full">
          <AppSidebar />
          <main className="flex-1 p-8">
            {children}
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SessionContextProvider supabaseClient={supabase}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedLayout>
                  <Index />
                </ProtectedLayout>
              }
            />
            <Route
              path="/market-intelligence"
              element={
                <ProtectedLayout>
                  <MarketIntelligence />
                </ProtectedLayout>
              }
            />
            <Route
              path="/competitor-mapping"
              element={
                <ProtectedLayout>
                  <CompetitorMapping />
                </ProtectedLayout>
              }
            />
            <Route
              path="/strategic-insights"
              element={
                <ProtectedLayout>
                  <StrategicInsights />
                </ProtectedLayout>
              }
            />
            <Route
              path="/audience-insights"
              element={
                <ProtectedLayout>
                  <AudienceInsights />
                </ProtectedLayout>
              }
            />
            <Route
              path="/data-analytics"
              element={
                <ProtectedLayout>
                  <DataAnalytics />
                </ProtectedLayout>
              }
            />
            <Route
              path="/custom-report"
              element={
                <ProtectedLayout>
                  <CustomReport />
                </ProtectedLayout>
              }
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </SessionContextProvider>
  </QueryClientProvider>
);

export default App;