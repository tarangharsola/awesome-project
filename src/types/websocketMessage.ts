export enum MessageType {
  Presence = 'presence',
  Edit = 'edit',
  Cursor = 'cursor',
  Init = 'init',
  Ack = 'ack'
}

export interface BaseMessage {
  type: MessageType;
  payload: unknown;
  roomId: string;
  senderId: string;
}

export interface PresenceMessage extends BaseMessage {
  type: MessageType.Presence;
  payload: {
    username: string;
    color: string;
  };
}

export interface EditMessage extends BaseMessage {
  type: MessageType.Edit;
  payload: {
    ops: any[];
  };
}

export interface CursorMessage extends BaseMessage {
  type: MessageType.Cursor;
  payload: {
    line: number;
    ch: number;
  };
}

export type WebSocketMessage = PresenceMessage | EditMessage | CursorMessage | BaseMessage;