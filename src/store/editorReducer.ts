// src/store/editorReducer.ts
import { EditorActionTypes } from './actionTypes';
import { getFormattingDefaults } from '../utils/useFormattingDefaults';

export interface EditorState {
  content: string;
  language: string;
  formattingOptions: Record<string, any>;
  // ... other state fields
}

const initialState: EditorState = {
  content: '',
  language: 'javascript',
  formattingOptions: getFormattingDefaults('javascript'),
  // ... other initial values
};

export const editorReducer = (state = initialState, action: any): EditorState => {
  switch (action.type) {
    case EditorActionTypes.UPDATE_CONTENT:
      return { ...state, content: action.payload };
    case EditorActionTypes.SET_LANGUAGE:
      return {
        ...state,
        language: action.payload,
        formattingOptions: getFormattingDefaults(action.payload),
      };
    case EditorActionTypes.FORMAT_DOCUMENT:
      // The actual formatting is performed by the editor component using the stored options.
      // Here we simply trigger a state change to force a re-render if needed.
      return { ...state };
    // ... other cases
    default:
      return state;
  }
};
