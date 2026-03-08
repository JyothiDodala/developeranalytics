import { GitHubUser } from "@/services/github";
import { MapPin, Link as LinkIcon, Building, Users, BookOpen } from "lucide-react";

export function ProfileCard({ user }: { user: GitHubUser }) {
  return (
    <div className="rounded-lg bg-card border border-border p-6 card-glow transition-all animate-slide-up">
      <div className="flex items-start gap-5">
        <img
          src={user.avatar_url}
          alt={user.login}
          className="w-20 h-20 rounded-full ring-2 ring-primary/30"
        />
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-bold text-foreground truncate">
            {user.name || user.login}
          </h2>
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-mono text-primary hover:underline"
          >
            @{user.login}
          </a>
          {user.bio && (
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{user.bio}</p>
          )}
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
            {user.location && (
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {user.location}
              </span>
            )}
            {user.company && (
              <span className="flex items-center gap-1">
                <Building className="h-3 w-3" /> {user.company}
              </span>
            )}
            {user.blog && (
              <a
                href={user.blog.startsWith("http") ? user.blog : `https://${user.blog}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-primary transition-colors"
              >
                <LinkIcon className="h-3 w-3" /> Website
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3">
        {[
          { icon: BookOpen, label: "Repos", value: user.public_repos },
          { icon: Users, label: "Followers", value: user.followers },
          { icon: Users, label: "Following", value: user.following },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-md bg-secondary/60 px-3 py-2.5 text-center"
          >
            <div className="text-lg font-bold font-mono text-foreground">{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
