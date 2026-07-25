import * as React from 'react';
import { cn } from '@/lib/utils';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'default' | 'lg' | 'xl';
}

function Avatar({ className, src, alt, fallback, size = 'default', ...props }: AvatarProps) {
  const [error, setError] = React.useState(false);

  const sizes = {
    sm: 'h-6 w-6 text-xs',
    default: 'h-8 w-8 text-sm',
    lg: 'h-10 w-10 text-base',
    xl: 'h-12 w-12 text-lg',
  };

  const initials = fallback
    ? fallback
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '?';

  return (
    <div
      className={cn(
        'relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-blue-600 to-cyan-600',
        sizes[size],
        className
      )}
      {...props}
    >
      {src && !error ? (
        <img
          src={src}
          alt={alt || 'Avatar'}
          className="h-full w-full object-cover"
          onError={() => setError(true)}
        />
      ) : (
        <span className="font-medium text-white">{initials}</span>
      )}
    </div>
  );
}

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  max?: number;
  size?: 'sm' | 'default' | 'lg';
}

function AvatarGroup({
  children,
  max = 4,
  size = 'default',
  className,
  ...props
}: AvatarGroupProps) {
  const childrenArray = React.Children.toArray(children);
  const visibleChildren = childrenArray.slice(0, max);
  const remainingCount = childrenArray.length - max;

  const sizes = {
    sm: 'h-6 w-6 text-xs',
    default: 'h-8 w-8 text-sm',
    lg: 'h-10 w-10 text-base',
  };

  return (
    <div className={cn('flex -space-x-2', className)} {...props}>
      {visibleChildren.map((child, index) => (
        <div key={index} className="ring-2 ring-slate-900 rounded-full">
          {child}
        </div>
      ))}
      {remainingCount > 0 && (
        <div
          className={cn(
            'flex items-center justify-center rounded-full bg-slate-700 font-medium text-slate-300 ring-2 ring-slate-900',
            sizes[size]
          )}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
}

export { Avatar, AvatarGroup };
