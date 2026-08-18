import React, { useEffect, useRef } from 'react';
import { useEditor } from '../utils/useEditor';
import { useUsers } from '../utils/useUsers';
import styles from '../styles/user.module.css';

interface CursorProps {
  userId: string;
  position: { line: number; ch: number };
  name: string;
  color: string;
}

const CursorTracker: React.FC = () => {
  const { editor } = useEditor();
  const { users } = useUsers();
  const cursorRefs = useRef<Record<string, HTMLDivElement>>({});

  useEffect(() => {
    if (!editor) return;
    const cm = editor.getCodeMirror();

    const updateCursors = () => {
      users.forEach((user) => {
        if (user.id === cm.getOption('userId')) return; // skip self
        const { line, ch } = user.cursor;
        const coords = cm.charCoords({ line, ch }, 'local');
        let cursorEl = cursorRefs.current[user.id];
        if (!cursorEl) {
          cursorEl = document.createElement('div');
          cursorEl.className = styles.cursorCaret;
          cursorEl.style.backgroundColor = user.color;
          const label = document.createElement('div');
          label.className = styles.cursorLabel;
          label.textContent = user.name;
          cursorEl.appendChild(label);
          cm.getWrapperElement().appendChild(cursorEl);
          cursorRefs.current[user.id] = cursorEl;
        }
        cursorEl.style.left = `${coords.left}px`;
        cursorEl.style.top = `${coords.top}px`;
        // Position label slightly above the caret
        const label = cursorEl.firstChild as HTMLElement;
        if (label) {
          label.style.left = '0px';
          label.style.top = '-1.2em';
        }
      });
    };

    const changeHandler = cm.on('cursorActivity', updateCursors);
    const refreshHandler = cm.on('refresh', updateCursors);
    updateCursors();

    return () => {
      cm.off('cursorActivity', changeHandler);
      cm.off('refresh', refreshHandler);
      Object.values(cursorRefs.current).forEach((el) => el.remove());
      cursorRefs.current = {};
    };
  }, [editor, users]);

  return null;
};

export default CursorTracker;