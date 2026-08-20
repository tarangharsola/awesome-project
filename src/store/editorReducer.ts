import type { EditorState, EditorAction } from '../types';

export const initialEditorState: EditorState = {
  content: '',
  version: 0,
};

export default function editorReducer(state = initialEditorState, action: EditorAction): EditorState {
  switch (action.type) {
    case 'LOCAL_CHANGE': {
      const { delta, version } = action.payload;
      return {
        content: delta,
        version,
      };
    }
    case 'REMOTE_CHANGE': {
      const { delta, version } = action.payload;
      if (version > state.version) {
        return { content: delta, version };
      }
      // Stale remote change – ignore
      return state;
    }
    case 'RESET_DOCUMENT': {
      return { content: action.payload.content, version: 0 };
    }
    default:
      return state;
  }
}
