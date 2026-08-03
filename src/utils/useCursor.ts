{"import { useState, useEffect } from 'react';

interface Props {
  code: string;
  language: string;
}

const useCursor = ({ code, language }) => {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // implement cursor tracking logic here
  }, []);

  return {
    color: users.find((user) => user.name === 'John').color,
    name: 'John',
  };
}

export default useCursor;