import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DashboardStats } from "@/components/DashboardStats";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import type { Database } from "@/integrations/supabase/types";

type OnboardingStatus = Database["public"]["Enums"]["onboarding_status"];

export default function Index() {
  const navigate = useNavigate();
  const [onboardingStatus, setOnboardingStatus] = useState<OnboardingStatus | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchOnboardingStatus = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          navigate('/login');
          return;
        }

        const { data, error } = await supabase
          .from("profiles")
          .select("onboarding_status")
          .eq("user_id", user.id)
          .maybeSingle();

        if (error) {
          console.error("Error fetching profile:", error);
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to fetch user profile. Please try again.",
          });
          return;
        }

        // If no profile exists, we'll treat it as "not_started"
        setOnboardingStatus(data?.onboarding_status ?? "not_started");

      } catch (error) {
        console.error("Error in fetchOnboardingStatus:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
        });
      }
    };

    fetchOnboardingStatus();
  }, [navigate, toast]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome to your market intelligence dashboard
          </p>
        </div>
        {onboardingStatus !== "completed" && (
          <Button onClick={() => navigate("/onboarding")}>
            {onboardingStatus === "not_started" ? "Start Onboarding" : "Complete Onboarding"}
          </Button>
        )}
      </div>
      <DashboardStats />
    </div>
  );
}