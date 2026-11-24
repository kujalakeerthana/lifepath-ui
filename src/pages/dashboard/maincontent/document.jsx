import { Check } from "lucide-react";
import SectionCard from "./Sectioncards";

export default function DocumentsChecklist({ documents = [] }) {
  return (
    <SectionCard
      title="Documents you may need"
      isEmpty={documents.length === 0}
      emptyText="Documents you may need will appear here."
    >
      <ul className="space-y-3">
        {documents.map((doc) => (
          <li key={doc.id} className="flex items-center gap-3">
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
                doc.have ? "border-green-600 bg-green-600" : "border-gray-400"
              }`}
            >
              {doc.have && <Check className="h-3.5 w-3.5 text-white" />}
            </span>
            <span className="text-sm text-gray-700">{doc.name}</span>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}