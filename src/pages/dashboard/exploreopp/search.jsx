import { useEffect, useState } from "react";
import { Search } from "lucide-react";

export default function ExploreSearch({ value = "", onSearch }) {
  const [text, setText] = useState(value);

  useEffect(() => {
    setText(value);
  }, [value]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(text.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Search by name, provider or keyword"
          className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-9 pr-3 text-sm outline-none transition focus:ring-2 focus:ring-indigo-400"
        />
      </div>
      <button
        type="submit"
        className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
      >
        Search
      </button>
    </form>
  );
}