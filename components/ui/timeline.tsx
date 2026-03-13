"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const timelineVariants = cva("relative flex flex-col", {
  variants: {
    size: {
      sm: "gap-4",
      md: "gap-6",
      lg: "gap-8",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

const iconVariants = cva("relative z-10 rounded-full border-2 border-primary bg-background", {
  variants: {
    iconsize: {
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-6 w-6",
    },
    tone: {
      active: "bg-primary",
      muted: "bg-background",
    },
  },
  defaultVariants: {
    iconsize: "sm",
    tone: "muted",
  },
})

const markerCenterOffsets = {
  sm: "0.875rem",
  md: "1rem",
  lg: "1.125rem",
} as const

interface TimelineProps
  extends React.HTMLAttributes<HTMLOListElement>,
    VariantProps<typeof timelineVariants> {}

const Timeline = React.forwardRef<HTMLOListElement, TimelineProps>(
  ({ className, size, children, ...props }, ref) => {
    const items = React.Children.toArray(children)

    if (items.length === 0) {
      return <TimelineEmpty />
    }

    return (
      <ol
        ref={ref}
        aria-label="Timeline"
        className={cn(timelineVariants({ size }), "w-full", className)}
        {...props}
      >
        {children}
      </ol>
    )
  },
)
Timeline.displayName = "Timeline"

interface TimelineItemProps
  extends Omit<React.LiHTMLAttributes<HTMLLIElement>, "title">,
    VariantProps<typeof iconVariants> {
  date?: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
  icon?: React.ReactNode
  showConnector?: boolean
  showLeadingConnector?: boolean
  contentClassName?: string
  timeClassName?: string
  markerClassName?: string
}

const TimelineItem = React.forwardRef<HTMLLIElement, TimelineItemProps>(
  (
    {
      className,
      date,
      title,
      description,
      icon,
      iconsize,
      tone,
      showConnector = true,
      showLeadingConnector = true,
      children,
      contentClassName,
      timeClassName,
      markerClassName,
      ...props
    },
    ref,
  ) => {
    const markerCenterOffset = markerCenterOffsets[iconsize ?? "sm"]

    return (
      <li
        ref={ref}
        className={cn(
          "grid grid-cols-[3.75rem_2rem_minmax(0,1fr)] items-start gap-3 sm:grid-cols-[4.75rem_2.25rem_minmax(0,1fr)] sm:gap-4",
          className,
        )}
        {...props}
      >
        <div className="pt-1">
          <TimelineTime className={cn("block w-full text-right", timeClassName)}>{date}</TimelineTime>
        </div>

        <div className={cn("relative flex min-h-full justify-center", markerClassName)}>
          {showLeadingConnector && (
            <TimelineConnector
              className="absolute left-1/2 -translate-x-1/2 bg-primary/25"
              style={{ top: "-0.75rem", bottom: `calc(100% - ${markerCenterOffset})` }}
            />
          )}
          {showConnector && (
            <TimelineConnector
              className="absolute left-1/2 -translate-x-1/2 bg-primary/25"
              style={{ top: markerCenterOffset, bottom: "-0.75rem" }}
            />
          )}

          <div className="mt-1.5">
            <TimelineIcon iconsize={iconsize} tone={tone}>
              {icon}
            </TimelineIcon>
          </div>
        </div>

        <TimelineContent className={contentClassName}>
          {children ?? (
            <>
              <TimelineHeader>
                <TimelineTitle>{title}</TimelineTitle>
              </TimelineHeader>
              {description ? <TimelineDescription>{description}</TimelineDescription> : null}
            </>
          )}
        </TimelineContent>
      </li>
    )
  },
)
TimelineItem.displayName = "TimelineItem"

const TimelineConnector = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("w-px", className)} {...props} />
  ),
)
TimelineConnector.displayName = "TimelineConnector"

const TimelineHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("flex items-center gap-3", className)} {...props} />,
)
TimelineHeader.displayName = "TimelineHeader"

const TimelineTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("font-semibold leading-none tracking-tight text-foreground", className)} {...props} />
  ),
)
TimelineTitle.displayName = "TimelineTitle"

interface TimelineIconProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof iconVariants> {
  children?: React.ReactNode
}

const TimelineIcon = React.forwardRef<HTMLDivElement, TimelineIconProps>(
  ({ className, iconsize, tone, children, ...props }, ref) => (
    <div ref={ref} className={cn(iconVariants({ iconsize, tone }), "flex items-center justify-center", className)} {...props}>
      {children}
      {tone === "active" ? <span className="absolute inset-1 rounded-full bg-background/25" /> : null}
    </div>
  ),
)
TimelineIcon.displayName = "TimelineIcon"

const TimelineDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm leading-relaxed text-muted-foreground", className)} {...props} />
  ),
)
TimelineDescription.displayName = "TimelineDescription"

const TimelineContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("min-w-0", className)} {...props} />,
)
TimelineContent.displayName = "TimelineContent"

const TimelineTime = React.forwardRef<HTMLTimeElement, React.HTMLAttributes<HTMLTimeElement>>(
  ({ className, ...props }, ref) => (
    <time ref={ref} className={cn("font-semibold text-primary/60", className)} {...props} />
  ),
)
TimelineTime.displayName = "TimelineTime"

const TimelineEmpty = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center justify-center rounded-3xl border border-border/60 p-8 text-center text-sm text-muted-foreground", className)} {...props}>
      {children ?? "No timeline items to display"}
    </div>
  ),
)
TimelineEmpty.displayName = "TimelineEmpty"

export {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineContent,
  TimelineDescription,
  TimelineEmpty,
  TimelineHeader,
  TimelineIcon,
  TimelineTime,
  TimelineTitle,
}
