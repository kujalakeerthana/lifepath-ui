import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";

// Every question here has exactly one answer
const QUESTIONS = [
  { name: "opportunityMode", label: "Opportunity preference", options: ["Online", "Offline", "Both"] },
  { name: "costPreference", label: "Cost preference", options: ["Free", "Low-cost", "Paid", "Any"] },
  { name: "locationPreference", label: "Location preference", options: ["Nearby", "Within my state", "Anywhere in India"] },
  { name: "workPreference", label: "Preferred work", options: ["Full-time", "Part-time", "Home-based", "Flexible"] },
  { name: "language", label: "Preferred language", options: ["Telugu", "Hindi", "English", "Other"] },
  {
    name: "guidanceStyle",
    label: "How would you prefer to receive guidance?",
    options: ["Simple written instructions", "Video explanations", "Voice guidance", "Step-by-step assistance"],
  },
];

export default function StepPreferences({ initialData = {}, onNext, onBack }) {
  const [answers, setAnswers] = useState({
    opportunityMode: initialData.opportunityMode || "",
    costPreference: initialData.costPreference || "",
    locationPreference: initialData.locationPreference || "",
    workPreference: initialData.workPreference || "",
    language: initialData.language || "",
    guidanceStyle: initialData.guidanceStyle || "",
  });
  const [otherLanguage, setOtherLanguage] = useState(initialData.otherLanguage || "");
  const [errors, setErrors] = useState({});

  const choose = (name, value) => {
    setAnswers((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "", otherLanguage: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    QUESTIONS.forEach((q) => {
      if (!answers[q.name]) newErrors[q.name] = "Please choose an option";
    });
    if (answers.language === "Other" && !otherLanguage.trim()) {
      newErrors.otherLanguage = "Please enter your language";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onNext({
      ...answers,
      otherLanguage: answers.language === "Other" ? otherLanguage.trim() : "",
    });
  };

  const pillClass = (selected) =>
    `rounded-full border px-4 py-2 text-sm font-medium transition ${
      selected
        ? "border-indigo-600 bg-indigo-600 text-white"
        : "border-gray-300 text-gray-700 hover:border-indigo-400"
    }`;

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-xl rounded-2xl bg-white p-6 shadow-md">
      {/* Progress */}
      <p className="text-xs font-medium text-indigo-600">Step 6 of 7</p>
      <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
        <div className="h-2 rounded-full bg-indigo-600" style={{ width: `${(6 / 7) * 100}%` }} />
      </div>

      <h2 className="mt-5 flex items-center gap-2 text-2xl font-bold text-gray-800">
        <SlidersHorizontal className="h-6 w-6 text-indigo-600" /> Preferences
      </h2>
      <p className="mt-1 text-sm text-gray-500">
        These details help LifePath suggest opportunities that are practical for you.
      </p>

      <div className="mt-6 space-y-6">
        {QUESTIONS.map((q) => (
          <div key={q.name}>
            <p className="mb-2 text-sm font-medium text-gray-700">
              {q.label} <span className="text-red-500">*</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {q.options.map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => choose(q.name, opt)}
                  className={pillClass(answers[q.name] === opt)}
                >
                  {opt}
                </button>
              ))}
            </div>

            {/* Text box appears only when "Other" language is chosen */}
            {q.name === "language" && answers.language === "Other" && (
              <input
                type="text"
                value={otherLanguage}
                onChange={(e) => {
                  setOtherLanguage(e.target.value);
                  setErrors((prev) => ({ ...prev, otherLanguage: "" }));
                }}
                placeholder="Type your language"
                className={`mt-3 w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-indigo-400 ${
                  errors.otherLanguage ? "border-red-400" : "border-gray-300"
                }`}
              />
            )}

            {errors[q.name] && <p className="mt-1 text-xs text-red-500">{errors[q.name]}</p>}
            {q.name === "language" && errors.otherLanguage && (
              <p className="mt-1 text-xs text-red-500">{errors.otherLanguage}</p>
            )}
          </div>
        ))}
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