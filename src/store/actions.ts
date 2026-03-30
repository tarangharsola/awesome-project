{"import { Action } from 'redux';

interface SetCursorAction {
  type: 'SET_CURSOR',
  cursor: { x: number; y: number; }
}

interface SetUsersAction {
  type: 'SET_USERS',
  users: { name: string; color: string }[],
}

export const setCursor = (cursor: { x: number; y: number }) => ({
  type: 'SET_CURSOR',
  cursor,
});

export const setUsers = (users: { name: string; color: string }[]) => ({
  type: 'SET_USERS',
  users,
});