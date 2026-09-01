import React, { useEffect, useState, useCallback } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/python/python';
import 'codemirror/mode/htmlmixed/htmlmixed';
import useKeyboardShortcuts from '../hooks/useKeyboardShortcuts';
import formatCode from '../utils/formatCode';
import { getExtensions } from '../utils/editorExtensions';
import './Editor.css';

interface EditorProps {
  language: string;
  socket: WebSocket | null;
  awareness: any;
}

const Editor: React.FC<EditorProps> = ({ language, socket, awareness }) => {
  const [content, setContent] = useState<string>('');

  const handleChange = (editor: any, data: any, value: string) => {
    setContent(value);
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: 'content-update', payload: { content: value } }));
    }
  };

  const formatCurrent = useCallback(() => {
    const formatted = formatCode(content, language);
    setContent(formatted);
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: 'content-update', payload: { content: formatted } }));
    }
  }, [content, language, socket]);

  useKeyboardShortcuts(formatCurrent);

  // Re‑render CodeMirror when language changes to update mode
  useEffect(() => {
    // No additional side‑effects needed; mode option reacts to prop change.
  }, [language]);

  return (
    <div className="editor-container">
      <CodeMirror
        value={content}
        options={{
          mode:
            language === 'javascript'
              ? 'javascript'
              : language === 'python'
              ? 'python'
              : 'htmlmixed',
          theme: 'material',
          lineNumbers: true,
          ...getExtensions(language),
        }}
        onBeforeChange={handleChange}
      />
    </div>
  );
};

export default Editor;
