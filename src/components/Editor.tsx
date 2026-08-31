import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { EditorActionType } from "../store/actionTypes";
import { useEditor } from "../utils/useEditor";

const Editor: React.FC = () => {
  const dispatch = useDispatch();
  const editorRef = useRef<HTMLDivElement>(null);
  const { editor, applyRemoteOps } = useEditor();

  useEffect(() => {
    if (editorRef.current) {
      const monaco = editor.create(editorRef.current, {
        language: "javascript",
        theme: "vs-dark"
      });
      monaco.onDidChangeModelContent((e) => {
        dispatch({
          type: EditorActionType.UPDATE_DOC,
          payload: {
            ops: e.changes,
            version: Date.now()
          }
        });
      });
    }
  }, [editorRef, editor, dispatch]);

  useEffect(() => {
    const unsubscribe = applyRemoteOps((ops) => {
      // Apply remote ops to the editor instance here.
    });
    return unsubscribe;
  }, [applyRemoteOps]);

  return <div ref={editorRef} className="editor-container" />;
};

export default Editor;
