import React, { useRef, useState, useEffect } from 'react';
import SectionIndicator from '@/components/stats/SectionIndicator';
import FocusSection from '@/components/stats/FocusSection';
import EnergySection from '@/components/stats/EnergySection';
import CalendarSection from '@/components/stats/CalendarSection';

const sections = [
  { id: 'focus', component: FocusSection },
  { id: 'energy', component: EnergySection },
  { id: 'calendar', component: CalendarSection },
];

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const sectionHeight = window.innerHeight;
      const newActiveSection = Math.round(scrollTop / sectionHeight);
      setActiveSection(Math.min(newActiveSection, sections.length - 1));
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (index: number) => {
    containerRef.current?.scrollTo({
      top: index * window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <div className="h-screen w-full bg-background overflow-hidden">
      <SectionIndicator
        totalSections={sections.length}
        activeSection={activeSection}
        onSectionClick={scrollToSection}
      />
      
      <div
        ref={containerRef}
        className="h-full overflow-y-auto snap-y snap-mandatory scrollbar-hide"
      >
        {sections.map(({ id, component: Component }) => (
          <div key={id} className="snap-start h-screen">
            <Component />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
