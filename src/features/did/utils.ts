export function extractAndShortenAddress(did: string): string {
  // Split the DID string by colons
  const parts = did.split(":")

  // Check if the DID is in the expected format
  if (parts.length === 4 && parts[0] === "did" && parts[1] === "vda") {
    const address = parts[3]
    return `${address.slice(0, 6)}...${address.slice(-6)}`
  } else {
    throw new Error("Invalid DID format")
  }
}
