import { useState } from "react";
import { GraduationCap } from "lucide-react";

const LEVELS = [
  { value: "none", title: "No Formal Education", desc: "Never attended school" },
  { value: "primary", title: "Primary Education", desc: "Studied up to primary classes" },
  { value: "secondary", title: "Secondary Education", desc: "Up to 10th or 12th" },
  { value: "undergraduate", title: "Undergraduate / Diploma", desc: "Currently studying or completed" },
  { value: "postgraduate", title: "Postgraduate", desc: "Master's degree or higher" },
];

// Which group of follow-up questions each level uses
const getGroup = (level) => {
  if (level === "none") return "none";
  if (level === "primary" || level === "secondary") return "school";
  if (level === "undergraduate" || level === "postgraduate") return "higher";
  return "";
};

const EMPTY_DETAILS = {
  // No formal education
  canReadWrite: "",
  wantsBasicSkills: "",
  hadVocationalTraining: "",
  // Primary / Secondary
  lastClass: "",
  studyStatus: "",
  wantsToContinue: "",
  // Diploma / UG / PG
  course: "",
  specialization: "",
  college: "",
  yearOrStatus: "",
};

// Small reusable Yes / No button pair
function YesNo({ label, name, value, onChange, error }) {
  return (
    <div>
      <p className="mb-2 text-sm font-medium text-gray-700">
        {label} <span className="text-red-500">*</span>
      </p>
      <div className="flex gap-3">
        {["Yes", "No"].map((opt) => (
          <button
            type="button"
            key={opt}
            onClick={() => onChange(name, opt)}
            className={`rounded-lg border px-6 py-2 text-sm font-medium transition ${
              value === opt
                ? "border-indigo-600 bg-indigo-600 text-white"
                : "border-gray-300 text-gray-700 hover:border-indigo-400"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

export default function StepEducation({ initialData = {}, onNext, onBack }) {
  const [level, setLevel] = useState(initialData.educationLevel || "");
  const [details, setDetails] = useState({ ...EMPTY_DETAILS, ...(initialData.educationDetails || {}) });
  const [errors, setErrors] = useState({});

  const group = getGroup(level);

  const setField = (name, value) => {
    setDetails((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleText = (e) => setField(e.target.name, e.target.value);

  // When the level changes, clear old answers so hidden fields don't leak through
  const chooseLevel = (value) => {
    if (getGroup(value) !== group) setDetails({ ...EMPTY_DETAILS });
    setLevel(value);
    setErrors({});
  };

  const validate = () => {
    const e = {};
    if (!level) {
      e.level = "Please select your education level";
      return e;
    }
    const need = (field, msg) => {
      if (!String(details[field]).trim()) e[field] = msg;
    };
    if (group === "none") {
      need("canReadWrite", "Please choose an option");
      need("wantsBasicSkills", "Please choose an option");
      need("hadVocationalTraining", "Please choose an option");
    } else if (group === "school") {
      need("lastClass", "Please select your last completed class");
      need("studyStatus", "Please choose an option");
      need("wantsToContinue", "Please choose an option");
    } else if (group === "higher") {
      need("course", "Please enter your course or degree");
      need("specialization", "Please enter your specialization");
      need("yearOrStatus", "Please select an option");
    }
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    // Send only the fields that belong to the chosen group
    const keysByGroup = {
      none: ["canReadWrite", "wantsBasicSkills", "hadVocationalTraining"],
      school: ["lastClass", "studyStatus", "wantsToContinue"],
      higher: ["course", "specialization", "college", "yearOrStatus"],
    };
    const cleanDetails = {};
    keysByGroup[group].forEach((k) => (cleanDetails[k] = details[k]));
    onNext({ educationLevel: level, educationDetails: cleanDetails });
  };

  const inputClass = (field) =>
    `w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-indigo-400 ${
      errors[field] ? "border-red-400" : "border-gray-300"
    }`;

  const schoolClasses =
    level === "primary"
      ? ["1st", "2nd", "3rd", "4th", "5th"]
      : ["6th", "7th", "8th", "9th", "10th", "11th", "12th"];

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-xl rounded-2xl bg-white p-6 shadow-md">
      {/* Progress */}
      <p className="text-xs font-medium text-indigo-600">Step 2 of 7</p>
      <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
        <div className="h-2 rounded-full bg-indigo-600" style={{ width: `${(2 / 7) * 100}%` }} />
      </div>

      <h2 className="mt-5 flex items-center gap-2 text-2xl font-bold text-gray-800">
        <GraduationCap className="h-6 w-6 text-indigo-600" /> Education Background
      </h2>
      <p className="mt-1 text-sm text-gray-500">What is your education level?</p>

      {/* Level cards */}
      <div className="mt-5 space-y-3">
        {LEVELS.map((l) => (
          <button
            type="button"
            key={l.value}
            onClick={() => chooseLevel(l.value)}
            className={`w-full rounded-xl border p-4 text-left transition ${
              level === l.value
                ? "border-indigo-600 bg-indigo-50 ring-2 ring-indigo-300"
                : "border-gray-300 hover:border-indigo-400"
            }`}
          >
            <p className="text-sm font-semibold text-gray-800">{l.title}</p>
            <p className="text-xs text-gray-500">{l.desc}</p>
          </button>
        ))}
      </div>
      {errors.level && <p className="mt-2 text-xs text-red-500">{errors.level}</p>}

      {/* Conditional questions */}
      {group === "none" && (
        <div className="mt-6 space-y-5 border-t pt-5">
          <YesNo label="Can you read and write?" name="canReadWrite" value={details.canReadWrite} onChange={setField} error={errors.canReadWrite} />
          <YesNo label="Are you interested in learning basic skills?" name="wantsBasicSkills" value={details.wantsBasicSkills} onChange={setField} error={errors.wantsBasicSkills} />
          <YesNo label="Have you attended any vocational training?" name="hadVocationalTraining" value={details.hadVocationalTraining} onChange={setField} error={errors.hadVocationalTraining} />
        </div>
      )}

      {group === "school" && (
        <div className="mt-6 space-y-5 border-t pt-5">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Last completed class <span className="text-red-500">*</span>
            </label>
            <select name="lastClass" value={details.lastClass} onChange={handleText} className={inputClass("lastClass")}>
              <option value="">Select class</option>
              {schoolClasses.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            {errors.lastClass && <p className="mt-1 text-xs text-red-500">{errors.lastClass}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Currently studying or discontinued? <span className="text-red-500">*</span>
            </label>
            <select name="studyStatus" value={details.studyStatus} onChange={handleText} className={inputClass("studyStatus")}>
              <option value="">Select status</option>
              <option value="Currently studying">Currently studying</option>
              <option value="Discontinued">Discontinued</option>
            </select>
            {errors.studyStatus && <p className="mt-1 text-xs text-red-500">{errors.studyStatus}</p>}
          </div>

          <YesNo label="Interested in continuing education?" name="wantsToContinue" value={details.wantsToContinue} onChange={setField} error={errors.wantsToContinue} />
        </div>
      )}

      {group === "higher" && (
        <div className="mt-6 space-y-5 border-t pt-5">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Course / Degree <span className="text-red-500">*</span>
            </label>
            <input type="text" name="course" value={details.course} onChange={handleText} placeholder="e.g. B.Tech, Diploma, M.Sc" className={inputClass("course")} />
            {errors.course && <p className="mt-1 text-xs text-red-500">{errors.course}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Specialization <span className="text-red-500">*</span>
            </label>
            <input type="text" name="specialization" value={details.specialization} onChange={handleText} placeholder="e.g. Computer Science" className={inputClass("specialization")} />
            {errors.specialization && <p className="mt-1 text-xs text-red-500">{errors.specialization}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              College <span className="text-xs text-gray-400">(optional)</span>
            </label>
            <input type="text" name="college" value={details.college} onChange={handleText} placeholder="College name" className={inputClass("college")} />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Current year or graduation status <span className="text-red-500">*</span>
            </label>
            <select name="yearOrStatus" value={details.yearOrStatus} onChange={handleText} className={inputClass("yearOrStatus")}>
              <option value="">Select</option>
              <option value="1st year">1st year</option>
              <option value="2nd year">2nd year</option>
              <option value="3rd year">3rd year</option>
              <option value="4th year">4th year</option>
              <option value="Graduated">Graduated</option>
              <option value="Discontinued">Discontinued</option>
            </select>
            {errors.yearOrStatus && <p className="mt-1 text-xs text-red-500">{errors.yearOrStatus}</p>}
          </div>
        </div>
      )}

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