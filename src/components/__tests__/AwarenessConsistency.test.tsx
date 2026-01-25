// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import AwarenessConsistency from '../AwarenessConsistency';

describe('AwarenessConsistency', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<AwarenessConsistency />);
    expect(wrapper).toMatchSnapshot();
  });
});