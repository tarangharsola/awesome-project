// Jest configuration
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/utils/setupTests.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  moduleDirectories: ['node_modules', 'src/components', 'src/utils'],
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)(spec|test).ts?(x)'],
  transform: {
    '^.+\.(ts|tsx)$': 'ts-jest',
    '^.+\.(js|jsx)$': 'babel-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!(jest-)?@react-)/'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'lcov', 'text'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  modulePathIgnorePatterns: ['<rootDir>/src/utils/formatCode.ts'],
  modulePaths: ['<rootDir>/src/components', '<rootDir>/src/utils'],
  setupFilesAfterEnv: ['<rootDir>/src/utils/setupTests.ts'],
  testEnvironmentOptions: {
    url: 'http://localhost:3000',
  },
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    url: 'http://localhost:3000',
  },
  testPathIgnorePatterns: ['<rootDir>/src/utils/useConflictResolver.ts'],
  testRunner: 'jest-runner',
  testRunnerOptions: {
    config: '<rootDir>/jest.config.js',
  },
  transformIgnorePatterns: ['node_modules/(?!(jest-)?@react-)/'],
  transformOptions: {
    presets: ['@babel/preset-env', '@babel/preset-react'],
  },
  transformWithPreload: true,
  verbose: true,
  watchPathIgnorePatterns: ['<rootDir>/src/utils/useConflictResolver.ts'],
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
  watchUsePolling: true,
  watchOptions: {
    followSymlinks: true,
    ignoreNativeWarnings: true,
    ignoreUncoveredFiles: true,
    showTiming: true,
    updateDelay: 1000,
  },
  workerIdleTimeout: 1000,
  workerThreads: 2,
  workers: 2,
}