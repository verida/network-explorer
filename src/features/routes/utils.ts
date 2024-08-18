export function getRootPageRoute() {
  return `/`
}

export function getIdentitiesPageRoute() {
  return `/identities`
}

export function getIdentityPageRoute({ did }: { did: string }) {
  return `/identities/${did}`
}

export function getNodesPageRoute() {
  return `/network`
}

export function getNodePageRoute({ nodeId }: { nodeId: string }) {
  return `/network/nodes/${nodeId}`
}
