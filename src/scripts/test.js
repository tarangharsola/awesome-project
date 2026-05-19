// eslint-disable-next-line
import { JSDOM } from 'jsdom';
import { join } from 'path';
import { existsSync } from 'fs';
import { test, expect } from 'uvu';
import { resolve } from 'path';
import { readFileSync } from 'fs';
import { renderToString } from 'react-dom/server';
import App from '../components/App';

const dom = new JSDOM();
const document = dom.window.document;

test('renders App component', async () => {
  const html = renderToString(<App />);
  const expected = readFileSync(join(__dirname, '../public/index.html'), 'utf8');
  expect(html).toBe(expected);
});

test('build script runs without errors', async () => {
  const buildScript = require('../scripts/build.js');
  await buildScript();
});

test('editor renders with syntax highlighting', async () => {
  const editor = require('../src/components/Editor');
  const html = renderToString(<editor />);
  const expected = readFileSync(join(__dirname, '../public/index.html'), 'utf8');
  expect(html).toBe(expected);
});

test('cursor tracker renders correctly', async () => {
  const cursorTracker = require('../src/components/CursorTracker');
  const html = renderToString(<cursorTracker />);
  const expected = readFileSync(join(__dirname, '../public/index.html'), 'utf8');
  expect(html).toBe(expected);
});

test('language selector renders correctly', async () => {
  const languageSelector = require('../src/components/LanguageSelector');
  const html = renderToString(<languageSelector />);
  const expected = readFileSync(join(__dirname, '../public/index.html'), 'utf8');
  expect(html).toBe(expected);
});

test('room component renders correctly', async () => {
  const room = require('../src/components/Room');
  const html = renderToString(<room />);
  const expected = readFileSync(join(__dirname, '../public/index.html'), 'utf8');
  expect(html).toBe(expected);
});

test('user list component renders correctly', async () => {
  const userList = require('../src/components/UserList');
  const html = renderToString(<userList />);
  const expected = readFileSync(join(__dirname, '../public/index.html'), 'utf8');
  expect(html).toBe(expected);
});

test('websocket component renders correctly', async () => {
  const websocket = require('../src/components/WebSocket');
  const html = renderToString(<websocket />);
  const expected = readFileSync(join(__dirname, '../public/index.html'), 'utf8');
  expect(html).toBe(expected);
});

test('use awareness hook renders correctly', async () => {
  const useAwareness = require('../src/components/useAwareness');
  const html = renderToString(<useAwareness />);
  const expected = readFileSync(join(__dirname, '../public/index.html'), 'utf8');
  expect(html).toBe(expected);
});

test('use conflict resolver hook renders correctly', async () => {
  const useConflictResolver = require('../src/components/useConflictResolver');
  const html = renderToString(<useConflictResolver />);
  const expected = readFileSync(join(__dirname, '../public/index.html'), 'utf8');
  expect(html).toBe(expected);
});

test('use cursor hook renders correctly', async () => {
  const useCursor = require('../src/components/useCursor');
  const html = renderToString(<useCursor />);
  const expected = readFileSync(join(__dirname, '../public/index.html'), 'utf8');
  expect(html).toBe(expected);
});

test('use editor hook renders correctly', async () => {
  const useEditor = require('../src/components/useEditor');
  const html = renderToString(<useEditor />);
  const expected = readFileSync(join(__dirname, '../public/index.html'), 'utf8');
  expect(html).toBe(expected);
});

test('use keyboard shortcuts hook renders correctly', async () => {
  const useKeyboardShortcuts = require('../src/components/useKeyboardShortcuts');
  const html = renderToString(<useKeyboardShortcuts />);
  const expected = readFileSync(join(__dirname, '../public/index.html'), 'utf8');
  expect(html).toBe(expected);
});

test('use language hook renders correctly', async () => {
  const useLanguage = require('../src/components/useLanguage');
  const html = renderToString(<useLanguage />);
  const expected = readFileSync(join(__dirname, '../public/index.html'), 'utf8');
  expect(html).toBe(expected);
});

test('use reconnection hook renders correctly', async () => {
  const useReconnection = require('../src/components/useReconnection');
  const html = renderToString(<useReconnection />);
  const expected = readFileSync(join(__dirname, '../public/index.html'), 'utf8');
  expect(html).toBe(expected);
});

test('use users hook renders correctly', async () => {
  const useUsers = require('../src/components/useUsers');
  const html = renderToString(<useUsers />);
  const expected = readFileSync(join(__dirname, '../public/index.html'), 'utf8');
  expect(html).toBe(expected);
});

test('use websocket hook renders correctly', async () => {
  const useWebSocket = require('../src/components/useWebSocket');
  const html = renderToString(<useWebSocket />);
  const expected = readFileSync(join(__dirname, '../public/index.html'), 'utf8');
  expect(html).toBe(expected);
});

test('editor reducer renders correctly', async () => {
  const editorReducer = require('../src/store/editorReducer');
  const html = renderToString(<editorReducer />);
  const expected = readFileSync(join(__dirname, '../public/index.html'), 'utf8');
  expect(html).toBe(expected);
});

test('user reducer renders correctly', async () => {
  const userReducer = require('../src/store/userReducer');
  const html = renderToString(<userReducer />);
  const expected = readFileSync(join(__dirname, '../public/index.html'), 'utf8');
  expect(html).toBe(expected);
});

test('users reducer renders correctly', async () => {
  const usersReducer = require('../src/store/usersReducer');
  const html = renderToString(<usersReducer />);
  const expected = readFileSync(join(__dirname, '../public/index.html'), 'utf8');
  expect(html).toBe(expected);
});

test('build script runs without errors', async () => {
  const buildScript = require('../scripts/build.js');
  await buildScript();
});
