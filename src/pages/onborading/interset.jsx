import { useState } from "react";
import { Target, Check } from "lucide-react";

const INTERESTS = [
  { value: "education", title: "Education & Scholarships", desc: "Courses, scholarships and educational support" },
  { value: "jobs", title: "Jobs & Internships", desc: "Employment and career opportunities" },
  { value: "skills", title: "Skill Development", desc: "Free training and certification" },
  { value: "schemes", title: "Government Schemes", desc: "Benefits and public services" },
  { value: "finance", title: "Financial Assistance", desc: "Loans and financial support" },
  { value: "health", title: "Health & Insurance", desc: "Healthcare and insurance services" },
];

const GOALS = [
  { value: "findJob", label: "Find a job" },
  { value: "continueEducation", label: "Continue my education" },
  { value: "learnSkill", label: "Learn a new skill" },
  { value: "financialAssistance", label: "Get financial assistance" },
  { value: "governmentBenefits", label: "Access government benefits" },
  { value: "familyWellbeing", label: "Improve my family's well-being" },
  { value: "explore", label: "Explore opportunities" },
];

export default function StepInterests({ initialData = {}, onNext, onBack }) {
  const [interests, setInterests] = useState(initialData.interests || []);
  const [mainGoal, setMainGoal] = useState(initialData.mainGoal || "");
  const [errors, setErrors] = useState({});

  const toggleInterest = (value) => {
    setInterests((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));
    setErrors((prev) => ({ ...prev, interests: "" }));
  };

  const chooseGoal = (value) => {
    setMainGoal(value);
    setErrors((prev) => ({ ...prev, mainGoal: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (interests.length === 0) newErrors.interests = "Please select at least one interest";
    if (!mainGoal) newErrors.mainGoal = "Please select your main goal";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onNext({ interests, mainGoal });
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-xl rounded-2xl bg-white p-6 shadow-md">
      {/* Progress */}
      <p className="text-xs font-medium text-indigo-600">Step 5 of 7</p>
      <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
        <div className="h-2 rounded-full bg-indigo-600" style={{ width: `${(5 / 7) * 100}%` }} />
      </div>

      <h2 className="mt-5 flex items-center gap-2 text-2xl font-bold text-gray-800">
        <Target className="h-6 w-6 text-indigo-600" /> Interests & Goals
      </h2>
      <p className="mt-1 text-sm text-gray-500">
        This helps LifePath understand what you actually want.
      </p>

      {/* Question 1: interests (multi-select) */}
      <div className="mt-6">
        <p className="text-sm font-semibold text-gray-800">
          What are you interested in? <span className="text-red-500">*</span>
        </p>
        <p className="text-xs text-gray-500">Choose all that apply.</p>

        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {INTERESTS.map((item) => {
            const selected = interests.includes(item.value);
            return (
              <button
                type="button"
                key={item.value}
                onClick={() => toggleInterest(item.value)}
                className={`flex items-start gap-3 rounded-xl border p-4 text-left transition ${
                  selected
                    ? "border-indigo-600 bg-indigo-50 ring-2 ring-indigo-300"
                    : "border-gray-300 hover:border-indigo-400"
                }`}
              >
                <span
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
                    selected ? "border-indigo-600 bg-indigo-600" : "border-gray-400"
                  }`}
                >
                  {selected && <Check className="h-3.5 w-3.5 text-white" />}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-gray-800">{item.title}</span>
                  <span className="block text-xs text-gray-500">{item.desc}</span>
                </span>
              </button>
            );
          })}
        </div>
        {errors.interests && <p className="mt-2 text-xs text-red-500">{errors.interests}</p>}
      </div>

      {/* Question 2: main goal (single select) */}
      <div className="mt-8 border-t pt-6">
        <p className="text-sm font-semibold text-gray-800">
          What is your main goal right now? <span className="text-red-500">*</span>
        </p>
        <p className="text-xs text-gray-500">Choose one.</p>

        <div className="mt-3 space-y-2">
          {GOALS.map((goal) => {
            const selected = mainGoal === goal.value;
            return (
              <button
                type="button"
                key={goal.value}
                onClick={() => chooseGoal(goal.value)}
                className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition ${
                  selected
                    ? "border-indigo-600 bg-indigo-50 ring-2 ring-indigo-300"
                    : "border-gray-300 hover:border-indigo-400"
                }`}
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                    selected ? "border-indigo-600" : "border-gray-400"
                  }`}
                >
                  {selected && <span className="h-2.5 w-2.5 rounded-full bg-indigo-600" />}
                </span>
                <span className="text-sm font-medium text-gray-800">{goal.label}</span>
              </button>
            );
          })}
        </div>
        {errors.mainGoal && <p className="mt-2 text-xs text-red-500">{errors.mainGoal}</p>}
      </div>

      {/* Buttons */}
      <div className="mt-8 flex gap-3">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="w-1/3 rounded-lg border border-gray-300 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            Back
          </button>
        )}
        <button
          type="submit"
          className="flex-1 rounded-lg bg-indigo-600 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          Next
        </button>
      </div>
    </form>
  );
}