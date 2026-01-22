import { Task, Goal, StressLevel } from '@/types/task';
import { getStressBasedTasks, getStressLevelEmoji, getStressLevelLabel } from '@/lib/taskUtils';
import { TaskCard } from './TaskCard';
import { ListChecks, Sparkles } from 'lucide-react';

interface TaskQueueProps {
  goals: Goal[];
  stressLevel: StressLevel;
  onToggleComplete: (taskId: string) => void;
}

export const TaskQueue = ({ goals, stressLevel, onToggleComplete }: TaskQueueProps) => {
  const allTasks = goals.flatMap(g => g.tasks);
  const sortedTasks = getStressBasedTasks(allTasks, stressLevel);
  
  const getGoalColor = (goalId: string) => {
    return goals.find(g => g.id === goalId)?.color || 'hsl(150 40% 65%)';
  };

  const completedCount = allTasks.filter(t => t.completed).length;

  if (allTasks.length === 0) {
    return (
      <div className="text-center py-12 animate-fade-in">
        <div className="w-16 h-16 rounded-2xl gradient-calm mx-auto mb-4 flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-calm" />
        </div>
        <h3 className="font-display text-xl font-semibold text-foreground mb-2">
          No tasks yet
        </h3>
        <p className="text-muted-foreground">
          Add a goal above and we'll break it down into manageable tasks
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-calm flex items-center justify-center">
            <ListChecks className="w-5 h-5 text-calm" />
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">
              Your Smart Queue
            </h2>
            <p className="text-sm text-muted-foreground">
              Ordered for {getStressLevelEmoji(stressLevel)} {getStressLevelLabel(stressLevel).toLowerCase()}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-display font-semibold text-foreground">
            {completedCount}/{allTasks.length}
          </p>
          <p className="text-xs text-muted-foreground">completed</p>
        </div>
      </div>

      {/* Task list */}
      <div className="space-y-3">
        {sortedTasks.map((task, index) => (
          <TaskCard
            key={task.id}
            task={task}
            goalColor={getGoalColor(task.goalId)}
            onToggleComplete={onToggleComplete}
            index={index}
          />
        ))}
      </div>

      {sortedTasks.length === 0 && completedCount > 0 && (
        <div className="text-center py-8 gradient-calm rounded-2xl">
          <span className="text-4xl">🎉</span>
          <h3 className="font-display text-xl font-semibold text-foreground mt-2">
            All done!
          </h3>
          <p className="text-muted-foreground">
            You've completed all your tasks. Great work!
          </p>
        </div>
      )}
    </div>
  );
};
