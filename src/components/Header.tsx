import { Brain, Leaf } from 'lucide-react';

export const Header = () => {
  return (
    <header className="py-8 animate-fade-in">
      <div className="flex items-center justify-center gap-3">
        <div className="relative">
          <div className="w-12 h-12 rounded-2xl gradient-hero flex items-center justify-center shadow-glow">
            <Brain className="w-6 h-6 text-primary-foreground" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-calm flex items-center justify-center">
            <Leaf className="w-3 h-3 text-calm-foreground" />
          </div>
        </div>
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground tracking-tight">
            MindFlow
          </h1>
          <p className="text-sm text-muted-foreground">
            Emotional-aware task management
          </p>
        </div>
      </div>
    </header>
  );
};
