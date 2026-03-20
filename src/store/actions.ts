{"import { createAction } from 'redux-actions';

export const ADD_USER = createAction('ADD_USER', (user: { id: string; name: string }) => user);
export const REMOVE_USER = createAction('REMOVE_USER', (userId: string) => userId);