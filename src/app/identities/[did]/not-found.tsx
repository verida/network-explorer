import Link from "next/link"
import React from "react"

import { Button } from "@/components/ui/button"
import { getRootPageRoute } from "@/features/routes/utils"

export default function IdentityNotFoundPage() {
  return (
    <div className="flex h-full flex-row items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        <p>{`This identity was not found`}</p>
        <Button asChild className="w-fit">
          <Link href={getRootPageRoute()}>Return to Identities overview</Link>
        </Button>
      </div>
    </div>
  )
}
