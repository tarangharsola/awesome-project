import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { EditorView, basicSetup } from '@codemirror/basic-setup';
import { EditorState } from '@codemirror/state';
import { setContent } from '../store/editorActions';
import { getLanguageExtension } from '../utils/editorExtensions';
import { RootState } from '../store';

export const Editor: React.FC = () => {
  const dispatch = useDispatch();
  const { content, language } = useSelector((state: RootState) => state.editor);
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);

  useEffect(() => {
    if (!editorRef.current) return;
    const startState = EditorState.create({
      doc: content,
      extensions: [
        basicSetup,
        getLanguageExtension(language),
        EditorView.updateListener.of((v) => {
          if (v.docChanged) {
            const newContent = v.state.doc.toString();
            dispatch(setContent(newContent));
          }
        }),
      ],
    });
    viewRef.current = new EditorView({ state: startState, parent: editorRef.current });
    return () => {
      viewRef.current?.destroy();
    };
  }, []);

  // Reconfigure language when it changes
  useEffect(() => {
    if (viewRef.current) {
      viewRef.current.dispatch({
        effects: EditorView.reconfigure.of([getLanguageExtension(language)]),
      });
    }
  }, [language]);

  // Keep content in sync if external changes occur
  useEffect(() => {
    if (viewRef.current && viewRef.current.state.doc.toString() !== content) {
      viewRef.current.dispatch({
        changes: { from: 0, to: viewRef.current.state.doc.length, insert: content },
      });
    }
  }, [content]);

  return <div ref={editorRef} className="editor" />;
};
