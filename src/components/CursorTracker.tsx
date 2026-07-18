{"import React from 'react';
import { useTheme } from '@material-ui/core/styles';

interface Props {
  name: string;
  color: string;
  x: number;
  y: number;
}

const CursorTracker = ({ name, color, x, y }: Props) => {
  const theme = useTheme();
  const styles = {
    position: 'absolute',
    left: x,
    top: y,
    backgroundColor: color,
    color: theme.palette.text.primary,
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
  };

  return (
    <div style={styles}>{name}</div>
  );
};

export default CursorTracker;