'use client';

import { useState } from 'react';
import { TopNav } from '@/components/layout/top-nav';
import { Sidebar } from '@/components/layout/sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="min-h-screen bg-background">
      <TopNav />

      <Sidebar
        collapsed={collapsed}
        onCollapse={setCollapsed}
      />

      <div
        className={`pt-16 transition-all duration-300 ${collapsed ? 'ml-16' : 'ml-64'
          }`}
      >
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
