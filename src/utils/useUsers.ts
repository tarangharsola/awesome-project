{"import { useState, useEffect } from 'react';
import WebSocket from 'ws';

interface Props {
  url: string;
}

const useUsers = ({ url }) => {
  const [users, setUsers] = useState<{ [key: string]: { name: string; color: string } }>({ });

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'users') setUsers(data.users);
    };

    return () => ws.close();
  }, [url]);

  return { users };
}

export default useUsers;