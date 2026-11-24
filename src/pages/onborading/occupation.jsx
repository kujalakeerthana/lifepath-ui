import { useState } from "react";
import { Briefcase } from "lucide-react";

const OCCUPATIONS = [
  { value: "student", title: "Student", desc: "School / College student" },
  { value: "employed", title: "Employed", desc: "Government / Private employee" },
  { value: "home_management", title: "Home_Management", desc: "Managing household" },
  { value: "unemployed", title: "Unemployed", desc: "Currently looking for work" },
  { value: "dailyWage", title: "Daily Wage Worker", desc: "Construction / Labour" },
  { value: "other", title: "Other", desc: "Specify" },
];

const EXPERIENCE = ["Less than 1 year", "1-3 years", "3-5 years", "5-10 years", "10+ years"];
const YES_NO_FIELD = (name, label) => ({ name, label, type: "yesno" });

// The "menu": which follow-up questions each occupation gets.
// type can be: text | select | yesno | chips
const FOLLOWUPS = {
  student: [
    { name: "course", label: "Current course / class", type: "text", placeholder: "e.g. B.Tech or 10th class" },
    {
      name: "yearOfStudy", label: "Year of study", type: "select",
      options: ["School student", "1st year", "2nd year", "3rd year", "4th year", "5th year or above"],
    },
    {
      name: "careerInterests", label: "Career interests (choose any)", type: "chips",
      options: ["Technology", "Healthcare", "Government Jobs", "Business", "Teaching", "Arts & Design", "Agriculture", "Finance", "Skilled Trades"],
    },
  ],
  employed: [
    { name: "jobRole", label: "Job role", type: "text", placeholder: "e.g. Software Engineer, Clerk" },
    { name: "sector", label: "Sector", type: "select", options: ["Government", "Private", "NGO / Non-profit"] },
    { name: "experience", label: "Work experience", type: "select", options: EXPERIENCE },
    {
      name: "employmentType", label: "Employment type", type: "select",
      options: ["Full-time", "Part-time", "Contract", "Temporary"],
    },
  ],
  homemaker: [
    YES_NO_FIELD("wantsIncome", "Interested in earning income?"),
    { name: "workPreference", label: "Work preference", type: "select", options: ["Home-based", "Outside work", "Either is fine"] },
    {
      name: "skills", label: "Existing skills (choose any)", type: "chips",
      options: ["Tailoring", "Cooking", "Handicrafts", "Teaching", "Computer basics", "Beauty services", "Farming / Dairy", "None yet"],
    },
  ],
  unemployed: [
    YES_NO_FIELD("lookingForJob", "Are you looking for a job?"),
    YES_NO_FIELD("wantsSkillTraining", "Interested in skill training?"),
    {
      name: "preferredWork", label: "Preferred type of work", type: "select",
      options: ["Office / Desk job", "Field work", "Skilled trade", "Self-employment", "Government job", "Any work"],
    },
    {
      name: "unemployedDuration", label: "How long without work?", type: "select",
      options: ["Never worked", "Less than 6 months", "6 months - 1 year", "More than 1 year"],
    },
  ],
  dailyWage: [
    {
      name: "workType", label: "Type of work", type: "select",
      options: ["Construction", "Factory / Loading", "Domestic help", "Driving / Delivery", "Other"],
    },
    {
      name: "workDays", label: "Work days per month", type: "select",
      options: ["Less than 10 days", "10-20 days", "More than 20 days"],
    },
    YES_NO_FIELD("eShramRegistered", "Registered on the e-Shram portal?"),
    YES_NO_FIELD("wantsSkillTraining", "Interested in skill training?"),
  ],
  other: [
    { name: "otherOccupation", label: "Please specify your occupation", type: "text", placeholder: "Describe your situation" },
  ],
};

const isEmpty = (v) => (Array.isArray(v) ? v.length === 0 : !String(v ?? "").trim());

