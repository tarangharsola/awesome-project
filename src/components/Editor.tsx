import React, { useEffect, useRef } from "react";
import { EditorView } from "@codemirror/view";
import { basicSetup } from "codemirror";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { applyRemoteChange } from "../store/editorReducer";
import RemoteCursor from "./RemoteCursor";
import { getLanguageExtension } from "../utils/editorHelpers";
import { useAwareness } from "../utils/hooks/useAwareness";

const Editor: React.FC = () => {
  const dispatch = useDispatch();
  const editorRef = useRef<HTMLDivElement>(null);
  const language = useSelector((state: RootState) => state.editor.language);
  const remoteCursors = useAwareness();

  useEffect(() => {
    if (!editorRef.current) return;
    const view = new EditorView({
      doc: "",
      extensions: [
        basicSetup,
        getLanguageExtension(language),
        EditorView.updateListener.of((v) => {
          if (v.docChanged) {
            const changes = v.changes.toJSON();
            dispatch(applyRemoteChange({ changes }));
          }
        })
      ],
      parent: editorRef.current
    });
    return () => view.destroy();
  }, [language, dispatch]);

  return (
    <div className="editor-wrapper" style={{ position: "relative" }}>
      <div ref={editorRef} />
      {remoteCursors.map((c) => (
        <RemoteCursor key={c.userId} cursor={c} />
      ))}
    </div>
  );
};

export default Editor;
