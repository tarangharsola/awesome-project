{"import React from 'react';
import { useEditor } from './useEditor';

interface ConflictResolverProps {
  editor: useEditor;
}

const ConflictResolver = ({ editor }: ConflictResolverProps) => {
  const { state, dispatch } = editor;
  const { operations } = state;

  const handleOperation = (operation: any) => {
    dispatch({ type: 'APPLY_OPERATION', payload: operation });
  };

  return (
    <div>
      {operations.map((operation, index) => (
        <div key={index} style={{
          position: 'absolute',
          left: operation.x,
          top: operation.y,
          width: 2,
          height: 2,
          backgroundColor: operation.color
        }}>
        </div>
      ))}
    </div>
  );

  return handleOperation;
};

export default ConflictResolver;