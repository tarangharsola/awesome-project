{"import { useState, useEffect } from 'react';

interface UserProps {
  id: string;
  name: string;
  color: string;
}

const User = ({ id, name, color }: UserProps) => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // implement reconnection logic here
  }, []);

  return (
    <div style={{
      backgroundColor: color,
      padding: 10,
      borderRadius: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <span>{name}</span>
      <span style={{
        fontSize: 12,
        color: isConnected ? 'green' : 'red'
      }}>{isConnected ? 'Connected' : 'Disconnected'}</span>
    </div>
  );
}

export default User;