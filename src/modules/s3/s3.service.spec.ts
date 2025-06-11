import { S3Service } from './s3.service';

describe('IPFSService', () => {
  it('should check valid IPFS cid', async () => {
    // CID v0
    expect(
      S3Service.isCID('QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR')
    ).toBeTruthy();

    // CID v1
    expect(
      S3Service.isCID(
        'bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi'
      )
    ).toBeTruthy();

    // Invalid CID
    expect(S3Service.isCID({ foo: 'bar' })).toBeFalsy();

    // Invalid CID
    expect(S3Service.isCID('random-string')).toBeFalsy();

    // Invalid CID
    expect(S3Service.isCID(null)).toBeFalsy();
  });
});
