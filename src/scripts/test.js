// eslint-disable-next-line
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { App } from '../components/App';

describe('App', () => {
  it('should render without errors', () => {
    const app = new App();
    expect(app).to.be.ok;
  });
});