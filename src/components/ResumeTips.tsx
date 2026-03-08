import { useState } from "react";
import { FileText, CheckCircle2, Lightbulb, AlertTriangle } from "lucide-react";

const TIPS = [
  { text: "Add measurable achievements (e.g., 'Improved load time by 40%')", icon: AlertTriangle, type: "warning" },
  { text: "Highlight technical skills with proficiency levels", icon: Lightbulb, type: "tip" },
  { text: "Include links to GitHub projects and live demos", icon: CheckCircle2, type: "success" },
  { text: "Use action verbs: Built, Designed, Optimized, Implemented", icon: Lightbulb, type: "tip" },
  { text: "Keep it concise — one page for <5 years experience", icon: Lightbulb, type: "tip" },
  { text: "Add a 'Projects' section separate from work experience", icon: AlertTriangle, type: "warning" },
];

export function ResumeTips() {
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="rounded-lg bg-card border border-border p-6 card-glow transition-all animate-slide-up">
      <h3 className="text-sm font-medium text-muted-foreground mb-4">Resume Tips</h3>
      {!submitted ? (
        <div className="space-y-3">
          <div className="relative">
            <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <textarea
              placeholder="Paste your resume text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
              className="w-full pl-10 pr-3 py-2.5 rounded-md bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/40 resize-none"
            />
          </div>
          <button
            onClick={() => text.trim() && setSubmitted(true)}
            disabled={!text.trim()}
            className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            Get Tips
          </button>
        </div>
      ) : (
        <div className="space-y-2.5">
          {TIPS.map((tip, i) => (
            <div
              key={i}
              className="flex items-start gap-2.5 text-sm text-foreground bg-secondary/40 rounded-md p-3"
            >
              <tip.icon className={`h-4 w-4 mt-0.5 shrink-0 ${
                tip.type === "warning" ? "text-yellow-400" :
                tip.type === "success" ? "text-accent" : "text-primary"
              }`} />
              {tip.text}
            </div>
          ))}
          <button
            onClick={() => { setSubmitted(false); setText(""); }}
            className="text-xs text-primary hover:underline mt-2"
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
}
