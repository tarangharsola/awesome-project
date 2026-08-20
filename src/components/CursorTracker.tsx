import React from 'react';
import { useCursor } from '../utils/hooks/useCursor';
import styles from '../styles/user.module.css';

/**
 * Renders a remote user's cursor with a label showing their name.
 * The label uses the .cursorLabel class defined in user.module.css for
 * dark‑mode‑friendly styling.
 */
const CursorTracker: React.FC<{ userId: string }> = ({ userId }) => {
  const { position, name, color } = useCursor(userId);

  if (!position) return null;

  return (
    <div
      className={styles.cursor}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        color: color,
      }}
    >
      <div className={styles.cursorLabel} style={{ backgroundColor: color }}>
        {name}
      </div>
    </div>
  );
};

export default CursorTracker;
