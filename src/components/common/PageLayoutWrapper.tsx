import React from "react"

import { GoBackButton } from "@/components/common/GoBackButton"

type PageLayoutWrapperProps = {
  children: React.ReactNode
  title?: string
  hideBackButton?: boolean
}

export default function PageLayoutWrapper(props: PageLayoutWrapperProps) {
  const { children, hideBackButton, title } = props

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center gap-2">
        {hideBackButton ? null : <GoBackButton />}
        {title ? (
          <h1 className="text-[24px] font-bold leading-[28.8px]">{title}</h1>
        ) : null}
      </div>
      <div className="flex-1">{children}</div>
    </div>
  )
}
