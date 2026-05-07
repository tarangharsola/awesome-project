{"import { useReducer } from 'react';
import conflictReducer from './conflictReducer';

const useConflictResolver = () => {
  const [conflict, dispatch] = useReducer(conflictReducer, {});
  return { conflict, dispatch };
};

export default useConflictResolver;