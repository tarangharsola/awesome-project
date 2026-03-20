{"import React, { useState, useEffect } from 'react';
import { useRoom } from './useRoom';

interface RoomProps {
  id: string;
}

const Room = ({ id }: RoomProps) => {
  const [users, setUsers] = useState([]);
  const { getUsers, joinRoom, leaveRoom } = useRoom(id);

  useEffect(() => {
    const handleUserUpdate = (users: { id: string; name: string }[]) => {
      setUsers(users);
    };
    getUsers(handleUserUpdate);
    return () => {
      getUsers(null);
    };
  }, [getUsers]);

  return (
    <div>
      <h1>Room {id}</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <button onClick={() => joinRoom()}>Join Room</button>
      <button onClick={() => leaveRoom()}>Leave Room</button>
    </div>
  );
}

export default Room;