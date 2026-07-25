'use client';

import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Search,
  Bell,
  Settings,
  HelpCircle,
  LogOut,
  User,
  Moon,
  Sun,
  Building2,
  ChevronDown,
  Sparkles,
  Calendar,
  Filter,
} from 'lucide-react';

interface TopNavProps {
  className?: string;
}

// Mock notifications
const notifications = [
  {
    id: '1',
    title: 'Payment Approval Required',
    message: '5 payments totaling ₹2.4 Cr awaiting approval',
    time: '2 min ago',
    type: 'warning',
    unread: true,
  },
  {
    id: '2',
    title: 'Covenant Alert',
    message: 'DSCR covenant approaching threshold (1.32x)',
    time: '15 min ago',
    type: 'danger',
    unread: true,
  },
  {
    id: '3',
    title: 'Cash Forecast Updated',
    message: 'AI has updated the 30-day cash forecast',
    time: '1 hour ago',
    type: 'info',
    unread: false,
  },
  {
    id: '4',
    title: 'Reconciliation Complete',
    message: '98.5% auto-match rate achieved',
    time: '2 hours ago',
    type: 'success',
    unread: false,
  },
];

// Mock entities for global filter
const entities = [
  { id: 'all', name: 'All Entities', count: 25 },
  { id: 'zenith-infra', name: 'Zenith Infrastructure Ltd', count: 12 },
  { id: 'zenith-realty', name: 'Zenith Realty Holdings', count: 8 },
  { id: 'zenith-energy', name: 'Zenith Energy SPV', count: 5 },
];

export function TopNav({ className }: TopNavProps) {
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [selectedEntity, setSelectedEntity] = React.useState(entities[0]);
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header
      className={cn(
        'sticky top-0 z-50 flex h-16 items-center justify-between border-b border-slate-800 bg-slate-950/95 px-4 backdrop-blur-sm lg:px-6',
        className
      )}
    >
      {/* Logo & Brand */}
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
            <Building2 className="h-5 w-5 text-white" />
          </div>
          <div className="hidden lg:block">
            <span className="text-lg font-bold text-white">ZenBank</span>
            <span className="ml-2 text-xs text-slate-500">Finance & Treasury</span>
          </div>
        </Link>

        {/* Global Entity Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="ml-4 gap-2">
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">{selectedEntity.name}</span>
              <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-[10px]">
                {selectedEntity.count}
              </Badge>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-64">
            {entities.map((entity) => (
              <DropdownMenuItem key={entity.id} onClick={() => setSelectedEntity(entity)}>
                <span className="flex-1">{entity.name}</span>
                <Badge variant="secondary" className="ml-2">
                  {entity.count}
                </Badge>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Center - Search */}
      <div className="hidden flex-1 justify-center px-4 lg:flex">
        <button
          onClick={() => setSearchOpen(true)}
          className="flex h-10 w-full max-w-md items-center gap-3 rounded-lg border border-slate-800 bg-slate-900/50 px-4 text-sm text-slate-400 transition-colors hover:border-slate-700 hover:bg-slate-900"
        >
          <Search className="h-4 w-4" />
          <span className="flex-1 text-left">Search transactions, reports, commands...</span>
          <div className="flex items-center gap-1">
            <kbd className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-400">⌘</kbd>
            <kbd className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-400">K</kbd>
          </div>
        </button>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2">
        {/* AI Assistant Quick Access */}
        <Button
          variant="ghost"
          size="icon"
          className="hidden gap-2 text-blue-400 hover:bg-blue-600/10 hover:text-blue-300 sm:flex"
        >
          <Sparkles className="h-5 w-5" />
        </Button>

        {/* Date Display */}
        <div className="mr-2 hidden items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/50 px-3 py-1.5 lg:flex">
          <Calendar className="h-4 w-4 text-slate-400" />
          <span className="text-sm text-slate-300">
            {new Date().toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </span>
        </div>

        {/* Mobile Search */}
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSearchOpen(true)}>
          <Search className="h-5 w-5" />
        </Button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                  {unreadCount}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
              <span className="font-medium text-white">Notifications</span>
              <Badge variant="secondary">{unreadCount} new</Badge>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    'border-b border-slate-800 px-4 py-3 transition-colors hover:bg-slate-800/50',
                    notification.unread && 'bg-slate-900/50'
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        'mt-1 h-2 w-2 rounded-full',
                        notification.type === 'warning' && 'bg-yellow-500',
                        notification.type === 'danger' && 'bg-red-500',
                        notification.type === 'info' && 'bg-blue-500',
                        notification.type === 'success' && 'bg-green-500'
                      )}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">{notification.title}</p>
                      <p className="text-xs text-slate-400">{notification.message}</p>
                      <p className="mt-1 text-xs text-slate-500">{notification.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-slate-800 p-2">
              <Button variant="ghost" size="sm" className="w-full">
                View All Notifications
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Help */}
        <Button variant="ghost" size="icon" className="hidden sm:flex">
          <HelpCircle className="h-5 w-5" />
        </Button>

        {/* Settings */}
        <Button variant="ghost" size="icon" className="hidden sm:flex">
          <Settings className="h-5 w-5" />
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-slate-800">
              <Avatar
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop"
                alt="User"
                fallback="VK"
                size="sm"
              />
              <div className="hidden text-left lg:block">
                <p className="text-sm font-medium text-white">Vikram Kumar</p>
                <p className="text-xs text-slate-400">CFO</p>
              </div>
              <ChevronDown className="hidden h-4 w-4 text-slate-400 lg:block" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="border-b border-slate-800 px-4 py-3">
              <p className="font-medium text-white">Vikram Kumar</p>
              <p className="text-sm text-slate-400">vikram@zenithinfra.com</p>
            </div>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Moon className="mr-2 h-4 w-4" />
              Dark Mode
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-400 focus:text-red-400">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default TopNav;
