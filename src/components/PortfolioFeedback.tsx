import { useState } from "react";
import { Link as LinkIcon, CheckCircle2, AlertCircle, Lightbulb, Loader2 } from "lucide-react";

interface Suggestion {
  text: string;
  icon: typeof AlertCircle;
  type: "good" | "improve" | "tip";
}

function analyzePortfolioUrl(url: string): Suggestion[] {
  const suggestions: Suggestion[] = [];
  const lower = url.toLowerCase();

  // Check for common portfolio platforms
  const isGitHubPages = lower.includes("github.io");
  const isNetlify = lower.includes("netlify");
  const isVercel = lower.includes("vercel");
  const isCustomDomain = !isGitHubPages && !isNetlify && !isVercel && !lower.includes("herokuapp");

  if (isCustomDomain) {
    suggestions.push({ text: "Great job using a custom domain — it looks more professional!", icon: CheckCircle2, type: "good" });
  } else if (isGitHubPages) {
    suggestions.push({ text: "Consider upgrading from GitHub Pages to a custom domain for a more professional look", icon: Lightbulb, type: "tip" });
  } else if (isNetlify || isVercel) {
    suggestions.push({ text: "Good hosting choice! Consider adding a custom domain to stand out", icon: Lightbulb, type: "tip" });
  }

  // Check if HTTPS
  if (lower.startsWith("https://")) {
    suggestions.push({ text: "Your site uses HTTPS — secure and trustworthy", icon: CheckCircle2, type: "good" });
  } else {
    suggestions.push({ text: "Your site doesn't use HTTPS — this can hurt credibility and SEO", icon: AlertCircle, type: "improve" });
  }

  // General best practices
  suggestions.push({ text: "Ensure your portfolio has a clear hero section with your name, role, and a call-to-action", icon: Lightbulb, type: "tip" });
  suggestions.push({ text: "Add live demo links and GitHub repo links for each project", icon: AlertCircle, type: "improve" });
  suggestions.push({ text: "Include screenshots or video demos for visual impact", icon: Lightbulb, type: "tip" });
  suggestions.push({ text: "Add a downloadable resume (PDF) and contact form", icon: AlertCircle, type: "improve" });
  suggestions.push({ text: "Showcase 3–5 best projects rather than listing everything", icon: Lightbulb, type: "tip" });
  suggestions.push({ text: "Make sure the site is fully responsive on mobile devices", icon: AlertCircle, type: "improve" });

  // URL path hints
  if (!lower.includes("project") && !lower.includes("work") && !lower.includes("portfolio")) {
    suggestions.push({ text: "Consider having a dedicated /projects or /work page to organize your portfolio", icon: Lightbulb, type: "tip" });
  }

  return suggestions;
}

export function PortfolioFeedback() {
  const [url, setUrl] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  const handleAnalyze = () => {
    if (!url.trim()) return;
    setAnalyzing(true);
    // Simulate brief analysis delay
    setTimeout(() => {
      const results = analyzePortfolioUrl(url.trim());
      setSuggestions(results);
      setSubmitted(true);
      setAnalyzing(false);
    }, 1200);
  };

  const iconColor = (type: string) =>
    type === "good" ? "text-accent" : type === "improve" ? "text-yellow-400" : "text-primary";

  return (
    <div className="rounded-lg bg-card border border-border p-6 card-glow transition-all animate-slide-up">
      <h3 className="text-sm font-medium text-muted-foreground mb-4">Portfolio Feedback</h3>
      {!submitted ? (
        <div className="space-y-3">
          <div className="relative">
            <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="url"
              placeholder="Paste your portfolio URL..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
              className="w-full h-10 pl-10 pr-3 rounded-md bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/40"
            />
          </div>
          <button
            onClick={handleAnalyze}
            disabled={!url.trim() || analyzing}
            className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-2"
          >
            {analyzing && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            {analyzing ? "Analyzing..." : "Get Feedback"}
          </button>
        </div>
      ) : (
        <div className="space-y-2.5">
          <p className="text-xs text-muted-foreground mb-3">
            Feedback for <span className="font-mono text-primary">{url}</span>
          </p>
          {suggestions.map((s, i) => (
            <div
              key={i}
              className="flex items-start gap-2.5 text-sm text-foreground bg-secondary/40 rounded-md p-3"
            >
              <s.icon className={`h-4 w-4 mt-0.5 shrink-0 ${iconColor(s.type)}`} />
              {s.text}
            </div>
          ))}
          <button
            onClick={() => { setSubmitted(false); setUrl(""); setSuggestions([]); }}
            className="text-xs text-primary hover:underline mt-2"
          >
            Try another URL
          </button>
        </div>
      )}
    </div>
  );
}
