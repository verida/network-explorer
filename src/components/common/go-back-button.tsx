"use client"

import { useRouter } from "next/navigation"
import React, { useCallback } from "react"
import { FaChevronLeft } from "react-icons/fa"

import { Button } from "@/components/ui/button"

export function GoBackButton() {
  const router = useRouter()

  const handleClick = useCallback(() => {
    router.back()
  }, [router])

  return (
    <Button variant="ghost" size="icon" onClick={handleClick}>
      <FaChevronLeft className="h-6 w-6 text-muted-foreground" />
      <span className="sr-only">Go back</span>
    </Button>
  )
}
