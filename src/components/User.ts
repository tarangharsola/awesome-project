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
      padding: '4px 8px',
      borderRadius: '4px',
      backgroundColor,
      color: textColor,
      cursor: 'pointer',
    }}>
      <span style={{
        marginRight: '8px',
        fontSize: '14px',
        fontWeight: 'bold',
      }}>{name}</span>
      <span style={{
        fontSize: '12px',
        color: textColor,
      }}>&nbsp;({color})</span>
    </div>
  );
}

export default User;