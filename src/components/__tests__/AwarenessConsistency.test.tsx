// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import AwarenessConsistency from '../AwarenessConsistency';

describe('AwarenessConsistency', () => {
  it('renders correctly', () => {
    const wrapper = render(<AwarenessConsistency />);
    expect(wrapper).toMatchSnapshot();
  });
});