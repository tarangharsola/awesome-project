import { Reducer } from 'react';
import ConflictResolver from '../utils/useConflictResolver';
import { DocumentChange } from '../utils/conflictResolver/types';

export interface EditorState {
  resolver: ConflictResolver;
  cursorPosition: number;
}

export type EditorAction =
  | { type: 'LOCAL_EDIT'; ops: DocumentChange['ops'] }
  | { type: 'REMOTE_CHANGE'; change: DocumentChange }
  | { type: 'SET_CURSOR'; position: number };

export const initialState: EditorState = {
  resolver: new ConflictResolver(),
  cursorPosition: 0,
};

export const editorReducer: Reducer<EditorState, EditorAction> = (state, action) => {
  switch (action.type) {
    case 'LOCAL_EDIT': {
      // Produce a local change; actual broadcasting is handled elsewhere
      state.resolver.generateLocalChange(action.ops);
      return { ...state };
    }
    case 'REMOTE_CHANGE': {
      state.resolver.applyRemote(action.change);
      return { ...state };
    }
    case 'SET_CURSOR':
      return { ...state, cursorPosition: action.position };
    default:
      return state;
  }
};
