import { ClaimRequestDTO } from './claim.dto';

describe('ClaimRequestDTO', () => {

  const getBaseClaimRequest: () => Partial<ClaimRequestDTO> = () => {
    return {
      id: "1",
      claimIssuer: ["did:ethr:0x8E23B1a27c5aFf82aE0F498a462BB3f50520B222"],
      requester: "0xCdd1a89ca6AA9e63A4eF6DE8e612caFA802138C5",
      token: "somejwt",
      claimType: "myrole.org.iam.ewc",
    }
  }

  it('should create', async () => {
    const claimRequest = getBaseClaimRequest();
    claimRequest.claimTypeVersion = "1"
    const dto = await ClaimRequestDTO.create(claimRequest)
    expect(dto).toBeInstanceOf(ClaimRequestDTO)
  });

  it('should create from number claimTypeVersion', async () => {
    const claimRequest = getBaseClaimRequest();
    // Should be able to convert number to string
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    claimRequest.claimTypeVersion = 1
    const dto = await ClaimRequestDTO.create(claimRequest)
    expect(dto).toBeInstanceOf(ClaimRequestDTO)
  });

  /**
   * Legacy role defintions (prior to RoleDefinitionResolver)
   * has versions like "1.0.0", "2.0.0", etc
   */
  it('should create from legacy claimTypeVersion', async () => {
    const claimRequest = getBaseClaimRequest();
    claimRequest.claimTypeVersion = "1.0.0"
    const dto = await ClaimRequestDTO.create(claimRequest)
    expect(dto).toBeInstanceOf(ClaimRequestDTO)
  });
});
