module.exports = {
  displayName: 'api',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
      },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/apps/api',
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.spec.ts',
    '!src/main.ts',
  ],
  // Integration tests use a real DB — run sequentially to avoid schema conflicts
  maxWorkers: 1,
  globalSetup: '<rootDir>/test/global-setup.js',
  globalTeardown: '<rootDir>/test/global-teardown.js',
  testTimeout: 30000,
};
