import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface OnboardingQuestionProps {
  title: string;
  description: string;
  value: string;
  onChange: (value: string) => void;
  type: "text" | "textarea";
}

export const OnboardingQuestion = ({
  title,
  description,
  value,
  onChange,
  type,
}: OnboardingQuestionProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-gray-400">{description}</p>

      {type === "textarea" ? (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-gray-900 border-gray-800"
          rows={5}
        />
      ) : (
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-gray-900 border-gray-800"
        />
      )}
    </div>
  );
};