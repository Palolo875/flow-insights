import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CalendarIcon, FlowIcon, DeepWorkIcon, RestIcon, HighEnergyIcon } from '../icons/KairuIcons';

// Generate calendar data
const generateCalendarData = () => {
  const data = [];
  for (let i = 1; i <= 31; i++) {
    const rand = Math.random();
    let level: 'high' | 'medium' | 'low' | 'rest';
    if (rand > 0.7) level = 'high';
    else if (rand > 0.4) level = 'medium';
    else if (rand > 0.15) level = 'low';
    else level = 'rest';
    data.push({ day: i, level });
  }
  return data;
};

const calendarData = generateCalendarData();

const levelColors = {
  high: 'bg-beige-gold',
  medium: 'bg-brown-soft',
  low: 'bg-cream-dark',
  rest: 'bg-coral-soft',
};

const levelLabels = [
  { level: 'high', label: 'Journée intense', icon: HighEnergyIcon },
  { level: 'medium', label: 'Objectif atteint', icon: FlowIcon },
  { level: 'low', label: 'Journée calme', icon: DeepWorkIcon },
  { level: 'rest', label: 'Repos', icon: RestIcon },
];

const CalendarSection: React.FC = () => {
  const [currentMonth] = useState('Janvier 2026');

  return (
    <section className="min-h-screen w-full px-6 py-8 flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-full bg-beige-gold-light flex items-center justify-center">
          <CalendarIcon size={28} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Calendrier de Productivité</h1>
          <p className="text-muted-foreground text-sm">Ton historique mensuel</p>
        </div>
      </div>

      {/* Month Selector */}
      <div className="flex items-center justify-between mb-6">
        <button className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors">
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>
        <h2 className="text-xl font-semibold text-foreground">{currentMonth}</h2>
        <button className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors">
          <ChevronRight className="w-5 h-5 text-foreground" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="bg-card rounded-3xl p-6 shadow-sm mb-8">
        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, i) => (
            <div key={i} className="text-center text-sm text-muted-foreground font-medium">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-2">
          {/* Empty cells for alignment (January 2026 starts on Thursday) */}
          {[...Array(3)].map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}
          
          {calendarData.map(({ day, level }) => (
            <div
              key={day}
              className={`aspect-square rounded-full ${levelColors[level]} flex items-center justify-center transition-transform hover:scale-110 cursor-pointer`}
            >
              <span className="text-xs font-medium text-foreground/80">{day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="bg-card rounded-3xl p-6 shadow-sm mb-8">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Légende</h3>
        <div className="grid grid-cols-2 gap-4">
          {levelLabels.map(({ level, label, icon: Icon }) => (
            <div key={level} className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-full ${levelColors[level as keyof typeof levelColors]}`} />
              <div className="flex items-center gap-2">
                <Icon size={18} />
                <span className="text-sm text-foreground">{label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Button */}
      <button className="w-full py-4 px-6 bg-primary text-primary-foreground rounded-full font-medium text-lg hover:opacity-90 transition-opacity">
        Modifier
      </button>
    </section>
  );
};

export default CalendarSection;
