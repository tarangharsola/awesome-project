{"import React, { useState, useEffect } from 'react';
import { useRoom } from './useRoom';

interface Props {
  id: string;
}

const Room = ({ id }) => {
  const [users, setUsers] = useState([]);
  const { join, leave, users: usersFromStore } = useRoom(id);

  useEffect(() => {
    setUsers(usersFromStore);
  }, [usersFromStore]);

  const handleJoin = () => {
    join();
  };

  const handleLeave = () => {
    leave();
  };

  return (
    <div>
      <h2>Room {id}</h2>
      <button onClick={handleJoin}>Join</button>
      <button onClick={handleLeave}>Leave</button>
      <ul>
        {users.map((user) => (
          <li key={user.name}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Room;