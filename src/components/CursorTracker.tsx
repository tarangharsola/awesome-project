{"import React from 'react';
import { useTheme } from '@mui/material/styles';

interface Props {
  name: string;
  color: string;
  x: number;
  y: number;
}

const CursorTracker = ({ name, color, x, y }: Props) => {
  const theme = useTheme();
  const textColor = theme.palette.text.primary;
  const backgroundColor = theme.palette.background.default;

  return (
    <div style={{
      position: 'absolute',
      top: y,
      left: x,
      width: 10,
      height: 10,
      backgroundColor,
      borderRadius: 10,
      cursor: 'pointer',
    }}>
      <span style={{
        fontSize: 12,
        color: textColor,
        position: 'absolute',
        top: -15,
        left: -20,
      }}>{name}</span>
    </div>
  );
}

export default CursorTracker;