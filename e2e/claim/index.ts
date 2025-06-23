import { claimWithRequestTestSuite } from './claim-with-request.testSuite';
import { claimWithoutRequestTestSuite } from './claim-without-request.testSuite';

export const claimTestSuite = () => {
  describe('Claim (version: 1)', () => {
    describe('Claim with request', claimWithRequestTestSuite);
    describe('Claim without request', claimWithoutRequestTestSuite);
  });
};
