{"import React from 'react';
import { useState, useEffect } from 'react';

const CursorTracker = () => {
  const [cursors, setCursors] = useState([]);
  const [colors, setColors] = useState({});

  useEffect(() => {
    // fetch cursors from server
    const fetchCursors = async () => {
      const response = await fetch('/api/cursors');
      const data = await response.json();
      setCursors(data.cursors);
      setColors(data.colors);
    };
    fetchCursors();
  }, []);

  return (
    <div>
      {cursors.map((cursor, index) => (
        <div key={index} style={{
          position: 'absolute',
          top: cursor.y,
          left: cursor.x,
          width: '5px',
          height: '5px',
          backgroundColor: colors[cursor.id],
          borderRadius: '5px',
        }}>
        </div>
      ))}
    </div>
  );
};

export default CursorTracker;