import React from 'react';
import { render } from '@testing-library/react';
import UserList from '../UserList';

it('renders UserList component', () => {
  const { getByText } = render(<UserList users={[]} />);
  expect(getByText('Users')).toBeInTheDocument();
});