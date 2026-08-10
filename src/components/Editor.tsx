{"import React, { useState, useEffect } from 'react';
import { useEditor } from '../utils/useEditor';

interface Props {
  roomId: string;
  initialCode: string;
}

const Editor = ({ roomId, initialCode }: Props) => {
  const [code, setCode] = useState(initialCode);
  const { sendCode, cursors, users } = useEditor(roomId);

  useEffect(() => {
    sendCode(code);
  }, [code]);

  return (
    <div>
      <textarea value={code} onChange={(e) => setCode(e.target.value)} />
      <div>
        {cursors.map((cursor, index) => (
          <div key={index} style={{
            position: 'absolute',
            left: cursor.position[0],
            top: cursor.position[1],
            width: 2,
            height: 20,
            backgroundColor: users[index].color,
          }} />
        ))}
      </div>
    </div>
  );
}

export default Editor;