import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface OnboardingNavigationProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  onComplete: () => void;
}

export const OnboardingNavigation = ({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  onComplete,
}: OnboardingNavigationProps) => {
  return (
    <div className="flex justify-between pt-4">
      <Button
        variant="outline"
        onClick={onBack}
        disabled={currentStep === 0}
        className="border-gray-800 text-white hover:bg-gray-800"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      {currentStep === totalSteps - 1 ? (
        <Button onClick={onComplete} className="bg-primary hover:bg-primary/90">
          Complete
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      ) : (
        <Button onClick={onNext} className="bg-primary hover:bg-primary/90">
          Next
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
};