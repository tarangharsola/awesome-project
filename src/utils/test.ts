{"import { describe, it } from 'jest';
import { App } from './App';

describe('App', () => {
  it('renders correctly', () => {
    const app = new App();
    expect(app).toMatchSnapshot();
  });
});"