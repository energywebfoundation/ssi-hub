import { Signer, providers, utils } from 'ethers';
import base64url from 'base64url';

export const getIdentityToken = async (
  provider: providers.Provider,
  signer: Signer
) => {
  const [address, blockNumber] = await Promise.all([
    signer.getAddress(),
    provider.getBlockNumber(),
  ]);

  const { arrayify, keccak256 } = utils;
  const header = {
    alg: 'ES256',
    typ: 'JWT',
  };

  const payload = {
    iss: `did:ethr:volta:${address}`,
    claimData: {
      blockNumber,
    },
  };

  const encodedHeader = base64url(JSON.stringify(header));
  const encodedPayload = base64url(JSON.stringify(payload));
  const msg = `0x${Buffer.from(`${encodedHeader}.${encodedPayload}`).toString(
    'hex'
  )}`;
  const sig = await signer.signMessage(arrayify(keccak256(msg)));
  const encodedSignature = base64url(sig);
  return `${encodedHeader}.${encodedPayload}.${encodedSignature}`;
};
