'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  BarChart3,
  DollarSign,
  Droplets,
  CreditCard,
  FolderKanban,
  Receipt,
  TrendingUp,
  LineChart,
  Brain,
  CheckSquare,
  Activity,
  type LucideIcon,
} from 'lucide-react';

export interface SectionItem {
  id: string;
  label: string;
  icon?: LucideIcon;
}

export interface SectionNavigationProps {
  sections: SectionItem[];
  activeSection?: string;
  onSectionChange?: (sectionId: string) => void;
  className?: string;
  sticky?: boolean;
}

// Default executive dashboard sections
export const executiveDashboardSections: SectionItem[] = [
  { id: 'overview', label: 'Overview', icon: BarChart3 },
  { id: 'financials', label: 'Financials', icon: DollarSign },
  { id: 'liquidity', label: 'Liquidity', icon: Droplets },
  { id: 'debt', label: 'Debt', icon: CreditCard },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'revenue', label: 'Revenue', icon: Receipt },
  { id: 'risk', label: 'Risk', icon: TrendingUp },
  { id: 'forecast', label: 'Forecast', icon: LineChart },
  { id: 'ai', label: 'AI', icon: Brain },
  { id: 'approvals', label: 'Approvals', icon: CheckSquare },
  { id: 'activity', label: 'Activity', icon: Activity },
];

export function SectionNavigation({
  sections = executiveDashboardSections,
  activeSection,
  onSectionChange,
  className,
  sticky = true,
}: SectionNavigationProps) {
  const [active, setActive] = React.useState(activeSection || sections[0]?.id);
  const navRef = React.useRef<HTMLDivElement>(null);

  const handleSectionClick = (sectionId: string) => {
    setActive(sectionId);
    onSectionChange?.(sectionId);

    // Smooth scroll to section
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 180; // Account for sticky header + nav
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  // Update active section on scroll
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActive(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  return (
    <div
      ref={navRef}
      className={cn(
        'w-full border-b border-slate-800 bg-slate-950/95 backdrop-blur-sm',
        sticky && 'sticky top-16 z-40',
        className
      )}
    >
      <div className="scrollbar-hide flex items-center gap-1 overflow-x-auto px-1 py-2">
        {sections.map((section) => {
          const Icon = section.icon;
          const isActive = active === section.id;

          return (
            <Button
              key={section.id}
              variant="ghost"
              size="sm"
              onClick={() => handleSectionClick(section.id)}
              className={cn(
                'flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all',
                isActive
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              )}
            >
              {Icon && <Icon className="h-4 w-4" />}
              <span>{section.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}

export default SectionNavigation;
