const React = require('react');
const ReactDOMServer = require('react-dom/server');
const App = require('../src/components/App').default;

try {
  const html = ReactDOMServer.renderToString(React.createElement(App));
  console.log('Render successful');
  process.exit(0);
} catch (e) {
  console.error('Render failed', e);
  process.exit(1);
}