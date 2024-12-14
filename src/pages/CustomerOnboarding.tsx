import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useSessionContext } from "@supabase/auth-helpers-react";

interface StartupEvaluation {
  problem_description: string;
  value_proposition: string;
  business_model: string;
  current_traction: string;
  funding_needs: string;
  target_customer: string;
  key_metrics: string;
  competition_strategy: string;
  team_description: string;
  main_challenges: string;
}

const initialFormData: StartupEvaluation = {
  problem_description: "",
  value_proposition: "",
  business_model: "",
  current_traction: "",
  funding_needs: "",
  target_customer: "",
  key_metrics: "",
  competition_strategy: "",
  team_description: "",
  main_challenges: "",
};

const CustomerOnboarding = () => {
  const [formData, setFormData] = useState<StartupEvaluation>(initialFormData);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  const { session } = useSessionContext();

  useEffect(() => {
    const fetchExistingData = async () => {
      if (!session?.user?.id) return;

      try {
        const { data, error } = await supabase
          .from("startup_evaluations")
          .select("*")
          .eq("user_id", session.user.id);

        if (error) throw error;

        // If we have data, use the first record
        if (data && data.length > 0) {
          setFormData(data[0]);
        }
        // If no data exists, we'll use the initialFormData (already set)
        
      } catch (error: any) {
        console.error("Error fetching data:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load existing data. Please try again.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchExistingData();
  }, [session?.user?.id]);

  const handleInputChange = (field: keyof StartupEvaluation, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!session?.user?.id) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "You must be logged in to submit the form.",
      });
      return;
    }

    setIsSaving(true);

    try {
      const { error } = await supabase
        .from("startup_evaluations")
        .upsert({
          ...formData,
          user_id: session.user.id,
          status: "completed",
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Your responses have been saved successfully.",
      });

      navigate("/dashboard");
    } catch (error: any) {
      console.error("Error saving data:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save your responses. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Customer Onboarding</h1>
      </div>

      <div className="grid gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Problem Description</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={formData.problem_description}
              onChange={(e) => handleInputChange("problem_description", e.target.value)}
              placeholder="Describe the problem your startup is solving..."
              className="bg-gray-800 border-gray-700"
            />
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Value Proposition</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={formData.value_proposition}
              onChange={(e) => handleInputChange("value_proposition", e.target.value)}
              placeholder="What unique value do you provide to your customers?"
              className="bg-gray-800 border-gray-700"
            />
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Business Model</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={formData.business_model}
              onChange={(e) => handleInputChange("business_model", e.target.value)}
              placeholder="How does your business make money?"
              className="bg-gray-800 border-gray-700"
            />
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Current Traction</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={formData.current_traction}
              onChange={(e) => handleInputChange("current_traction", e.target.value)}
              placeholder="What traction have you achieved so far?"
              className="bg-gray-800 border-gray-700"
            />
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Funding Needs</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={formData.funding_needs}
              onChange={(e) => handleInputChange("funding_needs", e.target.value)}
              placeholder="What are your current funding requirements?"
              className="bg-gray-800 border-gray-700"
            />
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Target Customer</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={formData.target_customer}
              onChange={(e) => handleInputChange("target_customer", e.target.value)}
              placeholder="Who is your ideal customer?"
              className="bg-gray-800 border-gray-700"
            />
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Key Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={formData.key_metrics}
              onChange={(e) => handleInputChange("key_metrics", e.target.value)}
              placeholder="What are your key performance metrics?"
              className="bg-gray-800 border-gray-700"
            />
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Competition Strategy</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={formData.competition_strategy}
              onChange={(e) => handleInputChange("competition_strategy", e.target.value)}
              placeholder="How do you plan to compete in the market?"
              className="bg-gray-800 border-gray-700"
            />
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Team Description</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={formData.team_description}
              onChange={(e) => handleInputChange("team_description", e.target.value)}
              placeholder="Tell us about your team..."
              className="bg-gray-800 border-gray-700"
            />
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Main Challenges</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={formData.main_challenges}
              onChange={(e) => handleInputChange("main_challenges", e.target.value)}
              placeholder="What are your main challenges?"
              className="bg-gray-800 border-gray-700"
            />
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-4">
          <Button
            variant="outline"
            onClick={() => navigate("/dashboard")}
            className="border-gray-700 text-white hover:bg-gray-800"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSaving}
            className="bg-primary hover:bg-primary/90"
          >
            {isSaving ? "Saving..." : "Save Responses"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomerOnboarding;