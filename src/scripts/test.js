// Import required modules
const { test, expect } = require('jest');

// Test App component
test('renders App component', () => {
  const { getByText } = render(<App />);
  expect(getByText('Collaborative Code Editor')).toBeInTheDocument();
});