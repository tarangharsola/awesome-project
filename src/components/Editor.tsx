{"import React from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

interface Props {
  onChange: (state: EditorState) => void;
  value: EditorState;
}

const EditorComponent: React.FC<Props> = ({ onChange, value }) => {
  const onEditorStateChange = (state: EditorState) => {
    onChange(state);
  };

  return (
    <Editor
      editorState={value}
      onEditorStateChange={onEditorStateChange}
      toolbarClassName='toolbar-class'
      wrapperClassName='wrapper-class'
      editorClassName='editor-class'
    />
  );
};

export default EditorComponent;