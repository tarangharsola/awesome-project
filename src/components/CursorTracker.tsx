{"import React from 'react';
import { useTheme } from '@mui/material/styles';
import User from './User';

interface Props {
  cursors: { name: string; color: string; x: number; y: number }[];
}

const CursorTracker = ({ cursors }: Props) => {
  const theme = useTheme();
  const textColor = theme.palette.text.primary;
  const backgroundColor = theme.palette.background.default;

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {cursors.map((cursor, index) => (
        <User key={index} name={cursor.name} color={cursor.color} />
      ))}
    </div>
  );
}

export default CursorTracker;