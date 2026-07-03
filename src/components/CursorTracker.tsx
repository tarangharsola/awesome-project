{"import React from 'react';
import { useTheme } from '@mui/material/styles';

interface CursorTrackerProps {
  name: string;
  color: string;
  x: number;
  y: number;
}

const CursorTracker = ({ name, color, x, y }: CursorTrackerProps) => {
  const theme = useTheme();
  const textColor = theme.palette.text.primary;
  const backgroundColor = color;

  return (
    <div style={{
      position: 'absolute',
      left: x,
      top: y,
      backgroundColor,
      color: textColor,
      padding: '4px 8px',
      borderRadius: '4px',
      display: 'inline-block',
    }}>
      {name}
    </div>
  );
}

export default CursorTracker;