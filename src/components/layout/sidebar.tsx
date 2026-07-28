'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { navigation, settingsNavigation, type NavigationGroup } from '@/config/navigation';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { ChevronDown, ChevronRight, Sparkles } from 'lucide-react';

interface SidebarProps {
  className?: string;
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
}

function SidebarGroup({ group, collapsed }: { group: NavigationGroup; collapsed?: boolean }) {
  const pathname = usePathname();
  const isActive = group.items.some((item) => pathname === item.href);
  const [isOpen, setIsOpen] = React.useState(group.defaultOpen || isActive);

  React.useEffect(() => {
    if (isActive && !isOpen) {
      setIsOpen(true);
    }
  }, [isActive, pathname]);

  const Icon = group.icon;

  if (collapsed) {
    return (
      <div className="group relative">
        <button
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-lg transition-colors',
            'hover:bg-slate-800/50',
            isActive && 'bg-slate-800 text-white'
          )}
        >
          <Icon className="h-5 w-5" />
        </button>
        <div className="absolute left-full top-0 z-50 ml-2 hidden min-w-[200px] rounded-lg border border-slate-800 bg-slate-900 p-2 shadow-xl group-hover:block">
          <div className="mb-2 px-2 text-xs font-medium text-slate-400">{group.title}</div>
          {group.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors',
                'hover:bg-slate-800 hover:text-white',
                pathname === item.href ? 'bg-slate-800 text-white' : 'text-slate-400'
              )}
            >
              {item.title}
              {item.badge && (
                <Badge
                  variant={item.badgeVariant || 'default'}
                  className="ml-auto h-5 px-1.5 text-[10px]"
                >
                  {item.badge}
                </Badge>
              )}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
          'hover:bg-slate-800/50',
          isActive ? 'text-white' : 'text-slate-400 hover:text-white'
        )}
      >
        <Icon className="h-4 w-4 shrink-0" />
        <span className="flex-1 truncate text-left">{group.title}</span>
        {isOpen ? (
          <ChevronDown className="h-4 w-4 shrink-0 text-slate-500" />
        ) : (
          <ChevronRight className="h-4 w-4 shrink-0 text-slate-500" />
        )}
      </button>
      {isOpen && (
        <div className="ml-4 space-y-0.5 border-l border-slate-800 pl-3">
          {group.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors',
                'hover:bg-slate-800/50 hover:text-white',
                pathname === item.href
                  ? 'bg-gradient-to-r from-blue-600/20 to-cyan-600/20 text-white'
                  : 'text-slate-500'
              )}
            >
              <span className="flex-1 truncate">{item.title}</span>
              {item.badge && (
                <Badge
                  variant={item.badgeVariant || 'default'}
                  className="h-5 px-1.5 text-[10px]"
                >
                  {item.badge}
                </Badge>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function Sidebar({ className, collapsed = false, onCollapse }: SidebarProps) {
  return (
    <aside
      className={cn(
        'fixed flex h-[calc(100vh-4rem)] flex-col border-r border-slate-800 bg-slate-950 transition-all duration-300',
        collapsed ? 'w-16' : 'w-64',
        className
      )}
    >
      {/* AI Copilot Quick Access */}
      {!collapsed && (
        <div className="border-b border-slate-800 p-4">
          <button className="flex w-full items-center gap-3 rounded-lg bg-gradient-to-r from-blue-600/20 to-cyan-600/20 px-3 py-2.5 text-sm font-medium text-white transition-colors hover:from-blue-600/30 hover:to-cyan-600/30">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1 text-left">
              <div className="font-medium">AI CFO</div>
              <div className="text-xs text-slate-400">Ask anything...</div>
            </div>
            <kbd className="hidden rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-400 sm:inline">
              ⌘K
            </kbd>
          </button>
        </div>
      )}

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {navigation.map((group) => (
            <SidebarGroup key={group.title} group={group} collapsed={collapsed} />
          ))}
        </nav>

        <Separator className="my-4" />

        {/* Settings */}
        <SidebarGroup group={settingsNavigation} collapsed={collapsed} />
      </ScrollArea>

      {/* Collapse Toggle */}
      <div className="border-t border-slate-800 p-3">
        <button
          onClick={() => onCollapse?.(!collapsed)}
          className={cn(
            'flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-400 transition-colors hover:bg-slate-800 hover:text-white',
            collapsed && 'justify-center'
          )}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronRight className="h-4 w-4 rotate-180" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
