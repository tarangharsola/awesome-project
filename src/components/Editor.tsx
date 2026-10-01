import React, { useRef, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { html } from '@codemirror/lang-html';
import { useLanguage } from '../utils/useLanguage';
import { getFormattingDefaults } from '../utils/useFormattingDefaults';
import { useKeyboardShortcuts } from '../utils/useKeyboardShortcuts';

/**
 * Core editor component.
 * It reacts to language changes, applies language‑specific extensions,
 * respects formatting defaults, and registers global shortcuts.
 */
const Editor: React.FC = () => {
  const [language] = useLanguage();
  const editorRef = useRef<any>(null);

  // Apply formatting defaults based on the selected language
  const formatting = getFormattingDefaults(language);

  // Register keyboard shortcuts (save, format)
  useKeyboardShortcuts(editorRef.current);

  // Build the appropriate language extension array
  const extensions = [
    language === 'javascript' ? javascript() : null,
    language === 'python' ? python() : null,
    language === 'html' ? html() : null,
  ].filter(Boolean);

  // Ensure the editor instance is available for shortcuts after mount
  useEffect(() => {
    if (editorRef.current) {
      // Re‑register shortcuts when the editor instance changes
      useKeyboardShortcuts(editorRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorRef.current]);

  return (
    <CodeMirror
      ref={editorRef}
      value=""
      extensions={extensions}
      basicSetup={{
        lineNumbers: true,
        foldGutter: true,
        highlightActiveLine: true,
        ...formatting,
      }}
      onChange={(value) => {
        // The collaboration hook will consume this change; placeholder kept minimal.
      }}
      style={{ height: '100%', width: '100%' }}
    />
  );
};

export default Editor;
