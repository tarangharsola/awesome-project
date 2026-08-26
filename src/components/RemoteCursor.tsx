import React from 'react';
import { RemoteCursor as RemoteCursorType } from '../types';
import styles from '../styles/user.module.css';

type Props = {
  cursor: RemoteCursorType;
};

const RemoteCursor: React.FC<Props> = ({ cursor }) => {
  const { position, user } = cursor;
  // Adjust these multipliers based on the editor's character dimensions.
  const style = {
    left: `${position.column * 8}px`,
    top: `${position.row * 20}px`,
    color: user.color,
  } as React.CSSProperties;

  return (
    <div className={styles.cursorLabel} style={style}>
      {user.name}
    </div>
  );
};

export default RemoteCursor;
