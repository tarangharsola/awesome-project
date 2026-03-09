{"import React from 'react';
import { useParams } from 'react-router-dom';
import Editor from './Editor';

const Room = () => {
  const { roomId } = useParams();

  return (
    <div>
      <h1>Room {roomId}</h1>
      <Editor />
    </div>
  );
};

export default Room;