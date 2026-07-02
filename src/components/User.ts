{"import React from 'react';
import { useTheme } from '@mui/material/styles';

interface UserProps {
  name: string;
  color: string;
}

const User = ({ name, color }: UserProps) => {
  const theme = useTheme();
  const textColor = theme.palette.text.primary;
  const backgroundColor = color;

  return (
    <div style={{
      backgroundColor: backgroundColor,
      color: textColor,
      padding: '5px',
      borderRadius: '5px',
      display: 'inline-block',
      marginRight: '10px',
    }}>
      {name}
    </div>
  );
}

export default User;