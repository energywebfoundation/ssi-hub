export interface BaseEnsEntity {
  name: string;
  owner: string;
  namespace: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  definition: any;
}

export interface BaseEnsDefinition {
  description?: string;
  websiteUrl?: string;
  logoUrl?: string;
  others?: Record<string, unknown>;
}
