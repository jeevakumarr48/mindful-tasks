import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { StressMeter } from '@/components/StressMeter';
import { GoalInput } from '@/components/GoalInput';
import { GoalCard } from '@/components/GoalCard';
import { TaskQueue } from '@/components/TaskQueue';
import { Goal, StressLevel } from '@/types/task';
import { Target } from 'lucide-react';

const Index = () => {
  const [stressLevel, setStressLevel] = useState<StressLevel>('moderate');
  const [goals, setGoals] = useState<Goal[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedGoals = localStorage.getItem('mindflow-goals');
    const savedStress = localStorage.getItem('mindflow-stress');
    
    if (savedGoals) {
      const parsed = JSON.parse(savedGoals);
      // Convert date strings back to Date objects
      const goalsWithDates = parsed.map((g: any) => ({
        ...g,
        deadline: g.deadline ? new Date(g.deadline) : undefined,
        createdAt: new Date(g.createdAt),
        tasks: g.tasks.map((t: any) => ({
          ...t,
          deadline: t.deadline ? new Date(t.deadline) : undefined,
          createdAt: new Date(t.createdAt),
        })),
      }));
      setGoals(goalsWithDates);
    }
    
    if (savedStress) {
      setStressLevel(savedStress as StressLevel);
    }
  }, []);

  // Save to localStorage on changes
  useEffect(() => {
    localStorage.setItem('mindflow-goals', JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem('mindflow-stress', stressLevel);
  }, [stressLevel]);

  const handleAddGoal = (goal: Goal) => {
    setGoals(prev => [...prev, goal]);
  };

  const handleDeleteGoal = (goalId: string) => {
    setGoals(prev => prev.filter(g => g.id !== goalId));
  };

  const handleToggleComplete = (taskId: string) => {
    setGoals(prev => prev.map(goal => ({
      ...goal,
      tasks: goal.tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ),
    })));
  };

  return (
    <div className="min-h-screen gradient-calm">
      <div className="container max-w-2xl mx-auto px-4 pb-12">
        <Header />
        
        <div className="space-y-6">
          {/* Stress Level Selector */}
          <StressMeter 
            currentLevel={stressLevel} 
            onLevelChange={setStressLevel} 
          />

          {/* Goal Input */}
          <GoalInput onAddGoal={handleAddGoal} />

          {/* Goals List */}
          {goals.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                <h2 className="font-display text-lg font-semibold text-foreground">
                  Your Goals
                </h2>
              </div>
              <div className="space-y-3">
                {goals.map(goal => (
                  <GoalCard 
                    key={goal.id} 
                    goal={goal} 
                    onDelete={handleDeleteGoal}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Smart Task Queue */}
          <TaskQueue 
            goals={goals} 
            stressLevel={stressLevel}
            onToggleComplete={handleToggleComplete}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
