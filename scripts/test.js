// Jest configuration
const jest = require('jest');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transform: {
    '\.ts$': 'ts-jest',
    '\.tsx$': 'ts-jest',
    '\.js$': 'babel-jest',
    '\.jsx$': 'babel-jest'
  }
};