// GitHub API service — fetches public profile and repo data

export interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
  created_at: string;
  location: string | null;
  blog: string | null;
  company: string | null;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  html_url: string;
  topics: string[];
  fork: boolean;
  size: number;
}

const BASE = "https://api.github.com";

async function ghFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { Accept: "application/vnd.github+json" },
  });
  if (!res.ok) {
    if (res.status === 404) throw new Error("User not found");
    if (res.status === 403) throw new Error("API rate limit exceeded. Try again later.");
    throw new Error(`GitHub API error: ${res.status}`);
  }
  return res.json();
}

export async function fetchUser(username: string): Promise<GitHubUser> {
  return ghFetch<GitHubUser>(`/users/${encodeURIComponent(username)}`);
}

export async function fetchRepos(username: string): Promise<GitHubRepo[]> {
  // Fetch up to 100 repos (max per page)
  return ghFetch<GitHubRepo[]>(
    `/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`
  );
}

// Extract language usage from repos
export function extractLanguages(repos: GitHubRepo[]): Record<string, number> {
  const langs: Record<string, number> = {};
  for (const repo of repos) {
    if (repo.language && !repo.fork) {
      langs[repo.language] = (langs[repo.language] || 0) + 1;
    }
  }
  return langs;
}

// Calculate a developer score 0-100
export function calculateScore(user: GitHubUser, repos: GitHubRepo[]): number {
  const nonForkRepos = repos.filter((r) => !r.fork);
  const totalStars = nonForkRepos.reduce((s, r) => s + r.stargazers_count, 0);
  const totalForks = nonForkRepos.reduce((s, r) => s + r.forks_count, 0);
  const languages = new Set(nonForkRepos.map((r) => r.language).filter(Boolean));

  // Weighted scoring
  const repoScore = Math.min(nonForkRepos.length * 2, 25); // max 25
  const starScore = Math.min(totalStars * 0.5, 25); // max 25
  const forkScore = Math.min(totalForks * 1, 15); // max 15
  const langScore = Math.min(languages.size * 3, 20); // max 20
  const followerScore = Math.min(user.followers * 0.2, 15); // max 15

  return Math.round(Math.min(repoScore + starScore + forkScore + langScore + followerScore, 100));
}

// Get contribution stats summary
export function getStats(user: GitHubUser, repos: GitHubRepo[]) {
  const nonFork = repos.filter((r) => !r.fork);
  const langs = extractLanguages(repos);
  const topLang = Object.entries(langs).sort((a, b) => b[1] - a[1])[0];
  const mostPopular = [...nonFork].sort((a, b) => b.stargazers_count - a.stargazers_count)[0];
  const recentlyUpdated = [...nonFork].sort(
    (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  )[0];

  return {
    totalRepos: nonFork.length,
    mostUsedLanguage: topLang ? topLang[0] : "N/A",
    mostPopularRepo: mostPopular?.name || "N/A",
    mostPopularStars: mostPopular?.stargazers_count || 0,
    recentActivity: recentlyUpdated?.name || "N/A",
    totalStars: nonFork.reduce((s, r) => s + r.stargazers_count, 0),
    totalForks: nonFork.reduce((s, r) => s + r.forks_count, 0),
  };
}
