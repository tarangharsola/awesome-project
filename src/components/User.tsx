{"import React from 'react';
import { useTheme } from '@mui/material/styles';

interface UserProps {
  name: string;
  color: string;
}

const User: React.FC<UserProps> = ({ name, color }) => {
  const theme = useTheme();
  const styles = {
    backgroundColor: color,
    color: theme.palette.text.primary,
    padding: '4px 8px',
    borderRadius: '4px',
    display: 'inline-block',
    margin: '4px',
  };

  return (
    <span style={styles}>{name}</span>
  );
}

export default User;