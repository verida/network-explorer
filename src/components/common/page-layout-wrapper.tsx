import React from "react"

import { GoBackButton } from "@/components/common/go-back-button"

export type PageLayoutWrapperProps = {
  children: React.ReactNode
  title?: string
  hideBackButton?: boolean
}

export function PageLayoutWrapper(props: PageLayoutWrapperProps) {
  const { children, hideBackButton, title } = props

  return (
    <div className="flex h-full flex-col gap-10">
      <div className="flex items-center gap-2">
        {hideBackButton ? null : <GoBackButton />}
        {title ? (
          <h1 className="text-2xl font-bold leading-tight">{title}</h1>
        ) : null}
      </div>
      <div className="flex-1">{children}</div>
    </div>
  )
}
