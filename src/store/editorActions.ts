import { EditorActionType } from "./actionTypes";

export interface UpdateDocAction {
  type: EditorActionType.UPDATE_DOC;
  payload: {
    ops: any[];
    version: number;
  };
}

export interface SetCursorAction {
  type: EditorActionType.SET_CURSOR;
  payload: {
    position: number;
  };
}

export type EditorAction = UpdateDocAction | SetCursorAction;
