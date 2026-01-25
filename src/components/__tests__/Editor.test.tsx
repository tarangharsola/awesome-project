// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import Editor from '../Editor';

describe('Editor', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Editor />);
    expect(wrapper).toMatchSnapshot();
  });
});