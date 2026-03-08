import {
  BarChart3,
  User,
  BookOpen,
  Code,
  Trophy,
  FileText,
  Link as LinkIcon,
  Zap,
} from "lucide-react";

const NAV_ITEMS = [
  { icon: User, label: "Profile", id: "profile" },
  { icon: BarChart3, label: "Stats", id: "stats" },
  { icon: BookOpen, label: "Repositories", id: "repos" },
  { icon: Code, label: "Skills", id: "skills" },
  { icon: Trophy, label: "Score", id: "score" },
  { icon: LinkIcon, label: "Portfolio", id: "portfolio" },
  { icon: FileText, label: "Resume", id: "resume" },
];

interface AppSidebarProps {
  active: string;
  onNavigate: (id: string) => void;
  collapsed: boolean;
  onToggle: () => void;
}

export function AppSidebar({ active, onNavigate, collapsed, onToggle }: AppSidebarProps) {
  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border z-40 transition-all duration-300 flex flex-col ${
        collapsed ? "w-16" : "w-56"
      }`}
    >
      {/* Logo */}
      <div className="h-14 flex items-center gap-2.5 px-4 border-b border-sidebar-border shrink-0">
        <Zap className="h-5 w-5 text-primary shrink-0" />
        {!collapsed && (
          <span className="font-bold text-foreground text-sm whitespace-nowrap">DevInsight</span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-all ${
              active === item.id
                ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
            }`}
          >
            <item.icon className="h-4 w-4 shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* Toggle */}
      <div className="p-2 border-t border-sidebar-border">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center py-2 rounded-md text-xs text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
        >
          {collapsed ? "→" : "← Collapse"}
        </button>
      </div>
    </aside>
  );
}
