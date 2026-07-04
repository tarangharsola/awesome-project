{"import React from 'react';
import { useTheme } from '@mui/material/styles';

interface Props {
  username: string;
  color: string;
  x: number;
  y: number;
}

const CursorTracker = ({ username, color, x, y }: Props) => {
  const theme = useTheme();
  const styles = {
    position: 'absolute',
    top: `${y}px`,
    left: `${x}px`,
    backgroundColor: color,
    width: '4px',
    height: '4px',
    borderRadius: '50%',
  };

  return (
    <div style={styles} />
  );
};

export default CursorTracker;