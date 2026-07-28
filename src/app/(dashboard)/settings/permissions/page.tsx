'use client';

import * as React from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { PageContainer, Section } from '@/components/layout/dashboard-shell';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Lock,
  Search,
  Filter,
  Download,
  Eye,
  Pencil,
  Trash2,
  Plus,
  Shield,
  Users,
  Building2,
  ChevronDown,
  ChevronRight,
  Check,
  X,
  AlertTriangle,
  Wallet,
  CreditCard,
  TrendingUp,
  FileText,
  Target,
  PieChart,
  Zap,
  Settings,
} from 'lucide-react';

// Permission matrix data
interface Permission {
  id: string;
  name: string;
  description: string;
}

interface Module {
  id: string;
  name: string;
  icon: typeof Wallet;
  permissions: Permission[];
}

const modules: Module[] = [
  {
    id: 'cash-flow',
    name: 'Cash Flow',
    icon: Wallet,
    permissions: [
      { id: 'cf-position', name: 'View Cash Position', description: 'View real-time cash balances' },
      { id: 'cf-forecast', name: 'View Forecasts', description: 'Access cash flow forecasts' },
      { id: 'cf-create-forecast', name: 'Create Forecasts', description: 'Generate new forecasts' },
      { id: 'cf-edit', name: 'Edit Transactions', description: 'Modify cash flow entries' },
      { id: 'cf-delete', name: 'Delete Transactions', description: 'Remove cash flow entries' },
    ],
  },
  {
    id: 'treasury',
    name: 'Treasury',
    icon: Building2,
    permissions: [
      { id: 'tr-view', name: 'View Treasury', description: 'Access treasury dashboard' },
      { id: 'tr-banks', name: 'Manage Banks', description: 'Add/edit bank accounts' },
      { id: 'tr-investments', name: 'Manage Investments', description: 'Create investment entries' },
      { id: 'tr-transfers', name: 'Initiate Transfers', description: 'Create inter-bank transfers' },
      { id: 'tr-approve', name: 'Approve Transfers', description: 'Approve transfer requests' },
    ],
  },
  {
    id: 'payments',
    name: 'Payments',
    icon: CreditCard,
    permissions: [
      { id: 'pay-view', name: 'View Payments', description: 'View payment queue' },
      { id: 'pay-create', name: 'Create Payments', description: 'Initiate new payments' },
      { id: 'pay-edit', name: 'Edit Payments', description: 'Modify payment details' },
      { id: 'pay-approve', name: 'Approve Payments', description: 'Approve pending payments' },
      { id: 'pay-release', name: 'Release Payments', description: 'Execute approved payments' },
      { id: 'pay-cancel', name: 'Cancel Payments', description: 'Cancel pending payments' },
    ],
  },
  {
    id: 'covenants',
    name: 'Covenants',
    icon: Shield,
    permissions: [
      { id: 'cov-view', name: 'View Covenants', description: 'View covenant dashboard' },
      { id: 'cov-manage', name: 'Manage Covenants', description: 'Add/edit covenants' },
      { id: 'cov-alerts', name: 'Configure Alerts', description: 'Set up threshold alerts' },
      { id: 'cov-reports', name: 'Generate Reports', description: 'Create compliance reports' },
    ],
  },
  {
    id: 'collections',
    name: 'Collections',
    icon: TrendingUp,
    permissions: [
      { id: 'col-view', name: 'View Collections', description: 'Access collections dashboard' },
      { id: 'col-manage', name: 'Manage Cases', description: 'Handle collection cases' },
      { id: 'col-ptp', name: 'Record PTP', description: 'Record promise to pay' },
      { id: 'col-escalate', name: 'Escalate Cases', description: 'Escalate overdue accounts' },
    ],
  },
  {
    id: 'reports',
    name: 'Reports & Analytics',
    icon: PieChart,
    permissions: [
      { id: 'rep-view', name: 'View Reports', description: 'Access standard reports' },
      { id: 'rep-create', name: 'Create Reports', description: 'Build custom reports' },
      { id: 'rep-export', name: 'Export Data', description: 'Export to Excel/PDF' },
      { id: 'rep-share', name: 'Share Reports', description: 'Share with other users' },
    ],
  },
  {
    id: 'ai',
    name: 'AI Features',
    icon: Zap,
    permissions: [
      { id: 'ai-chat', name: 'Use AI Chat', description: 'Access AI CFO chat' },
      { id: 'ai-insights', name: 'View Insights', description: 'View AI recommendations' },
      { id: 'ai-agents', name: 'Run Agents', description: 'Execute AI agents' },
      { id: 'ai-config', name: 'Configure AI', description: 'Adjust AI settings' },
    ],
  },
  {
    id: 'settings',
    name: 'Settings',
    icon: Settings,
    permissions: [
      { id: 'set-users', name: 'Manage Users', description: 'Add/edit users' },
      { id: 'set-roles', name: 'Manage Roles', description: 'Configure roles' },
      { id: 'set-workspace', name: 'Workspace Settings', description: 'Edit organization settings' },
      { id: 'set-integrations', name: 'Integrations', description: 'Manage external integrations' },
    ],
  },
];

// Mock roles for permission matrix
const roles = [
  { id: 'cfo', name: 'CFO', color: 'text-purple-400' },
  { id: 'controller', name: 'Controller', color: 'text-blue-400' },
  { id: 'treasury', name: 'Treasury', color: 'text-green-400' },
  { id: 'accounts', name: 'Accounts', color: 'text-yellow-400' },
  { id: 'analyst', name: 'Analyst', color: 'text-cyan-400' },
  { id: 'viewer', name: 'Viewer', color: 'text-slate-400' },
];

