{"import { Action } from 'redux';

interface UpdateValueAction {
  type: 'update';
  value: string;
}

interface JoinRoomAction {
  type: 'joinRoom';
  username: string;
  color: string;
}

interface LeaveRoomAction {
  type: 'leaveRoom';
  username: string;
}

export const updateValue = (value: string): UpdateValueAction => ({ type: 'update', value });
export const joinRoom = (username: string, color: string): JoinRoomAction => ({ type: 'joinRoom', username, color });
export const leaveRoom = (username: string): LeaveRoomAction => ({ type: 'leaveRoom', username });
}