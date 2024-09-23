import Link from "next/link"
import React from "react"

import { Button } from "@/components/ui/button"
import { getRootPageRoute } from "@/features/routes/utils"

export default function RootNotFoundPage() {
  return (
    <div className="flex h-full flex-row items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        <p>{`This page doesn't exist`}</p>
        <Button asChild className="w-fit">
          <Link href={getRootPageRoute()}>Return to the home page</Link>
        </Button>
      </div>
    </div>
  )
}
