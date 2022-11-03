import { authStatusTestSuite } from './authStatus.testSuite';
import { authLoginTestSuite } from './login.testSuite';
import { authRefreshTokenTestSuite } from './refreshToken.testSuite';

export const authTestSuite = () => {
  authLoginTestSuite();
  authRefreshTokenTestSuite();
  authStatusTestSuite();
};
