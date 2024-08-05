/**
 * ProfileDocument is the raw data structure that is stored in the Verida database.
 *
 * Not exhaustive here.
 */
export type ProfileDocument = {
  name?: string
  avatar?: {
    uri?: string
  }
  description?: string
  country?: string
  website?: string
  modifiedAt?: string
}

/**
 * Optimised Profile for the application, subset and restructured version of a
 *  ProfileDocument.
 */
export type Profile = {
  name?: string
  avatarUri?: string | undefined
  country?: string
  description?: string
}
