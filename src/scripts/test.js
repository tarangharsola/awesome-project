// eslint-disable-next-line
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { App } from '../components/App';

describe('App', () => {
  it('renders without crashing', () => {
    const app = new App();
    expect(app).to.be.ok;
  });
});