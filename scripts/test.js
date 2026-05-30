// eslint-disable-next-line
import { describe, it, expect } from 'expect';
import App from '../src/components/App';

describe('App', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });
});