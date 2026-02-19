{"import { useState, useEffect } from 'react';

interface Props {
  id: string;
}

const useCursor = (id: string) => {
  const [color, setColor] = useState('#' + Math.floor(Math.random() * 16777215).toString(16));
  const [name, setName] = useState('User ' + id);

  useEffect(() => {
    // Generate a random color and name for each user
  }, []);

  return { color, name };
}

export default useCursor;