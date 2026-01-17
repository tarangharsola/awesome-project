import React from 'react';
import { render } from '@testing-library/react';
import UserList from '../UserList';

describe('UserList component', () => {
  it('renders user list', () => {
    const { getByText } = render(<UserList users={[]} />);
    expect(getByText('Users')).toBeInTheDocument();
  });
});