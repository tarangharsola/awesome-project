{"import React from 'react';
import { EditorState, Editor } from 'react-editor-js';
import { useEditor } from './useEditor';

const EditorComponent = () => {
  const { editorState, setEditorState } = useEditor();
  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={setEditorState}
      tools={tools}
    />
  );
};

export default EditorComponent;