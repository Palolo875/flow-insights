import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

// Creativity - Stylized lightbulb with wave filament
export const CreativityIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 32 32" 
    fill="none" 
    className={className}
  >
    <circle cx="16" cy="13" r="9" fill="hsl(var(--beige-gold-light))" />
    <path 
      d="M16 4C11.03 4 7 8.03 7 13c0 3.32 1.79 6.21 4.47 7.78.54.32.93.87 1.07 1.5l.46 2.22h6l.46-2.22c.14-.63.53-1.18 1.07-1.5C23.21 19.21 25 16.32 25 13c0-4.97-4.03-9-9-9z" 
      stroke="hsl(var(--soft-black))" 
      strokeWidth="2" 
      strokeLinecap="round"
      fill="none"
    />
    <path 
      d="M12 28h8" 
      stroke="hsl(var(--soft-black))" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
    <path 
      d="M12 11c0 2 2 3 4 1s4 -1 4 1" 
      stroke="hsl(var(--soft-black))" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
  </svg>
);

// Learning - Open book with fluid pages
export const LearningIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 32 32" 
    fill="none" 
    className={className}
  >
    <path 
      d="M16 8C12 6 8 6 4 8v16c4-2 8-2 12 0" 
      fill="hsl(var(--beige-gold-light))"
    />
    <path 
      d="M16 8C20 6 24 6 28 8v16c-4-2-8-2-12 0" 
      fill="hsl(var(--cream-dark))"
    />
    <path 
      d="M16 8C12 6 8 6 4 8v16c4-2 8-2 12 0m0-16c4-2 8-2 12 0v16c-4-2-8-2-12 0" 
      stroke="hsl(var(--soft-black))" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M16 8v16" 
      stroke="hsl(var(--soft-black))" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
  </svg>
);

// Admin - Stylized checkbox
export const AdminIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 32 32" 
    fill="none" 
    className={className}
  >
    <rect 
      x="6" 
      y="6" 
      width="20" 
      height="20" 
      rx="6" 
      fill="hsl(var(--beige-gold-light))"
    />
    <rect 
      x="6" 
      y="6" 
      width="20" 
      height="20" 
      rx="6" 
      stroke="hsl(var(--soft-black))" 
      strokeWidth="2"
    />
    <path 
      d="M11 16l4 4 6-8" 
      stroke="hsl(var(--soft-black))" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

// Deep Work - Concentric circles with center point
export const DeepWorkIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 32 32" 
    fill="none" 
    className={className}
  >
    <circle cx="16" cy="16" r="12" fill="hsl(var(--beige-gold-light))" />
    <circle 
      cx="16" 
      cy="16" 
      r="12" 
      stroke="hsl(var(--soft-black))" 
      strokeWidth="2"
    />
    <circle 
      cx="16" 
      cy="16" 
      r="7" 
      stroke="hsl(var(--soft-black))" 
      strokeWidth="2"
    />
    <circle 
      cx="16" 
      cy="16" 
      r="3" 
      fill="hsl(var(--soft-black))"
    />
  </svg>
);

// High Energy - Soft rounded lightning
export const HighEnergyIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 32 32" 
    fill="none" 
    className={className}
  >
    <path 
      d="M18 4L8 18h7l-2 10 10-14h-7l2-10z" 
      fill="hsl(var(--beige-gold-light))"
      stroke="hsl(var(--soft-black))" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

// Rest - Organic crescent moon
export const RestIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 32 32" 
    fill="none" 
    className={className}
  >
    <path 
      d="M26 18A10 10 0 1114 6a8 8 0 0012 12z" 
      fill="hsl(var(--beige-gold-light))"
      stroke="hsl(var(--soft-black))" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

// Flow - Abstract fluid flame
export const FlowIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 32 32" 
    fill="none" 
    className={className}
  >
    <path 
      d="M16 4c0 6-8 10-8 16a8 8 0 0016 0c0-6-8-10-8-16z" 
      fill="hsl(var(--beige-gold-light))"
    />
    <path 
      d="M16 4c0 6-8 10-8 16a8 8 0 0016 0c0-6-8-10-8-16z" 
      stroke="hsl(var(--soft-black))" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M16 14c0 3-3 5-3 8a3 3 0 006 0c0-3-3-5-3-8z" 
      fill="hsl(var(--soft-black))"
    />
  </svg>
);

