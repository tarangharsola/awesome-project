{"import { test } from 'jest';

test('editor works', () => {
  const editor = new Editor();
  expect(editor.value).toBe('');
});

test('cursor tracker works', () => {
  const cursorTracker = new CursorTracker();
  expect(cursorTracker.x).toBe(0);
});

test('user list works', () => {
  const userList = new UserList();
  expect(userList.users).toEqual([]);
});

test('conflict resolver works', () => {
  const conflictResolver = new ConflictResolver();
  expect(conflictResolver.ot).toBeInstanceOf(OperationalTransformation);
});

test('reconnection handler works', () => {
  const reconnectionHandler = new ReconnectionHandler();
  expect(reconnectionHandler.ws).toBeInstanceOf(WebSocket);
});
