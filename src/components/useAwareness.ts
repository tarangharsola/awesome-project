{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

interface AwarenessProps {
  ws: WebSocket;
}

const useAwareness = (props: AwarenessProps) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    props.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'join') {
        setUsers((prevUsers) => [...prevUsers, data.user]);
      } else if (data.type === 'leave') {
        setUsers((prevUsers) => prevUsers.filter((user) => user !== data.user));
      }
    };
  }, [props.ws]);

  return { users };
};

export default useAwareness;