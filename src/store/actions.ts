{"import { Action } from 'redux';

interface JoinAction {
  type: 'join';
  data: { id: string; name: string; cursor: { x: number; y: number; };
}
}

interface LeaveAction {
  type: 'leave';
  data: { id: string; name: string; cursor: { x: number; y: number; };
}
}

interface UpdateAction {
  type: 'update';
  data: string;
}

export const join = (data: JoinAction['data']): JoinAction => ({
  type: 'join',
  data
});

export const leave = (data: LeaveAction['data']): LeaveAction => ({
  type: 'leave',
  data
});

export const update = (data: UpdateAction['data']): UpdateAction => ({
  type: 'update',
  data
});