{"import { Action } from './types';

export const JOIN_ROOM = 'JOIN_ROOM';
export const LEAVE_ROOM = 'LEAVE_ROOM';
export const UPDATE_ROOM = 'UPDATE_ROOM';

export const joinRoom = (id: string): Action => ({
  type: JOIN_ROOM,
  id,
});

export const leaveRoom = (id: string): Action => ({
  type: LEAVE_ROOM,
  id,
});

export const updateRoom = (id: string, users: any[]): Action => ({
  type: UPDATE_ROOM,
  id,
  users,
});