{"import React from 'react';
import { useSelector } from 'react-redux';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { schema } from 'prosemirror-schema-basic';

function CursorTracker() {
  const { cursorPositions, users } = useSelector((state) => state.users);

  return (
    <div>
      {users.map((user, index) => (
        <div key={index}>{user.name}</div>
      ))}
    </div>
  );
}

export default CursorTracker;