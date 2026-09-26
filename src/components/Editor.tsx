// src/components/Editor.tsx
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateContent, formatDocument } from '../store/editorActions';
import { EditorState } from '../store/editorReducer';
import { useKeyboardShortcuts } from '../utils/useKeyboardShortcuts';
import { useFormattingDefaults } from '../utils/useFormattingDefaults';
import { Controlled as ControlledEditor } from '@codemirror/react'; // Assuming CodeMirror React wrapper
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { html } from '@codemirror/lang-html';

export const Editor: React.FC = () => {
  const dispatch = useDispatch();
  const editorRef = useRef<HTMLDivElement>(null);
  const { content, language } = useSelector< { editor: EditorState }, EditorState>((state) => state.editor);

  // Apply keyboard shortcuts (e.g., Ctrl+S to format)
  useKeyboardShortcuts(editorRef, dispatch);

  // Update formatting defaults when language changes
  const formattingDefaults = useFormattingDefaults(language);

  // Effect to apply formatting defaults to the editor instance if needed
  useEffect(() => {
    // This placeholder assumes the editor instance can accept formatting options via a method.
    // The actual implementation depends on the editor library used.
    // For CodeMirror, you might configure extensions here.
  }, [language, formattingDefaults]);

  const handleChange = (value: string) => {
    dispatch(updateContent(value));
  };

  const getExtensions = () => {
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
  };

  return (
    <div ref={editorRef} className="editor-container">
      <ControlledEditor
        value={content}
        extensions={getExtensions()}
        onChange={(value) => handleChange(value)}
        // Additional props such as lineNumbers, theme, etc., can be added here.
      />
    </div>
  );
};
