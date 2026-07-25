'use client';

import * as React from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { PageContainer, Section } from '@/components/layout/dashboard-shell';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Building2,
  Globe,
  Clock,
  Calendar,
  Palette,
  Shield,
  Key,
  Download,
  Upload,
  Trash2,
  Edit,
  Plus,
  Check,
  X,
  BarChart3,
  TrendingUp,
} from 'lucide-react';

// Mock workspace data
const workspaceData = {
  name: 'Zenith Group',
  industry: 'Infrastructure & Construction',
  timezone: 'Asia/Kolkata',
  currency: 'INR',
  fiscalYearStart: 'April',
  dateFormat: 'DD/MM/YYYY',
  numberFormat: 'Indian',
  language: 'English',
};

// Mock entities
const entities = [
  { id: '1', name: 'Zenith Infrastructure Ltd', type: 'Parent', status: 'active', projects: 12 },
  { id: '2', name: 'Zenith Realty Pvt Ltd', type: 'Subsidiary', status: 'active', projects: 8 },
  { id: '3', name: 'Zenith Energy SPV', type: 'SPV', status: 'active', projects: 3 },
  { id: '4', name: 'Zenith Roads Pvt Ltd', type: 'Subsidiary', status: 'active', projects: 5 },
  { id: '5', name: 'Zenith Housing', type: 'Subsidiary', status: 'inactive', projects: 0 },
];

// Mock projects
const projects = [
  { id: '1', name: 'Mumbai Metro Line 7', entity: 'Zenith Infrastructure Ltd', status: 'active', value: '₹2,450 Cr' },
  { id: '2', name: 'Delhi-Jaipur Expressway', entity: 'Zenith Roads Pvt Ltd', status: 'active', value: '₹1,850 Cr' },
  { id: '3', name: 'Pune IT Park Phase 2', entity: 'Zenith Realty Pvt Ltd', status: 'active', value: '₹780 Cr' },
  { id: '4', name: 'Solar Farm Gujarat', entity: 'Zenith Energy SPV', status: 'active', value: '₹425 Cr' },
  { id: '5', name: 'Bangalore Tech Hub', entity: 'Zenith Realty Pvt Ltd', status: 'planning', value: '₹1,200 Cr' },
];

// Theme options
const themes = [
  { id: 'dark', name: 'Dark', description: 'Default dark theme', active: true },
  { id: 'light', name: 'Light', description: 'Light theme for daytime use', active: false },
  { id: 'system', name: 'System', description: 'Follow system preference', active: false },
];

