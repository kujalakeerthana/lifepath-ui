import { useState } from "react";
import { User, CalendarDays, MapPin } from "lucide-react";

// Sample data only. Replace with the full list (or your friend's API) later.
const STATE_DISTRICTS = {
  Telangana: ["Hyderabad", "Rangareddy", "Medchal-Malkajgiri", "Warangal", "Karimnagar"],
  "Andhra Pradesh": ["Visakhapatnam", "Guntur", "Krishna", "Chittoor", "Kurnool"],
  Karnataka: ["Bengaluru Urban", "Mysuru", "Dharwad", "Belagavi", "Mangaluru"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem", "Tiruchirappalli"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane"],
};

const GENDERS = ["Female", "Male", "Non-binary", "Prefer not to say"];

// Works out age from the date of birth
function calculateAge(dob) {
  const birth = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

export default function StepPersonalInfo({ initialData = {}, onNext }) {
  const [form, setForm] = useState({
    fullName: "",
    dob: "",
    gender: "",
    state: "",
    district: "",
    city: "",
    ...initialData,
  });
  const [errors, setErrors] = useState({});

  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const updated = { ...prev, [name]: value };
      // If the state changes, the old district is no longer valid
      if (name === "state") updated.district = "";
      return updated;
    });
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = "Please enter your full name";
    if (!form.dob) {
      newErrors.dob = "Please select your date of birth";
    } else if (calculateAge(form.dob) < 0 || calculateAge(form.dob) > 120) {
      newErrors.dob = "Please enter a valid date of birth";
    }
    if (!form.state) newErrors.state = "Please select your state";
    if (!form.district) newErrors.district = "Please select your district";
    if (!form.city.trim()) newErrors.city = "Please enter your city or village";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    // Send data to the parent (the 7-step wizard)
    onNext({ ...form, age: calculateAge(form.dob) });
  };

  const inputClass = (field) =>
    `w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-indigo-400 ${
      errors[field] ? "border-red-400" : "border-gray-300"
    }`;

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-xl rounded-2xl bg-white p-6 shadow-md">
      {/* Progress */}
      <p className="text-xs font-medium text-indigo-600">Step 1 of 7</p>
      <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
        <div className="h-2 rounded-full bg-indigo-600" style={{ width: `${(1 / 7) * 100}%` }} />
      </div>

      <h2 className="mt-5 flex items-center gap-2 text-2xl font-bold text-gray-800">
        <User className="h-6 w-6 text-indigo-600" /> Personal Information
      </h2>
      <p className="mt-1 text-sm text-gray-500">Tell us who you are and where you are from.</p>

      <div className="mt-6 space-y-5">
        {/* Full Name */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="e.g. Alice "
            className={inputClass("fullName")}
          />
          {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>}
        </div>

        {/* Date of Birth */}
        <div>
          <label className="mb-1 flex items-center gap-1 text-sm font-medium text-gray-700">
            <CalendarDays className="h-4 w-4" /> Date of Birth <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="dob"
            max={today}
            value={form.dob}
            onChange={handleChange}
            className={inputClass("dob")}
          />
          {form.dob && !errors.dob && (
            <p className="mt-1 text-xs text-gray-500">Age: {calculateAge(form.dob)} years</p>
          )}
          {errors.dob && <p className="mt-1 text-xs text-red-500">{errors.dob}</p>}
        </div>

        {/* Gender (optional) */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Gender <span className="text-xs text-gray-400">(optional)</span>
          </label>
          <select name="gender" value={form.gender} onChange={handleChange} className={inputClass("gender")}>
            <option value="">Select gender</option>
            {GENDERS.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>

        {/* State + District */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1 flex items-center gap-1 text-sm font-medium text-gray-700">
              <MapPin className="h-4 w-4" /> State <span className="text-red-500">*</span>
            </label>
            <select name="state" value={form.state} onChange={handleChange} className={inputClass("state")}>
              <option value="">Select state</option>
              {Object.keys(STATE_DISTRICTS).map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            {errors.state && <p className="mt-1 text-xs text-red-500">{errors.state}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              District <span className="text-red-500">*</span>
            </label>
            <select
              name="district"
              value={form.district}
              onChange={handleChange}
              disabled={!form.state}
              className={`${inputClass("district")} disabled:bg-gray-100`}
            >
              <option value="">{form.state ? "Select district" : "Select state first"}</option>
              {(STATE_DISTRICTS[form.state] || []).map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            {errors.district && <p className="mt-1 text-xs text-red-500">{errors.district}</p>}
          </div>
        </div>

        {/* City / Village */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            City / Village <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="e.g. Secunderabad"
            className={inputClass("city")}
          />
          {errors.city && <p className="mt-1 text-xs text-red-500">{errors.city}</p>}
        </div>
      </div>

      <button
        type="submit"
        className="mt-8 w-full rounded-lg bg-indigo-600 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
      >
        Next
      </button>
    </form>
  );
}