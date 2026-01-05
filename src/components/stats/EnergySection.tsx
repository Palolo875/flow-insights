import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import { 
  MorningIcon, 
  AfternoonIcon, 
  RestIcon, 
  DeepWorkIcon, 
  CreativityIcon, 
  AdminIcon, 
  SocialIcon, 
  QuickTasksIcon,
  HighEnergyIcon
} from '../icons/KairuIcons';

const energyData = [
  { period: 'Matin', level: 85, icon: MorningIcon },
  { period: 'Midi', level: 70, icon: HighEnergyIcon },
  { period: 'Après-midi', level: 55, icon: AfternoonIcon },
  { period: 'Soir', level: 40, icon: RestIcon },
];

const taskCategories = [
  { name: 'Deep Work', icon: DeepWorkIcon, success: 82 },
  { name: 'Créatif', icon: CreativityIcon, success: 67 },
  { name: 'Admin', icon: AdminIcon, success: 91 },
  { name: 'Social', icon: SocialIcon, success: 75 },
  { name: 'Rapide', icon: QuickTasksIcon, success: 88 },
];

const EnergySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState(1);

  return (
    <section className="min-h-screen w-full px-6 py-8 flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-full bg-beige-gold-light flex items-center justify-center">
          <HighEnergyIcon size={28} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Profil Énergétique</h1>
          <p className="text-muted-foreground text-sm">Ton énergie au fil de la journée</p>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-card rounded-3xl p-6 shadow-sm mb-8">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Niveaux d'énergie</h3>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={energyData} barCategoryGap="25%">
              <XAxis 
                dataKey="period" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              />
              <YAxis hide domain={[0, 100]} />
              <Bar 
                dataKey="level" 
                radius={[12, 12, 0, 0]}
              >
                {energyData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`}
                    fill={entry.level > 70 ? 'hsl(var(--beige-gold))' : entry.level > 50 ? 'hsl(var(--brown-soft))' : 'hsl(var(--cream-dark))'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Period icons */}
        <div className="flex justify-around mt-4">
          {energyData.map(({ period, icon: Icon }) => (
            <div key={period} className="flex flex-col items-center gap-2">
              <Icon size={24} />
            </div>
          ))}
        </div>
      </div>

      {/* Category Slider */}
      <div className="bg-card rounded-3xl p-6 shadow-sm mb-8">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Catégories de tâches</h3>
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
          {taskCategories.map(({ name, icon: Icon }, index) => (
            <button
              key={name}
              onClick={() => setSelectedCategory(index)}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl min-w-[100px] transition-all ${
                selectedCategory === index 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-secondary hover:bg-secondary/80'
              }`}
            >
              <div className={selectedCategory === index ? 'opacity-100' : 'opacity-70'}>
                <Icon size={32} />
              </div>
              <span className="text-sm font-medium whitespace-nowrap">{name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Success Stats */}
      <div className="bg-card rounded-3xl p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="relative w-20 h-20">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="40"
                cy="40"
                r="32"
                fill="none"
                stroke="hsl(var(--cream-dark))"
                strokeWidth="8"
              />
              <circle
                cx="40"
                cy="40"
                r="32"
                fill="none"
                stroke="hsl(var(--beige-gold))"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${(taskCategories[selectedCategory].success / 100) * 201} 201`}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-bold text-foreground">
                {taskCategories[selectedCategory].success}%
              </span>
            </div>
          </div>
          <div>
            <p className="font-medium text-foreground">
              Tu réussis <span className="text-beige-gold font-bold">{taskCategories[selectedCategory].success}%</span> 
            </p>
            <p className="text-muted-foreground">
              des tâches {taskCategories[selectedCategory].name.toLowerCase()}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnergySection;
