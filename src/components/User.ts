{"import React from 'react';
import { useTheme } from '@mui/material/styles';

interface UserProps {
  name: string;
  color: string;
}

const User = ({ name, color }: UserProps) => {
  const theme = useTheme();
  const styles = {
    backgroundColor: color,
    color: theme.palette.text.primary,
    padding: theme.spacing(0.5),
    borderRadius: theme.spacing(0.25),
    display: 'inline-block',
    marginRight: theme.spacing(1),
  };

  return (
    <span style={styles}>{name}</span>
  );
}

export default User;