{"import React from 'react';
import { useTheme } from '@mui/material/styles';

interface Props {
  name: string;
  color: string;
}

const User = ({ name, color }: Props) => {
  const theme = useTheme();
  const textColor = theme.palette.text.primary;
  return (
    <div style={{
      color: textColor,
      backgroundColor: color,
      padding: '4px 8px',
      borderRadius: '4px',
      display: 'inline-block',
      marginRight: '8px',
    }}>
      {name}
    </div>
  );
};

export default User;