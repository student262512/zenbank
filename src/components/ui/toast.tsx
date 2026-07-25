'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';

export interface Toast {
  id: string;
  title: string;
  description?: string;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  duration?: number;
}

interface ToastContextValue {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const addToast = React.useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).slice(2);
    const newToast = { ...toast, id };
    setToasts((prev) => [...prev, newToast]);

    const duration = toast.duration ?? 5000;
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastViewport />
    </ToastContext.Provider>
  );
}

function ToastViewport() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  const variants = {
    default: {
      bg: 'bg-slate-800 border-slate-700',
      icon: null,
    },
    success: {
      bg: 'bg-emerald-900/50 border-emerald-700',
      icon: <CheckCircle className="h-5 w-5 text-emerald-400" />,
    },
    warning: {
      bg: 'bg-amber-900/50 border-amber-700',
      icon: <AlertTriangle className="h-5 w-5 text-amber-400" />,
    },
    error: {
      bg: 'bg-red-900/50 border-red-700',
      icon: <AlertCircle className="h-5 w-5 text-red-400" />,
    },
    info: {
      bg: 'bg-blue-900/50 border-blue-700',
      icon: <Info className="h-5 w-5 text-blue-400" />,
    },
  };

  const variant = variants[toast.variant || 'default'];

  return (
    <div
      className={cn(
        'flex w-80 items-start gap-3 rounded-lg border p-4 shadow-lg animate-in slide-in-from-right',
        variant.bg
      )}
    >
      {variant.icon && <div className="shrink-0">{variant.icon}</div>}
      <div className="flex-1">
        <p className="font-medium text-white">{toast.title}</p>
        {toast.description && (
          <p className="mt-1 text-sm text-slate-400">{toast.description}</p>
        )}
      </div>
      <button
        onClick={onClose}
        className="shrink-0 rounded p-1 text-slate-400 hover:bg-slate-700 hover:text-white"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

export { ToastViewport, ToastItem };
