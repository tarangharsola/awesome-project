{"import { createAction } from 'redux-actions';

export const JOIN_ROOM = 'JOIN_ROOM';
export const LEAVE_ROOM = 'LEAVE_ROOM';

export const joinRoom = createAction(JOIN_ROOM);
export const leaveRoom = createAction(LEAVE_ROOM);

export default {
  joinRoom,
  leaveRoom
};