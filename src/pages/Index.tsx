import { useState, useRef, useCallback } from "react";
import { useGitHub } from "@/hooks/useGitHub";
import { SearchBar } from "@/components/SearchBar";
import { AppSidebar } from "@/components/AppSidebar";
import { ProfileCard } from "@/components/ProfileCard";
import { ScoreCard } from "@/components/ScoreCard";
import { SkillBadges } from "@/components/SkillBadges";
import { RepoTable } from "@/components/RepoTable";
import { StatsCards } from "@/components/StatsCards";
import { LanguageChart } from "@/components/LanguageChart";
import { PortfolioFeedback } from "@/components/PortfolioFeedback";
import { ResumeTips } from "@/components/ResumeTips";
import { EmptyState } from "@/components/EmptyState";
import { AlertCircle } from "lucide-react";

const SECTIONS = ["profile", "stats", "repos", "skills", "score", "portfolio", "resume"] as const;

const Index = () => {
  const { data, loading, error, analyze } = useGitHub();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState("profile");
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const scrollTo = useCallback((id: string) => {
    setActiveSection(id);
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const setRef = (id: string) => (el: HTMLDivElement | null) => {
    sectionRefs.current[id] = el;
  };

  return (
    <div className="min-h-screen flex">
      <AppSidebar
        active={activeSection}
        onNavigate={scrollTo}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <main
        className={`flex-1 transition-all duration-300 ${
          sidebarCollapsed ? "ml-16" : "ml-56"
        }`}
      >
        {/* Header */}
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-6">
            <div className="flex-1">
              <h1 className="text-lg font-bold">
                <span className="gradient-text">DevInsight</span>
                <span className="text-muted-foreground font-normal text-sm ml-2">
                  AI Portfolio Analyzer
                </span>
              </h1>
            </div>
            <SearchBar onSearch={analyze} loading={loading} />
          </div>
        </header>

        {/* Content */}
        <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">
          {error && (
            <div className="flex items-center gap-2 p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm animate-slide-up">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          {!data && !loading && !error && <EmptyState />}

          {loading && (
            <div className="flex flex-col items-center py-24 gap-3">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-muted-foreground">Analyzing profile...</p>
            </div>
          )}

          {data && (
            <>
              {/* Profile + Score row */}
              <div ref={setRef("profile")} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <ProfileCard user={data.user} />
                </div>
                <div ref={setRef("score")}>
                  <ScoreCard score={data.score} />
                </div>
              </div>

              {/* Stats */}
              <div ref={setRef("stats")}>
                <StatsCards stats={data.stats} />
              </div>

              {/* Skills + Chart */}
              <div ref={setRef("skills")} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SkillBadges languages={data.languages} />
                <LanguageChart languages={data.languages} />
              </div>

              {/* Repos */}
              <div ref={setRef("repos")}>
                <RepoTable repos={data.repos} />
              </div>

              {/* Portfolio + Resume */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div ref={setRef("portfolio")}>
                  <PortfolioFeedback />
                </div>
                <div ref={setRef("resume")}>
                  <ResumeTips />
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
