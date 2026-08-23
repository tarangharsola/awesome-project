import React from 'react';
import { User } from '../types';

type Props = {
  user: User;
  position: { top: number; left: number };
};

export const RemoteCursor: React.FC<Props> = ({ user, position }) => (
  <div className="remote-cursor" style={{ top: position.top, left: position.left }}>
    <div
      className="cursor-label"
      style={{
        borderLeftColor: user.color,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        color: '#fff'
      }}
    >
      {user.name}
    </div>
    <div
      className="cursor-dot"
      style={{
        backgroundColor: '#fff',
        borderColor: user.color
      }}
    />
  </div>
);
