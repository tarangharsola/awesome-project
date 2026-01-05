// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import Editor from '../Editor';

describe('Editor', () => {
  it('renders correctly', () => {
    const wrapper = render(<Editor />);
    expect(wrapper).toMatchSnapshot();
  });
});