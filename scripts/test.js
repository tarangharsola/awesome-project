const { test } = require('tap');
const { startServer } = require('./main');

module.exports = function test() {
  test('editor is rendered', async (t) => {
    const { browser } = await getBrowser();
    const page = await browser.newPage();
    await page.goto('http://localhost:3000');
    const editor = await page.$('#editor');
    t.ok(editor);
  });
};