import { IPFSService } from './ipfs.service';

describe('IPFSService', () => {
  it('should check valid IPFS cid', async () => {
    // CID v0
    expect(
      IPFSService.isCID('QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR')
    ).toBeTruthy();

    // CID v1
    expect(
      IPFSService.isCID(
        'bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi'
      )
    ).toBeTruthy();

    // Invalid CID
    expect(IPFSService.isCID({ foo: 'bar' })).toBeFalsy();

    // Invalid CID
    expect(IPFSService.isCID('random-string')).toBeFalsy();

    // Invalid CID
    expect(IPFSService.isCID(null)).toBeFalsy();
  });
});
