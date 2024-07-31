import React from "react"
import { useEffect, useState } from "react"

import { cn } from "@/styles/utils"

const Loader = ({
  className = "",
  isLoading = false,
}: {
  className?: string
  isLoading?: boolean
}) => {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (typeof window !== "undefined") {
      setLoading(false)
    }
  }, [])
  return (
    (loading || isLoading) && (
      <div className={cn("flex items-center justify-center", className)}>
        Loading...
      </div>
    )
  )
}

export default Loader
