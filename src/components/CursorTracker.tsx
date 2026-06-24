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
    padding: theme.spacing(0.5),
    borderRadius: theme.shape.borderRadius,
    position: 'absolute',
    left: x,
    top: y,
  };

  return (
    <div style={styles}>{name}</div>
  );
};

export default CursorTracker;