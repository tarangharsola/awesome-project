{"import React from 'react';
import { useTheme } from '@mui/material/styles';
import User from './User';

interface Props {
  name: string;
  color: string;
  x: number;
  y: number;
}

const CursorTracker = ({ name, color, x, y }: Props) => {
  const theme = useTheme();
  return (
    <div style={{
      position: 'absolute',
      left: x,
      top: y,
      backgroundColor: color,
      color: theme.palette.text.primary,
      padding: theme.spacing(0.5),
      borderRadius: theme.shape.borderRadius,
      display: 'inline-block',
      marginRight: theme.spacing(1)
    }}>
      <User name={name} color={color} />
    </div>
  );
};

export default CursorTracker;