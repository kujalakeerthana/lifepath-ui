import { useState } from "react";
import { ClipboardCheck, Pencil } from "lucide-react";

// Display names for the saved keys
const EDUCATION_LEVELS = {
  none: "No Formal Education",
  primary: "Primary Education",
  secondary: "Secondary Education",
  undergraduate: "Undergraduate / Diploma",
  postgraduate: "Postgraduate",
};

const OCCUPATIONS = {
  student: "Student",
  employed: "Employed",
  homemaker: "Homemaker",
  unemployed: "Unemployed",
  dailyWage: "Daily Wage Worker",
  other: "Other",
};

const INTERESTS = {
  education: "Education & Scholarships",
  jobs: "Jobs & Internships",
  skills: "Skill Development",
  schemes: "Government Schemes",
  finance: "Financial Assistance",
  health: "Health & Insurance",
};

const GOALS = {
  findJob: "Find a job",
  continueEducation: "Continue my education",
  learnSkill: "Learn a new skill",
  financialAssistance: "Get financial assistance",
  governmentBenefits: "Access government benefits",
  familyWellbeing: "Improve my family's well-being",
  explore: "Explore opportunities",
};

// Labels for the follow-up answers of Step 2 and Step 3
const DETAIL_LABELS = {
  canReadWrite: "Can read and write",
  wantsBasicSkills: "Interested in learning basic skills",
  hadVocationalTraining: "Attended vocational training",
  lastClass: "Last completed class",
  studyStatus: "Study status",
  wantsToContinue: "Interested in continuing education",
  qualificationType: "Qualification type",
  wantsDegree: "Interested in a degree later",
  course: "Course / degree",
  specialization: "Specialization",
  college: "College",
  yearOrStatus: "Year / status",
  yearOfStudy: "Year of study",
  careerInterests: "Career interests",
  jobRole: "Job role",
  sector: "Sector",
  experience: "Work experience",
  employmentType: "Employment type",
  wantsIncome: "Interested in earning income",
  workPreference: "Work preference",
  skills: "Existing skills",
  lookingForJob: "Looking for a job",
  wantsSkillTraining: "Interested in skill training",
  preferredWork: "Preferred type of work",
  unemployedDuration: "Time without work",
  workType: "Type of work",
  workDays: "Work days per month",
  eShramRegistered: "Registered on e-Shram",
  otherOccupation: "Occupation",
};

// Turns any saved value into readable text
const show = (value) => (Array.isArray(value) ? value.join(", ") : value);

const formatDate = (dob) =>
  dob ? new Date(dob).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "";

// Turns a details object into rows: [{ label, value }]
const detailRows = (details = {}) =>
  Object.entries(details)
    .filter(([, v]) => !(Array.isArray(v) ? v.length === 0 : v === "" || v == null))
    .map(([key, v]) => ({ label: DETAIL_LABELS[key] || key, value: show(v) }));

// Builds the summary: one section per step
function buildSections(data) {
  const skillText = data.noSkillsYet
    ? "No skills yet"
    : (data.skills || []).map((s) => `${s.name} (${s.level})`).join(", ");

  return [
    {
      step: 1,
      title: "Personal Information",
      rows: [
        { label: "Full name", value: data.fullName },
        { label: "Date of birth", value: formatDate(data.dob) },
        { label: "Age", value: data.age != null ? `${data.age} years` : "" },
        { label: "Gender", value: data.gender || "Not specified" },
        { label: "State", value: data.state },
        { label: "District", value: data.district },
        { label: "City / Village", value: data.city },
      ],
    },
    {
      step: 2,
      title: "Education Background",
      rows: [
        { label: "Education level", value: EDUCATION_LEVELS[data.educationLevel] },
        ...detailRows(data.educationDetails),
      ],
    },
    {
      step: 3,
      title: "Employment & Occupation",
      rows: [
        { label: "Current situation", value: OCCUPATIONS[data.occupation] },
        ...detailRows(data.occupationDetails),
      ],
    },
    {
      step: 4,
      title: "Skills & Abilities",
      rows: [
        { label: "Skills", value: skillText },
        { label: "Other skills", value: data.otherSkills },
        { label: "Interested in learning new skills", value: data.wantsToLearnSkills },
      ],
    },
    {
      step: 5,
      title: "Interests & Goals",
      rows: [
        { label: "Interested in", value: (data.interests || []).map((i) => INTERESTS[i]).join(", ") },
        { label: "Main goal", value: GOALS[data.mainGoal] },
      ],
    },
    {
      step: 6,
      title: "Preferences",
      rows: [
        { label: "Opportunity preference", value: data.opportunityMode },
        { label: "Cost preference", value: data.costPreference },
        { label: "Location preference", value: data.locationPreference },
        { label: "Preferred work", value: data.workPreference },
        {
          label: "Preferred language",
          value: data.language === "Other" ? `Other (${data.otherLanguage})` : data.language,
        },
        { label: "Guidance style", value: data.guidanceStyle },
      ],
    },
  ];
}

// data     = all answers from steps 1 to 6 merged into one object
// onEdit   = function(stepNumber) that jumps back to that step
// onSubmit = function(data) that saves the profile (can be async)
export default function StepReview({ data = {}, onEdit, onBack, onSubmit }) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const sections = buildSections(data);

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");
    try {
      await onSubmit(data);
    } catch (err) {
      setError("Something went wrong while saving. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl rounded-2xl bg-white p-6 shadow-md">
      {/* Progress */}
      <p className="text-xs font-medium text-indigo-600">Step 7 of 7</p>
      <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
        <div className="h-2 w-full rounded-full bg-indigo-600" />
      </div>

      <h2 className="mt-5 flex items-center gap-2 text-2xl font-bold text-gray-800">
        <ClipboardCheck className="h-6 w-6 text-indigo-600" /> Review & Complete
      </h2>
      <p className="mt-1 text-sm text-gray-500">
        Please check your answers. You can edit any section before submitting.
      </p>

      {/* Summary sections */}
      <div className="mt-6 space-y-4">
        {sections.map((section) => (
          <div key={section.step} className="rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-800">{section.title}</h3>
              {onEdit && (
                <button
                  type="button"
                  onClick={() => onEdit(section.step)}
                  className="flex items-center gap-1 text-xs font-medium text-indigo-600 hover:underline"
                >
                  <Pencil className="h-3 w-3" /> Edit
                </button>
              )}
            </div>

            <dl className="mt-3 space-y-2">
              {section.rows
                .filter((row) => row.value)
                .map((row) => (
                  <div key={row.label} className="flex flex-col sm:flex-row sm:gap-3">
                    <dt className="text-xs text-gray-500 sm:w-1/2">{row.label}</dt>
                    <dd className="text-sm font-medium text-gray-800 sm:w-1/2">{row.value}</dd>
                  </div>
                ))}
            </dl>
          </div>
        ))}
      </div>

      {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

      {/* Buttons */}
      <div className="mt-8 flex gap-3">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            disabled={submitting}
            className="w-1/3 rounded-lg border border-gray-300 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
          >
            Back
          </button>
        )}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={submitting}
          className="flex-1 rounded-lg bg-indigo-600 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-60"
        >
          {submitting ? "Saving..." : "Submit & Complete"}
        </button>
      </div>
    </div>
  );
}