import { vcMatchTestSuite } from './vc-match.testSuite';

export const verifiablePresentationTestSuite = () => {
  describe('Verifiable Presentation (version: 1)', () => {
    describe(
      'Match Verifiable Credential to presentation definition',
      vcMatchTestSuite
    );
  });
};
