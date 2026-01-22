import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Calendar, Sparkles } from 'lucide-react';
import { Goal } from '@/types/task';
import { generateId, getRandomColor, breakdownGoalIntoTasks } from '@/lib/taskUtils';

interface GoalInputProps {
  onAddGoal: (goal: Goal) => void;
}

export const GoalInput = ({ onAddGoal }: GoalInputProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newGoal: Goal = {
      id: generateId(),
      title: title.trim(),
      description: description.trim() || undefined,
      deadline: deadline ? new Date(deadline) : undefined,
      createdAt: new Date(),
      tasks: [],
      color: getRandomColor(),
    };

    // Generate tasks for the goal
    newGoal.tasks = breakdownGoalIntoTasks(newGoal);

    onAddGoal(newGoal);
    setTitle('');
    setDescription('');
    setDeadline('');
    setIsExpanded(false);
  };

  return (
    <form onSubmit={handleSubmit} className="gradient-card rounded-2xl p-6 shadow-elevated animate-fade-in">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center shadow-soft">
          <Sparkles className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h2 className="font-display text-xl font-semibold text-foreground">Add a New Goal</h2>
          <p className="text-sm text-muted-foreground">We'll break it down into manageable tasks</p>
        </div>
      </div>

      <div className="space-y-4">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What do you want to achieve?"
          className="h-12 text-base bg-background/50 border-border/50 focus:border-primary"
          onFocus={() => setIsExpanded(true)}
        />

        {isExpanded && (
          <div className="space-y-4 animate-slide-up">
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add more details (optional)"
              className="min-h-[80px] bg-background/50 border-border/50 focus:border-primary resize-none"
            />

            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              <Input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="flex-1 bg-background/50 border-border/50 focus:border-primary"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>
        )}

        <Button 
          type="submit" 
          variant="hero" 
          size="lg" 
          className="w-full"
          disabled={!title.trim()}
        >
          <Plus className="w-5 h-5" />
          Create Goal & Generate Tasks
        </Button>
      </div>
    </form>
  );
};
