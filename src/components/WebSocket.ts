{"import WebSocket from 'ws';

const WebSocket = (props) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (event) => {
      dispatch({ type: 'UPDATE_USERS', payload: JSON.parse(event.data) });
    };
    return () => ws.close();
  }, []);

  return (
    <div>
      {users.map((user, index) => (
        <div key={index}>{user.name}</div>
      ))}
    </div>
  );
};

export default WebSocket;