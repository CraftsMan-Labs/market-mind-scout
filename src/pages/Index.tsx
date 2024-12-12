import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DashboardStats } from "@/components/DashboardStats";
import { supabase } from "@/integrations/supabase/client";

export default function Index() {
  const navigate = useNavigate();
  const [onboardingStatus, setOnboardingStatus] = useState<string | null>(null);

  useEffect(() => {
    const fetchOnboardingStatus = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("onboarding_status")
          .eq("user_id", user.id)
          .single();
        
        setOnboardingStatus(data?.onboarding_status);
      }
    };

    fetchOnboardingStatus();
  }, []);

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