import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { OnboardingQuestion } from "@/components/onboarding/OnboardingQuestion";
import { OnboardingProgress } from "@/components/onboarding/OnboardingProgress";
import { OnboardingNavigation } from "@/components/onboarding/OnboardingNavigation";

interface Question {
  id: string;
  title: string;
  description: string;
  field: keyof typeof initialResponses;
  type: "text" | "textarea";
}

const questions: Question[] = [
  {
    id: "product_name",
    title: "What is your product called?",
    description: "Enter the name of your product or service",
    field: "product_name",
    type: "text",
  },
  {
    id: "product_description",
    title: "What does your product do?",
    description: "Describe the main purpose and features of your product",
    field: "product_description",
    type: "textarea",
  },
  {
    id: "target_audience",
    title: "Who is your target audience?",
    description: "Describe the demographics and characteristics of your ideal customers",
    field: "target_audience",
    type: "textarea",
  },
  {
    id: "geographical_focus",
    title: "Which geographical regions are you targeting?",
    description: "Specify the countries or regions where you plan to launch",
    field: "geographical_focus",
    type: "textarea",
  },
  {
    id: "competitors",
    title: "Who are your main competitors?",
    description: "List your main competitors and what makes them different",
    field: "competitors",
    type: "textarea",
  },
  {
    id: "unique_value",
    title: "What makes your product unique?",
    description: "Describe your unique value proposition",
    field: "unique_value",
    type: "textarea",
  },
  {
    id: "business_goals",
    title: "What are your business goals?",
    description: "Describe your short-term and long-term business objectives",
    field: "business_goals",
    type: "textarea",
  },
];

const initialResponses = {
  product_name: "",
  product_description: "",
  target_audience: "",
  geographical_focus: "",
  competitors: "",
  unique_value: "",
  business_goals: "",
};

export default function Onboarding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState(initialResponses);

  const currentQuestion = questions[currentStep];

  const handleInputChange = (value: string) => {
    setResponses((prev) => ({
      ...prev,
      [currentQuestion.field]: value,
    }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("No user found");

      const { error: responsesError } = await supabase
        .from("onboarding_responses")
        .insert([{ ...responses, user_id: user.id }]);

      if (responsesError) throw responsesError;

      const { error: profileError } = await supabase
        .from("profiles")
        .update({ onboarding_status: "completed" })
        .eq("user_id", user.id);

      if (profileError) throw profileError;

      toast({
        title: "Success!",
        description: "Your responses have been saved. We'll generate your reports now.",
      });

      navigate("/dashboard");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <OnboardingProgress currentStep={currentStep} totalSteps={questions.length} />

        <OnboardingQuestion
          title={currentQuestion.title}
          description={currentQuestion.description}
          value={responses[currentQuestion.field]}
          onChange={handleInputChange}
          type={currentQuestion.type}
        />

        <OnboardingNavigation
          currentStep={currentStep}
          totalSteps={questions.length}
          onBack={handleBack}
          onNext={handleNext}
          onComplete={handleSubmit}
        />
      </div>
    </div>
  );
}