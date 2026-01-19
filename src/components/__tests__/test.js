// eslint-disable-next-line
import { JSDOM } from 'jsdom';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const dom = new JSDOM();
const document = dom.window.document;

describe('App component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});