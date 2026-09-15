import React, { useEffect, useRef, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { html } from '@codemirror/lang-html';
import { RootState } from '../store';
import { setContent } from '../store/editorActions';
import { getFormattingDefaults } from '../utils/useFormattingDefaults';
import { useKeyboardShortcuts } from '../utils/useKeyboardShortcuts';

export const Editor: React.FC = () => {
  const dispatch = useDispatch();
  const language = useSelector((state: RootState) => state.editor.language);
  const content = useSelector((state: RootState) => state.editor.content);
  const editorRef = useRef<any>(null);

  const extensions = useMemo(() => {
    switch (language) {
      case 'javascript':
        return [javascript()];
      case 'python':
        return [python()];
      case 'html':
        return [html()];
      default:
        return [];
    }
  }, [language]);

  const formatDocument = () => {
    const formatter = getFormattingDefaults(language);
    const formatted = formatter.format(content);
    if (formatted !== content) {
      dispatch(setContent(formatted));
    }
  };

  useKeyboardShortcuts({ onFormat: formatDocument });

  return (
    <CodeMirror
      value={content}
      extensions={extensions}
      onChange={(value) => dispatch(setContent(value))}
      ref={editorRef}
    />
  );
};