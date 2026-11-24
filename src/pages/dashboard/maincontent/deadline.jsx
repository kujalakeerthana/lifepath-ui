import SectionCard from "./Sectioncards";

export default function DeadlinesList({ deadlines = [] }) {
  return (
    <SectionCard
      title="Upcoming deadlines"
      isEmpty={deadlines.length === 0}
      emptyText="No upcoming deadlines right now."
    >
      <ul className="divide-y divide-gray-100">
        {deadlines.map((item) => (
          <li key={item.id} className="flex items-center justify-between gap-3 py-2.5">
            <span className="text-sm text-gray-700">{item.title}</span>
            <span className="shrink-0 text-xs font-medium text-red-600">{item.date}</span>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}