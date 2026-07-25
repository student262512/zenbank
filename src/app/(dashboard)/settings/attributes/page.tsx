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
  Tags,
  Plus,
  Search,
  Edit,
  Trash2,
  GripVertical,
  Hash,
  Type,
  Calendar,
  ToggleLeft,
  List,
  Link2,
  Building2,
  Wallet,
  CreditCard,
  Users,
  FileText,
  Check,
  X,
} from 'lucide-react';

// Attribute types
const attributeTypes = [
  { id: 'text', name: 'Text', icon: Type },
  { id: 'number', name: 'Number', icon: Hash },
  { id: 'date', name: 'Date', icon: Calendar },
  { id: 'boolean', name: 'Yes/No', icon: ToggleLeft },
  { id: 'select', name: 'Dropdown', icon: List },
  { id: 'reference', name: 'Reference', icon: Link2 },
];

// Mock attributes by entity
interface Attribute {
  id: string;
  name: string;
  key: string;
  type: string;
  required: boolean;
  visible: boolean;
  options?: string[];
  reference?: string;
}

const entityAttributes: Record<string, { name: string; icon: typeof Building2; attributes: Attribute[] }> = {
  entities: {
    name: 'Legal Entities',
    icon: Building2,
    attributes: [
      { id: '1', name: 'Entity Code', key: 'entity_code', type: 'text', required: true, visible: true },
      { id: '2', name: 'CIN Number', key: 'cin', type: 'text', required: true, visible: true },
      { id: '3', name: 'PAN', key: 'pan', type: 'text', required: true, visible: true },
      { id: '4', name: 'GST Number', key: 'gst', type: 'text', required: false, visible: true },
      { id: '5', name: 'Entity Type', key: 'entity_type', type: 'select', required: true, visible: true, options: ['Parent', 'Subsidiary', 'SPV', 'JV'] },
      { id: '6', name: 'Active', key: 'is_active', type: 'boolean', required: false, visible: true },
    ],
  },
  bankAccounts: {
    name: 'Bank Accounts',
    icon: Wallet,
    attributes: [
      { id: '1', name: 'Account Number', key: 'account_number', type: 'text', required: true, visible: true },
      { id: '2', name: 'IFSC Code', key: 'ifsc', type: 'text', required: true, visible: true },
      { id: '3', name: 'Account Type', key: 'account_type', type: 'select', required: true, visible: true, options: ['Current', 'Savings', 'Escrow', 'FD'] },
      { id: '4', name: 'Opening Balance', key: 'opening_balance', type: 'number', required: false, visible: true },
      { id: '5', name: 'Low Balance Threshold', key: 'low_balance', type: 'number', required: false, visible: true },
      { id: '6', name: 'Entity', key: 'entity_id', type: 'reference', required: true, visible: true, reference: 'entities' },
    ],
  },
  vendors: {
    name: 'Vendors',
    icon: Users,
    attributes: [
      { id: '1', name: 'Vendor Code', key: 'vendor_code', type: 'text', required: true, visible: true },
      { id: '2', name: 'Trade Name', key: 'trade_name', type: 'text', required: false, visible: true },
      { id: '3', name: 'PAN', key: 'pan', type: 'text', required: true, visible: true },
      { id: '4', name: 'GST Number', key: 'gst', type: 'text', required: false, visible: true },
      { id: '5', name: 'Payment Terms', key: 'payment_terms', type: 'number', required: false, visible: true },
      { id: '6', name: 'Credit Limit', key: 'credit_limit', type: 'number', required: false, visible: true },
      { id: '7', name: 'Category', key: 'category', type: 'select', required: false, visible: true, options: ['Contractor', 'Supplier', 'Service Provider', 'Consultant'] },
    ],
  },
  transactions: {
    name: 'Transactions',
    icon: CreditCard,
    attributes: [
      { id: '1', name: 'Transaction ID', key: 'txn_id', type: 'text', required: true, visible: true },
      { id: '2', name: 'Reference Number', key: 'ref_number', type: 'text', required: false, visible: true },
      { id: '3', name: 'Transaction Date', key: 'txn_date', type: 'date', required: true, visible: true },
      { id: '4', name: 'Value Date', key: 'value_date', type: 'date', required: false, visible: true },
      { id: '5', name: 'Category', key: 'category', type: 'select', required: false, visible: true, options: ['Operating', 'Investing', 'Financing'] },
      { id: '6', name: 'Is Recurring', key: 'is_recurring', type: 'boolean', required: false, visible: true },
    ],
  },
  invoices: {
    name: 'Invoices',
    icon: FileText,
    attributes: [
      { id: '1', name: 'Invoice Number', key: 'invoice_number', type: 'text', required: true, visible: true },
      { id: '2', name: 'Invoice Date', key: 'invoice_date', type: 'date', required: true, visible: true },
      { id: '3', name: 'Due Date', key: 'due_date', type: 'date', required: true, visible: true },
      { id: '4', name: 'PO Number', key: 'po_number', type: 'text', required: false, visible: true },
      { id: '5', name: 'Tax Type', key: 'tax_type', type: 'select', required: false, visible: true, options: ['IGST', 'CGST+SGST', 'Exempt'] },
      { id: '6', name: 'Verified', key: 'is_verified', type: 'boolean', required: false, visible: true },
    ],
  },
};

