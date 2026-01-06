{"import React from 'react';
import { useState, useEffect } from 'react';
import Editor from './Editor';

const EditorWithKeyboardShortcuts = () => {
  const [code, setCode] = useState('');

  useEffect(() => {
    const handleCodeChange = (event) => {
      setCode(event.target.value);
    };

    document.addEventListener('codeChange', handleCodeChange);
    return () => {
      document.removeEventListener('codeChange', handleCodeChange);
    };
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === 'Ctrl+S') {
      handleSaveCode();
    } else if (event.key === 'Ctrl+Shift+F') {
      handleFormatCode();
    }
  };

  return (
    <div>
      <textarea value={code} onChange={(event) => setCode(event.target.value)} onKeyDown={handleKeyDown} />
    </div>
  );
};

export default EditorWithKeyboardShortcuts;