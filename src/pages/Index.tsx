import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DashboardStats } from "@/components/DashboardStats";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export default function Index() {
  const navigate = useNavigate();
  const [onboardingStatus, setOnboardingStatus] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchOnboardingStatus = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data, error } = await supabase
            .from("profiles")
            .select("onboarding_status")
            .eq("user_id", user.id)
            .maybeSingle(); // Using maybeSingle() instead of single()
          
          if (error) {
            console.error("Error fetching profile:", error);
            toast({
              variant: "destructive",
              title: "Error",
              description: "Failed to fetch user profile. Please try again.",
            });
            return;
          }

          setOnboardingStatus(data?.onboarding_status ?? 'not_started');
        }
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
  }, [toast]);

  return (
    <div className="space-y-8">
      {onboardingStatus !== "completed" && (
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Welcome to Market Edge!</h2>
          <p className="text-gray-400 mb-4">
            Complete our onboarding process to help us understand your business better and generate personalized reports.
          </p>
          <Button onClick={() => navigate("/onboarding")}>
            Start Onboarding
          </Button>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardStats />
      </div>
    </div>
  );
}