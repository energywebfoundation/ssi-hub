export interface IpfsConfig {
  host: string;
  port?: number;
  protocol?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  headers?: Record<string, any>;
}
