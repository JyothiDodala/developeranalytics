import { BookOpen, Star, GitFork, Code, Trophy, Activity } from "lucide-react";

interface Stats {
  totalRepos: number;
  mostUsedLanguage: string;
  mostPopularRepo: string;
  mostPopularStars: number;
  recentActivity: string;
  totalStars: number;
  totalForks: number;
}

export function StatsCards({ stats }: { stats: Stats }) {
  const items = [
    { icon: BookOpen, label: "Total Repos", value: stats.totalRepos, sub: "non-fork" },
    { icon: Star, label: "Total Stars", value: stats.totalStars, sub: "earned" },
    { icon: GitFork, label: "Total Forks", value: stats.totalForks, sub: "by others" },
    { icon: Code, label: "Top Language", value: stats.mostUsedLanguage, sub: "most used" },
    { icon: Trophy, label: "Top Repo", value: stats.mostPopularRepo, sub: `★ ${stats.mostPopularStars}` },
    { icon: Activity, label: "Recent", value: stats.recentActivity, sub: "last updated" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 animate-slide-up">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-lg bg-card border border-border p-4 card-glow transition-all"
        >
          <div className="flex items-center gap-2 mb-2">
            <item.icon className="h-4 w-4 text-primary" />
            <span className="text-xs text-muted-foreground">{item.label}</span>
          </div>
          <div className="font-bold font-mono text-foreground text-lg truncate">
            {item.value}
          </div>
          <div className="text-xs text-muted-foreground mt-0.5">{item.sub}</div>
        </div>
      ))}
    </div>
  );
}
