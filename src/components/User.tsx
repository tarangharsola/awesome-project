{"import React from 'react';
import { useTheme } from '@material-ui/core/styles';

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
      padding: '4px 8px',
      borderRadius: '4px',
      display: 'inline-block',
      marginRight: '8px',
    }}>
      {name}
    </div>
  );
}

export default User;