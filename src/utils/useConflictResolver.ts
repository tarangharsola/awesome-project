import { useReducer } from 'react';
import conflictReducer from './conflictReducer';

const useConflictResolver = () => {
   const [conflicts, dispatch] = useReducer(conflictReducer, {});

   return { conflicts, dispatch };
};

export default useConflictResolver;