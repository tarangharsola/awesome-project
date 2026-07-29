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
  const styles = {
    position: 'absolute',
    top: `${y}px`,
    left: `${x}px`,
    backgroundColor: color,
    width: theme.spacing(1),
    height: theme.spacing(1),
    borderRadius: theme.spacing(0.5),
  };

  return (
    <div style={styles} />
  );
}

export default CursorTracker;