{"import React from 'react';
import { useTheme } from '@mui/material/styles';

interface UserProps {
  name: string;
  color: string;
}

const User = ({ name, color }: UserProps) => {
  const theme = useTheme();
  const textColor = theme.palette.text.primary;
  return (
    <span style={{
      color: textColor,
      backgroundColor: color,
      padding: '2px 4px',
      borderRadius: '4px',
      display: 'inline-block',
    }}>
      {name}
    </span>
  );
}

export default User;