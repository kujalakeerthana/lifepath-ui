import { Check } from "lucide-react";
import SectionCard from "./Sectioncards";

export default function NextStepsSection({ steps = [] }) {
  return (
    <SectionCard
      title="Your next steps"
      isEmpty={steps.length === 0}
      emptyText="Simple steps for your goal will appear here."
    >
      <ol className="space-y-3">
        {steps.map((step, index) => (
          <li key={step.id} className="flex items-start gap-3">
            <span
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                step.done ? "bg-green-100 text-green-700" : "bg-indigo-50 text-indigo-700"
              }`}
            >
              {step.done ? <Check className="h-4 w-4" /> : index + 1}
            </span>
            <span className={`text-sm ${step.done ? "text-gray-400 line-through" : "text-gray-700"}`}>
              {step.text}
            </span>
          </li>
        ))}
      </ol>
    </SectionCard>
  );
}