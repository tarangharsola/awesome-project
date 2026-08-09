{"import React from 'react';
import { useTheme } from '@mui/material/styles';

interface Props {
  name: string;
  color: string;
}

const User = ({ name, color }: Props) => {
  const theme = useTheme();
  const textColor = theme.palette.text.primary;
  const backgroundColor = theme.palette.background.default;

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 8,
      backgroundColor,
      color: textColor,
      borderRadius: 4,
      cursor: 'pointer',
    }}>
      <span style={{
        fontSize: 14,
        fontWeight: 600,
        marginRight: 8,
      }}>{name}</span>
      <span style={{
        fontSize: 14,
        color: color,
        backgroundColor: textColor,
        padding: 4,
        borderRadius: 4,
      }}>&#x25A1;</span>
    </div>
  );
}

export default User;