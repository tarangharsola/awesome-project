{"import React, { useState, useEffect } from 'react';
import { useEditor } from '../utils/useEditor';

const Editor = () => {
  const [code, setCode] = useState('');
  const { editor, users } = useEditor();

  useEffect(() => {
    const handleChanges = (changes) => {
      setCode(changes.code);
    };
    editor.on('changes', handleChanges);
    return () => editor.off('changes', handleChanges);
  }, [editor]);

  return (
    <div>
      <textarea value={code} onChange={(e) => setCode(e.target.value)} />
      {users.map((user) => (
        <div key={user.id} style={{
          position: 'absolute',
          top: user.cursor.top,
          left: user.cursor.left,
          backgroundColor: user.color,
          width: 2,
          height: 20,
        }}>
          {user.name}
        </div>
      ))}
    </div>
  );
};

export default Editor;