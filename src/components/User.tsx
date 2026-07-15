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
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
  };

  return (
    <div style={styles}>{name}</div>
  );
};

export default User;