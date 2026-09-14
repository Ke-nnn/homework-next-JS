import * as React from "react";
import { cn } from "@/lib/utils";

const Empty = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col items-center justify-center rounded-lg border border-dashed border-neutral-200 bg-neutral-50 py-12 text-center dark:border-neutral-800 dark:bg-neutral-900",
      className,
    )}
    {...props}
  />
));
Empty.displayName = "Empty";

const EmptyIcon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("mb-4 text-4xl", className)} {...props} />
));
EmptyIcon.displayName = "EmptyIcon";

const EmptyTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "mb-2 text-lg font-semibold text-neutral-900 dark:text-neutral-50",
      className,
    )}
    {...props}
  />
));
EmptyTitle.displayName = "EmptyTitle";

const EmptyDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-neutral-500 dark:text-neutral-400", className)}
    {...props}
  />
));
EmptyDescription.displayName = "EmptyDescription";

const EmptyHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col items-center gap-2", className)}
    {...props}
  />
));
EmptyHeader.displayName = "EmptyHeader";

const EmptyMedia = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("mb-4", className)} {...props} />
));
EmptyMedia.displayName = "EmptyMedia";

export {
  Empty,
  EmptyIcon,
  EmptyTitle,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
};
