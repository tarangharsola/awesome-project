{"import React from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const EditorComponent = () => {
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty());
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={onEditorStateChange}
      toolbarClassName='toolbarClassName'
      wrapperClassName='wrapperClassName'
      editorClassName='editorClassName'
    />
  );
};

export default EditorComponent;