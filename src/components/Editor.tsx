import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { updateContent } from '../store/editorActions';
import { useKeyboardShortcuts } from '../utils/useKeyboardShortcuts';
import { getDefaultContent } from '../utils/useFormattingDefaults';
import { Editor as CodeEditor } from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { html } from '@codemirror/lang-html';

export const Editor: React.FC = () => {
  const dispatch = useDispatch();
  const { content, language } = useSelector((state: RootState) => state.editor);
  const editorRef = useRef<any>(null);

  // Apply keyboard shortcuts to the editor container
  useKeyboardShortcuts(editorRef);

  // Insert default snippet when language changes and editor is empty
  useEffect(() => {
    if (!content) {
      const defaultCode = getDefaultContent(language);
      dispatch(updateContent(defaultCode));
    }
  }, [language, content, dispatch]);

  const onChange = (value: string) => {
    dispatch(updateContent(value));
  };

  const extensions = [
    language === 'javascript' ? javascript() : null,
    language === 'python' ? python() : null,
    language === 'html' ? html() : null,
  ].filter(Boolean);

  return (
    <CodeEditor
      ref={editorRef}
      value={content}
      extensions={extensions}
      onChange={onChange}
      height="100%"
    />
  );
};