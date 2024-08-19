import * as React from "react"

import { cn } from "@/styles/utils"

export type InputProps = {
  startAdornment?: React.ReactNode
  endAdornment?: React.ReactNode
  containerClassName?: Pick<React.ComponentProps<"div">, "className">
} & React.ComponentProps<"input">

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      startAdornment,
      endAdornment,
      className,
      type,
      containerClassName,
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={cn(
          "relative flex w-full flex-row items-center",
          containerClassName
        )}
      >
        {startAdornment ? (
          <div className="absolute left-0">{startAdornment}</div>
        ) : null}
        <input
          type={type}
          className={cn(
            "flex w-full rounded-lg border border-transparent bg-input py-3 text-sm ring-offset-transparent file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground hover:border-border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
            startAdornment ? "pl-10" : "pl-3",
            endAdornment ? "pr-10" : "pr-3",
            className
          )}
          ref={ref}
          {...props}
        />
        {endAdornment ? (
          <div className="absolute right-0">{endAdornment}</div>
        ) : null}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
