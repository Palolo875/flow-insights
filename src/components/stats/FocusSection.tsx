import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { CreativityIcon, LearningIcon, AdminIcon, DeepWorkIcon, FlowIcon } from '../icons/KairuIcons';

const focusData = [
  { day: 'Lun', score: 72 },
  { day: 'Mar', score: 85 },
  { day: 'Mer', score: 65 },
  { day: 'Jeu', score: 90 },
  { day: 'Ven', score: 78 },
  { day: 'Sam', score: 55 },
  { day: 'Dim', score: 60 },
];

const categories = [
  { name: 'Créativité', icon: CreativityIcon, count: 12 },
  { name: 'Apprentissage', icon: LearningIcon, count: 8 },
  { name: 'Admin', icon: AdminIcon, count: 15 },
  { name: 'Deep Work', icon: DeepWorkIcon, count: 6 },
];

const FocusSection: React.FC = () => {
  const flowScore = 85;

  return (
    <section className="min-h-screen w-full px-6 py-8 flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-full bg-beige-gold-light flex items-center justify-center">
          <FlowIcon size={28} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Focus & Productivité</h1>
          <p className="text-muted-foreground text-sm">Ton flow de la semaine</p>
        </div>
      </div>

      {/* Flow Score Circle */}
      <div className="flex justify-center mb-8">
        <div className="relative w-40 h-40">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke="hsl(var(--cream-dark))"
              strokeWidth="12"
            />
            <circle
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke="hsl(var(--beige-gold))"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={`${(flowScore / 100) * 440} 440`}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-foreground">{flowScore}%</span>
            <span className="text-sm text-muted-foreground">Score de Flow</span>
          </div>
        </div>
      </div>

      {/* Line Chart */}
      <div className="bg-card rounded-3xl p-6 shadow-sm mb-8">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Évolution du focus</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={focusData}>
              <XAxis 
                dataKey="day" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  background: 'hsl(var(--card))',
                  border: 'none',
                  borderRadius: '16px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="hsl(var(--soft-black))"
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--beige-gold))', strokeWidth: 2, r: 5 }}
                activeDot={{ fill: 'hsl(var(--beige-gold))', strokeWidth: 0, r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Badges */}
      <div className="flex flex-wrap gap-3 mb-8">
        {['Énergie haute', 'Matin', 'Deep work', 'Créatif'].map((badge) => (
          <span
            key={badge}
            className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium"
          >
            {badge}
          </span>
        ))}
      </div>

      {/* Task Icons Grid */}
      <div className="bg-card rounded-3xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Types de tâches</h3>
        <div className="grid grid-cols-2 gap-4">
          {categories.map(({ name, icon: Icon, count }) => (
            <div
              key={name}
              className="flex items-center gap-4 p-4 rounded-2xl bg-secondary/50 hover:bg-secondary transition-colors"
            >
              <Icon size={32} />
              <div>
                <p className="font-medium text-foreground">{name}</p>
                <p className="text-sm text-muted-foreground">{count} tâches</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FocusSection;
