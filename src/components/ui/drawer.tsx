'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface DrawerContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DrawerContext = React.createContext<DrawerContextValue | null>(null);

function useDrawer() {
  const context = React.useContext(DrawerContext);
  if (!context) {
    throw new Error('Drawer components must be used within a Drawer provider');
  }
  return context;
}

export interface DrawerProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

function Drawer({ open: controlledOpen, defaultOpen = false, onOpenChange, children }: DrawerProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);

  const open = controlledOpen ?? uncontrolledOpen;
  const handleOpenChange = onOpenChange ?? setUncontrolledOpen;

  return (
    <DrawerContext.Provider value={{ open, onOpenChange: handleOpenChange }}>
      {children}
    </DrawerContext.Provider>
  );
}

function DrawerTrigger({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { onOpenChange } = useDrawer();

  return (
    <button type="button" onClick={() => onOpenChange(true)} {...props}>
      {children}
    </button>
  );
}

function DrawerClose({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { onOpenChange } = useDrawer();

  return (
    <button type="button" onClick={() => onOpenChange(false)} {...props}>
      {children}
    </button>
  );
}

export interface DrawerContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: 'left' | 'right' | 'top' | 'bottom';
  size?: 'sm' | 'default' | 'lg' | 'xl' | 'full';
}

const DrawerContent = React.forwardRef<HTMLDivElement, DrawerContentProps>(
  ({ className, children, side = 'right', size = 'default', ...props }, ref) => {
    const { open, onOpenChange } = useDrawer();

    if (!open) return null;

    const sideStyles = {
      left: 'left-0 top-0 h-full animate-in slide-in-from-left',
      right: 'right-0 top-0 h-full animate-in slide-in-from-right',
      top: 'top-0 left-0 w-full animate-in slide-in-from-top',
      bottom: 'bottom-0 left-0 w-full animate-in slide-in-from-bottom',
    };

    const sizeStyles = {
      sm: side === 'left' || side === 'right' ? 'w-80' : 'h-80',
      default: side === 'left' || side === 'right' ? 'w-[400px]' : 'h-[400px]',
      lg: side === 'left' || side === 'right' ? 'w-[600px]' : 'h-[600px]',
      xl: side === 'left' || side === 'right' ? 'w-[800px]' : 'h-[800px]',
      full: side === 'left' || side === 'right' ? 'w-full max-w-full' : 'h-full max-h-full',
    };

    return (
      <>
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm animate-in fade-in-0"
          onClick={() => onOpenChange(false)}
        />
        <div
          ref={ref}
          className={cn(
            'fixed z-50 flex flex-col border-slate-800 bg-slate-900 shadow-2xl',
            sideStyles[side],
            sizeStyles[size],
            side === 'left' && 'border-r',
            side === 'right' && 'border-l',
            side === 'top' && 'border-b',
            side === 'bottom' && 'border-t',
            className
          )}
          {...props}
        >
          {children}
        </div>
      </>
    );
  }
);
DrawerContent.displayName = 'DrawerContent';

const DrawerHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex items-center justify-between border-b border-slate-800 px-6 py-4', className)}
    {...props}
  />
);
DrawerHeader.displayName = 'DrawerHeader';

const DrawerTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn('text-lg font-semibold text-white', className)}
      {...props}
    />
  )
);
DrawerTitle.displayName = 'DrawerTitle';

const DrawerDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm text-slate-400', className)} {...props} />
));
DrawerDescription.displayName = 'DrawerDescription';

const DrawerBody = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex-1 overflow-auto p-6', className)} {...props} />
);
DrawerBody.displayName = 'DrawerBody';

const DrawerFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex items-center justify-end gap-3 border-t border-slate-800 px-6 py-4', className)}
    {...props}
  />
);
DrawerFooter.displayName = 'DrawerFooter';

const DrawerCloseButton = ({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { onOpenChange } = useDrawer();

  return (
    <button
      type="button"
      onClick={() => onOpenChange(false)}
      className={cn(
        'rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white',
        className
      )}
      {...props}
    >
      <X className="h-5 w-5" />
    </button>
  );
};
DrawerCloseButton.displayName = 'DrawerCloseButton';

export {
  Drawer,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
  DrawerFooter,
  DrawerCloseButton,
};
