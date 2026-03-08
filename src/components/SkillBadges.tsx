const LANG_COLORS: Record<string, string> = {
  JavaScript: "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",
  TypeScript: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  Python: "bg-green-500/15 text-green-400 border-green-500/20",
  Java: "bg-orange-500/15 text-orange-400 border-orange-500/20",
  "C++": "bg-pink-500/15 text-pink-400 border-pink-500/20",
  C: "bg-gray-500/15 text-gray-400 border-gray-500/20",
  "C#": "bg-purple-500/15 text-purple-400 border-purple-500/20",
  Go: "bg-cyan-500/15 text-cyan-400 border-cyan-500/20",
  Rust: "bg-orange-600/15 text-orange-300 border-orange-600/20",
  Ruby: "bg-red-500/15 text-red-400 border-red-500/20",
  PHP: "bg-indigo-500/15 text-indigo-400 border-indigo-500/20",
  Swift: "bg-orange-500/15 text-orange-400 border-orange-500/20",
  Kotlin: "bg-violet-500/15 text-violet-400 border-violet-500/20",
  Dart: "bg-sky-500/15 text-sky-400 border-sky-500/20",
  HTML: "bg-orange-500/15 text-orange-400 border-orange-500/20",
  CSS: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  Shell: "bg-green-600/15 text-green-300 border-green-600/20",
  Lua: "bg-indigo-500/15 text-indigo-300 border-indigo-500/20",
};

const DEFAULT_COLOR = "bg-primary/10 text-primary border-primary/20";

interface SkillBadgesProps {
  languages: Record<string, number>;
}

export function SkillBadges({ languages }: SkillBadgesProps) {
  const sorted = Object.entries(languages).sort((a, b) => b[1] - a[1]);

  return (
    <div className="rounded-lg bg-card border border-border p-6 card-glow transition-all animate-slide-up">
      <h3 className="text-sm font-medium text-muted-foreground mb-4">Skills & Languages</h3>
      <div className="flex flex-wrap gap-2">
        {sorted.map(([lang, count]) => (
          <span
            key={lang}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all hover:scale-105 ${
              LANG_COLORS[lang] || DEFAULT_COLOR
            }`}
          >
            {lang}
            <span className="opacity-60 font-mono">{count}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
