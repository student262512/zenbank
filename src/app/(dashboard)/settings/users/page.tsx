'use client';

import * as React from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { PageContainer, Section } from '@/components/layout/dashboard-shell';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { DataTable, type Column } from '@/components/shared/data-table/data-table';
import {
  Users,
  UserPlus,
  Search,
  Filter,
  MoreHorizontal,
  Mail,
  Shield,
  Clock,
  CheckCircle2,
  XCircle,
  Edit,
  Trash2,
  Key,
  Building2,
  Download,
} from 'lucide-react';

// Mock users data
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  entity: string;
  status: 'active' | 'inactive' | 'pending';
  lastLogin: Date | null;
  createdAt: Date;
  avatar?: string;
}

const users: User[] = [
  {
    id: '1',
    name: 'Arun Sharma',
    email: 'arun.sharma@zenithgroup.com',
    role: 'CFO',
    department: 'Finance',
    entity: 'Zenith Infrastructure Ltd',
    status: 'active',
    lastLogin: new Date(Date.now() - 1000 * 60 * 30),
    createdAt: new Date('2023-01-15'),
  },
  {
    id: '2',
    name: 'Priya Singh',
    email: 'priya.singh@zenithgroup.com',
    role: 'Treasury Manager',
    department: 'Treasury',
    entity: 'Zenith Infrastructure Ltd',
    status: 'active',
    lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 2),
    createdAt: new Date('2023-03-22'),
  },
  {
    id: '3',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@zenithgroup.com',
    role: 'Finance Controller',
    department: 'Finance',
    entity: 'Zenith Realty Pvt Ltd',
    status: 'active',
    lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 24),
    createdAt: new Date('2023-04-10'),
  },
  {
    id: '4',
    name: 'Anita Desai',
    email: 'anita.desai@zenithgroup.com',
    role: 'Accounts Manager',
    department: 'Accounts',
    entity: 'Zenith Energy SPV',
    status: 'active',
    lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 48),
    createdAt: new Date('2023-06-05'),
  },
  {
    id: '5',
    name: 'Vikram Patel',
    email: 'vikram.patel@zenithgroup.com',
    role: 'Project Finance Lead',
    department: 'Project Finance',
    entity: 'Zenith Roads Pvt Ltd',
    status: 'inactive',
    lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
    createdAt: new Date('2023-02-18'),
  },
  {
    id: '6',
    name: 'Neha Gupta',
    email: 'neha.gupta@zenithgroup.com',
    role: 'Collections Manager',
    department: 'Collections',
    entity: 'Zenith Infrastructure Ltd',
    status: 'pending',
    lastLogin: null,
    createdAt: new Date('2024-01-10'),
  },
  {
    id: '7',
    name: 'Suresh Menon',
    email: 'suresh.menon@zenithgroup.com',
    role: 'Risk Analyst',
    department: 'Risk',
    entity: 'Zenith Infrastructure Ltd',
    status: 'active',
    lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 4),
    createdAt: new Date('2023-08-12'),
  },
  {
    id: '8',
    name: 'Kavita Reddy',
    email: 'kavita.reddy@zenithgroup.com',
    role: 'Budget Analyst',
    department: 'FP&A',
    entity: 'Zenith Realty Pvt Ltd',
    status: 'active',
    lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 6),
    createdAt: new Date('2023-09-25'),
  },
];

// User stats
const userStats = {
  total: users.length,
  active: users.filter((u) => u.status === 'active').length,
  inactive: users.filter((u) => u.status === 'inactive').length,
  pending: users.filter((u) => u.status === 'pending').length,
};

