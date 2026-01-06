import { useState, useEffect } from 'react';
import type { DailyRituals, Task } from '@/lib/types';
import { TaskList } from './task-list';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { RefreshCw, Siren, Plus } from 'lucide-react';
import { DailyGreeting } from './daily-greeting';
import { dbTaskToUiTask, uiTaskToDbTask } from '@/lib/taskMapping';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { EnergyCheckIn } from './energy-check-in';
import {
  getAllTasks,
  upsertTasks,
  completeTask as completeDbTask,
  updateTask as updateDbTask,
  getSetting,
  setSetting,
  recordSleepData,
} from '@/lib/database';

type EnergyState =
  | 'energized'
  | 'normal'
  | 'slow'
  | 'focused'
  | 'creative'
  | null;

const dynamicMessages: Record<string, string> = {
  energized: 'Prêt à déplacer des montagnes ! Voici vos défis :',
  normal: 'Une bonne énergie pour une journée productive. Voici votre plan :',
  slow: 'On y va en douceur. Voici 3 tâches simples pour bien démarrer :',
  focused: 'Mode concentration activé. Voici vos objectifs pour rester dans la zone :',
  creative: "L'inspiration est là ! Voici comment la canaliser et créer quelque chose de génial :",
};

export function DashboardClient() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [sleepHours, setSleepHours] = useState<number | null>(null);
  const [dailyRituals, setDailyRituals] = useState<DailyRituals>({
    playlistShuffledCount: 0,
    completedTaskCount: 0,
    completedTasks: [],
  });
  const [energyLevel, setEnergyLevel] = useState<EnergyState>(null);
  const [energyStability, setEnergyStability] = useState<'stable' | 'volatile'>('stable');
  const [intention, setIntention] = useState<string>('');
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const [urgentTaskName, setUrgentTaskName] = useState('');
  const [replaceTask, setReplaceTask] = useState(false);
  const [isPanicModalOpen, setIsPanicModalOpen] = useState(false);

  const [showMorningRitual, setShowMorningRitual] = useState(false);
  const [morningRitualCompleted, setMorningRitualCompleted] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const today = new Date().toISOString().split('T')[0];
      const lastCheckin = await getSetting<string>('morning.lastCheckin');

      if (cancelled) return;

      if (lastCheckin !== today) {
        setShowMorningRitual(true);
        return;
      }

      setMorningRitualCompleted(true);

      const storedEnergy = await getSetting<EnergyState>('morning.todayEnergyLevel');
      const storedStability = await getSetting<'stable' | 'volatile'>('morning.todayEnergyStability');
      const storedIntention = await getSetting<string>('morning.todayIntention');
      if (cancelled) return;
      if (storedEnergy) setEnergyLevel(storedEnergy);
      if (storedStability) setEnergyStability(storedStability);
      if (storedIntention) setIntention(storedIntention);

      // Load tasks from Dexie
      getAllTasks()
        .then(dbTasks => {
          const adapted = dbTasks.map(dbTaskToUiTask);
          if (!cancelled) {
            setTasks(adapted);
          }
        })
        .catch(() => {
          if (!cancelled) {
            setTasks([]);
          }
        });
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleMorningRitualSubmit = () => {
    if (!energyLevel) {
      toast({
        variant: "destructive",
        title: "Oups !",
        description: "Veuillez sélectionner votre niveau d'énergie.",
      });
      return;
    }
    setShowMorningRitual(false);
    setMorningRitualCompleted(true);
    const today = new Date().toISOString().split('T')[0];
    void setSetting('morning.lastCheckin', today);
    void setSetting('morning.todayEnergyLevel', energyLevel);
    void setSetting('morning.todayEnergyStability', energyStability);
    void setSetting('morning.todayIntention', intention || '');

    if (typeof sleepHours === 'number' && Number.isFinite(sleepHours) && sleepHours >= 0 && sleepHours <= 24) {
      const date = new Date(today);
      recordSleepData({ date, hours: sleepHours, quality: undefined }).catch(() => null);
      void setSetting('morning.sleepHours', sleepHours);
    }

    toast({
      title: 'Votre journée est prête !',
      description: "C'est parti pour une journée productive.",
    });
  };


  const persistTasks = async (newTasks: Task[], options: { incrementShuffle?: boolean } = {}) => {
    setTasks(newTasks);
    const dbTasks = newTasks.map(t => uiTaskToDbTask(t));
    await upsertTasks(dbTasks);
    if (options.incrementShuffle) {
      setDailyRituals((prev: DailyRituals) => ({
        ...prev,
        playlistShuffledCount: prev.playlistShuffledCount + 1,
      }));
    }
  };

  const handleTaskCompletion = (taskId: string) => {
    let completedTask: Task | undefined;
    const newTasks = tasks.map((task: Task) => {
      if (task.id === taskId) {
        completedTask = {
          ...task,
          completed: !task.completed,
          completedAt: !task.completed ? new Date().toISOString() : undefined,
        };
        return completedTask;
      }
      return task;
    });

    setTasks(newTasks);

    if (completedTask) {
      const updatedCompletedTasks = completedTask.completed
        ? [...dailyRituals.completedTasks, completedTask]
        : dailyRituals.completedTasks.filter((t: Task) => t.id !== taskId);

      const newDailyRituals = {
        ...dailyRituals,
        completedTaskCount: updatedCompletedTasks.length,
        completedTasks: updatedCompletedTasks,
      };
      setDailyRituals(newDailyRituals);

      if (completedTask.completed) {
        completeDbTask(taskId).catch(() => null);
        setTimeout(() => {
          const updatedTasks = newTasks.filter((t: Task) => t.id !== taskId);
          setTasks(updatedTasks);
        }, 800);
      } else {
        updateDbTask(taskId, { status: 'todo', completedAt: undefined }).catch(() => null);
      }
    }
  };

  const handleAddUrgentTask = async () => {
    if (!urgentTaskName) return;

    const newTask: Task = {
      id: `urgent-${Date.now()}`,
      name: urgentTaskName,
      completed: false,
      priority: 'high',
      tags: ['Urgent'],
      subtasks: [],
      lastAccessed: new Date().toISOString(),
      completionRate: 0,
    };

    let newTasks;
    if (replaceTask && tasks.length > 0) {
      const remainingTasks = tasks.slice(1);
      newTasks = [newTask, ...remainingTasks];
      toast({
        title: "Tâche urgente ajoutée",
        description: `"${newTask.name}" a remplacé la tâche précédente.`,
      });
    } else {
      newTasks = [newTask, ...tasks];
      toast({
        title: "Tâche urgente ajoutée",
        description: `"${newTask.name}" est maintenant en haut de votre liste.`,
      });
    }
    persistTasks(newTasks).catch(() => null);

    setUrgentTaskName('');
    setReplaceTask(false);
    setIsPanicModalOpen(false);
  };

  // Morning Ritual Dialog
  if (showMorningRitual) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <Card className="rounded-3xl shadow-xl border-0">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl font-bold">Bonjour ! ☀️</CardTitle>
              <p className="text-muted-foreground">Comment vous sentez-vous ce matin ?</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <EnergyCheckIn 
                onEnergyChange={setEnergyLevel}
                onIntentionChange={setIntention}
                onSleepHoursChange={setSleepHours}
                onStabilityChange={setEnergyStability}
              />
              <Button 
                onClick={handleMorningRitualSubmit} 
                className="w-full h-12 rounded-2xl text-lg font-medium"
                disabled={!energyLevel}
              >
                Commencer ma journée
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Daily Greeting */}
        <DailyGreeting 
          name="vous" 
          energyLevel={energyLevel} 
          intention={intention}
        />

        {/* Actions */}
        <div className="flex gap-3 flex-wrap">
          <Button
            variant="outline"
            className="rounded-2xl"
            onClick={() => setIsPanicModalOpen(true)}
          >
            <Siren className="h-4 w-4 mr-2" />
            Tâche urgente
          </Button>
          <Button
            variant="outline"
            className="rounded-2xl"
            onClick={() => {
              const newTask: Task = {
                id: `task-${Date.now()}`,
                name: 'Nouvelle tâche',
                completed: false,
                subtasks: [],
                lastAccessed: new Date().toISOString(),
                completionRate: 0,
                priority: 'medium',
              };
              persistTasks([...tasks, newTask]);
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Ajouter une tâche
          </Button>
        </div>

        {/* Task List */}
        <Card className="rounded-3xl border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Votre playlist du jour</CardTitle>
          </CardHeader>
          <CardContent>
            <TaskList 
              tasks={tasks.filter(t => !t.completed)} 
              onToggleCompletion={handleTaskCompletion} 
            />
          </CardContent>
        </Card>

        {/* Completed Tasks */}
        {dailyRituals.completedTasks.length > 0 && (
          <Card className="rounded-3xl border-0 shadow-lg opacity-75">
            <CardHeader>
              <CardTitle className="text-lg text-muted-foreground">
                ✓ Tâches terminées ({dailyRituals.completedTasks.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {dailyRituals.completedTasks.map(task => (
                  <li key={task.id} className="text-sm text-muted-foreground line-through">
                    {task.name}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Panic Task Modal */}
      <Dialog open={isPanicModalOpen} onOpenChange={setIsPanicModalOpen}>
        <DialogContent className="rounded-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Siren className="h-5 w-5 text-destructive" />
              Tâche urgente
            </DialogTitle>
            <DialogDescription>
              Ajoutez une tâche urgente qui doit être faite maintenant.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Nom de la tâche urgente..."
              value={urgentTaskName}
              onChange={(e) => setUrgentTaskName(e.target.value)}
              className="rounded-xl"
            />
            <div className="flex items-center space-x-2">
              <Switch
                id="replace-task"
                checked={replaceTask}
                onCheckedChange={setReplaceTask}
              />
              <Label htmlFor="replace-task">Remplacer la première tâche</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPanicModalOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleAddUrgentTask} disabled={!urgentTaskName}>
              Ajouter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
