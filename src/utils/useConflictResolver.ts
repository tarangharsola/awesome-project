{"import { useState, useEffect } from 'react';
import { useEditor } from './useEditor';
import { useUsers } from './useUsers';

const useConflictResolver = () => {
  const { editorState, setEditorState } = useEditor();
  const { users, setUsers } = useUsers();

  useEffect(() => {
    const handleUserUpdate = (user) => {
      if (user.type === 'update') {
        const { cursorPosition, selection } = user.data;
        const { cursorPosition: editorCursorPosition, selection: editorSelection } = editorState;

        if (cursorPosition !== editorCursorPosition || selection !== editorSelection) {
          setEditorState({
            cursorPosition,
            selection,
          });
        }
      }
    };

    setUsers((prevUsers) => {
      return prevUsers.map((user) => {
        if (user.id === user.id) {
          return {
            ...user,
            type: 'update',
            data: {
              cursorPosition: user.cursorPosition,
              selection: user.selection,
            },
          };
        }
        return user;
      });
    });
  }, [editorState, setEditorState, users, setUsers]);

  return {
    editorState,
    setEditorState,
    users,
    setUsers,
  };
};

export default useConflictResolver;