{"import React from 'react';
import { useTheme } from '@mui/material/styles';

interface UserProps {
  name: string;
  color: string;
}

const User = ({ name, color }: UserProps) => {
  const theme = useTheme();
  const { palette } = theme;
  const textColor = palette.text.primary;
  const backgroundColor = palette.background.default;

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '8px',
      borderRadius: '4px',
      backgroundColor,
      color: textColor,
      cursor: 'pointer',
    }}>
      <span style={{
        color: color,
        fontSize: '14px',
        fontWeight: 'bold',
      }}>{name}</span>
    </div>
  );
}

export default User;