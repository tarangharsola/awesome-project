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
  const backgroundColor = theme.palette.background.default;
  const textColor = theme.palette.text.primary;

  return (
    <div style={{
      position: 'absolute',
      left: x,
      top: y,
      backgroundColor: backgroundColor,
      color: textColor,
      padding: '4px 8px',
      borderRadius: '4px',
      display: 'inline-block',
      marginRight: '8px',
    }}>
      <span style={{
        color: color,
        fontWeight: 'bold',
      }}>{name}</span>
    </div>
  );
}

export default CursorTracker;