// Generate permission matrix (mock)
const generateMatrix = () => {
  const matrix: Record<string, Record<string, boolean>> = {};
  modules.forEach((module) => {
    module.permissions.forEach((perm) => {
      matrix[perm.id] = {
        cfo: true,
        controller: perm.id.includes('view') || perm.id.includes('create') || perm.id.includes('edit'),
        treasury: module.id === 'treasury' || module.id === 'cash-flow' || perm.id.includes('view'),
        accounts: module.id === 'payments' || module.id === 'collections' || perm.id.includes('view'),
        analyst: perm.id.includes('view') || module.id === 'reports',
        viewer: perm.id.includes('view'),
      };
    });
  });
  return matrix;
};

const permissionMatrix = generateMatrix();

export default function PermissionsPage() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [expandedModules, setExpandedModules] = React.useState<string[]>(modules.map((m) => m.id));
  const [matrix, setMatrix] = React.useState(permissionMatrix);

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const togglePermission = (permId: string, roleId: string) => {
    setMatrix((prev) => ({
      ...prev,
      [permId]: {
        ...prev[permId],
        [roleId]: !prev[permId][roleId],
      },
    }));
  };

  const filteredModules = modules.filter((module) =>
    module.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    module.permissions.some(
      (p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <PageContainer>
      <PageHeader
        title="Permission Matrix"
        description="Configure granular permissions for each role"
        breadcrumbs={[
          { label: 'Settings', href: '/settings' },
          { label: 'Permissions' },
        ]}
      />

      {/* Toolbar */}
      <Section className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <Input
                placeholder="Search permissions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-9"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export Matrix
            </Button>
            <Button size="sm" className="gap-2 bg-gradient-to-r from-blue-600 to-cyan-600">
              Save Changes
            </Button>
          </div>
        </div>
      </Section>

      {/* Legend */}
      <Section className="mb-6">
        <Card className="border-slate-800 bg-slate-900/50 p-4">
          <div className="flex flex-wrap items-center gap-6">
            <span className="text-sm text-slate-400">Roles:</span>
            {roles.map((role) => (
              <div key={role.id} className="flex items-center gap-2">
                <div className={`h-3 w-3 rounded-full bg-current ${role.color}`} />
                <span className="text-sm text-white">{role.name}</span>
              </div>
            ))}
          </div>
        </Card>
      </Section>

      {/* Permission Matrix */}
      <Card className="border-slate-800 bg-slate-900/50 overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 z-10 border-b border-slate-800 bg-slate-900">
          <div className="flex">
            <div className="w-80 shrink-0 border-r border-slate-800 p-4">
              <span className="text-sm font-medium text-slate-400">Permission</span>
            </div>
            <div className="flex flex-1">
              {roles.map((role) => (
                <div
                  key={role.id}
                  className="flex-1 min-w-[80px] border-r border-slate-800 p-4 text-center last:border-r-0"
                >
                  <span className={`text-sm font-medium ${role.color}`}>{role.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modules */}
        <div>
          {filteredModules.map((module) => (
            <div key={module.id}>
              {/* Module Header */}
              <button
                className="flex w-full items-center border-b border-slate-800 bg-slate-800/50 p-4 text-left hover:bg-slate-800"
                onClick={() => toggleModule(module.id)}
              >
                <div className="flex items-center gap-3">
                  {expandedModules.includes(module.id) ? (
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  )}
                  <module.icon className="h-5 w-5 text-blue-400" />
                  <span className="font-medium text-white">{module.name}</span>
                  <Badge variant="outline" className="text-[10px]">
                    {module.permissions.length} permissions
                  </Badge>
                </div>
              </button>

              {/* Permissions */}
              {expandedModules.includes(module.id) && (
                <div className="divide-y divide-slate-800/50">
                  {module.permissions.map((perm) => (
                    <div key={perm.id} className="flex hover:bg-slate-800/30">
                      <div className="w-80 shrink-0 border-r border-slate-800/50 p-4 pl-12">
                        <p className="text-sm text-white">{perm.name}</p>
                        <p className="text-xs text-slate-500">{perm.description}</p>
                      </div>
                      <div className="flex flex-1">
                        {roles.map((role) => (
                          <div
                            key={role.id}
                            className="flex flex-1 min-w-[80px] items-center justify-center border-r border-slate-800/50 p-4 last:border-r-0"
                          >
                            <Checkbox
                              checked={matrix[perm.id]?.[role.id] ?? false}
                              onChange={() => togglePermission(perm.id, role.id)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredModules.length === 0 && (
          <div className="p-12 text-center">
            <Lock className="mx-auto h-12 w-12 text-slate-700" />
            <h4 className="mt-4 font-medium text-white">No permissions found</h4>
            <p className="mt-2 text-sm text-slate-400">Try a different search term</p>
          </div>
        )}
      </Card>

      {/* Warning */}
      <Section className="mt-6">
        <Card className="border-yellow-500/20 bg-yellow-500/5 p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 shrink-0 text-yellow-400" />
            <div>
              <h4 className="font-medium text-yellow-400">Permission Changes</h4>
              <p className="mt-1 text-sm text-slate-400">
                Changes to permissions will take effect immediately for all users with the affected roles.
                Users may need to refresh their browser to see the updated permissions.
              </p>
            </div>
          </div>
        </Card>
      </Section>
    </PageContainer>
  );
}
