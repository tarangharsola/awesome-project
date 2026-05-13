{"import { useStore } from 'react-redux';
import { EditorState } from './editorReducerTypes';

const useEditor = () => {
  const store = useStore();
  const editorState = store.getState().editorState;
  return editorState;
};

export default useEditor;