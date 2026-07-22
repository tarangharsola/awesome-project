{"import React from 'react';
import { useState, useEffect } from 'react';

interface UserProps {
  name: string;
  color: string;
}

const User = ({ name, color }: UserProps) => {
  const [cursorPosition, setCursorPosition] = useState(0);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    setIsConnected(true);
  }, []);

  return (
    <div style={{
      backgroundColor: color,
      color: '#fff',
      padding: '5px',
      borderRadius: '5px',
      display: 'flex',
      alignItems: 'center',
    }}>
      <span style={{
        marginRight: '5px',
      }}>{name}</span>
      <span style={{
        fontSize: '12px',
      }}>Cursor Position: {cursorPosition}</span>
    </div>
  );
}

export default User;