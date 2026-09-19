import React, { useEffect, useRef } from 'react';
import * as monaco from 'monaco-editor';
import useFormattingDefaults from '../utils/useFormattingDefaults';
import useKeyboardShortcuts from '../utils/useKeyboardShortcuts';
import formatCode from '../utils/formatCode';
import './Editor.css';

type Props = {
  language: string;
  socket: WebSocket | null;
};

const Editor: React.FC<Props> = ({ language, socket }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  // Apply language‑specific formatting defaults
  const formattingOptions = useFormattingDefaults(language);

  // Initialize Monaco editor
  useEffect(() => {
    if (containerRef.current && !editorRef.current) {
      editorRef.current = monaco.editor.create(containerRef.current, {
        value: '',
        language,
        theme: 'vs-dark',
        automaticLayout: true,
        ...formattingOptions,
      });
    } else if (editorRef.current) {
      monaco.editor.setModelLanguage(editorRef.current.getModel()!, language);
    }
  }, [language, formattingOptions]);

  // Keyboard shortcuts: Save (Ctrl/Cmd+S) and Format (Ctrl/Cmd+Shift+F)
  const handleSave = () => {
    const code = editorRef.current?.getValue() ?? '';
    navigator.clipboard.writeText(code).catch(() => {});
  };

  const handleFormat = async () => {
    const code = editorRef.current?.getValue() ?? '';
    try {
      const formatted = await formatCode(code, language);
      editorRef.current?.setValue(formatted);
    } catch (e) {
      console.error('Formatting failed', e);
    }
  };

  useKeyboardShortcuts(editorRef.current, { save: handleSave, format: handleFormat });

  // Basic WebSocket sync (simplified for illustration)
  useEffect(() => {
    if (!socket || !editorRef.current) return;
    const editor = editorRef.current;
    const model = editor.getModel();
    if (!model) return;

    const onMessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      if (data.type === 'content' && typeof data.payload === 'string') {
        const current = model.getValue();
        if (current !== data.payload) {
          model.pushEditOperations([], [{ range: model.getFullModelRange(), text: data.payload }]);
        }
      }
    };
    socket.addEventListener('message', onMessage);

    const onChange = () => {
      const content = model.getValue();
      socket.send(JSON.stringify({ type: 'content', payload: content }));
    };
    const disposable = model.onDidChangeContent(onChange);

    return () => {
      socket.removeEventListener('message', onMessage);
      disposable.dispose();
    };
  }, [socket, language]);

  return <div className="editor-container" ref={containerRef} />;
};

export default Editor;
