'use client';

import * as React from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { PageContainer, Section } from '@/components/layout/dashboard-shell';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Shield,
  Plus,
  Search,
  Edit,
  Trash2,
  Copy,
  Users,
  Lock,
  Unlock,
  ChevronDown,
  ChevronRight,
  Check,
  Eye,
  Pencil,
  Trash,
  Settings,
} from 'lucide-react';

// Mock roles data
interface Role {
  id: string;
  name: string;
  description: string;
  type: 'system' | 'custom';
  users: number;
  permissions: number;
  createdAt: Date;
  isEditable: boolean;
}

const roles: Role[] = [
  {
    id: '1',
    name: 'CFO',
    description: 'Full access to all modules and administrative functions',
    type: 'system',
    users: 1,
    permissions: 156,
    createdAt: new Date('2023-01-01'),
    isEditable: false,
  },
  {
    id: '2',
    name: 'Finance Controller',
    description: 'Access to finance, budgeting, and reporting modules',
    type: 'system',
    users: 2,
    permissions: 98,
    createdAt: new Date('2023-01-01'),
    isEditable: false,
  },
  {
    id: '3',
    name: 'Treasury Manager',
    description: 'Full access to treasury, cash management, and investments',
    type: 'system',
    users: 2,
    permissions: 78,
    createdAt: new Date('2023-01-01'),
    isEditable: false,
  },
  {
    id: '4',
    name: 'Accounts Manager',
    description: 'Access to accounts payable, receivable, and reconciliation',
    type: 'custom',
    users: 3,
    permissions: 54,
    createdAt: new Date('2023-06-15'),
    isEditable: true,
  },
  {
    id: '5',
    name: 'Risk Analyst',
    description: 'Read access to risk modules and covenant monitoring',
    type: 'custom',
    users: 2,
    permissions: 32,
    createdAt: new Date('2023-08-20'),
    isEditable: true,
  },
  {
    id: '6',
    name: 'Collections Executive',
    description: 'Access to collections module and customer data',
    type: 'custom',
    users: 4,
    permissions: 28,
    createdAt: new Date('2023-09-10'),
    isEditable: true,
  },
  {
    id: '7',
    name: 'Viewer',
    description: 'Read-only access to dashboards and reports',
    type: 'system',
    users: 5,
    permissions: 18,
    createdAt: new Date('2023-01-01'),
    isEditable: false,
  },
];

// Module permissions
const modulePermissions = [
  {
    id: 'executive',
    name: 'Executive Intelligence',
    permissions: [
      { id: 'exec-view', name: 'View Dashboard', granted: true },
      { id: 'exec-export', name: 'Export Reports', granted: true },
      { id: 'exec-ai', name: 'Use AI Features', granted: true },
    ],
  },
  {
    id: 'cash-flow',
    name: 'Cash Flow',
    permissions: [
      { id: 'cf-view', name: 'View Cash Position', granted: true },
      { id: 'cf-forecast', name: 'Generate Forecasts', granted: true },
      { id: 'cf-edit', name: 'Edit Transactions', granted: false },
      { id: 'cf-approve', name: 'Approve Transactions', granted: false },
    ],
  },
  {
    id: 'treasury',
    name: 'Treasury',
    permissions: [
      { id: 'tr-view', name: 'View Treasury', granted: true },
      { id: 'tr-banks', name: 'Manage Bank Accounts', granted: false },
      { id: 'tr-investments', name: 'Manage Investments', granted: false },
    ],
  },
  {
    id: 'payments',
    name: 'Payments',
    permissions: [
      { id: 'pay-view', name: 'View Payments', granted: true },
      { id: 'pay-create', name: 'Create Payments', granted: false },
      { id: 'pay-approve', name: 'Approve Payments', granted: false },
      { id: 'pay-release', name: 'Release Payments', granted: false },
    ],
  },
  {
    id: 'covenants',
    name: 'Covenants',
    permissions: [
      { id: 'cov-view', name: 'View Covenants', granted: true },
      { id: 'cov-manage', name: 'Manage Covenants', granted: false },
      { id: 'cov-alerts', name: 'Configure Alerts', granted: false },
    ],
  },
];

