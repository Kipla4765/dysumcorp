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
            "w-10 h-6 rounded-full border-2 transition-colors duration-200",
            checked
              ? "bg-green-500 border-green-500"
              : "bg-gray-200 dark:bg-gray-700 border-gray-200 dark:border-gray-700",
            className,
          )}
        >
          <div
            className={cn(
              "absolute top-[2px] left-[2px] w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200",
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
