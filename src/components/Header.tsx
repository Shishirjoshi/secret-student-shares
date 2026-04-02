import { Shield, Flame } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center glow-amber">
            <Flame className="w-5 h-5 text-primary" />
          </div>
          <h1 className="font-display font-bold text-lg text-foreground tracking-tight">
            Confess<span className="text-primary">ion</span>
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Shield className="w-3.5 h-3.5" />
            Anonymous
          </span>
        </div>
      </div>
    </header>
  );
}
