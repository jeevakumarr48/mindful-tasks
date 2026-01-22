import { StressLevel } from '@/types/task';
import { getStressLevelEmoji, getStressLevelLabel } from '@/lib/taskUtils';
import { cn } from '@/lib/utils';

interface StressMeterProps {
  currentLevel: StressLevel;
  onLevelChange: (level: StressLevel) => void;
}

const levels: StressLevel[] = ['calm', 'moderate', 'stressed'];

export const StressMeter = ({ currentLevel, onLevelChange }: StressMeterProps) => {
  return (
    <div className="gradient-card rounded-2xl p-6 shadow-elevated animate-fade-in">
      <h3 className="text-sm font-medium text-muted-foreground mb-4">How are you feeling right now?</h3>
      
      <div className="flex items-center justify-between gap-2">
        {levels.map((level) => (
          <button
            key={level}
            onClick={() => onLevelChange(level)}
            className={cn(
              "flex-1 flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-300",
              currentLevel === level
                ? level === 'calm'
                  ? "bg-calm/20 border-2 border-calm shadow-soft scale-105"
                  : level === 'moderate'
                  ? "bg-moderate/20 border-2 border-moderate shadow-soft scale-105"
                  : "bg-stressed/20 border-2 border-stressed shadow-soft scale-105"
                : "bg-muted/50 border-2 border-transparent hover:bg-muted"
            )}
          >
            <span className="text-3xl">{getStressLevelEmoji(level)}</span>
            <span className={cn(
              "text-xs font-medium",
              currentLevel === level ? "text-foreground" : "text-muted-foreground"
            )}>
              {getStressLevelLabel(level)}
            </span>
          </button>
        ))}
      </div>
      
      <p className="text-xs text-muted-foreground text-center mt-4">
        {currentLevel === 'calm' && "Great! We'll assign challenging tasks to maximize productivity."}
        {currentLevel === 'moderate' && "We'll balance your tasks between challenging and manageable."}
        {currentLevel === 'stressed' && "Let's start with easier tasks to help you build momentum."}
      </p>
    </div>
  );
};
