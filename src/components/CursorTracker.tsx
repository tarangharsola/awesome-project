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
    backgroundColor: color,
    color: theme.palette.text.primary,
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    position: 'absolute',
    top: y,
    left: x,
  };

  return (
    <div style={styles}>{name}</div>
  );
};

export default CursorTracker;