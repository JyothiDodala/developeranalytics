import { useState } from "react";
import { Search, Loader2 } from "lucide-react";

interface SearchBarProps {
  onSearch: (username: string) => void;
  loading: boolean;
}

export function SearchBar({ onSearch, loading }: SearchBarProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) onSearch(value.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="relative max-w-xl w-full">
      <div className="relative flex items-center">
        <Search className="absolute left-4 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Enter GitHub username..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full h-12 pl-11 pr-28 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all"
        />
        <button
          type="submit"
          disabled={loading || !value.trim()}
          className="absolute right-1.5 h-9 px-5 rounded-md bg-primary text-primary-foreground font-medium text-sm transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          Analyze
        </button>
      </div>
    </form>
  );
}
