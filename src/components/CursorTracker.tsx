{"import React from 'react';
import { useState, useEffect } from 'react';

interface Cursor {
  id: string;
  name: string;
  color: string;
  position: number;
}

interface Props {
  cursors: Cursor[];
}

const CursorTracker = ({ cursors }: Props) => {
  const [cursorsState, setCursorsState] = useState({} as { [id: string]: Cursor });

  useEffect(() => {
    setCursorsState(cursors.reduce((acc, cursor) => ({ ...acc, [cursor.id]: cursor }), {}));
  }, [cursors]);

  return (
    <div className="cursor-tracker">
      {Object.keys(cursorsState).map((id) => (
        <div key={id} style={{ backgroundColor: cursorsState[id].color, position: 'absolute', top: cursorsState[id].position + 'px' }}>
          {cursorsState[id].name}
        </div>
      ))}
    </div>
  );
};

export default CursorTracker;