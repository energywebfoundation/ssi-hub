module.exports = {
  extends: ['@energyweb'],
  env: {
    es2021: true,
    node: true,
    jest: true,
  },
  parserOptions: {
    project: ['tsconfig.json', 'tsconfig.eslint.json'],
  },
};
