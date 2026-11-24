import { useState } from "react";
import WelcomeHeader from "../maincontent/welcome";
import ProfileCompletionCard from "../maincontent/profilecard";
import StatsRow from "../maincontent/state";
import RecommendationsSection from "../maincontent/recommendation";
import NextStepsSection from "../maincontent/next";
import DocumentsChecklist from "../maincontent/document";
import DeadlinesList from "../maincontent/deadline";
import CategoryTiles from "../maincontent/category";

export default function Dashboard() {

  const [data, setData] = useState({
    userName: "",
    mainGoal: "",
    profileCompletion: undefined,
    stats: {},
    recommendations: [],
    nextSteps: [],
    documents: [],
    deadlines: [],
  });

  const handleSave = (item) => {
    // TODO: save this opportunity to the backend
  };

  const handleView = (item) => {
    // TODO: open the opportunity details
  };

  return (
    <div className="space-y-6">
      <WelcomeHeader userName={data.userName} mainGoal={data.mainGoal} />
      <ProfileCompletionCard percent={data.profileCompletion} />
      <StatsRow stats={data.stats} profileCompletion={data.profileCompletion} />

      <RecommendationsSection items={data.recommendations} onSave={handleSave} onView={handleView} />

      <div className="grid gap-6 lg:grid-cols-3">
        <NextStepsSection steps={data.nextSteps} />
        <DocumentsChecklist documents={data.documents} />
        <DeadlinesList deadlines={data.deadlines} />
      </div>

      <CategoryTiles />
    </div>
  );
}
