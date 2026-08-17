{"import React from 'react';
import { useTheme } from '@mui/material/styles';

interface CursorTrackerProps {
  name: string;
  color: string;
  x: number;
  y: number;
}

const CursorTracker: React.FC<CursorTrackerProps> = ({ name, color, x, y }) => {
  const theme = useTheme();
  const styles = {
    backgroundColor: color,
    color: theme.palette.text.primary,
    padding: '4px 8px',
    borderRadius: '4px',
    position: 'absolute',
    top: y,
    left: x,
  };

  return (
    <span style={styles}>{name}</span>
  );
}

export default CursorTracker;