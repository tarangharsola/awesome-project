{"import React, { useState, useEffect } from 'react';
import { useEditor } from '../utils/useEditor';
import { useWebSocket } from '../utils/useWebSocket';
import { useUsers } from '../utils/useUsers';
import { useLanguage } from '../utils/useLanguage';
import { CursorTracker } from './CursorTracker';

interface Props {
  language: string;
  onCodeChange: (code: string) => void;
}

const Editor: React.FC<Props> = ({ language, onCodeChange }) => {
  const [code, setCode] = useState('');
  const { users, addUser, removeUser } = useUsers();
  const { language: currentLanguage } = useLanguage();
  const { sendCode } = useWebSocket();
  const { cursor } = useEditor();

  useEffect(() => {
    if (currentLanguage === language) {
      setCode(code);
    }
  }, [currentLanguage, language, code]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    onCodeChange(newCode);
    sendCode(newCode);
  };

  return (
    <div style={{
      position: 'relative',
      height: '100vh',
      overflow: 'auto'
    }}>
      <CursorTracker cursor={cursor} user={users[0].name} />
      <textarea
        value={code}
        onChange={(e) => handleCodeChange(e.target.value)}
        style={{
          width: '100%',
          height: '100%',
          padding: 10,
          fontSize: 14,
          fontFamily: 'monospace'
        }}
      />
    </div>
  );
}

export default Editor;