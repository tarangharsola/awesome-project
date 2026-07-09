// Import required modules
const { test, expect } = require('jest');

// Define test suite
describe('App', () => {
  it('renders correctly', () => {
    const app = new App();
    expect(app.render()).toMatchSnapshot();
  });
});
