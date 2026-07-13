{"import React from 'react';
import { useCursor } from '../utils/useCursor';
import { useTheme } from '@mui/material/styles';

const CursorTracker = () => {
  const cursor = useCursor();
  const theme = useTheme();

  return (
    <div style={{
      position: 'absolute',
      top: cursor.y,
      left: cursor.x,
      backgroundColor: cursor.color,
      width: 2,
      height: 10,
      borderRadius: 10,
    }} />
  );
};

export default CursorTracker;