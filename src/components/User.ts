{"import React from 'react';
import { useTheme } from '@mui/material/styles';

interface UserProps {
  name: string;
  color: string;
}

const User = ({ name, color }: UserProps) => {
  const theme = useTheme();
  const { palette } = theme;

  return (
    <div style={{
      backgroundColor: color,
      color: palette.text.primary,
      padding: 10,
      borderRadius: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      <span style={{
        fontSize: 16,
        fontWeight: 'bold',
      }}>{name}</span>
      <span style={{
        fontSize: 14,
        color: palette.text.secondary,
      }}>Cursor: 10</span>
    </div>
  );
}

export default User;