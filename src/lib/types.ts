export type Subtask = {
  id: string;
  name: string;
  completed: boolean;
};

export type Task = {
  id: string;
  name: string;
  completed: boolean;
  subtasks: Subtask[];
  lastAccessed: string;
  completionRate: number;
  description?: string;
  nlpHints?: {
    detectedLang: string;
    energySuggestion?: string;
    effortSuggestion?: string;
    confidence: number;
    isUncertain: boolean;
    rawText: string;
  };
  priority?: "low" | "medium" | "high";
  energyRequired?: "low" | "medium" | "high";
  estimatedDuration?: number;
  objective?: string;
  autoSelected?: boolean;
  tags?: string[];
  completedAt?: string;
  scheduledDate?: string;
  selectionReason?: string;
  effort?: "S" | "M" | "L";
  deadlineDisplay?: string;
};

export type DailyRituals = {
  playlistShuffledCount: number;
  completedTaskCount: number;
  completedTasks: Task[];
};

export type FocusSettings = {
  workDuration: number;
  breakDuration: number;
  autoSaveNotes: boolean;
  soundEnabled: boolean;
};

export type EnergyLevel = "high" | "medium" | "low";
export type Priority = "low" | "medium" | "high";

export interface UserPatterns {
  skippedTaskTypes: Record<string, number>;
  completedTaskTypes: Record<string, number>;
  shuffleCount: number;
}

export interface TaskScore {
  task: Task;
  score: number;
  reason: string;
  reasonDetails?: string[];
  isKeystoneHabit?: boolean;
  impactMetrics?: unknown;
}

export interface PlaylistGeneratorOptions {
  energyLevel: EnergyLevel;
  currentTime: Date;
  taskHistory?: Task[];
  maxTasks?: number;
  userPatterns?: UserPatterns;
  workdayHours?: number;
}
