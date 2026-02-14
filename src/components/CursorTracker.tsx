{"import React from 'react';
import './CursorTracker.css';

interface Cursor {
  id: string;
  name: string;
  color: string;
  x: number;
  y: number;
}

interface Props {
  cursors: Cursor[];
}

const CursorTracker = ({ cursors }: Props) => {
  return (
    <div className="cursor-tracker">
      {cursors.map((cursor, index) => (
        <div key={index} style={{
          position: "absolute",
          left: cursor.x,
          top: cursor.y,
          width: "5px",
          height: "5px",
          backgroundColor: cursor.color,
          borderRadius: "50%",
        }}>
          <span style={{
            position: "absolute",
            top: "-15px",
            left: "-15px",
            fontSize: "12px",
            color: "#fff",
          }}>{cursor.name}</span>
        </div>
      ))}
    </div>
  );
}

export default CursorTracker;