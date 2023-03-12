import { authStatusBlockNumTestSuite } from './authStatusBlockNum.testSuite';
import { authLoginTestSuite } from './login.testSuite';
import { authRefreshTokenTestSuite } from './refreshToken.testSuite';

export const authTestSuite = () => {
  authLoginTestSuite();
  authRefreshTokenTestSuite();
  authStatusBlockNumTestSuite();
};
