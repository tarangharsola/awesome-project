const { JSDOM } = require('jsdom');
const { join } = require('path');
const { readFileSync } = require('fs');

const dom = new JSDOM(readFileSync(join(__dirname, 'index.html'), 'utf8'));
const document = dom.window.document;

const editor = document.querySelector('#editor');
const cursorTracker = document.querySelector('#cursor-tracker');
const userList = document.querySelector('#user-list');

editor.innerHTML = 'Hello World!';
