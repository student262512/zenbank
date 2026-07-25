'use client';

import * as React from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { PageContainer, Section } from '@/components/layout/dashboard-shell';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Bookmark,
  Star,
  StarOff,
  Clock,
  MoreHorizontal,
  Edit,
  Trash2,
  Copy,
  Share2,
  Plus,
  Search,
  Filter,
  LayoutGrid,
  List,
  TrendingUp,
  Wallet,
  Shield,
  CreditCard,
  BarChart3,
  PieChart,
  Users,
  Building2,
  Calendar,
} from 'lucide-react';

// Mock saved views
const savedViews = [
  {
    id: '1',
    name: 'Executive Daily Summary',
    description: 'Key metrics for daily executive review',
    module: 'Executive Dashboard',
    icon: BarChart3,
    iconColor: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    isFavorite: true,
    isShared: true,
    lastAccessed: new Date(Date.now() - 1000 * 60 * 30),
    createdBy: 'You',
    filters: {
      entity: 'All Entities',
      dateRange: 'Last 30 Days',
    },
  },
  {
    id: '2',
    name: 'Cash Position by Entity',
    description: 'Entity-wise cash breakdown view',
    module: 'Cash Flow',
    icon: Wallet,
    iconColor: 'text-green-400',
    bgColor: 'bg-green-500/10',
    isFavorite: true,
    isShared: false,
    lastAccessed: new Date(Date.now() - 1000 * 60 * 60 * 2),
    createdBy: 'You',
    filters: {
      entity: 'All Entities',
      dateRange: 'Current Month',
    },
  },
  {
    id: '3',
    name: 'Covenant Risk Monitor',
    description: 'Track covenants approaching threshold',
    module: 'Covenants',
    icon: Shield,
    iconColor: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
    isFavorite: false,
    isShared: true,
    lastAccessed: new Date(Date.now() - 1000 * 60 * 60 * 24),
    createdBy: 'Rajesh Kumar',
    filters: {
      status: 'At Risk',
      dateRange: 'Current Quarter',
    },
  },
  {
    id: '4',
    name: 'Payment Approval Queue',
    description: 'Pending payments awaiting approval',
    module: 'Payments',
    icon: CreditCard,
    iconColor: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    isFavorite: false,
    isShared: false,
    lastAccessed: new Date(Date.now() - 1000 * 60 * 60 * 48),
    createdBy: 'You',
    filters: {
      status: 'Pending Approval',
      priority: 'High',
    },
  },
  {
    id: '5',
    name: 'Weekly Collections Report',
    description: 'Collection performance by customer segment',
    module: 'Collections',
    icon: TrendingUp,
    iconColor: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    isFavorite: true,
    isShared: true,
    lastAccessed: new Date(Date.now() - 1000 * 60 * 60 * 72),
    createdBy: 'Priya Singh',
    filters: {
      segment: 'All Segments',
      dateRange: 'Last Week',
    },
  },
  {
    id: '6',
    name: 'Project Finance Overview',
    description: 'Funding status across all projects',
    module: 'Project Finance',
    icon: Building2,
    iconColor: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
    isFavorite: false,
    isShared: false,
    lastAccessed: new Date(Date.now() - 1000 * 60 * 60 * 96),
    createdBy: 'You',
    filters: {
      project: 'All Projects',
      dateRange: 'FY 2024-25',
    },
  },
];

// Shared with me views
const sharedViews = savedViews.filter(v => v.createdBy !== 'You' && v.isShared);

