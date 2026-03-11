const jest = require('jest');

module.exports = {
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['node_modules'],
  transform: {
    '^.+\.tsx?$': 'ts-jest',
  },
};