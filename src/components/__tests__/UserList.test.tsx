// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import UserList from '../UserList';

describe('UserList', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<UserList />);
    expect(wrapper).toMatchSnapshot();
  });
});