import { ClaimRequestDTO } from './claim.dto';
import { RegistrationTypes } from './claim.types';

describe('ClaimRequestDTO', () => {

  const getBaseClaimRequest: () => Partial<ClaimRequestDTO> = () => {
    return {
      id: "1",
      claimIssuer: ["did:ethr:0x8E23B1a27c5aFf82aE0F498a462BB3f50520B222"],
      requester: "0xCdd1a89ca6AA9e63A4eF6DE8e612caFA802138C5",
      token: "somejwt",
      claimType: "myrole.org.iam.ewc",
      subjectAgreement: "<agreement token>",
      claimTypeVersion: "1",
      registrationTypes: []
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

  it('should rename from agreement to subjectAgreement', async () => {
    const claimRequest = getBaseClaimRequest();
    delete claimRequest.subjectAgreement
    claimRequest["agreement"] = "<agreement token>"
    const dto = await ClaimRequestDTO.create(claimRequest)
    expect(dto).toBeInstanceOf(ClaimRequestDTO)
    expect(dto.subjectAgreement).toBeDefined();
  });

  it('should create if subjectAgreement not provided', async () => {
    const claimRequest = getBaseClaimRequest();
    delete claimRequest.subjectAgreement
    const dto = await ClaimRequestDTO.create(claimRequest)
    expect(dto).toBeInstanceOf(ClaimRequestDTO)
  });

  it('should create from off-chain registrationType only', async () => {
    const claimRequest = getBaseClaimRequest();
    claimRequest.registrationTypes = [RegistrationTypes.OffChain]
    const dto = await ClaimRequestDTO.create(claimRequest)
    expect(dto).toBeInstanceOf(ClaimRequestDTO)
  });

  it('should create from on-chain registrationType only', async () => {
    const claimRequest = getBaseClaimRequest();
    claimRequest.registrationTypes = [RegistrationTypes.OnChain]
    const dto = await ClaimRequestDTO.create(claimRequest)
    expect(dto).toBeInstanceOf(ClaimRequestDTO)
  });

  it('should create from on-chain and off-chain registrationTypes', async () => {
    const claimRequest = getBaseClaimRequest();
    claimRequest.registrationTypes = [RegistrationTypes.OffChain, RegistrationTypes.OnChain]
    const dto = await ClaimRequestDTO.create(claimRequest)
    expect(dto).toBeInstanceOf(ClaimRequestDTO)
  });

  // This is so that addition of registrationTypes isn't breaking change
  it('should create if registrationTypes not provided', async () => {
    const claimRequest = getBaseClaimRequest();
    delete claimRequest.registrationTypes
    const dto = await ClaimRequestDTO.create(claimRequest)
    expect(dto).toBeInstanceOf(ClaimRequestDTO)
  });

  it('should fail for unknown registrationType', async () => {
    const claimRequest = getBaseClaimRequest();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    claimRequest.registrationTypes = ["NotRealRegistrationType"]
    await expect(ClaimRequestDTO.create(claimRequest)).rejects.toThrow
  });
});
