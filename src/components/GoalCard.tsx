import { Goal } from '@/types/task';
import { cn } from '@/lib/utils';
import { Target, ChevronDown, ChevronUp, Calendar, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { useState } from 'react';
import { Button } from './ui/button';

interface GoalCardProps {
  goal: Goal;
  onDelete: (goalId: string) => void;
}

export const GoalCard = ({ goal, onDelete }: GoalCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const completedCount = goal.tasks.filter(t => t.completed).length;
  const progress = goal.tasks.length > 0 ? (completedCount / goal.tasks.length) * 100 : 0;

  return (
    <div className="gradient-card rounded-2xl p-4 shadow-soft hover:shadow-elevated transition-all duration-300 animate-fade-in">
      <div className="flex items-start gap-3">
        <div 
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: goal.color + '30' }}
        >
          <Target className="w-5 h-5" style={{ color: goal.color }} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-medium text-foreground truncate">{goal.title}</h3>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                onClick={() => onDelete(goal.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {goal.deadline && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              <Calendar className="w-3 h-3" />
              Due {format(goal.deadline, 'MMM d, yyyy')}
            </div>
          )}

          {/* Progress bar */}
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
              <span>{completedCount} of {goal.tasks.length} tasks</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-500"
                style={{ 
                  width: `${progress}%`,
                  backgroundColor: goal.color 
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {isExpanded && goal.description && (
        <p className="text-sm text-muted-foreground mt-3 ml-13 animate-slide-up">
          {goal.description}
        </p>
      )}
    </div>
  );
};
