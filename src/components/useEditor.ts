{"import { useState, useEffect } from 'react';

interface useEditorProps {
  editor: useEditor;
}

const useEditor = ({ editor }) => {
  const [value, setValue] = useState('');
  const [awareness, setAwareness] = useState([]);
  const [conflict, setConflict] = useState([]);
  const [users, setUsers] = useState([]);
  const [cursor, setCursor] = useState([]);
  useEffect(() => {
    const handleValueChange = () => {
      setValue(editor.getValue());
    };
    editor.on('valueChange', handleValueChange);
    return () => editor.off('valueChange', handleValueChange);
  }, [editor]);
  useEffect(() => {
    const handleAwarenessChange = () => {
      setAwareness(editor.getAwareness());
    };
    editor.on('awarenessChange', handleAwarenessChange);
    return () => editor.off('awarenessChange', handleAwarenessChange);
  }, [editor]);
  useEffect(() => {
    const handleConflictChange = () => {
      setConflict(editor.getConflict());
    };
    editor.on('conflictChange', handleConflictChange);
    return () => editor.off('conflictChange', handleConflictChange);
  }, [editor]);
  useEffect(() => {
    const handleUsersChange = () => {
      setUsers(editor.getUsers());
    };
    editor.on('usersChange', handleUsersChange);
    return () => editor.off('usersChange', handleUsersChange);
  }, [editor]);
  useEffect(() => {
    const handleCursorChange = () => {
      setCursor(editor.getCursor());
    };
    editor.on('cursorChange', handleCursorChange);
    return () => editor.off('cursorChange', handleCursorChange);
  }, [editor]);
  return {
    value,
    awareness,
    conflict,
    users,
    cursor,
    setValue,
    setAwareness,
    setConflict,
    setUsers,
    setCursor,
  };
};

export default useEditor;