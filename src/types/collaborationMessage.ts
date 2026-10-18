export type DocChangeMessage = {
  type: 'doc-change';
  payload: {
    ops: any[];
    version: number;
  };
};

export type CursorUpdateMessage = {
  type: 'cursor-update';
  payload: {
    userId: string;
    position: number;
    selection?: {
      start: number;
      end: number;
    };
  };
};

export type PresenceMessage = {
  type: 'presence';
  payload: {
    userId: string;
    username: string;
    color: string;
    status: 'join' | 'leave';
  };
};

export type CollaborationMessage = DocChangeMessage | CursorUpdateMessage | PresenceMessage;
