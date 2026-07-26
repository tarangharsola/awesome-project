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
      padding: '4px 8px',
      borderRadius: '4px',
      display: 'inline-block',
      marginRight: '8px',
    }}>
      <span style={{
        color: color,
        fontWeight: 'bold',
      }}>{name}</span>
    </div>
  );
}

export default User;