export default function StepOccupation({ initialData = {}, onNext, onBack }) {
  const [occupation, setOccupation] = useState(initialData.occupation || "");
  const [details, setDetails] = useState(initialData.occupationDetails || {});
  const [errors, setErrors] = useState({});

  const fields = FOLLOWUPS[occupation] || [];

  // Pre-fill the course from Step 2 if the user is a student in higher education
  const chooseOccupation = (value) => {
    if (value === occupation) return;
    const starter = {};
    const prevCourse = initialData.educationDetails?.course;
    if (value === "student" && prevCourse) starter.course = prevCourse;
    setDetails(starter); // clear old answers so hidden data never leaks
    setOccupation(value);
    setErrors({});
  };

  const setField = (name, value) => {
    setDetails((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const toggleChip = (name, option) => {
    const current = details[name] || [];
    const updated = current.includes(option) ? current.filter((o) => o !== option) : [...current, option];
    setField(name, updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!occupation) newErrors.occupation = "Please select what best describes you";
    fields.forEach((f) => {
      if (isEmpty(details[f.name])) newErrors[f.name] = "This field is required";
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    // Send only the answers that belong to the chosen occupation
    const cleanDetails = {};
    fields.forEach((f) => (cleanDetails[f.name] = details[f.name]));
    onNext({ occupation, occupationDetails: cleanDetails });
  };

  const inputClass = (name) =>
    `w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-indigo-400 ${
      errors[name] ? "border-red-400" : "border-gray-300"
    }`;

  const renderField = (f) => (
    <div key={f.name}>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {f.label} <span className="text-red-500">*</span>
      </label>

      {f.type === "text" && (
        <input
          type="text"
          value={details[f.name] || ""}
          onChange={(e) => setField(f.name, e.target.value)}
          placeholder={f.placeholder}
          className={inputClass(f.name)}
        />
      )}

      {f.type === "select" && (
        <select
          value={details[f.name] || ""}
          onChange={(e) => setField(f.name, e.target.value)}
          className={inputClass(f.name)}
        >
          <option value="">Select</option>
          {f.options.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      )}

      {f.type === "yesno" && (
        <div className="flex gap-3">
          {["Yes", "No"].map((o) => (
            <button
              type="button"
              key={o}
              onClick={() => setField(f.name, o)}
              className={`rounded-lg border px-6 py-2 text-sm font-medium transition ${
                details[f.name] === o
                  ? "border-indigo-600 bg-indigo-600 text-white"
                  : "border-gray-300 text-gray-700 hover:border-indigo-400"
              }`}
            >
              {o}
            </button>
          ))}
        </div>
      )}

      {f.type === "chips" && (
        <div className="flex flex-wrap gap-2">
          {f.options.map((o) => {
            const selected = (details[f.name] || []).includes(o);
            return (
              <button
                type="button"
                key={o}
                onClick={() => toggleChip(f.name, o)}
                className={`rounded-full border px-4 py-1.5 text-xs font-medium transition ${
                  selected
                    ? "border-indigo-600 bg-indigo-600 text-white"
                    : "border-gray-300 text-gray-700 hover:border-indigo-400"
                }`}
              >
                {o}
              </button>
            );
          })}
        </div>
      )}

      {errors[f.name] && <p className="mt-1 text-xs text-red-500">{errors[f.name]}</p>}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-xl rounded-2xl bg-white p-6 shadow-md">
      {/* Progress */}
      <p className="text-xs font-medium text-indigo-600">Step 3 of 7</p>
      <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
        <div className="h-2 rounded-full bg-indigo-600" style={{ width: `${(3 / 7) * 100}%` }} />
      </div>

      <h2 className="mt-5 flex items-center gap-2 text-2xl font-bold text-gray-800">
        <Briefcase className="h-6 w-6 text-indigo-600" /> Employment & Occupation
      </h2>
      <p className="mt-1 text-sm text-gray-500">What best describes your current situation?</p>

      {/* Occupation cards */}
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {OCCUPATIONS.map((o) => (
          <button
            type="button"
            key={o.value}
            onClick={() => chooseOccupation(o.value)}
            className={`rounded-xl border p-4 text-left transition ${
              occupation === o.value
                ? "border-indigo-600 bg-indigo-50 ring-2 ring-indigo-300"
                : "border-gray-300 hover:border-indigo-400"
            }`}
          >
            <p className="text-sm font-semibold text-gray-800">{o.title}</p>
            <p className="text-xs text-gray-500">{o.desc}</p>
          </button>
        ))}
      </div>
      {errors.occupation && <p className="mt-2 text-xs text-red-500">{errors.occupation}</p>}

      {/* Follow-up questions */}
      {fields.length > 0 && <div className="mt-6 space-y-5 border-t pt-5">{fields.map(renderField)}</div>}

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