export default function SavedViewsPage() {
  const [views, setViews] = React.useState(savedViews);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = React.useState<'all' | 'favorites' | 'shared'>('all');

  const toggleFavorite = (id: string) => {
    setViews((prev) =>
      prev.map((v) => (v.id === id ? { ...v, isFavorite: !v.isFavorite } : v))
    );
  };

  const filteredViews = views.filter((v) => {
    const matchesSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.module.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' ||
      (filter === 'favorites' && v.isFavorite) ||
      (filter === 'shared' && v.isShared);
    return matchesSearch && matchesFilter;
  });

  const myViews = filteredViews.filter(v => v.createdBy === 'You');
  const othersViews = filteredViews.filter(v => v.createdBy !== 'You');

  return (
    <PageContainer>
      <PageHeader
        title="Saved Views"
        description="Manage your custom dashboard views and saved filters"
        breadcrumbs={[
          { label: 'Settings', href: '/settings' },
          { label: 'Saved Views' },
        ]}
      />

      {/* Toolbar */}
      <Section className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <Input
                placeholder="Search views..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-9"
              />
            </div>
            <div className="flex items-center rounded-lg border border-slate-800 bg-slate-900/50 p-1">
              <Button
                variant={filter === 'all' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setFilter('all')}
              >
                All
              </Button>
              <Button
                variant={filter === 'favorites' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setFilter('favorites')}
              >
                <Star className="mr-1 h-3 w-3" />
                Favorites
              </Button>
              <Button
                variant={filter === 'shared' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setFilter('shared')}
              >
                <Share2 className="mr-1 h-3 w-3" />
                Shared
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-lg border border-slate-800 bg-slate-900/50 p-1">
              <Button
                variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                size="icon"
                className="h-7 w-7"
                onClick={() => setViewMode('grid')}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                size="icon"
                className="h-7 w-7"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
            <Button className="gap-2 bg-gradient-to-r from-blue-600 to-cyan-600">
              <Plus className="h-4 w-4" />
              Create View
            </Button>
          </div>
        </div>
      </Section>

      {/* My Views */}
      {myViews.length > 0 && (
        <Section className="mb-6">
          <h3 className="mb-4 text-sm font-medium text-slate-400">My Views ({myViews.length})</h3>
          {viewMode === 'grid' ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {myViews.map((view) => (
                <Card
                  key={view.id}
                  className="border-slate-800 bg-slate-900/50 p-4 transition-all hover:border-slate-700"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${view.bgColor}`}>
                        <view.icon className={`h-5 w-5 ${view.iconColor}`} />
                      </div>
                      <div>
                        <h4 className="font-medium text-white">{view.name}</h4>
                        <p className="text-xs text-slate-500">{view.module}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => toggleFavorite(view.id)}
                    >
                      {view.isFavorite ? (
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ) : (
                        <StarOff className="h-4 w-4 text-slate-500" />
                      )}
                    </Button>
                  </div>

                  <p className="mt-3 text-sm text-slate-400">{view.description}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {Object.entries(view.filters).map(([key, value]) => (
                      <Badge key={key} variant="outline" className="text-[10px]">
                        {key}: {value}
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-slate-800 pt-4">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Clock className="h-3 w-3" />
                      {view.lastAccessed.toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      {view.isShared && (
                        <Badge variant="secondary" className="text-[10px]">
                          <Share2 className="mr-1 h-2.5 w-2.5" />
                          Shared
                        </Badge>
                      )}
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <MoreHorizontal className="h-4 w-4 text-slate-400" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-slate-800 bg-slate-900/50 overflow-hidden">
              <div className="divide-y divide-slate-800">
                {myViews.map((view) => (
                  <div
                    key={view.id}
                    className="flex items-center justify-between p-4 hover:bg-slate-800/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${view.bgColor}`}>
                        <view.icon className={`h-5 w-5 ${view.iconColor}`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-white">{view.name}</h4>
                          {view.isFavorite && <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />}
                        </div>
                        <p className="text-xs text-slate-500">{view.module} • {view.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex gap-2">
                        {Object.entries(view.filters).slice(0, 2).map(([key, value]) => (
                          <Badge key={key} variant="outline" className="text-[10px]">
                            {value}
                          </Badge>
                        ))}
                      </div>
                      <span className="text-xs text-slate-500">
                        {view.lastAccessed.toLocaleDateString()}
                      </span>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4 text-slate-400" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Copy className="h-4 w-4 text-slate-400" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash2 className="h-4 w-4 text-red-400" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </Section>
      )}

      {/* Shared Views */}
      {othersViews.length > 0 && (
        <Section>
          <h3 className="mb-4 text-sm font-medium text-slate-400">Shared with Me ({othersViews.length})</h3>
          {viewMode === 'grid' ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {othersViews.map((view) => (
                <Card
                  key={view.id}
                  className="border-slate-800 bg-slate-900/50 p-4 transition-all hover:border-slate-700"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${view.bgColor}`}>
                        <view.icon className={`h-5 w-5 ${view.iconColor}`} />
                      </div>
                      <div>
                        <h4 className="font-medium text-white">{view.name}</h4>
                        <p className="text-xs text-slate-500">{view.module}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => toggleFavorite(view.id)}
                    >
                      {view.isFavorite ? (
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ) : (
                        <StarOff className="h-4 w-4 text-slate-500" />
                      )}
                    </Button>
                  </div>

                  <p className="mt-3 text-sm text-slate-400">{view.description}</p>

                  <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                    <Users className="h-3 w-3" />
                    Shared by {view.createdBy}
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-slate-800 pt-4">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Clock className="h-3 w-3" />
                      {view.lastAccessed.toLocaleDateString()}
                    </div>
                    <Button variant="outline" size="sm">
                      <Copy className="mr-1 h-3 w-3" />
                      Duplicate
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-slate-800 bg-slate-900/50 overflow-hidden">
              <div className="divide-y divide-slate-800">
                {othersViews.map((view) => (
                  <div
                    key={view.id}
                    className="flex items-center justify-between p-4 hover:bg-slate-800/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${view.bgColor}`}>
                        <view.icon className={`h-5 w-5 ${view.iconColor}`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-white">{view.name}</h4>
                          {view.isFavorite && <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />}
                        </div>
                        <p className="text-xs text-slate-500">{view.module} • By {view.createdBy}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-slate-500">
                        {view.lastAccessed.toLocaleDateString()}
                      </span>
                      <Button variant="outline" size="sm">
                        <Copy className="mr-1 h-3 w-3" />
                        Duplicate
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </Section>
      )}

      {filteredViews.length === 0 && (
        <Card className="border-slate-800 bg-slate-900/50 p-12 text-center">
          <Bookmark className="mx-auto h-12 w-12 text-slate-700" />
          <h3 className="mt-4 font-medium text-white">No views found</h3>
          <p className="mt-2 text-sm text-slate-400">
            {searchQuery ? 'Try a different search term' : 'Create your first saved view'}
          </p>
          <Button className="mt-4 gap-2 bg-gradient-to-r from-blue-600 to-cyan-600">
            <Plus className="h-4 w-4" />
            Create View
          </Button>
        </Card>
      )}
    </PageContainer>
  );
}
