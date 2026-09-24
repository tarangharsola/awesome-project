import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useEditor } from '../utils/useEditor';
import { useFormattingDefaults } from '../utils/useFormattingDefaults';
import { useKeyboardShortcuts } from '../utils/useKeyboardShortcuts';

export const Editor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const { content, language } = useSelector((state: RootState) => state.editor);
  const formattingDefaults = useFormattingDefaults();

  const { setContent, getEditorInstance } = useEditor({
    container: editorRef.current,
    initialContent: content,
    language,
    formatting: formattingDefaults,
  });

  // Sync Redux content changes to the editor instance
  useEffect(() => {
    const editor = getEditorInstance();
    if (editor && editor.getValue() !== content) {
      editor.setValue(content);
    }
  }, [content, getEditorInstance]);

  // Update Redux when editor content changes
  useEffect(() => {
    const editor = getEditorInstance();
    if (!editor) return;
    const handleChange = () => {
      const newValue = editor.getValue();
      if (newValue !== content) {
        setContent(newValue);
      }
    };
    editor.on('change', handleChange);
    return () => {
      editor.off('change', handleChange);
    };
  }, [content, getEditorInstance, setContent]);

  // Keyboard shortcuts (save, format)
  useKeyboardShortcuts({
    onSave: () => {
      // Placeholder: could trigger a download or server save
      console.log('Document saved');
    },
    onFormat: () => {
      const editor = getEditorInstance();
      if (editor) {
        // Assuming the editor instance provides a format method
        if (typeof (editor as any).format === 'function') {
          (editor as any).format();
        }
      }
    },
  });

  return <div ref={editorRef} className="editor-container" />;
};