{"import React from 'react';
import { useTheme } from '@mui/material/styles';

interface Props {
  name: string;
  color: string;
}

const User = ({ name, color }: Props) => {
  const theme = useTheme();
  const styles = {
    backgroundColor: color,
    color: theme.palette.text.primary,
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
  };

  return (
    <div style={styles}>{name}</div>
  );
};

export default User;