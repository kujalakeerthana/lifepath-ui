import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// Change these paths if any file name or export is different
import StepPersonalInfo from "./profilesetup"; // Step 1
import StepEducation from "./education";       // Step 2
import StepOccupation from "./occupation";     // Step 3
import StepSkills from "./skills";             // Step 4
import StepInterests from "./interset";        // Step 5
import StepPreferences from "./perfernce";     // Step 6
import StepReview from "./final";              // Step 7

export default function ProfileWizard() {
  const navigate = useNavigate();
  const { saveProfile } = useAuth();
  const [step, setStep] = useState(1);
  const [data, setData] = useState({}); // all answers from all steps

  const goToStep = (n) => {
    setStep(n);
    window.scrollTo({ top: 0 });
  };

  // Each step calls this with its own answers
  const handleNext = (stepData) => {
    setData((prev) => ({ ...prev, ...stepData }));
    goToStep(step + 1);
  };

  const handleBack = () => goToStep(step - 1);

  const handleSubmit = async (finalData) => {
    saveProfile({ ...data, ...finalData });
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      {step === 1 && <StepPersonalInfo initialData={data} onNext={handleNext} />}
      {step === 2 && <StepEducation initialData={data} onNext={handleNext} onBack={handleBack} />}
      {step === 3 && <StepOccupation initialData={data} onNext={handleNext} onBack={handleBack} />}
      {step === 4 && <StepSkills initialData={data} onNext={handleNext} onBack={handleBack} />}
      {step === 5 && <StepInterests initialData={data} onNext={handleNext} onBack={handleBack} />}
      {step === 6 && <StepPreferences initialData={data} onNext={handleNext} onBack={handleBack} />}
      {step === 7 && (
        <StepReview data={data} onEdit={goToStep} onBack={handleBack} onSubmit={handleSubmit} />
      )}
    </div>
  );
}