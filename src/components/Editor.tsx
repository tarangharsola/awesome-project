import React, { useRef } from 'react';
import MonacoEditor from 'react-monaco-editor';
import * as monaco from 'monaco-editor';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { useLanguage } from '../utils/useLanguage';
import { useKeyboardShortcuts } from '../utils/useKeyboardShortcuts';

const Editor: React.FC = () => {
  const dispatch = useDispatch();
  const content = useSelector((state: RootState) => state.editor.content);
  const { language } = useLanguage();
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const editorDidMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
    editor.onDidChangeModelContent(() => {
      const value = editor.getValue();
      dispatch({ type: 'SET_CONTENT', payload: value });
    });
  };

  useKeyboardShortcuts(editorRef.current);

  return (
    <MonacoEditor
      width="100%"
      height="100%"
      language={language}
      theme="vs-dark"
      value={content}
      options={{
        automaticLayout: true,
        minimap: { enabled: false },
      }}
      editorDidMount={editorDidMount}
    />
  );
};

export default Editor;