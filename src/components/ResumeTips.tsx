import { useState } from "react";
import { FileText, CheckCircle2, Lightbulb, AlertTriangle, Loader2 } from "lucide-react";

interface Tip {
  text: string;
  icon: typeof AlertTriangle;
  type: "warning" | "success" | "tip";
}

function analyzeResume(text: string): Tip[] {
  const tips: Tip[] = [];
  const lower = text.toLowerCase();
  const wordCount = text.trim().split(/\s+/).length;

  // Check for measurable achievements
  const hasNumbers = /\d+%|\d+x|\$\d+|\d+ users|\d+ clients|\d+ projects/i.test(text);
  if (hasNumbers) {
    tips.push({ text: "Great — you include measurable achievements with numbers!", icon: CheckCircle2, type: "success" });
  } else {
    tips.push({ text: "Add measurable achievements (e.g., 'Improved load time by 40%', 'Served 10K+ users')", icon: AlertTriangle, type: "warning" });
  }

  // Check for action verbs
  const actionVerbs = ["built", "designed", "developed", "implemented", "optimized", "led", "created", "architected", "deployed", "managed", "launched"];
  const foundVerbs = actionVerbs.filter(v => lower.includes(v));
  if (foundVerbs.length >= 3) {
    tips.push({ text: `Good use of action verbs: ${foundVerbs.slice(0, 4).join(", ")}`, icon: CheckCircle2, type: "success" });
  } else {
    tips.push({ text: "Use strong action verbs: Built, Designed, Optimized, Implemented, Deployed, Led", icon: AlertTriangle, type: "warning" });
  }

  // Check for technical skills
  const techSkills = ["javascript", "typescript", "python", "react", "node", "sql", "aws", "docker", "git", "java", "c++", "rust", "go", "kubernetes", "mongodb", "postgresql"];
  const foundSkills = techSkills.filter(s => lower.includes(s));
  if (foundSkills.length >= 3) {
    tips.push({ text: `Good technical keyword coverage: ${foundSkills.slice(0, 5).join(", ")}`, icon: CheckCircle2, type: "success" });
  } else {
    tips.push({ text: "Include more technical skills and tools to pass ATS (Applicant Tracking Systems)", icon: AlertTriangle, type: "warning" });
  }

  // Check for GitHub/portfolio links
  if (lower.includes("github") || lower.includes("gitlab") || lower.includes("bitbucket")) {
    tips.push({ text: "Good — you reference your code repositories!", icon: CheckCircle2, type: "success" });
  } else {
    tips.push({ text: "Include links to your GitHub profile and key project repositories", icon: AlertTriangle, type: "warning" });
  }

  // Check for portfolio/website
  if (lower.includes("portfolio") || lower.includes(".com") || lower.includes(".dev") || lower.includes(".io")) {
    tips.push({ text: "Portfolio/website link detected — great for showcasing your work!", icon: CheckCircle2, type: "success" });
  } else {
    tips.push({ text: "Add a link to your portfolio website or personal site", icon: Lightbulb, type: "tip" });
  }

  // Check for education section
  if (lower.includes("education") || lower.includes("university") || lower.includes("degree") || lower.includes("bachelor") || lower.includes("master")) {
    tips.push({ text: "Education section found — keep it concise if you have 2+ years of experience", icon: CheckCircle2, type: "success" });
  } else {
    tips.push({ text: "Consider adding an Education section if applicable", icon: Lightbulb, type: "tip" });
  }

  // Length check
  if (wordCount < 100) {
    tips.push({ text: "Your resume seems too short — aim for at least 300–500 words for a strong one-page resume", icon: AlertTriangle, type: "warning" });
  } else if (wordCount > 800) {
    tips.push({ text: "Your resume is quite long — consider trimming to one page (~400–600 words) if you have <5 years experience", icon: Lightbulb, type: "tip" });
  } else {
    tips.push({ text: "Good resume length — concise and focused", icon: CheckCircle2, type: "success" });
  }

  // Check for projects section
  if (lower.includes("project")) {
    tips.push({ text: "Projects section detected — make sure each project has a tech stack and outcome", icon: Lightbulb, type: "tip" });
  } else {
    tips.push({ text: "Add a dedicated 'Projects' section separate from work experience", icon: AlertTriangle, type: "warning" });
  }

  // Check for contact info
  const hasEmail = /[\w.-]+@[\w.-]+\.\w+/.test(text);
  const hasPhone = /\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/.test(text);
  if (hasEmail || hasPhone) {
    tips.push({ text: "Contact information found — make sure it's prominently placed at the top", icon: CheckCircle2, type: "success" });
  } else {
    tips.push({ text: "Add your email and phone number at the top of your resume", icon: AlertTriangle, type: "warning" });
  }

  return tips;
}

export function ResumeTips() {
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [tips, setTips] = useState<Tip[]>([]);

  const handleAnalyze = () => {
    if (!text.trim()) return;
    setAnalyzing(true);
    setTimeout(() => {
      const results = analyzeResume(text.trim());
      setTips(results);
      setSubmitted(true);
      setAnalyzing(false);
    }, 1500);
  };

  const scoreCount = tips.filter(t => t.type === "success").length;
  const total = tips.length;

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
            onClick={handleAnalyze}
            disabled={!text.trim() || analyzing}
            className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-2"
          >
            {analyzing && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            {analyzing ? "Analyzing..." : "Get Tips"}
          </button>
        </div>
      ) : (
        <div className="space-y-2.5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-muted-foreground">
              Resume Score: <span className="text-primary font-bold">{scoreCount}/{total}</span> checks passed
            </p>
            <div className="h-2 w-24 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${(scoreCount / total) * 100}%` }}
              />
            </div>
          </div>
          {tips.map((tip, i) => (
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
            onClick={() => { setSubmitted(false); setText(""); setTips([]); }}
            className="text-xs text-primary hover:underline mt-2"
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
}
