{"import { Action } from 'redux';

export const JOIN = 'JOIN';
export const LEAVE = 'LEAVE';

export interface JoinAction {
  type: typeof JOIN;
  data: { code: string; users: string[]; room: string; }
}

export interface LeaveAction {
  type: typeof LEAVE;
  data: { code: string; users: string[]; room: string; }
}

export type ActionT = JoinAction | LeaveAction;