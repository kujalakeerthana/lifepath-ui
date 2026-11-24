import { Link } from "react-router-dom";
import { GraduationCap, Briefcase, Wrench, Landmark, Wallet, HeartPulse } from "lucide-react";
import SectionCard from "./Sectioncards";

const CATEGORIES = [
  { key: "education", label: "Education & Scholarships", icon: GraduationCap },
  { key: "jobs", label: "Jobs & Internships", icon: Briefcase },
  { key: "skills", label: "Skill Development", icon: Wrench },
  { key: "schemes", label: "Government Schemes", icon: Landmark },
  { key: "finance", label: "Financial Assistance", icon: Wallet },
  { key: "health", label: "Health & Insurance", icon: HeartPulse },
];

export default function CategoryTiles() {
  return (
    <SectionCard title="Explore by category">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {CATEGORIES.map(({ key, label, icon: Icon }) => (
          <Link
            key={key}
            to={`/dashboard/explore-opportunities?category=${key}`}
            className="flex flex-col items-center gap-2 rounded-xl border border-gray-200 p-4 text-center transition hover:border-indigo-400 hover:bg-indigo-50"
          >
            <Icon className="h-6 w-6 text-indigo-600" />
            <span className="text-sm font-medium text-gray-700">{label}</span>
          </Link>
        ))}
      </div>
    </SectionCard>
  );
}