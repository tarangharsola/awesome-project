// eslint-disable-next-line
import { describe, it } from 'mocha';
import { expect } from 'chai';

describe('App', () => {
  it('should render without errors', () => {
    const app = new App();
    expect(app.render()).to.be.ok;
  });
});