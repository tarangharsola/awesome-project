import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EditorView, keymap } from '@codemirror/view';
import { basicSetup } from '@codemirror/basic-setup';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { html } from '@codemirror/lang-html';
import { indentUnit } from '@codemirror/language';
import { formattingDefaults } from '../utils/useFormattingDefaults';
import formatCode from '../utils/formatCode';
import { updateContent } from '../store/editorActions';
import { RootState } from '../store';
import './Editor.css';

type Props = {
  language: string;
};

const languageExtension = (lang: string) => {
  switch (lang) {
    case 'python':
      return python();
    case 'html':
      return html();
    case 'javascript':
    default:
      return javascript();
  }
};

const Editor: React.FC<Props> = ({ language }) => {
  const dispatch = useDispatch();
  const content = useSelector((state: RootState) => state.editor.content);
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);

  // Initialize CodeMirror
  useEffect(() => {
    if (editorRef.current && !viewRef.current) {
      viewRef.current = new EditorView({
        doc: content,
        extensions: [
          basicSetup,
          languageExtension(language),
          indentUnit.of(' '.repeat(formattingDefaults.indentSize)),
          keymap.of([
            {
              key: 'Ctrl-Shift-f',
              run: () => {
                const current = viewRef.current?.state.doc.toString() || '';
                const formatted = formatCode(current, language);
                if (formatted !== current) {
                  dispatch(updateContent(formatted));
                  viewRef.current?.dispatch({
                    changes: { from: 0, to: viewRef.current.state.doc.length, insert: formatted },
                  });
                }
                return true;
              },
            },
          ]),
        ],
        parent: editorRef.current,
      });
    }
    // Update language when prop changes
    if (viewRef.current) {
      viewRef.current.dispatch({
        effects: EditorView.reconfigure.of([
          basicSetup,
          languageExtension(language),
          indentUnit.of(' '.repeat(formattingDefaults.indentSize)),
        ]),
      });
    }
  }, [language]);

  // Sync external content changes (e.g., remote updates)
  useEffect(() => {
    if (viewRef.current && viewRef.current.state.doc.toString() !== content) {
      viewRef.current.dispatch({
        changes: { from: 0, to: viewRef.current.state.doc.length, insert: content },
      });
    }
  }, [content]);

  // Global keyboard shortcut for formatting (fallback for browsers that don't pass through CodeMirror keymap)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        const current = viewRef.current?.state.doc.toString() || '';
        const formatted = formatCode(current, language);
        if (formatted !== current) {
          dispatch(updateContent(formatted));
          viewRef.current?.dispatch({
            changes: { from: 0, to: viewRef.current.state.doc.length, insert: formatted },
          });
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [language, dispatch]);

  return <div className="code-editor" ref={editorRef} />;
};

export default Editor;
