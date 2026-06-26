{"import React, { useState, useEffect } from 'react';
import { useEditor } from '../utils/useEditor';
import { useWebSocket } from '../utils/useWebSocket';
import { useUsers } from '../utils/useUsers';
import { useCursor } from '../utils/useCursor';

interface Props {
  language: string;
}

const Editor = ({ language }: Props) => {
  const [code, setCode] = useState('');
  const { send, receive } = useWebSocket();
  const { users } = useUsers();
  const { cursor } = useCursor();
  const { language: lang } = useLanguage();

  useEffect(() => {
    if (lang === language) {
      setCode(receive);
    }
  }, [lang, language, receive]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    send(newCode);
  }

  return (
    <div style={{
      position: 'relative',
      height: 500,
      overflow: 'auto'
    }}>
      <div style={{
        position: 'absolute',
        left: cursor.x,
        top: cursor.y,
        width: 2,
        height: 20,
        backgroundColor: cursor.color,
        zIndex: 1
      }}/>
      <textarea
        value={code}
        onChange={(e) => handleCodeChange(e.target.value)}
        style={{
          width: '100%',
          height: '100%',
          padding: 10,
          fontSize: 12,
          fontFamily: 'monospace'
        }}
      />
    </div>
  );
}

export default Editor;