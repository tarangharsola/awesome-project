{"import React from 'react';
import { useTheme } from '@mui/material/styles';

interface Props {
  username: string;
  color: string;
}

const User = ({ username, color }: Props) => {
  const theme = useTheme();
  const styles = {
    backgroundColor: color,
    color: theme.palette.text.primary,
    padding: '4px 8px',
    borderRadius: '4px',
    display: 'inline-block',
    marginRight: '8px',
  };

  return (
    <div style={styles}>{username}</div>
  );
};

export default User;