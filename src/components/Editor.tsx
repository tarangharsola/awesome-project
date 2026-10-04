import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { updateDocument } from '../store/editorActions';
import { useWebSocket } from '../hooks/useWebSocket';
import { useKeyboardShortcuts } from '../utils/useKeyboardShortcuts';
import { getDefaultFormattingOptions } from '../utils/editorHelpers';

const Editor: React.FC = () => {
  const dispatch = useDispatch();
  const { content, language } = useSelector((state: RootState) => state.editor);
  const editorRef = useRef<HTMLDivElement>(null);
  const ws = useWebSocket();

  // Initialize editor (using Monaco as example)
  useEffect(() => {
    if (!editorRef.current) return;
    const monaco = (window as any).monaco;
    const editorInstance = monaco.editor.create(editorRef.current, {
      value: content,
      language,
      theme: 'vs-dark',
      automaticLayout: true,
      formatOnPaste: true,
      formatOnType: true,
      ...getDefaultFormattingOptions(language),
    });

    const model = editorInstance.getModel();
    const changeDisposable = model.onDidChangeContent(() => {
      const newValue = model.getValue();
      dispatch(updateDocument(newValue));
      ws?.send(JSON.stringify({ type: 'content', payload: newValue }));
    });

    const languageDisposable = editorInstance.onDidChangeModelLanguage(() => {
      const newLang = editorInstance.getModel()?.getModeId() || language;
      // No extra action needed; Redux already holds language
    });

    return () => {
      changeDisposable.dispose();
      languageDisposable.dispose();
      editorInstance.dispose();
    };
  }, [editorRef, language]);

  // Apply remote updates
  useEffect(() => {
    if (!ws) return;
    const handleMessage = (event: MessageEvent) => {
      const msg = JSON.parse(event.data);
      if (msg.type === 'content' && msg.payload !== content) {
        dispatch(updateDocument(msg.payload));
      }
    };
    ws.addEventListener('message', handleMessage);
    return () => ws.removeEventListener('message', handleMessage);
  }, [ws, content]);

  // Keyboard shortcuts
  useKeyboardShortcuts(editorRef);

  return <div ref={editorRef} className="editor-container" />;
};

export default Editor;