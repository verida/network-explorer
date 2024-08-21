import { SquareArrowOutUpRight } from "lucide-react"
import Link from "next/link"
import React from "react"

import { cn } from "@/styles/utils"

export type InternalLinkProps = React.ComponentProps<typeof Link>

export function InternalLink(props: InternalLinkProps) {
  const { className, ...linkProps } = props

  return (
    <Link
      className={cn("text-accent hover:underline", className)}
      {...linkProps}
    />
  )
}

export type ExternalLinkProps = {
  openInNewTab?: boolean
  hideOpenInNewTabIcon?: boolean
} & React.ComponentProps<"a">

export function ExternalLink(props: ExternalLinkProps) {
  const {
    openInNewTab = false,
    hideOpenInNewTabIcon = false,
    target,
    rel,
    className,
    children,
    ...aProps
  } = props

  return (
    <a
      target={target ?? (openInNewTab ? "_blank" : undefined)}
      rel={rel ?? (openInNewTab ? "noopener noreferrer" : undefined)}
      className={cn(
        "flex flex-row items-center gap-2 text-accent hover:underline",
        className
      )}
      {...aProps}
    >
      <span>{children}</span>
      {openInNewTab && !hideOpenInNewTabIcon ? (
        <SquareArrowOutUpRight size={14} className="text-muted-foreground" />
      ) : null}
    </a>
  )
}
