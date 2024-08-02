import { DIDDocument } from "did-resolver"

export type DidDocument = DIDDocument & {
  created?: string
  updated?: string
  versionId?: number
}
