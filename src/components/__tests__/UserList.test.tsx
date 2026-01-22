// Import required modules
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import UserList from './UserList';

// Test the component
describe('UserList', () => {
  it('renders correctly', () => {
    const { getByText } = render(<UserList />);
    expect(getByText('User List')).toBeInTheDocument();
  });
});