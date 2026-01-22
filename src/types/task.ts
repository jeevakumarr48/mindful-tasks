export type StressLevel = 'calm' | 'moderate' | 'stressed';

export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Task {
  id: string;
  title: string;
  description?: string;
  goalId: string;
  completed: boolean;
  priority: TaskPriority;
  estimatedMinutes: number;
  deadline?: Date;
  createdAt: Date;
  stressWeight: number; // 1-10, higher = more stressful
}

export interface Goal {
  id: string;
  title: string;
  description?: string;
  deadline?: Date;
  createdAt: Date;
  tasks: Task[];
  color: string;
}

export interface UserState {
  currentStressLevel: StressLevel;
  goals: Goal[];
}
