// Jest configuration
const jest = require('jest');
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  transform: {
    '^.+\.(ts|tsx)$': 'ts-jest',
  },
  transformIgnorePatterns: ['node_modules/'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'text', 'lcov', 'clover'],
  setupFilesAfterEnv: ['<rootDir>/src/scripts/setupTests.ts']
};