import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive: "border-transparent bg-destructive text-destructive-foreground",
        outline: "text-foreground",
        // Status variants
        critical: "border-transparent bg-status-critical/15 text-status-critical",
        acknowledged: "border-transparent bg-status-acknowledged/15 text-status-acknowledged",
        inProgress: "border-transparent bg-status-in-progress/15 text-status-in-progress",
        resolved: "border-transparent bg-status-resolved/15 text-status-resolved",
        // Gamification variants
        xp: "border-transparent gradient-gamification text-accent-foreground shadow-sm",
        level: "border-transparent bg-primary/10 text-primary font-bold",
        streak: "border-transparent bg-streak-fire/15 text-streak-fire",
        badge: "border-2 border-xp-gold/30 bg-xp-gold/10 text-xp-gold",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
