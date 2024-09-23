import Link from "next/link"
import React from "react"

import { Button } from "@/components/ui/button"
import { getNodesPageRoute } from "@/features/routes/utils"

export default function NodeNotFoundPage() {
  return (
    <div className="flex h-full flex-row items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        <p>{`This node was not found`}</p>
        <Button asChild className="w-fit">
          <Link href={getNodesPageRoute()}>Return to Nodes overview</Link>
        </Button>
      </div>
    </div>
  )
}
