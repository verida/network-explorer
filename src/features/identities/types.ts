import { DidDocument } from "@/features/did/types"
import { Profile } from "@/features/verida/types"

export type Identity = {
  did: string
  createdAt?: string
  didDocument: DidDocument
  profile: Profile | null
}