export default function AttributesPage() {
  const [activeEntity, setActiveEntity] = React.useState('entities');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isAddingNew, setIsAddingNew] = React.useState(false);

  const currentEntity = entityAttributes[activeEntity];
  const filteredAttributes = currentEntity.attributes.filter(
    (attr) =>
      attr.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attr.key.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTypeIcon = (type: string) => {
    const typeConfig = attributeTypes.find((t) => t.id === type);
    return typeConfig?.icon || Type;
  };

  return (
    <PageContainer>
      <PageHeader
        title="Custom Attributes"
        description="Define custom fields for different entities"
        breadcrumbs={[
          { label: 'Settings', href: '/settings' },
          { label: 'Attributes' },
        ]}
      />

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Entity Selector */}
        <div className="lg:col-span-1">
          <Card className="border-slate-800 bg-slate-900/50 sticky top-6">
            <div className="border-b border-slate-800 p-4">
              <h3 className="font-semibold text-white">Entity Types</h3>
              <p className="text-sm text-slate-400">Select an entity to configure</p>
            </div>
            <div className="p-2">
              {Object.entries(entityAttributes).map(([key, entity]) => {
                const Icon = entity.icon;
                return (
                  <button
                    key={key}
                    className={`flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors ${
                      activeEntity === key
                        ? 'bg-blue-500/10 text-blue-400'
                        : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                    }`}
                    onClick={() => setActiveEntity(key)}
                  >
                    <Icon className="h-5 w-5" />
                    <div className="flex-1">
                      <p className="font-medium">{entity.name}</p>
                      <p className="text-xs text-slate-500">{entity.attributes.length} attributes</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Attributes List */}
        <div className="lg:col-span-3">
          <Section className="mb-4">
            <div className="flex items-center justify-between">
              <div className="relative flex-1 mr-4 max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <Input
                  placeholder="Search attributes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button
                size="sm"
                className="gap-2 bg-gradient-to-r from-blue-600 to-cyan-600"
                onClick={() => setIsAddingNew(true)}
              >
                <Plus className="h-4 w-4" />
                Add Attribute
              </Button>
            </div>
          </Section>

          <Card className="border-slate-800 bg-slate-900/50 overflow-hidden">
            <div className="border-b border-slate-800 p-4">
              <div className="flex items-center gap-3">
                <currentEntity.icon className="h-5 w-5 text-blue-400" />
                <div>
                  <h3 className="font-semibold text-white">{currentEntity.name}</h3>
                  <p className="text-sm text-slate-400">{currentEntity.attributes.length} custom attributes defined</p>
                </div>
              </div>
            </div>

            {/* Attribute Form (New) */}
            {isAddingNew && (
              <div className="border-b border-slate-800 bg-blue-500/5 p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-white">New Attribute</h4>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsAddingNew(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input placeholder="e.g., Tax ID" />
                  </div>
                  <div className="space-y-2">
                    <Label>Key</Label>
                    <Input placeholder="e.g., tax_id" />
                  </div>
                  <div className="space-y-2">
                    <Label>Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {attributeTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Required</Label>
                    <div className="flex items-center gap-2 h-10">
                      <Switch />
                      <span className="text-sm text-slate-400">Make required</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-end gap-2">
                  <Button variant="outline" size="sm" onClick={() => setIsAddingNew(false)}>
                    Cancel
                  </Button>
                  <Button size="sm" className="bg-gradient-to-r from-blue-600 to-cyan-600">
                    Add Attribute
                  </Button>
                </div>
              </div>
            )}

            {/* Attributes Table */}
            <div className="divide-y divide-slate-800">
              {/* Header */}
              <div className="grid grid-cols-[auto,1fr,120px,100px,80px,80px,60px] gap-4 px-4 py-3 text-xs font-medium text-slate-500">
                <div className="w-6"></div>
                <div>Name</div>
                <div>Key</div>
                <div>Type</div>
                <div className="text-center">Required</div>
                <div className="text-center">Visible</div>
                <div></div>
              </div>

              {/* Rows */}
              {filteredAttributes.map((attr) => {
                const TypeIcon = getTypeIcon(attr.type);
                return (
                  <div
                    key={attr.id}
                    className="grid grid-cols-[auto,1fr,120px,100px,80px,80px,60px] gap-4 px-4 py-3 items-center hover:bg-slate-800/50"
                  >
                    <div className="cursor-grab">
                      <GripVertical className="h-4 w-4 text-slate-600" />
                    </div>
                    <div>
                      <p className="font-medium text-white">{attr.name}</p>
                      {attr.options && (
                        <p className="text-xs text-slate-500">{attr.options.length} options</p>
                      )}
                      {attr.reference && (
                        <p className="text-xs text-blue-400">→ {attr.reference}</p>
                      )}
                    </div>
                    <div>
                      <code className="rounded bg-slate-800 px-2 py-0.5 text-xs text-slate-400">
                        {attr.key}
                      </code>
                    </div>
                    <div className="flex items-center gap-2">
                      <TypeIcon className="h-4 w-4 text-slate-500" />
                      <span className="text-sm text-slate-400 capitalize">{attr.type}</span>
                    </div>
                    <div className="text-center">
                      {attr.required ? (
                        <Check className="mx-auto h-4 w-4 text-green-400" />
                      ) : (
                        <X className="mx-auto h-4 w-4 text-slate-600" />
                      )}
                    </div>
                    <div className="text-center">
                      <Switch checked={attr.visible} />
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Edit className="h-3.5 w-3.5 text-slate-400" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Trash2 className="h-3.5 w-3.5 text-red-400" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredAttributes.length === 0 && (
              <div className="p-12 text-center">
                <Tags className="mx-auto h-12 w-12 text-slate-700" />
                <h4 className="mt-4 font-medium text-white">No attributes found</h4>
                <p className="mt-2 text-sm text-slate-400">
                  {searchQuery ? 'Try a different search term' : 'Add your first attribute'}
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
