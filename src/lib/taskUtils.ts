import { Task, Goal, StressLevel, TaskPriority } from '@/types/task';

export const generateId = () => Math.random().toString(36).substring(2, 15);

const goalColors = [
  'hsl(150 40% 65%)', // Sage
  'hsl(200 60% 60%)', // Sky blue
  'hsl(35 70% 60%)',  // Warm orange
  'hsl(280 50% 65%)', // Lavender
  'hsl(340 60% 65%)', // Rose
];

export const getRandomColor = () => goalColors[Math.floor(Math.random() * goalColors.length)];

export const breakdownGoalIntoTasks = (goal: Goal): Task[] => {
  // This is a simplified breakdown - in production, this would use AI
  const taskTemplates = [
    { title: `Research and plan: ${goal.title}`, stressWeight: 3, estimatedMinutes: 30, priority: 'medium' as TaskPriority },
    { title: `Gather resources for: ${goal.title}`, stressWeight: 2, estimatedMinutes: 20, priority: 'low' as TaskPriority },
    { title: `Start working on: ${goal.title}`, stressWeight: 5, estimatedMinutes: 60, priority: 'high' as TaskPriority },
    { title: `Review progress: ${goal.title}`, stressWeight: 4, estimatedMinutes: 15, priority: 'medium' as TaskPriority },
    { title: `Complete and finalize: ${goal.title}`, stressWeight: 6, estimatedMinutes: 45, priority: 'high' as TaskPriority },
  ];

  return taskTemplates.map((template) => ({
    id: generateId(),
    title: template.title,
    goalId: goal.id,
    completed: false,
    priority: template.priority,
    estimatedMinutes: template.estimatedMinutes,
    deadline: goal.deadline,
    createdAt: new Date(),
    stressWeight: template.stressWeight,
  }));
};

export const getStressBasedTasks = (tasks: Task[], stressLevel: StressLevel): Task[] => {
  const incompleteTasks = tasks.filter((t) => !t.completed);
  
  // Sort based on stress level preference
  return [...incompleteTasks].sort((a, b) => {
    const now = new Date();
    const aDeadlineDays = a.deadline ? Math.ceil((a.deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)) : 999;
    const bDeadlineDays = b.deadline ? Math.ceil((b.deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)) : 999;
    
    // Urgent deadlines always come first
    if (aDeadlineDays <= 1 && bDeadlineDays > 1) return -1;
    if (bDeadlineDays <= 1 && aDeadlineDays > 1) return 1;
    
    switch (stressLevel) {
      case 'calm':
        // When calm, tackle harder tasks first
        return b.stressWeight - a.stressWeight;
      case 'stressed':
        // When stressed, start with easier tasks to build momentum
        return a.stressWeight - b.stressWeight;
      case 'moderate':
      default:
        // Balanced approach - prioritize by deadline and medium stress tasks
        return aDeadlineDays - bDeadlineDays;
    }
  });
};

export const getPriorityColor = (priority: TaskPriority): string => {
  switch (priority) {
    case 'low': return 'bg-calm/20 text-calm-foreground border-calm/30';
    case 'medium': return 'bg-moderate/20 text-moderate-foreground border-moderate/30';
    case 'high': return 'bg-stressed/20 text-stressed-foreground border-stressed/30';
    case 'urgent': return 'bg-urgent/20 text-urgent-foreground border-urgent/30';
  }
};

export const getStressLevelEmoji = (level: StressLevel): string => {
  switch (level) {
    case 'calm': return '😌';
    case 'moderate': return '😐';
    case 'stressed': return '😰';
  }
};

export const getStressLevelLabel = (level: StressLevel): string => {
  switch (level) {
    case 'calm': return 'Feeling Calm';
    case 'moderate': return 'Balanced';
    case 'stressed': return 'Under Pressure';
  }
};
