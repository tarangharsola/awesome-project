import { useState } from 'react';
import { CursorPosition, User } from '../types';

export const useCursor = (user: User) => {
  const [position, setPosition] = useState<CursorPosition>({ line: 0, ch: 0 });

  const updatePosition = (pos: CursorPosition) => {
    setPosition(pos);
  };

  return { position, updatePosition };
};