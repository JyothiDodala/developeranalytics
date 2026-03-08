import { useState, useCallback } from "react";
import {
  fetchUser,
  fetchRepos,
  calculateScore,
  extractLanguages,
  getStats,
  type GitHubUser,
  type GitHubRepo,
} from "@/services/github";

export interface GitHubData {
  user: GitHubUser;
  repos: GitHubRepo[];
  score: number;
  languages: Record<string, number>;
  stats: ReturnType<typeof getStats>;
}

export function useGitHub() {
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyze = useCallback(async (username: string) => {
    const trimmed = username.trim();
    if (!trimmed) return;
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const [user, repos] = await Promise.all([fetchUser(trimmed), fetchRepos(trimmed)]);
      const score = calculateScore(user, repos);
      const languages = extractLanguages(repos);
      const stats = getStats(user, repos);
      setData({ user, repos, score, languages, stats });
    } catch (e: any) {
      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, analyze };
}
