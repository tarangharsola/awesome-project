// Jest configuration
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/scripts/setupTests.js"]
};

// Test suite
describe('App', () => {
  it('renders correctly', () => {
    const tree = render(<App />);
    expect(tree).toMatchSnapshot();
  });
});