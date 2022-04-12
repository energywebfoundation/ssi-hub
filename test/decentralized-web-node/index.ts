import { decentralizedWebNodeQueryMessageSuite } from './query-message.testSuite';
import { decentralizedWebNodeWriteMessageTestSuite } from './write-message.testSuite';

export const decentralizedWebNodeTestSuite = () => {
  describe('Decentralized web node (version: 1)', () => {
    describe('Query message', decentralizedWebNodeQueryMessageSuite);
    describe('Write message', decentralizedWebNodeWriteMessageTestSuite);
  });
};
