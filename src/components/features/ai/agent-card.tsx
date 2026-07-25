'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Bot,
  Play,
  Pause,
  Square,
  Settings,
  MoreHorizontal,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Zap,
  TrendingUp,
  Shield,
  type LucideIcon,
} from 'lucide-react';

export type AgentStatus = 'idle' | 'running' | 'paused' | 'completed' | 'error';

export interface AgentTask {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress?: number;
}

export interface AgentCardProps {
  id: string;
  name: string;
  description: string;
  status: AgentStatus;
  icon?: LucideIcon;
  iconColor?: string;
  category?: string;
  lastRun?: Date;
  nextRun?: Date;
  metrics?: {
    label: string;
    value: string | number;
  }[];
  tasks?: AgentTask[];
  progress?: number;
  onStart?: () => void;
  onPause?: () => void;
  onStop?: () => void;
  onConfigure?: () => void;
  className?: string;
  compact?: boolean;
}

const statusConfig: Record<AgentStatus, { color: string; bgColor: string; label: string }> = {
  idle: { color: 'text-slate-400', bgColor: 'bg-slate-500/10', label: 'Idle' },
  running: { color: 'text-green-400', bgColor: 'bg-green-500/10', label: 'Running' },
  paused: { color: 'text-yellow-400', bgColor: 'bg-yellow-500/10', label: 'Paused' },
  completed: { color: 'text-blue-400', bgColor: 'bg-blue-500/10', label: 'Completed' },
  error: { color: 'text-red-400', bgColor: 'bg-red-500/10', label: 'Error' },
};

export function AgentCard({
  id,
  name,
  description,
  status,
  icon: Icon = Bot,
  iconColor = 'from-blue-500 to-cyan-500',
  category,
  lastRun,
  nextRun,
  metrics,
  tasks,
  progress,
  onStart,
  onPause,
  onStop,
  onConfigure,
  className,
  compact = false,
}: AgentCardProps) {
  const statusInfo = statusConfig[status];

  if (compact) {
    return (
      <Card
        className={cn(
          'border-slate-800 bg-slate-900/50 p-4 transition-all hover:border-slate-700',
          className
        )}
      >
        <div className="flex items-center gap-4">
          <div
            className={cn(
              'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br',
              iconColor
            )}
          >
            <Icon className="h-5 w-5 text-white" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h4 className="truncate font-medium text-white">{name}</h4>
              <Badge
                className={cn(
                  'shrink-0 border-0 text-[10px]',
                  statusInfo.bgColor,
                  statusInfo.color
                )}
              >
                {status === 'running' && (
                  <span className="mr-1 h-1.5 w-1.5 animate-pulse rounded-full bg-current" />
                )}
                {statusInfo.label}
              </Badge>
            </div>
            <p className="truncate text-xs text-slate-500">{description}</p>
          </div>

          <div className="flex items-center gap-1">
            {status === 'idle' && onStart && (
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onStart}>
                <Play className="h-4 w-4 text-green-400" />
              </Button>
            )}
            {status === 'running' && onPause && (
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onPause}>
                <Pause className="h-4 w-4 text-yellow-400" />
              </Button>
            )}
            {(status === 'running' || status === 'paused') && onStop && (
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onStop}>
                <Square className="h-4 w-4 text-red-400" />
              </Button>
            )}
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4 text-slate-400" />
            </Button>
          </div>
        </div>

        {status === 'running' && progress !== undefined && (
          <div className="mt-3">
            <Progress value={progress} size="sm" />
          </div>
        )}
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        'overflow-hidden border-slate-800 bg-slate-900/50 transition-all hover:border-slate-700',
        className
      )}
    >
      {/* Header */}
      <div className="border-b border-slate-800 p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div
              className={cn(
                'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br',
                iconColor
              )}
            >
              <Icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-white">{name}</h3>
                {category && (
                  <Badge variant="outline" className="text-[10px]">
                    {category}
                  </Badge>
                )}
              </div>
              <p className="mt-1 text-sm text-slate-400">{description}</p>
            </div>
          </div>

          <Badge
            className={cn('border-0', statusInfo.bgColor, statusInfo.color)}
          >
            {status === 'running' && (
              <span className="mr-1.5 h-2 w-2 animate-pulse rounded-full bg-current" />
            )}
            {statusInfo.label}
          </Badge>
        </div>
      </div>

      {/* Progress */}
      {status === 'running' && progress !== undefined && (
        <div className="border-b border-slate-800 px-4 py-3">
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="text-slate-400">Progress</span>
            <span className="font-medium text-white">{progress}%</span>
          </div>
          <Progress value={progress} />
        </div>
      )}

      {/* Tasks */}
      {tasks && tasks.length > 0 && (
        <div className="border-b border-slate-800 p-4">
          <h4 className="mb-3 text-xs font-medium text-slate-400">Tasks</h4>
          <div className="space-y-2">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center gap-3">
                {task.status === 'completed' ? (
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                ) : task.status === 'running' ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
                ) : task.status === 'failed' ? (
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                ) : (
                  <Clock className="h-4 w-4 text-slate-500" />
                )}
                <span
                  className={cn(
                    'flex-1 text-sm',
                    task.status === 'completed'
                      ? 'text-slate-400 line-through'
                      : task.status === 'running'
                      ? 'text-white'
                      : 'text-slate-500'
                  )}
                >
                  {task.name}
                </span>
                {task.progress !== undefined && task.status === 'running' && (
                  <span className="text-xs text-blue-400">{task.progress}%</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Metrics */}
      {metrics && metrics.length > 0 && (
        <div className="border-b border-slate-800 p-4">
          <div className="grid grid-cols-2 gap-4">
            {metrics.map((metric, i) => (
              <div key={i}>
                <p className="text-xs text-slate-500">{metric.label}</p>
                <p className="mt-1 text-sm font-medium text-white">{metric.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4 text-xs text-slate-500">
          {lastRun && (
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Last: {lastRun.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          )}
          {nextRun && (
            <div className="flex items-center gap-1">
              <Zap className="h-3 w-3" />
              Next: {nextRun.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {onConfigure && (
            <Button variant="ghost" size="sm" onClick={onConfigure}>
              <Settings className="h-4 w-4" />
            </Button>
          )}
          {status === 'idle' && onStart && (
            <Button size="sm" onClick={onStart} className="gap-1">
              <Play className="h-4 w-4" />
              Start
            </Button>
          )}
          {status === 'running' && onPause && (
            <Button variant="outline" size="sm" onClick={onPause} className="gap-1">
              <Pause className="h-4 w-4" />
              Pause
            </Button>
          )}
          {status === 'paused' && onStart && (
            <Button size="sm" onClick={onStart} className="gap-1">
              <Play className="h-4 w-4" />
              Resume
            </Button>
          )}
          {(status === 'running' || status === 'paused') && onStop && (
            <Button variant="ghost" size="sm" onClick={onStop} className="gap-1 text-red-400">
              <Square className="h-4 w-4" />
              Stop
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}

// Agent Grid
export function AgentGrid({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('grid gap-4 sm:grid-cols-2 lg:grid-cols-3', className)}>
      {children}
    </div>
  );
}

export default AgentCard;
