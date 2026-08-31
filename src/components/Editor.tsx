import React, { useRef } from 'react';
import MonacoEditor, { monaco } from '@monaco-editor/react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setLanguage } from '../store/editorActions';
import { useKeyboardShortcuts } from '../utils/useKeyboardShortcuts';

const Editor: React.FC = () => {
  const dispatch = useDispatch();
  const language = useSelector((state: RootState) => state.editor.language);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const handleEditorDidMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
  };

  const setLang = (lang: string) => {
    dispatch(setLanguage(lang));
  };

  // Attach shortcuts (formatting & language cycling)
  useKeyboardShortcuts(editorRef.current, () => language, setLang);

  return (
    <MonacoEditor
      height="100%"
      language={language}
      theme="vs-dark"
      onMount={handleEditorDidMount}
      options={{
        automaticLayout: true,
        tabSize: language === 'python' ? 4 : 2,
        formatOnPaste: true,
        formatOnType: true,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
      }}
    />
  );
};

export default Editor;
