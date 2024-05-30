export interface Profile {
  avatar: { uri: string };
  name: string;
  did?: string;
  description?: string;
  country: string;
}
