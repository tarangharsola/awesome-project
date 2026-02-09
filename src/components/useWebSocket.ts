{"import { useState, useEffect } from 'react';
import WebSocket from 'ws';

const useWebSocket = () => {
  const [ws, setWs] = useState(null);
  const [users, setUsers] = useState([]);
  const [dispatch, setDispatch] = useState(() => () => {});

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    setWs(ws);
    setDispatch((dispatch) => (action) => {
      ws.send(JSON.stringify(action));
      dispatch(action);
    });
  }, []);

  useEffect(() => {
    ws.onmessage = (event) => {
      const action = JSON.parse(event.data);
      switch (action.type) {
        case 'JOIN':
          setUsers((prevUsers) => [...prevUsers, action.user]);
          break;
        case 'LEAVE':
          setUsers((prevUsers) => prevUsers.filter((user) => user.id !== action.userId));
          break;
        default:
          break;
      }
    };
  }, [ws]);

  return { users, dispatch };
};

export default useWebSocket;