// Morning - Minimalist rising sun
export const MorningIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 32 32" 
    fill="none" 
    className={className}
  >
    <path 
      d="M4 22h24" 
      stroke="hsl(var(--soft-black))" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
    <path 
      d="M8 22a8 8 0 0116 0" 
      fill="hsl(var(--beige-gold-light))"
      stroke="hsl(var(--soft-black))" 
      strokeWidth="2"
    />
    <path d="M16 6v4" stroke="hsl(var(--soft-black))" strokeWidth="2" strokeLinecap="round" />
    <path d="M24 10l-3 3" stroke="hsl(var(--soft-black))" strokeWidth="2" strokeLinecap="round" />
    <path d="M8 10l3 3" stroke="hsl(var(--soft-black))" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Afternoon - Descending half sun
export const AfternoonIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 32 32" 
    fill="none" 
    className={className}
  >
    <path 
      d="M4 20h24" 
      stroke="hsl(var(--soft-black))" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
    <circle 
      cx="16" 
      cy="20" 
      r="8" 
      fill="hsl(var(--beige-gold-light))"
      stroke="hsl(var(--soft-black))" 
      strokeWidth="2"
    />
    <rect x="4" y="20" width="24" height="8" fill="hsl(var(--cream))" />
    <path 
      d="M4 20h24" 
      stroke="hsl(var(--soft-black))" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
  </svg>
);

// Social - Two overlapping people shapes
export const SocialIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 32 32" 
    fill="none" 
    className={className}
  >
    <circle cx="12" cy="10" r="4" fill="hsl(var(--beige-gold-light))" stroke="hsl(var(--soft-black))" strokeWidth="2" />
    <path 
      d="M4 26c0-4.42 3.58-8 8-8s8 3.58 8 8" 
      stroke="hsl(var(--soft-black))" 
      strokeWidth="2" 
      strokeLinecap="round"
      fill="hsl(var(--beige-gold-light))"
    />
    <circle cx="22" cy="10" r="4" fill="hsl(var(--cream-dark))" stroke="hsl(var(--soft-black))" strokeWidth="2" />
    <path 
      d="M18 26c0-4.42 2.69-8 6-8s6 3.58 6 8" 
      stroke="hsl(var(--soft-black))" 
      strokeWidth="2" 
      strokeLinecap="round"
      fill="hsl(var(--cream-dark))"
    />
  </svg>
);

// Quick Tasks - Fast forward arrows
export const QuickTasksIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 32 32" 
    fill="none" 
    className={className}
  >
    <path 
      d="M6 8l8 8-8 8" 
      stroke="hsl(var(--soft-black))" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M18 8l8 8-8 8" 
      stroke="hsl(var(--soft-black))" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

// Calendar - Stylized calendar icon
export const CalendarIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 32 32" 
    fill="none" 
    className={className}
  >
    <rect x="4" y="6" width="24" height="22" rx="4" fill="hsl(var(--beige-gold-light))" stroke="hsl(var(--soft-black))" strokeWidth="2" />
    <path d="M4 12h24" stroke="hsl(var(--soft-black))" strokeWidth="2" />
    <path d="M10 4v4" stroke="hsl(var(--soft-black))" strokeWidth="2" strokeLinecap="round" />
    <path d="M22 4v4" stroke="hsl(var(--soft-black))" strokeWidth="2" strokeLinecap="round" />
    <circle cx="10" cy="18" r="2" fill="hsl(var(--soft-black))" />
    <circle cx="16" cy="18" r="2" fill="hsl(var(--soft-black))" />
    <circle cx="22" cy="18" r="2" fill="hsl(var(--soft-black))" />
    <circle cx="10" cy="24" r="2" fill="hsl(var(--soft-black))" />
    <circle cx="16" cy="24" r="2" fill="hsl(var(--soft-black))" />
  </svg>
);

// Stats/Chart icon
export const ChartIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 32 32" 
    fill="none" 
    className={className}
  >
    <rect x="4" y="18" width="6" height="10" rx="2" fill="hsl(var(--beige-gold-light))" stroke="hsl(var(--soft-black))" strokeWidth="2" />
    <rect x="13" y="10" width="6" height="18" rx="2" fill="hsl(var(--beige-gold))" stroke="hsl(var(--soft-black))" strokeWidth="2" />
    <rect x="22" y="4" width="6" height="24" rx="2" fill="hsl(var(--beige-gold-light))" stroke="hsl(var(--soft-black))" strokeWidth="2" />
  </svg>
);

// User/Profile icon
export const UserIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 32 32" 
    fill="none" 
    className={className}
  >
    <circle cx="16" cy="10" r="6" fill="hsl(var(--beige-gold-light))" stroke="hsl(var(--soft-black))" strokeWidth="2" />
    <path 
      d="M6 28c0-5.52 4.48-10 10-10s10 4.48 10 10" 
      stroke="hsl(var(--soft-black))" 
      strokeWidth="2" 
      strokeLinecap="round"
      fill="hsl(var(--beige-gold-light))"
    />
  </svg>
);
