import { Task } from '@/types/task';
import { getPriorityColor } from '@/lib/taskUtils';
import { cn } from '@/lib/utils';
import { Check, Clock, AlertTriangle } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';

interface TaskCardProps {
  task: Task;
  goalColor: string;
  onToggleComplete: (taskId: string) => void;
  index: number;
}

export const TaskCard = ({ task, goalColor, onToggleComplete, index }: TaskCardProps) => {
  const daysUntilDeadline = task.deadline 
    ? differenceInDays(task.deadline, new Date())
    : null;

  const isUrgent = daysUntilDeadline !== null && daysUntilDeadline <= 1;
  const isNearDeadline = daysUntilDeadline !== null && daysUntilDeadline <= 3;

  return (
    <div 
      className={cn(
        "group relative bg-card rounded-xl p-4 shadow-soft hover:shadow-elevated transition-all duration-300 animate-slide-up",
        task.completed && "opacity-60"
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Color accent bar */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl"
        style={{ backgroundColor: goalColor }}
      />

      <div className="flex items-start gap-3 ml-2">
        {/* Completion checkbox */}
        <button
          onClick={() => onToggleComplete(task.id)}
          className={cn(
            "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 mt-0.5 flex-shrink-0",
            task.completed 
              ? "bg-primary border-primary" 
              : "border-border hover:border-primary"
          )}
        >
          {task.completed && <Check className="w-4 h-4 text-primary-foreground" />}
        </button>

        <div className="flex-1 min-w-0">
          <p className={cn(
            "font-medium text-foreground transition-all duration-300",
            task.completed && "line-through text-muted-foreground"
          )}>
            {task.title}
          </p>

          <div className="flex items-center gap-3 mt-2 flex-wrap">
            {/* Priority badge */}
            <span className={cn(
              "text-xs px-2 py-0.5 rounded-full border",
              getPriorityColor(task.priority)
            )}>
              {task.priority}
            </span>

            {/* Estimated time */}
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              {task.estimatedMinutes}m
            </span>

            {/* Deadline warning */}
            {task.deadline && (
              <span className={cn(
                "flex items-center gap-1 text-xs",
                isUrgent 
                  ? "text-urgent" 
                  : isNearDeadline 
                  ? "text-stressed" 
                  : "text-muted-foreground"
              )}>
                {isUrgent && <AlertTriangle className="w-3 h-3" />}
                {format(task.deadline, 'MMM d')}
              </span>
            )}
          </div>
        </div>

        {/* Stress indicator */}
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={cn(
                "w-1.5 h-3 rounded-full transition-all",
                i < Math.ceil(task.stressWeight / 2)
                  ? task.stressWeight > 6
                    ? "bg-stressed"
                    : task.stressWeight > 3
                    ? "bg-moderate"
                    : "bg-calm"
                  : "bg-muted"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
