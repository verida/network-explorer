import { Network } from "@verida/types"

import { clientEnvVars } from "@/config/client"
import { getCountryInfo } from "@/features/countries/utils"
import { StorageNodeMetricsFileResponseSchema } from "@/features/storagenodes/schemas"
import { StorageNode, StorageNodeStatus } from "@/features/storagenodes/types"

/**
 * Build the URL of the storage nodes registry file, based on the network.
 *
 * @param network the network to get the registry file URL for.
 * @returns the URL of the storage nodes registry file.
 */
export function getNodeRegistryUrl(network: Network) {
  return `https://assets.verida.io/registry/storageNodes/${network}.json`
}

/**
 * Build the URL of the storage nodes summary file, based on the network.
 *
 * @param network the network to get the nodes summary file URL for.
 * @returns the URL of the storage nodes summary file.
 */
export function getNodeMetricsFileUrl(network: Network) {
  // TODO: To rename to getNodeSummaryFileUrl
  return `${clientEnvVars.NEXT_PUBLIC_METRICS_BASE_URL}/nodes/${network}-nodes-summary.json`
}

/**
 * Get the list of storage nodes for a given network.
 *
 * @param network the network to get the storage nodes for.
 * @returns the list of storage nodes.
 */
export async function getStorageNodes(
  network: Network
): Promise<StorageNode[]> {
  const url = getNodeMetricsFileUrl(network)

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error("Failed to fetch data")
  }

  const data = await response.json()
  const validatedData = StorageNodeMetricsFileResponseSchema.parse(data)

  const nodes: StorageNode[] = validatedData.map((item) => {
    const countryInfo = getCountryInfo(item.countryCode)

    return {
      id: item.id,
      name: item.name,
      description: item.description,
      status: "active",
      datacenter: item.datacenter,
      serviceEndpoint: item.serviceEndpoint,
      countryCode: item.countryCode,
      country: item.country,
      countryCoordinates: countryInfo
        ? {
            latitude: countryInfo.latitude,
            longitude: countryInfo.longitude,
          }
        : undefined,
      region: item.region,
      subregion: item.subregion,
      storageSlotsUsed: item.storageSlotsUsed,
      maxStorageSlots: item.maxStorageSlots,
    }
  })

  return nodes
}

/**
 * Sort storage node status.
 *
 * @param statusA
 * @param statusB
 * @returns
 */
export function sortNodeStatus(
  statusA: StorageNodeStatus,
  statusB: StorageNodeStatus
) {
  const statusOrder = ["active", "registering", "deregistering", "inactive"]

  return statusOrder.indexOf(statusA) - statusOrder.indexOf(statusB)
}
