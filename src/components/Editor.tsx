import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateContent } from '../store/editorActions';
import { RootState } from '../store';
import { useKeyboardShortcuts } from '../utils/useKeyboardShortcuts';
import { formatCode } from '../utils/formatCode';
import './Editor.css';

export const Editor: React.FC = () => {
  const dispatch = useDispatch();
  const { content, language } = useSelector((state: RootState) => state.editor);
  const editorRef = useRef<HTMLTextAreaElement>(null);

  // Sync textarea value with Redux state
  useEffect(() => {
    if (editorRef.current && editorRef.current.value !== content) {
      editorRef.current.value = content;
    }
  }, [content]);

  // Apply keyboard shortcuts (formatting, etc.)
  useKeyboardShortcuts(editorRef, language, (formatted) => {
    dispatch(updateContent(formatted));
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(updateContent(e.target.value));
  };

  // Adjust textarea styling based on language for syntax highlighting (simple example)
  const className = `editor textarea-${language}`;

  return (
    <textarea
      ref={editorRef}
      className={className}
      value={content}
      onChange={handleChange}
      spellCheck={false}
      aria-label="Code editor"
    />
  );
};