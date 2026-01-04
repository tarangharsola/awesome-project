{"import React from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

interface Props {
  editorState: EditorState;
  onEditorStateChange: (editorState: EditorState) => void;
}

const EditorComponent = ({ editorState, onEditorStateChange }: Props) => {
  const handleEditorStateChange = (editorState: EditorState) => {
    onEditorStateChange(editorState);
  };

  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={handleEditorStateChange}
      toolbarClassName='toolbar-class'
      wrapperClassName='wrapper-class'
      editorClassName='editor-class'
    />
  );
};

export default EditorComponent;