{"import React from 'react';
import { useTheme } from '@mui/material/styles';

interface Props {
  name: string;
  color: string;
}

const User = ({ name, color }: Props) => {
  const theme = useTheme();
  const backgroundColor = theme.palette.background.default;
  const textColor = theme.palette.text.primary;

  return (
    <div style={{
      backgroundColor,
      color,
      padding: 10,
      borderRadius: 5,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      <span>{name}</span>
      <span style={{
        backgroundColor: color,
        padding: 5,
        borderRadius: 5,
        fontSize: 12,
      }}></span>
    </div>
  );
}

export default User;