import { DashboardStats } from "@/components/DashboardStats";
import { ChatUI } from "@/components/ChatUI";
import { Hero } from "@/components/Hero";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const { session } = useSessionContext();
  const navigate = useNavigate();
  const [onboardingStatus, setOnboardingStatus] = useState<string | null>(null);

  useEffect(() => {
    const fetchOnboardingStatus = async () => {
      if (session?.user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("onboarding_status")
          .eq("user_id", session.user.id)
          .single();

        if (!error && data) {
          setOnboardingStatus(data.onboarding_status);
        }
      }
    };

    fetchOnboardingStatus();
  }, [session]);

  if (!session) {
    return <Hero />;
  }

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-white">Overview</h2>
        {onboardingStatus !== "completed" && (
          <Button
            onClick={() => navigate("/onboarding")}
            className="bg-primary hover:bg-primary/90"
          >
            Complete Onboarding
          </Button>
        )}
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