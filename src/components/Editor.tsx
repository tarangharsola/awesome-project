import React, { useReducer } from 'react';
import { editorReducer, initialEditorState } from '../store/editorReducer';
import { useLanguage } from '../utils/useLanguage';
import { Editor as MonacoEditor } from '@monaco-editor/react';

export const Editor: React.FC = () => {
  const [state, dispatch] = useReducer(editorReducer, initialEditorState);
  const { language, setLanguage } = useLanguage(state.language, (lang) =>
    dispatch({ type: 'SET_LANGUAGE', payload: lang })
  );

  const handleChange = (value: string | undefined) => {
    dispatch({ type: 'SET_CONTENT', payload: value ?? '' });
  };

  return (
    <MonacoEditor
      height="90vh"
      language={language}
      value={state.content}
      onChange={handleChange}
    />
  );
};
