const { execSync } = require('child_process');
const { test } = require('tap');

module.exports = function ci() {
  test('editor is rendered', async (t) => {
    const { browser } = await getBrowser();
    const page = await browser.newPage();
    await page.goto('http://localhost:3000');
    const editor = await page.$('#editor');
    t.ok(editor);
  });
};