export default function RolesPage() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedRole, setSelectedRole] = React.useState<Role | null>(null);
  const [expandedModules, setExpandedModules] = React.useState<string[]>(['executive', 'cash-flow']);

  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  return (
    <PageContainer>
      <PageHeader
        title="Role Management"
        description="Define roles and their permissions"
        breadcrumbs={[
          { label: 'Settings', href: '/settings' },
          { label: 'Roles' },
        ]}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Roles List */}
        <div>
          <Section className="mb-4">
            <div className="flex items-center justify-between">
              <div className="relative flex-1 mr-4">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <Input
                  placeholder="Search roles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button size="sm" className="gap-2 bg-gradient-to-r from-blue-600 to-cyan-600">
                <Plus className="h-4 w-4" />
                Create Role
              </Button>
            </div>
          </Section>

          <div className="space-y-3">
            {filteredRoles.map((role) => (
              <Card
                key={role.id}
                className={`border-slate-800 bg-slate-900/50 p-4 cursor-pointer transition-all hover:border-slate-700 ${
                  selectedRole?.id === role.id ? 'border-blue-500 bg-blue-500/5' : ''
                }`}
                onClick={() => setSelectedRole(role)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                      role.type === 'system' ? 'bg-purple-500/10' : 'bg-blue-500/10'
                    }`}>
                      <Shield className={`h-5 w-5 ${
                        role.type === 'system' ? 'text-purple-400' : 'text-blue-400'
                      }`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-white">{role.name}</h4>
                        <Badge variant={role.type === 'system' ? 'secondary' : 'outline'} className="text-[10px]">
                          {role.type}
                        </Badge>
                      </div>
                      <p className="mt-1 text-sm text-slate-400">{role.description}</p>
                    </div>
                  </div>
                  {role.isEditable && (
                    <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                      <Edit className="h-4 w-4 text-slate-400" />
                    </Button>
                  )}
                </div>

                <div className="mt-4 flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {role.users} users
                  </span>
                  <span className="flex items-center gap-1">
                    <Lock className="h-3 w-3" />
                    {role.permissions} permissions
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Permissions Editor */}
        <div>
          <Card className="border-slate-800 bg-slate-900/50 sticky top-6">
            <div className="border-b border-slate-800 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-white">
                    {selectedRole ? selectedRole.name : 'Select a Role'}
                  </h3>
                  <p className="text-sm text-slate-400">
                    {selectedRole ? 'Configure permissions' : 'Click on a role to view permissions'}
                  </p>
                </div>
                {selectedRole && selectedRole.isEditable && (
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Copy className="mr-2 h-4 w-4" />
                      Duplicate
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-400">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {selectedRole ? (
              <div className="p-4">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm text-slate-400">Module Permissions</span>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="flex items-center gap-1 text-slate-500">
                      <Eye className="h-3 w-3" /> View
                    </span>
                    <span className="flex items-center gap-1 text-slate-500">
                      <Pencil className="h-3 w-3" /> Edit
                    </span>
                    <span className="flex items-center gap-1 text-slate-500">
                      <Trash className="h-3 w-3" /> Delete
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  {modulePermissions.map((module) => (
                    <div key={module.id} className="rounded-lg border border-slate-800">
                      <button
                        className="flex w-full items-center justify-between p-3 text-left"
                        onClick={() => toggleModule(module.id)}
                      >
                        <span className="font-medium text-white">{module.name}</span>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-[10px]">
                            {module.permissions.filter((p) => p.granted).length}/{module.permissions.length}
                          </Badge>
                          {expandedModules.includes(module.id) ? (
                            <ChevronDown className="h-4 w-4 text-slate-400" />
                          ) : (
                            <ChevronRight className="h-4 w-4 text-slate-400" />
                          )}
                        </div>
                      </button>

                      {expandedModules.includes(module.id) && (
                        <div className="border-t border-slate-800 p-3 space-y-2">
                          {module.permissions.map((perm) => (
                            <label
                              key={perm.id}
                              className="flex items-center justify-between py-1 cursor-pointer"
                            >
                              <span className="text-sm text-slate-300">{perm.name}</span>
                              <Checkbox
                                checked={perm.granted}
                                disabled={!selectedRole.isEditable}
                              />
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {selectedRole.isEditable && (
                  <div className="mt-6 flex justify-end gap-3">
                    <Button variant="outline">Cancel</Button>
                    <Button className="bg-gradient-to-r from-blue-600 to-cyan-600">
                      Save Changes
                    </Button>
                  </div>
                )}

                {!selectedRole.isEditable && (
                  <div className="mt-6 rounded-lg bg-yellow-500/10 border border-yellow-500/20 p-3 text-center">
                    <Lock className="mx-auto h-5 w-5 text-yellow-400" />
                    <p className="mt-2 text-sm text-yellow-400">
                      System roles cannot be modified
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      <Copy className="mr-2 h-3 w-3" />
                      Create Custom Copy
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-12 text-center">
                <Shield className="h-12 w-12 text-slate-700" />
                <h4 className="mt-4 font-medium text-white">No Role Selected</h4>
                <p className="mt-2 text-sm text-slate-400">
                  Select a role from the list to view and edit its permissions
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
