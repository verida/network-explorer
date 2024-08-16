import React from "react"

export type LoadingProps = React.ComponentProps<"p">

export function Loading(props: LoadingProps) {
  const { children, ...pProps } = props

  // TODO: Add a spinner or else if present in the design
  return <p {...pProps}>{children ? children : `Loading...`}</p>
}
