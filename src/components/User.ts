{"import React from 'react';
import { useTheme } from '@mui/material/styles';

interface Props {
  name: string;
  color: string;
}

const User = ({ name, color }: Props) => {
  const theme = useTheme();
  return (
    <div style={{
      backgroundColor: color,
      color: theme.palette.text.primary,
      padding: theme.spacing(0.5),
      borderRadius: theme.shape.borderRadius,
      display: 'inline-block',
      marginRight: theme.spacing(1)
    }}>
      {name}
    </div>
  );
};

export default User;