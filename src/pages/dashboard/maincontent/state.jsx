export default function StatsRow({ stats = {}, profileCompletion }) {
  const items = [
    { label: "AI Recommendations", value: stats.recommendations },
    { label: "Saved Opportunities", value: stats.saved },
    { label: "Upcoming Deadlines", value: stats.deadlines },
    { label: "Profile Completion", value: typeof profileCompletion === "number" ? `${profileCompletion}%` : undefined },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">{item.label}</p>
          <p className="mt-2 text-2xl font-bold text-gray-800">{item.value ?? "-"}</p>
        </div>
      ))}
    </div>
  );
}