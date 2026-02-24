"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, checked, onCheckedChange, onClick, ...props }, ref) => {
    return (
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          ref={ref}
          checked={checked}
          className="sr-only peer"
          type="checkbox"
          onChange={(e) => onCheckedChange?.(e.target.checked)}
          onClick={(e) => {
            if (onClick) {
              onClick(e);
            }
          }}
          {...props}
        />
        <div
          className={cn(
            "w-9 h-5 rounded-full border-2 transition-colors",
            checked ? "bg-primary border-primary" : "bg-input border-input",
            className,
          )}
        >
          <div
            className={cn(
              "absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-background transition-transform shadow",
              checked && "translate-x-4",
            )}
          />
        </div>
      </label>
    );
  },
);

Switch.displayName = "Switch";

export { Switch };
