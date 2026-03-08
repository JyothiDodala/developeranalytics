interface ScoreCardProps {
  score: number;
}

export function ScoreCard({ score }: ScoreCardProps) {
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (score / 100) * circumference;

  const getGrade = (s: number) => {
    if (s >= 90) return { label: "Elite", color: "text-primary" };
    if (s >= 70) return { label: "Strong", color: "text-accent" };
    if (s >= 50) return { label: "Growing", color: "text-yellow-400" };
    return { label: "Beginner", color: "text-muted-foreground" };
  };

  const grade = getGrade(score);

  return (
    <div className="rounded-lg bg-card border border-border p-6 card-glow transition-all animate-slide-up flex flex-col items-center">
      <h3 className="text-sm font-medium text-muted-foreground mb-4">Developer Score</h3>
      <div className="relative w-32 h-32">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50" cy="50" r="45"
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="6"
          />
          <circle
            cx="50" cy="50" r="45"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ "--score-offset": offset } as React.CSSProperties}
            className="animate-score-fill"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold font-mono text-foreground">{score}</span>
          <span className="text-xs text-muted-foreground">/100</span>
        </div>
      </div>
      <span className={`mt-3 text-sm font-semibold ${grade.color}`}>{grade.label}</span>
    </div>
  );
}
