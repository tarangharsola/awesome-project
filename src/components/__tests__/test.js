const { JSDOM } = require('jsdom');
const { test, expect } = require('@jest/globals');
const dom = new JSDOM();
const document = dom.window.document;

test('basic test', () => {
  expect(true).toBe(true);
});