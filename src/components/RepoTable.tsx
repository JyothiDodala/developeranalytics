import { useState, useMemo } from "react";
import { GitHubRepo } from "@/services/github";
import { Star, GitFork, ExternalLink, ArrowUpDown, Search } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

type SortKey = "stargazers_count" | "forks_count" | "updated_at" | "name";

export function RepoTable({ repos }: { repos: GitHubRepo[] }) {
  const [sort, setSort] = useState<SortKey>("stargazers_count");
  const [asc, setAsc] = useState(false);
  const [filter, setFilter] = useState("");
  const [langFilter, setLangFilter] = useState("");

  const languages = useMemo(
    () => [...new Set(repos.map((r) => r.language).filter(Boolean))] as string[],
    [repos]
  );

  const filtered = useMemo(() => {
    let list = repos.filter((r) => !r.fork);
    if (filter) list = list.filter((r) => r.name.toLowerCase().includes(filter.toLowerCase()));
    if (langFilter) list = list.filter((r) => r.language === langFilter);
    list.sort((a, b) => {
      let cmp: number;
      if (sort === "name") cmp = a.name.localeCompare(b.name);
      else if (sort === "updated_at") cmp = new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime();
      else cmp = (a[sort] as number) - (b[sort] as number);
      return asc ? cmp : -cmp;
    });
    return list;
  }, [repos, sort, asc, filter, langFilter]);

  const toggleSort = (key: SortKey) => {
    if (sort === key) setAsc(!asc);
    else { setSort(key); setAsc(false); }
  };

  return (
    <div className="rounded-lg bg-card border border-border p-6 card-glow transition-all animate-slide-up">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">
          Repositories ({filtered.length})
        </h3>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Filter..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="h-8 pl-8 pr-3 w-40 rounded-md bg-secondary border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/40"
            />
          </div>
          <select
            value={langFilter}
            onChange={(e) => setLangFilter(e.target.value)}
            className="h-8 px-2 rounded-md bg-secondary border border-border text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40"
          >
            <option value="">All languages</option>
            {languages.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs text-muted-foreground">
              {[
                { key: "name" as SortKey, label: "Name" },
                { key: "stargazers_count" as SortKey, label: "Stars" },
                { key: "forks_count" as SortKey, label: "Forks" },
                { key: "updated_at" as SortKey, label: "Updated" },
              ].map((col) => (
                <th
                  key={col.key}
                  onClick={() => toggleSort(col.key)}
                  className="pb-2 pr-4 font-medium cursor-pointer hover:text-foreground transition-colors select-none"
                >
                  <span className="flex items-center gap-1">
                    {col.label}
                    <ArrowUpDown className="h-3 w-3" />
                  </span>
                </th>
              ))}
              <th className="pb-2 font-medium">Language</th>
              <th className="pb-2 font-medium" />
            </tr>
          </thead>
          <tbody>
            {filtered.slice(0, 20).map((repo) => (
              <tr
                key={repo.id}
                className="border-b border-border/50 hover:bg-secondary/40 transition-colors"
              >
                <td className="py-3 pr-4">
                  <div>
                    <span className="font-medium text-foreground">{repo.name}</span>
                    {repo.description && (
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1 max-w-xs">
                        {repo.description}
                      </p>
                    )}
                  </div>
                </td>
                <td className="py-3 pr-4 font-mono text-xs">
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-500" /> {repo.stargazers_count}
                  </span>
                </td>
                <td className="py-3 pr-4 font-mono text-xs">
                  <span className="flex items-center gap-1">
                    <GitFork className="h-3 w-3 text-muted-foreground" /> {repo.forks_count}
                  </span>
                </td>
                <td className="py-3 pr-4 text-xs text-muted-foreground whitespace-nowrap">
                  {formatDistanceToNow(new Date(repo.updated_at), { addSuffix: true })}
                </td>
                <td className="py-3 pr-4">
                  {repo.language && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                      {repo.language}
                    </span>
                  )}
                </td>
                <td className="py-3">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
