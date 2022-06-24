export class ClaimHandleResult {
  isSuccessful: boolean;
  details?: string;
  claimId?: string;

  static Success(claimId: string): ClaimHandleResult {
    return { isSuccessful: true, claimId: claimId };
  }

  static Failure(details: string): ClaimHandleResult {
    return { isSuccessful: false, details: details };
  }
}
