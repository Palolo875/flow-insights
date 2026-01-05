import Dexie, { type EntityTable } from 'dexie';

export interface DBSession {
  id?: string;
  timestamp: number;
  plannedTasks: number;
  completedTasks: number;
}

export interface DBTask {
  id: string;
  title: string;
  description?: string;
  category: string;
  status: 'todo' | 'active' | 'frozen' | 'done';
  createdAt: number;
  completedAt?: number;
  tags?: string[];
}

export interface DBTaskHistory {
  id?: string;
  taskId: string;
  action: 'created' | 'started' | 'paused' | 'resumed' | 'completed' | 'deleted';
  timestamp: number;
}

const db = new Dexie('KairuFlowDB') as Dexie & {
  sessions: EntityTable<DBSession, 'id'>;
  tasks: EntityTable<DBTask, 'id'>;
  taskHistory: EntityTable<DBTaskHistory, 'id'>;
};

db.version(1).stores({
  sessions: '++id, timestamp, plannedTasks, completedTasks',
  tasks: 'id, title, category, status, createdAt, completedAt',
  taskHistory: '++id, taskId, action, timestamp',
});

export { db };