{"import { describe, it } from 'jest';
import { App } from './App';

describe('App', () => {
  it('renders correctly', () => {
    const wrapper = render(<App />);
    expect(wrapper).toMatchSnapshot();
  });
});"