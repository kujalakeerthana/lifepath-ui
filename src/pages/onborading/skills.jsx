import { useState } from "react";
import { Sparkles } from "lucide-react";

const SKILLS = [
  "Computer Skills",
  "Programming",
  "Tailoring",
  "Cooking",
  "Farming",
  "Driving",
  "Repair Work",
  "Arts & Crafts",
  "Accounting",
  "Communication",
  "Business Skills",
  "Teaching",
  "CareTaker"
];

const LEVELS = ["Beginner", "Intermediate", "Expert"];

// Which skills to suggest for each occupation chosen in Step 3
const SKILLS_BY_OCCUPATION = {
  student: ["Computer Skills", "Programming", "Communication", "Teaching", "Accounting", "Arts & Crafts"],
  employed: ["Computer Skills", "Programming", "Communication", "Accounting", "Business Skills", "Teaching", "Driving"],
  home_management: ["Tailoring", "Cooking", "Arts & Crafts", "Teaching", "Communication","CareTaker"],
  dailyWage: ["Driving", "Repair Work", "Farming", "Cooking", "Tailoring", "Communication"],
  // unemployed and other are not listed here, so they see all skills
};

// Special option for users who have no skills yet (e.g. beginners)
const NO_SKILLS = "No skills yet";

export default function StepSkills({ initialData = {}, onNext, onBack }) {
  // skills is a list of names, levels is a lookup like { Cooking: "Expert" }
  const [skills, setSkills] = useState((initialData.skills || []).map((s) => s.name));
  const [levels, setLevels] = useState(
    Object.fromEntries((initialData.skills || []).map((s) => [s.name, s.level]))
  );
  const [noSkillsYet, setNoSkillsYet] = useState(initialData.noSkillsYet || false);
  const [otherSkills, setOtherSkills] = useState(initialData.otherSkills || "");
  const [wantsToLearn, setWantsToLearn] = useState(initialData.wantsToLearnSkills || "");
  const [errors, setErrors] = useState({});

  // Pick which skills to show, based on the occupation from Step 3
  const suggested = SKILLS_BY_OCCUPATION[initialData.occupation] || SKILLS;
  const hasSuggestions = suggested.length < SKILLS.length;
  const [showAll, setShowAll] = useState(!hasSuggestions);

  // suggested skills first, then the rest
  const ordered = [...suggested, ...SKILLS.filter((s) => !suggested.includes(s))];
  // keep already-selected skills visible even if they are not suggested
  const visibleSkills = showAll
    ? ordered
    : ordered.filter((s) => suggested.includes(s) || skills.includes(s));

  const toggleSkill = (skill) => {
    if (skills.includes(skill)) {
      // removing a skill also removes its level
      setSkills((prev) => prev.filter((s) => s !== skill));
      setLevels((prev) => {
        const updated = { ...prev };
        delete updated[skill];
        return updated;
      });
    } else {
      setSkills((prev) => [...prev, skill]);
    }
    setNoSkillsYet(false); // picking a real skill cancels "No skills yet"
    setErrors((prev) => ({ ...prev, skills: "", levels: "" }));
  };

  const toggleNoSkills = () => {
    const next = !noSkillsYet;
    setNoSkillsYet(next);
    if (next) {
      setSkills([]); // "No skills yet" clears everything else
      setLevels({});
      setOtherSkills("");
    }
    setErrors((prev) => ({ ...prev, skills: "", levels: "" }));
  };

  const chooseLevel = (skill, level) => {
    setLevels((prev) => ({ ...prev, [skill]: level }));
    setErrors((prev) => ({ ...prev, levels: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!noSkillsYet && skills.length === 0 && !otherSkills.trim()) {
      newErrors.skills = "Select at least one skill, add your own, or choose 'No skills yet'";
    }
    if (skills.some((s) => !levels[s])) {
      newErrors.levels = "Please choose a level for each selected skill";
    }
    if (!wantsToLearn) newErrors.wantsToLearn = "Please choose an option";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onNext({
      skills: skills.map((name) => ({ name, level: levels[name] })),
      noSkillsYet,
      otherSkills: otherSkills.trim(),
      wantsToLearnSkills: wantsToLearn,
    });
  };

  const chipClass = (selected) =>
    `rounded-full border px-4 py-2 text-sm font-medium transition ${
      selected
        ? "border-indigo-600 bg-indigo-600 text-white"
        : "border-gray-300 text-gray-700 hover:border-indigo-400"
    }`;

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-xl rounded-2xl bg-white p-6 shadow-md">
      {/* Progress */}
      <p className="text-xs font-medium text-indigo-600">Step 4 of 7</p>
      <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
        <div className="h-2 rounded-full bg-indigo-600" style={{ width: `${(4 / 7) * 100}%` }} />
      </div>

      <h2 className="mt-5 flex items-center gap-2 text-2xl font-bold text-gray-800">
        <Sparkles className="h-6 w-6 text-indigo-600" /> Skills & Abilities
      </h2>
      <p className="mt-1 text-sm text-gray-500">
        What skills do you currently have? Choose all that apply. Any skill counts, not only school or college skills.
      </p>

      {/* Skill chips */}
      <div className="mt-5 flex flex-wrap gap-2">
        {visibleSkills.map((skill) => (
          <button type="button" key={skill} onClick={() => toggleSkill(skill)} className={chipClass(skills.includes(skill))}>
            {skill}
          </button>
        ))}
        <button type="button" onClick={toggleNoSkills} className={chipClass(noSkillsYet)}>
          {NO_SKILLS}
        </button>
      </div>

      {/* Show more / fewer skills */}
      {hasSuggestions && (
        <button
          type="button"
          onClick={() => setShowAll((v) => !v)}
          className="mt-3 text-sm font-medium text-indigo-600 hover:underline"
        >
          {showAll ? "Show fewer skills" : "Show all skills"}
        </button>
      )}
      {errors.skills && <p className="mt-2 text-xs text-red-500">{errors.skills}</p>}

      {/* Skill level for each selected skill */}
      {skills.length > 0 && (
        <div className="mt-6 rounded-xl border bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-800">
            How good are you at each skill? <span className="text-red-500">*</span>
          </p>
          <div className="mt-3 space-y-3">
            {skills.map((skill) => (
              <div key={skill} className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-sm text-gray-700">{skill}</span>
                <div className="flex gap-2">
                  {LEVELS.map((level) => (
                    <button
                      type="button"
                      key={level}
                      onClick={() => chooseLevel(skill, level)}
                      className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
                        levels[skill] === level
                          ? "border-indigo-600 bg-indigo-600 text-white"
                          : errors.levels && !levels[skill]
                          ? "border-red-400 text-gray-700"
                          : "border-gray-300 text-gray-700 hover:border-indigo-400"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {errors.levels && <p className="mt-3 text-xs text-red-500">{errors.levels}</p>}
        </div>
      )}

      {/* Other skills */}
      <div className="mt-6">
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Other skills <span className="text-xs text-gray-400">(optional)</span>
        </label>
        <input
          type="text"
          value={otherSkills}
          disabled={noSkillsYet}
          onChange={(e) => {
            setOtherSkills(e.target.value);
            setErrors((prev) => ({ ...prev, skills: "" }));
          }}
          placeholder="e.g. Photography, Singing, Carpentry (separate with commas)"
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-indigo-400 disabled:bg-gray-100"
        />
      </div>

      {/* Interested in learning */}
      <div className="mt-6">
        <p className="mb-2 text-sm font-medium text-gray-700">
          Are you interested in learning new skills? <span className="text-red-500">*</span>
        </p>
        <div className="flex gap-3">
          {["Yes", "No"].map((opt) => (
            <button
              type="button"
              key={opt}
              onClick={() => {
                setWantsToLearn(opt);
                setErrors((prev) => ({ ...prev, wantsToLearn: "" }));
              }}
              className={`rounded-lg border px-6 py-2 text-sm font-medium transition ${
                wantsToLearn === opt
                  ? "border-indigo-600 bg-indigo-600 text-white"
                  : "border-gray-300 text-gray-700 hover:border-indigo-400"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
        {errors.wantsToLearn && <p className="mt-1 text-xs text-red-500">{errors.wantsToLearn}</p>}
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