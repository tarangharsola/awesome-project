{"import React from 'react';
import { useTheme } from '@mui/material/styles';

interface UserProps {
  name: string;
  color: string;
}

const User = ({ name, color }: UserProps) => {
  const theme = useTheme();
  const textColor = theme.palette.text.primary;
  const backgroundColor = theme.palette.background.default;

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      padding: '8px',
      backgroundColor,
      color: textColor,
      borderRadius: '4px',
      marginBottom: '8px',
    }}>
      <span style={{
        marginRight: '8px',
        fontSize: '14px',
        fontWeight: 'bold',
      }}>{name}</span>
      <span style={{
        fontSize: '14px',
        color: color,
      }}>&#x25A0;</span>
    </div>
  );
}

export default User;