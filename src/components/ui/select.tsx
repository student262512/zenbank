"use client"

import * as React from "react"
import { Select as SelectPrimitive } from "@base-ui/react/select"
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const Select = SelectPrimitive.Root

function SelectGroup({ className, ...props }: SelectPrimitive.Group.Props) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn("scroll-my-1 p-1", className)}
      {...props}
    />
  )
}

function SelectValue({ className, ...props }: SelectPrimitive.Value.Props) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn("flex flex-1 text-left", className)}
      {...props}
    />
  )
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: SelectPrimitive.Trigger.Props & {
  size?: "sm" | "default"
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "flex w-fit items-center justify-between gap-1.5 rounded-lg border border-input bg-transparent py-2 pr-2 pl-2.5 text-sm whitespace-nowrap transition-colors outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-placeholder:text-muted-foreground data-[size=default]:h-8 data-[size=sm]:h-7 data-[size=sm]:rounded-[min(var(--radius-md),10px)] *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon
        render={
          <ChevronDownIcon className="pointer-events-none size-4 text-muted-foreground" />
        }
      />
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  side = "bottom",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  alignItemWithTrigger = true,
  ...props
}: SelectPrimitive.Popup.Props &
  Pick<
    SelectPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset" | "alignItemWithTrigger"
  >) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        className="isolate z-50"
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          data-align-trigger={alignItemWithTrigger}
          className={cn("relative isolate z-50 max-h-(--available-height) w-(--anchor-width) min-w-36 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-lg bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-[align-trigger=true]:animate-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className )}
          {...props}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.List>{children}</SelectPrimitive.List>
          <SelectScrollDownButton />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: SelectPrimitive.GroupLabel.Props) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      className={cn("px-1.5 py-1 text-xs text-muted-foreground", className)}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex w-full cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText className="flex flex-1 shrink-0 gap-2 whitespace-nowrap">
        {children}
      </SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator render={<span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center"><CheckIcon className="pointer-events-none" /></span>} />
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: SelectPrimitive.Separator.Props) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("pointer-events-none -mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpArrow>) {
  return (
    <SelectPrimitive.ScrollUpArrow
      data-slot="select-scroll-up-button"
      className={cn(
        "top-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <ChevronUpIcon />
    </SelectPrimitive.ScrollUpArrow>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownArrow>) {
  return (
    <SelectPrimitive.ScrollDownArrow
      data-slot="select-scroll-down-button"
      className={cn(
        "bottom-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <ChevronDownIcon />
    </SelectPrimitive.ScrollDownArrow>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}


// 'use client';

// import * as React from 'react';
// import { cn } from '@/lib/utils';
// import { ChevronDown, Check, X } from 'lucide-react';

// export interface SelectOption {
//   value: string;
//   label: string;
// }

// export interface SelectProps {
//   options: SelectOption[];
//   value?: string;
//   onChange?: (value: string) => void;
//   placeholder?: string;
//   className?: string;
//   disabled?: boolean;
// }

// export function Select({
//   options,
//   value,
//   onChange,
//   placeholder = 'Select...',
//   className,
//   disabled,
// }: SelectProps) {
//   const [open, setOpen] = React.useState(false);
//   const ref = React.useRef<HTMLDivElement>(null);

//   const selectedOption = options.find((opt) => opt.value === value);

//   React.useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (ref.current && !ref.current.contains(event.target as Node)) {
//         setOpen(false);
//       }
//     }
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   return (
//     <div ref={ref} className={cn('relative', className)}>
//       <button
//         type="button"
//         disabled={disabled}
//         onClick={() => setOpen(!open)}
//         className={cn(
//           'flex h-10 w-full items-center justify-between rounded-lg border border-slate-700 bg-slate-900/50 px-3 py-2 text-sm text-slate-100 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50',
//           !selectedOption && 'text-slate-500'
//         )}
//       >
//         <span className="truncate">{selectedOption?.label || placeholder}</span>
//         <ChevronDown
//           className={cn('h-4 w-4 text-slate-400 transition-transform', open && 'rotate-180')}
//         />
//       </button>

//       {open && (
//         <div className="absolute z-50 mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 py-1 shadow-xl">
//           <div className="max-h-60 overflow-auto">
//             {options.map((option) => (
//               <button
//                 key={option.value}
//                 type="button"
//                 onClick={() => {
//                   onChange?.(option.value);
//                   setOpen(false);
//                 }}
//                 className={cn(
//                   'flex w-full items-center justify-between px-3 py-2 text-sm text-slate-300 hover:bg-slate-800',
//                   option.value === value && 'bg-blue-600/20 text-blue-400'
//                 )}
//               >
//                 <span>{option.label}</span>
//                 {option.value === value && <Check className="h-4 w-4" />}
//               </button>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export interface MultiSelectProps {
//   options: SelectOption[];
//   value?: string[];
//   onChange?: (value: string[]) => void;
//   placeholder?: string;
//   className?: string;
//   disabled?: boolean;
// }

// export function MultiSelect({
//   options,
//   value = [],
//   onChange,
//   placeholder = 'Select...',
//   className,
//   disabled,
// }: MultiSelectProps) {
//   const [open, setOpen] = React.useState(false);
//   const ref = React.useRef<HTMLDivElement>(null);

//   const selectedOptions = options.filter((opt) => value.includes(opt.value));

//   React.useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (ref.current && !ref.current.contains(event.target as Node)) {
//         setOpen(false);
//       }
//     }
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const toggleOption = (optionValue: string) => {
//     if (value.includes(optionValue)) {
//       onChange?.(value.filter((v) => v !== optionValue));
//     } else {
//       onChange?.([...value, optionValue]);
//     }
//   };

//   const removeOption = (optionValue: string, e: React.MouseEvent) => {
//     e.stopPropagation();
//     onChange?.(value.filter((v) => v !== optionValue));
//   };

//   return (
//     <div ref={ref} className={cn('relative', className)}>
//       <button
//         type="button"
//         disabled={disabled}
//         onClick={() => setOpen(!open)}
//         className={cn(
//           'flex min-h-10 w-full items-center justify-between gap-2 rounded-lg border border-slate-700 bg-slate-900/50 px-3 py-2 text-sm text-slate-100 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50'
//         )}
//       >
//         <div className="flex flex-1 flex-wrap gap-1">
//           {selectedOptions.length > 0 ? (
//             selectedOptions.map((option) => (
//               <span
//                 key={option.value}
//                 className="inline-flex items-center gap-1 rounded bg-blue-600/20 px-2 py-0.5 text-xs text-blue-400"
//               >
//                 {option.label}
//                 <X
//                   className="h-3 w-3 cursor-pointer hover:text-blue-200"
//                   onClick={(e) => removeOption(option.value, e)}
//                 />
//               </span>
//             ))
//           ) : (
//             <span className="text-slate-500">{placeholder}</span>
//           )}
//         </div>
//         <ChevronDown
//           className={cn('h-4 w-4 shrink-0 text-slate-400 transition-transform', open && 'rotate-180')}
//         />
//       </button>

//       {open && (
//         <div className="absolute z-50 mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 py-1 shadow-xl">
//           <div className="max-h-60 overflow-auto">
//             {options.map((option) => (
//               <button
//                 key={option.value}
//                 type="button"
//                 onClick={() => toggleOption(option.value)}
//                 className={cn(
//                   'flex w-full items-center justify-between px-3 py-2 text-sm text-slate-300 hover:bg-slate-800',
//                   value.includes(option.value) && 'bg-blue-600/20 text-blue-400'
//                 )}
//               >
//                 <span>{option.label}</span>
//                 {value.includes(option.value) && <Check className="h-4 w-4" />}
//               </button>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
