{"import { useReducer } from 'react';
import { editorReducer } from './editorReducer';

const useConflictResolver = () => {
  const [state, dispatch] = useReducer(editorReducer, {});
  return [state, dispatch];
};

export default useConflictResolver;