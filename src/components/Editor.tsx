import React from 'react';
import { useEditor } from './useEditor';
import { useWebSocket } from './useWebSocket';

interface EditorProps {
  editor: any;
  webSocket: any;
}

const Editor: React.FC<EditorProps> = ({ editor, webSocket }) => {
  const { state, dispatch } = useEditor();
  const { send } = useWebSocket();

  const handleTextChange = (text: any) => {
    send({ type: 'textChange', text });
  };

  return (
    <div>
      <h2>Editor</h2>
      <textarea value={state.text} onChange={(e) => handleTextChange(e.target.value)} />
    </div>
  );
};

export default Editor;