export default function WorkspacePage() {
  const [workspace, setWorkspace] = React.useState(workspaceData);
  const [isEditing, setIsEditing] = React.useState(false);

  return (
    <PageContainer>
      <PageHeader
        title="Workspace Settings"
        description="Manage your organization and workspace preferences"
        breadcrumbs={[
          { label: 'Settings', href: '/settings' },
          { label: 'Workspace' },
        ]}
      />

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general" className="gap-2">
            <Building2 className="h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="entities" className="gap-2">
            <Globe className="h-4 w-4" />
            Entities
            <Badge variant="secondary" className="ml-1">{entities.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="projects" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Projects
            <Badge variant="secondary" className="ml-1">{projects.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="gap-2">
            <Palette className="h-4 w-4" />
            Appearance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-0 space-y-6">
          {/* Organization Info */}
          <Card className="border-slate-800 bg-slate-900/50 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold text-white">Organization Information</h3>
                <p className="text-sm text-slate-400">Basic details about your organization</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                <Edit className="mr-2 h-4 w-4" />
                {isEditing ? 'Cancel' : 'Edit'}
              </Button>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Organization Name</Label>
                <Input
                  value={workspace.name}
                  onChange={(e) => setWorkspace({ ...workspace, name: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label>Industry</Label>
                <Select disabled={!isEditing} value={workspace.industry}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Infrastructure & Construction">Infrastructure & Construction</SelectItem>
                    <SelectItem value="Real Estate">Real Estate</SelectItem>
                    <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="Technology">Technology</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {isEditing && (
              <div className="mt-6 flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-600" onClick={() => setIsEditing(false)}>
                  Save Changes
                </Button>
              </div>
            )}
          </Card>

          {/* Regional Settings */}
          <Card className="border-slate-800 bg-slate-900/50 p-6">
            <div className="mb-6">
              <h3 className="font-semibold text-white">Regional Settings</h3>
              <p className="text-sm text-slate-400">Configure timezone, currency, and formatting preferences</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-slate-400" />
                  Timezone
                </Label>
                <Select value={workspace.timezone}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Asia/Kolkata">Asia/Kolkata (IST)</SelectItem>
                    <SelectItem value="Asia/Dubai">Asia/Dubai (GST)</SelectItem>
                    <SelectItem value="Europe/London">Europe/London (GMT)</SelectItem>
                    <SelectItem value="America/New_York">America/New_York (EST)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-slate-400" />
                  Default Currency
                </Label>
                <Select value={workspace.currency}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="INR">INR (₹)</SelectItem>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="EUR">EUR (€)</SelectItem>
                    <SelectItem value="GBP">GBP (£)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-slate-400" />
                  Fiscal Year Start
                </Label>
                <Select value={workspace.fiscalYearStart}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="January">January</SelectItem>
                    <SelectItem value="April">April</SelectItem>
                    <SelectItem value="July">July</SelectItem>
                    <SelectItem value="October">October</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Date Format</Label>
                <Select value={workspace.dateFormat}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                    <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                    <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Number Format</Label>
                <Select value={workspace.numberFormat}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Indian">Indian (12,34,567.89)</SelectItem>
                    <SelectItem value="International">International (1,234,567.89)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Language</Label>
                <Select value={workspace.language}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Hindi">Hindi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600">
                Save Settings
              </Button>
            </div>
          </Card>

          {/* Data Management */}
          <Card className="border-slate-800 bg-slate-900/50 p-6">
            <div className="mb-6">
              <h3 className="font-semibold text-white">Data Management</h3>
              <p className="text-sm text-slate-400">Export, import, or manage your workspace data</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export Data
              </Button>
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Import Data
              </Button>
              <Button variant="outline" className="text-red-400 hover:text-red-300">
                <Trash2 className="mr-2 h-4 w-4" />
                Clear All Data
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="entities" className="mt-0">
          <Card className="border-slate-800 bg-slate-900/50 overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 p-4">
              <div>
                <h3 className="font-semibold text-white">Legal Entities</h3>
                <p className="text-sm text-slate-400">Manage companies and SPVs in your group</p>
              </div>
              <Button size="sm" className="gap-2 bg-gradient-to-r from-blue-600 to-cyan-600">
                <Plus className="h-4 w-4" />
                Add Entity
              </Button>
            </div>

            <div className="divide-y divide-slate-800">
              {entities.map((entity) => (
                <div key={entity.id} className="flex items-center justify-between p-4 hover:bg-slate-800/50">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                      <Building2 className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{entity.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-[10px]">{entity.type}</Badge>
                        <span className="text-xs text-slate-500">{entity.projects} projects</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={entity.status === 'active' ? 'success' : 'secondary'}>
                      {entity.status}
                    </Badge>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4 text-slate-400" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="mt-0">
          <Card className="border-slate-800 bg-slate-900/50 overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 p-4">
              <div>
                <h3 className="font-semibold text-white">Projects</h3>
                <p className="text-sm text-slate-400">Manage projects across all entities</p>
              </div>
              <Button size="sm" className="gap-2 bg-gradient-to-r from-blue-600 to-cyan-600">
                <Plus className="h-4 w-4" />
                Add Project
              </Button>
            </div>

            <div className="divide-y divide-slate-800">
              {projects.map((project) => (
                <div key={project.id} className="flex items-center justify-between p-4 hover:bg-slate-800/50">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                      <TrendingUp className="h-5 w-5 text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{project.name}</h4>
                      <p className="text-xs text-slate-500">{project.entity}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-white">{project.value}</span>
                    <Badge variant={project.status === 'active' ? 'success' : 'warning'}>
                      {project.status}
                    </Badge>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4 text-slate-400" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="mt-0 space-y-6">
          {/* Theme Selection */}
          <Card className="border-slate-800 bg-slate-900/50 p-6">
            <div className="mb-6">
              <h3 className="font-semibold text-white">Theme</h3>
              <p className="text-sm text-slate-400">Choose your preferred color scheme</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {themes.map((theme) => (
                <div
                  key={theme.id}
                  className={`relative rounded-lg border p-4 cursor-pointer transition-colors ${
                    theme.active
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {theme.active && (
                    <div className="absolute right-2 top-2">
                      <Check className="h-4 w-4 text-blue-400" />
                    </div>
                  )}
                  <h4 className="font-medium text-white">{theme.name}</h4>
                  <p className="mt-1 text-sm text-slate-400">{theme.description}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Display Settings */}
          <Card className="border-slate-800 bg-slate-900/50 p-6">
            <div className="mb-6">
              <h3 className="font-semibold text-white">Display Settings</h3>
              <p className="text-sm text-slate-400">Customize your dashboard display preferences</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">Compact Mode</p>
                  <p className="text-xs text-slate-400">Reduce spacing for more content</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">Show Sparklines</p>
                  <p className="text-xs text-slate-400">Display mini charts in KPI cards</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">Animated Transitions</p>
                  <p className="text-xs text-slate-400">Enable smooth page transitions</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">AI Copilot</p>
                  <p className="text-xs text-slate-400">Show AI assistant panel</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
}
