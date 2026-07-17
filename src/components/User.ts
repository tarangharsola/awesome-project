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
      padding: 10,
      backgroundColor,
      color: textColor,
      borderRadius: 10,
      cursor: 'pointer',
    }}>
      <span style={{
        fontSize: 16,
        fontWeight: 'bold',
        color: textColor,
      }}>{name}</span>
      <span style={{
        fontSize: 12,
        color: textColor,
        marginLeft: 10,
      }}>&#x25A0;</span>
    </div>
  );
}

export default User;