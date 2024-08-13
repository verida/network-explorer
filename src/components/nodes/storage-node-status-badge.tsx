import React from "react"

import { Badge } from "@/components/ui/badge"
import { StorageNodeStatus } from "@/features/storagenodes/types"

export type StorageNodeStatusBadgeProps = {
  status: StorageNodeStatus
}

export function StorageNodeStatusBadge(props: StorageNodeStatusBadgeProps) {
  const { status } = props

  switch (status) {
    case "active":
      return <Badge variant="active">Active</Badge>
    default:
      return null
  }
}
