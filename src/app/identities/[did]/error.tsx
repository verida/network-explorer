"use client"

import Link from "next/link"
import React from "react"

import { Button } from "@/components/ui/button"

type IdentityErrorPageProps = {
  error: unknown
}

export default function IdentityErrorPage(props: IdentityErrorPageProps) {
  const { error } = props

  if (error instanceof Error && error.message === "Invalid DID") {
    return (
      <div className="flex h-full flex-row items-center justify-center">
        <div className="flex flex-col items-center gap-8">
          <p>
            The identifier (DID) you are looking for is not valid for a Verida
            identity
          </p>
          <Button asChild className="w-fit">
            <Link href={"/"}>Go back</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-row items-center justify-center">
      Oops! Something went wrong when getting the identity
    </div>
  )
}
