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
  const backgroundColor = theme.palette.background.default;
  const textColor = theme.palette.text.primary;

  return (
    <div style={{
      position: 'absolute',
      left: x,
      top: y,
      backgroundColor,
      color,
      padding: 5,
      borderRadius: 5,
      fontSize: 12,
    }}>
      {name}
    </div>
  );
}

export default CursorTracker;