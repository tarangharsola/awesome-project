{"import React from 'react';
import { useState } from 'react';

function User({ user }) {
  const [color, setColor] = useState(user.color);

  return (
    <span style={{
      backgroundColor: color,
      padding: '2px 4px',
      borderRadius: '4px',
      fontSize: '12px',
    }}>{user.name}</span>
  );
}

export default User;