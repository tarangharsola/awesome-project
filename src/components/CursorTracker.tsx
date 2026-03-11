{"import React, { useState, useEffect } from 'react';
import { useCursor } from './useCursor';

const CursorTracker = () => {
  const cursor = useCursor();

  useEffect(() => {
    // Update cursor position on changes
  }, [cursor]);

  return (
    <div>
      <span>{cursor.name}</span>
      <span>{cursor.position}</span>
    </div>
  );
};

export default CursorTracker;