{"import React from 'react';
import { useTheme } from '@mui/material/styles';

interface UserProps {
  name: string;
  color: string;
}

const User = ({ name, color }: UserProps) => {
  const theme = useTheme();
  const backgroundColor = theme.palette.background.default;
  const textColor = theme.palette.text.primary;

  return (
    <div style={{
      backgroundColor: backgroundColor,
      color: textColor,
      padding: '8px',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    }}>
      <span style={{
        fontSize: '14px',
        fontWeight: 'bold',
      }}>{name}</span>
      <span style={{
        fontSize: '14px',
        color: color,
      }}>&#x25A1;</span>
    </div>
  );
}

export default User;