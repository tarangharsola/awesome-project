// Jest configuration
const jest = require('jest');
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
  transform: {
    '^.+\.(js|jsx|ts|tsx)$': 'ts-jest',
  },
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'text', 'lcov', 'clover'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  testEnvironmentOptions: {
    url: 'http://localhost:3000',
  },
};