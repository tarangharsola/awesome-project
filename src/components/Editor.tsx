import React, { useRef, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { EditorView, lineNumbers, highlightActiveLine } from '@codemirror/view';
import { defaultHighlightStyle } from '@codemirror/highlight';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { html } from '@codemirror/lang-html';
import { useKeyboardShortcuts } from '../utils/useKeyboardShortcuts';
import { useCollaboration } from '../hooks/useCollaboration';
import { Language } from '../types/editor';

type Props = {
  language: Language;
  roomId: string;
  userId: string;
};

export const Editor: React.FC<Props> = ({ language, roomId, userId }) => {
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const { doc, sendLocalChange } = useCollaboration(roomId, userId);

  const languageExtension = () => {
    switch (language) {
      case 'javascript':
        return javascript();
      case 'python':
        return python();
      case 'html':
        return html();
      default:
        return javascript();
    }
  };

  const extensions = [
    lineNumbers(),
    highlightActiveLine(),
    defaultHighlightStyle,
    languageExtension(),
    EditorView.updateListener.of((v) => {
      if (v.docChanged) {
        const newValue = v.state.doc.toString();
        sendLocalChange(newValue);
      }
    })
  ];

  const handleSave = () => {
    console.log('Save shortcut triggered');
    // Placeholder for actual save logic (e.g., persisting to server)
  };

  const handleFormat = () => {
    // Simple formatting: trim trailing whitespace on each line
    const formatted = doc.replace(/[ \t]+$/gm, '');
    if (formatted !== doc) {
      sendLocalChange(formatted);
    }
  };

  useKeyboardShortcuts(editorContainerRef.current, { onSave: handleSave, onFormat: handleFormat });

  useEffect(() => {
    // Any side‑effects when the document changes can be handled here.
  }, [doc]);

  return (
    <div className="editor-wrapper" ref={editorContainerRef} style={{ height: '100%' }}>
      <CodeMirror
        value={doc}
        extensions={extensions}
        onChange={(value) => sendLocalChange(value)}
        height="100%"
        theme="dark"
      />
    </div>
  );
};

export default Editor;
