{"import { test } from 'jest';

describe('App', () => {
  it('renders correctly', () => {
    const wrapper = test.render(<App />);
    expect(wrapper).toMatchSnapshot();
  });
});"