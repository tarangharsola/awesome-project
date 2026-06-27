const { test } = require('tape');
const App = require('./App');

test('App renders correctly', function(t) {
  const app = new App();
  t.ok(app.render(), 'App renders correctly');
  t.end();
});