// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import UserList from '../UserList';

describe('UserList', () => {
  it('renders correctly', () => {
    const wrapper = render(<UserList users={[]} />);
    expect(wrapper).toMatchSnapshot();
  });
});