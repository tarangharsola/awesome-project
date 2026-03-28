{"import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { EditorState, Editor } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { schema } from 'prosemirror-schema-basic';
import { dispatchState } from './useEditor';

function Editor() {
  const [editorState, setEditorState] = useState(EditorState.create({
    doc: schema.node(schema.nodes.paragraph, []),
    selection: schema.selection.empty()
  }));
  const dispatch = useDispatch();
  const { cursorPositions, users } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(dispatchState(editorState));
  }, [editorState]);

  const handleCursorChange = (cursorPosition) => {
    dispatch({
      type: 'UPDATE_CURSOR_POSITION',
      payload: cursorPosition
    });
  };

  return (
    <div>
      <EditorView
        editorState={editorState}
        dispatchTransaction={(transaction) => {
          setEditorState(transaction);
        }}
        onChange={(state) => {
          handleCursorChange(state.selection.from);
        }}
      />
      <div>
        {users.map((user, index) => (
          <div key={index}>{user.name}</div>
        ))}
      </div>
    </div>
  );
}

export default Editor;