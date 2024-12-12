interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
}

export const OnboardingProgress = ({ currentStep, totalSteps }: OnboardingProgressProps) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold">
        Onboarding ({currentStep + 1}/{totalSteps})
      </h1>
      <div className="text-sm text-gray-400">
        Step {currentStep + 1} of {totalSteps}
      </div>
    </div>
  );
};