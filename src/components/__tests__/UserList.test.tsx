import React from 'react';
import UserList from '../UserList';
import { render } from '@testing-library/react';

it('renders UserList component', () => {
  const { getByText } = render(<UserList />);
  expect(getByText('User List')).toBeInTheDocument();
});