// Table columns
const columns: Column<User>[] = [
  {
    id: 'name',
    header: 'User',
    accessor: 'name',
    cell: (row) => (
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-blue-500/20 text-blue-400 text-xs">
            {row.name.split(' ').map((n) => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium text-white">{row.name}</p>
          <p className="text-xs text-slate-500">{row.email}</p>
        </div>
      </div>
    ),
  },
  {
    id: 'role',
    header: 'Role',
    accessor: 'role',
    cell: (row) => (
      <div>
        <p className="text-sm text-white">{row.role}</p>
        <p className="text-xs text-slate-500">{row.department}</p>
      </div>
    ),
  },
  {
    id: 'entity',
    header: 'Entity',
    accessor: 'entity',
    cell: (row) => (
      <Badge variant="outline" className="font-normal">
        {row.entity.replace('Pvt Ltd', '').replace('Ltd', '').trim()}
      </Badge>
    ),
  },
  {
    id: 'status',
    header: 'Status',
    accessor: 'status',
    cell: (row) => (
      <Badge
        variant={
          row.status === 'active' ? 'success' : row.status === 'pending' ? 'warning' : 'secondary'
        }
      >
        {row.status}
      </Badge>
    ),
  },
  {
    id: 'lastLogin',
    header: 'Last Login',
    accessor: (row) =>
      row.lastLogin
        ? row.lastLogin.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
          })
        : 'Never',
  },
];

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<string>('all');

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <PageContainer>
      <PageHeader
        title="User Management"
        description="Manage users and their access to the platform"
        breadcrumbs={[
          { label: 'Settings', href: '/settings' },
          { label: 'Users' },
        ]}
      />

      {/* Stats */}
      <Section className="mb-6">
        <div className="grid gap-4 sm:grid-cols-4">
          <Card className="border-slate-800 bg-slate-900/50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                <Users className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-white">{userStats.total}</p>
                <p className="text-xs text-slate-500">Total Users</p>
              </div>
            </div>
          </Card>
          <Card className="border-slate-800 bg-slate-900/50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-white">{userStats.active}</p>
                <p className="text-xs text-slate-500">Active</p>
              </div>
            </div>
          </Card>
          <Card className="border-slate-800 bg-slate-900/50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-500/10">
                <XCircle className="h-5 w-5 text-slate-400" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-white">{userStats.inactive}</p>
                <p className="text-xs text-slate-500">Inactive</p>
              </div>
            </div>
          </Card>
          <Card className="border-slate-800 bg-slate-900/50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500/10">
                <Clock className="h-5 w-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-white">{userStats.pending}</p>
                <p className="text-xs text-slate-500">Pending</p>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* Toolbar */}
      <Section className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-9"
              />
            </div>
            <div className="flex items-center rounded-lg border border-slate-800 bg-slate-900/50 p-1">
              {['all', 'active', 'inactive', 'pending'].map((status) => (
                <Button
                  key={status}
                  variant={statusFilter === status ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setStatusFilter(status)}
                  className="capitalize"
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button size="sm" className="gap-2 bg-gradient-to-r from-blue-600 to-cyan-600">
              <UserPlus className="h-4 w-4" />
              Invite User
            </Button>
          </div>
        </div>
      </Section>

      {/* Users Table */}
      <Section>
        <Card className="border-slate-800 bg-slate-900/50 overflow-hidden">
          <DataTable
            data={filteredUsers}
            columns={columns}
            actions={[
              { label: 'Edit', onClick: (row) => console.log('Edit', row.id) },
              { label: 'Reset Password', onClick: (row) => console.log('Reset', row.id) },
              { label: 'Deactivate', onClick: (row) => console.log('Deactivate', row.id), variant: 'danger' },
            ]}
            searchable={false}
            // pageSize={10}
          />
        </Card>
      </Section>

      {/* Pending Invitations */}
      {userStats.pending > 0 && (
        <Section className="mt-6">
          <h3 className="mb-4 text-sm font-medium text-slate-400">Pending Invitations</h3>
          <Card className="border-slate-800 bg-slate-900/50 overflow-hidden">
            <div className="divide-y divide-slate-800">
              {users
                .filter((u) => u.status === 'pending')
                .map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 hover:bg-slate-800/50"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-yellow-500/20 text-yellow-400">
                          {user.name.split(' ').map((n) => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-white">{user.name}</p>
                        <p className="text-sm text-slate-500">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm text-slate-400">{user.role}</p>
                        <p className="text-xs text-slate-500">
                          Invited {user.createdAt.toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Mail className="mr-2 h-4 w-4" />
                          Resend
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-400">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </Card>
        </Section>
      )}
    </PageContainer>
  );
}
