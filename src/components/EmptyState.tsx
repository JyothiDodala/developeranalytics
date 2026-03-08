import { Zap } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center animate-slide-up">
      <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
        <Zap className="h-8 w-8 text-primary animate-pulse-glow" />
      </div>
      <h2 className="text-2xl font-bold text-foreground mb-2">
        Analyze any developer
      </h2>
      <p className="text-sm text-muted-foreground max-w-md">
        Enter a GitHub username above to get insights about their skills,
        repositories, and development activity.
      </p>
    </div>
  );
}
