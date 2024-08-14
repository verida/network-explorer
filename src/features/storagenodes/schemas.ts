import { z } from "zod"

export const StorageNodeBaseSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  datacenter: z.string(),
  serviceEndpoint: z.string().url(),
  countryCode: z.string(),
  country: z.string(),
  region: z.string(),
  subregion: z.string(),
  storageSlotsUsed: z.string().optional(),
  maxStorageSlots: z.string().optional(),
})

export const StorageNodeMetricsFileResponseSchema = z.array(
  StorageNodeBaseSchema
)
