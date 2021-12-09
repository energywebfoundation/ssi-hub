export class MalformedDIDError extends Error {
  constructor(did: string) {
    super(`Malformed did ${did}`);
  }
}
