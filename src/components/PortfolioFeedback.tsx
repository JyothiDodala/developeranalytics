import { useState } from "react";
import { Link as LinkIcon, CheckCircle2, AlertCircle, Lightbulb } from "lucide-react";

const SUGGESTIONS = [
  { text: "Add more projects to showcase variety", icon: AlertCircle },
  { text: "Improve project descriptions with tech stacks used", icon: Lightbulb },
  { text: "Add screenshots or demos for visual impact", icon: Lightbulb },
  { text: "Include GitHub repository links on each project", icon: CheckCircle2 },
  { text: "Add a clear call-to-action (e.g., Contact Me)", icon: Lightbulb },
  { text: "Show measurable outcomes for projects", icon: AlertCircle },
];

export function PortfolioFeedback() {
  const [url, setUrl] = useState("");
  const [submitted, setSubmitted] = useState(false);

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
              className="w-full h-10 pl-10 pr-3 rounded-md bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/40"
            />
          </div>
          <button
            onClick={() => url.trim() && setSubmitted(true)}
            disabled={!url.trim()}
            className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            Get Feedback
          </button>
        </div>
      ) : (
        <div className="space-y-2.5">
          <p className="text-xs text-muted-foreground mb-3">
            Suggestions for <span className="font-mono text-primary">{url}</span>
          </p>
          {SUGGESTIONS.map((s, i) => (
            <div
              key={i}
              className="flex items-start gap-2.5 text-sm text-foreground bg-secondary/40 rounded-md p-3"
            >
              <s.icon className="h-4 w-4 mt-0.5 text-primary shrink-0" />
              {s.text}
            </div>
          ))}
          <button
            onClick={() => { setSubmitted(false); setUrl(""); }}
            className="text-xs text-primary hover:underline mt-2"
          >
            Try another URL
          </button>
        </div>
      )}
    </div>
  );
}
