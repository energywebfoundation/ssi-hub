export class ClaimHandleResult {
  isSuccessful: boolean;
  details?: string;
  static Success(): ClaimHandleResult {
    return { isSuccessful: true };
  }

  static Failure(details: string): ClaimHandleResult {
    return { isSuccessful: false, details: details };
  }
}
