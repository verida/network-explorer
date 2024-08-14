import { z } from "zod"

import {
  StorageNodeBaseSchema,
  StorageNodeMetricsFileResponseSchema,
} from "@/features/storagenodes/schemas"

export type StorageNodeBase = z.infer<typeof StorageNodeBaseSchema>

export type StorageNodeMetricsFileResponse = z.infer<
  typeof StorageNodeMetricsFileResponseSchema
>

export type StorageNodeStatus =
  | "active"
  | "inactive"
  | "registering"
  | "deregistering"

export type StorageNode = StorageNodeBase & {
  status: StorageNodeStatus
  countryCoordinates?: {
    latitude: number
    longitude: number
  }
}
