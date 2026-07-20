const { test } = require('tape');
const App = require('./components/App').default;

test('App renders without errors', function(t) {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = '<App />';
  t.equal(wrapper.querySelector('div').textContent, '');
  t.end();
});