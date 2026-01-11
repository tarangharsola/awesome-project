{"import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import UserList from './UserList';

describe('UserList', () => {
  it('renders correctly', () => {
    const { getByText } = render(<UserList />);
    expect(getByText('User List')).toBeInTheDocument();
  });
});