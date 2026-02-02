// eslint-disable-next-line
import { JSDOM } from 'jsdom';
import { render } from 'react-dom';
import App from './App';

const dom = new JSDOM();
const document = dom.window.document;
const root = document.createElement('div');
root.setAttribute('id', 'root');
document.body.appendChild(root);
render(<App />, root);
