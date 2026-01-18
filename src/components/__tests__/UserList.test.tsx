import React from 'react';
import { render } from '@testing-library/react';
import UserList from '../UserList';

describe('UserList', () => {
  it('renders user list component', () => {
    const { getByText } = render(<UserList />);
    expect(getByText('User List')).toBeInTheDocument();
  });
});