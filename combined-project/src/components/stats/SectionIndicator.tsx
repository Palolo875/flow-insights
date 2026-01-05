import React from 'react';

interface SectionIndicatorProps {
  totalSections: number;
  activeSection: number;
  onSectionClick: (index: number) => void;
}

const SectionIndicator: React.FC<SectionIndicatorProps> = ({
  totalSections,
  activeSection,
  onSectionClick,
}) => {
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex gap-2 bg-card/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
      {[...Array(totalSections)].map((_, index) => (
        <button
          key={index}
          onClick={() => onSectionClick(index)}
          className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
            activeSection === index
              ? 'bg-primary w-6'
              : 'bg-muted hover:bg-muted-foreground/50'
          }`}
          aria-label={`Go to section ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default SectionIndicator;