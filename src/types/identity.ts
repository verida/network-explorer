export type Identity = {
  did: string;
  createdAt: string;
  name?: string;
  avatarUri?: string | undefined;
  country?: string;
  description?: string;
};

export interface Profile {
  avatar: { uri: string };
  name: string;
  did?: string;
  description?: string;
  country: string;
}
